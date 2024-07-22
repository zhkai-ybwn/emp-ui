<!--
 * @Author: zhangk 13182353591@163.com
 * @Date: 2023-12-05 09:58:47
 * @LastEditors: zhangk 13182353591@163.com
 * @LastEditTime: 2024-04-02 14:03:32
 * @FilePath: \emp-admin-ui\src\views\data-overview\energy-plant\device-monitor\DeviceStateInfo.vue
 * @Description: 设备状态信息
 * 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
-->
<template>
  <div class="device-state-container">
    <DeviceStateItem
      v-for="(item, index) in state.data"
      :key="index"
      :config="state.config[index]"
      :data="item"
      :style="{ marginLeft: index !== 0 ? '24px' : '0' }"
    ></DeviceStateItem>
  </div>
</template>

<script setup>
  import useEchart from '@/hooks/useEchart';
  import { equOverview } from '@/api/data-overview/device-monitor';
  import DeviceStateItem from './DeviceStateItem.vue';

  const { looping } = useEchart();

  const state = reactive({
    config: [
      {
        type: 0,
        isPer: [false, false],
        class1: 'data-value1',
        class2: 'data-value2',
        title: '全厂关键设备总数',
        unit: '台',
        label1: '运行',
        unit1: '台',
        label2: '关机',
        unit2: '台',
      },
      {
        type: 0,
        isPer: [false, true],
        class1: 'data-value1',
        title: '关键设备开动率',
        unit: '%',
        label1: '昨日',
        unit1: '%',
        label2: '环比',
        unit2: '%',
      },
      {
        type: 1,
        isPer: [true, true],
        title: '关键设备今日耗电量',
        unit: 'kWh',
        label1: '同比',
        unit1: '%',
        label2: '环比',
        unit2: '%',
      },
      {
        type: 1,
        isPer: [true, false],
        title: '关键设备全年耗电量',
        unit: 'kWh',
        label1: '环比',
        unit1: '%',
      },
    ],
    data: [],
  });

  const fetchData = async () => {
    try {
      const { data } = await equOverview();
      state.data = [];
      state.data.push([data.eqNum, data.runningNum, data.offNum]);
      state.data.push([data.actRate, data.yesterdayActRate, data.actRateQOQ]);
      state.data.push([data.todayEQEC, data.todayEQECYOY, data.todayEQECQOQ]);
      state.data.push([data.yearEQEC, data.yearEQECYOY]);
    } catch (err) {
      // you can report use errorHandler or other
    }
  };

  looping(fetchData, 900 * 1000);
</script>

<style lang="less" scoped>
  .device-state-container {
    display: flex;
    width: 1030px;
    height: 83px;
  }
</style>
