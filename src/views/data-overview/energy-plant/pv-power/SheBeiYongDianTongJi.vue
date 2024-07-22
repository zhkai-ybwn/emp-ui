<!--
 * @Author: zhangk 13182353591@163.com
 * @Date: 2023-12-11 13:43:00
 * @LastEditors: zhangk 13182353591@163.com
 * @LastEditTime: 2024-04-02 14:49:57
 * @FilePath: \emp-admin-ui\src\views\data-overview\energy-plant\pv-power\SheBeiYongDianTongJi.vue
 * @Description: 设备用电量统计
 * 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
-->
<template>
  <div class="sbydltj-container">
    <ModuleBox :title-config="state.titleConfig" :box-config="state.boxConfig">
      <div class="ring-bg1">
        <div class="ring-bg2"> </div>
      </div>
      <RingChart class="ring-chart" :data="state.dataList"></RingChart>
      <div class="info-card">
        <div class="value-unit">
          {{ state.dataList[state.currentItemIndex]?.per }}
          <span>%</span>
        </div>
        <div class="name">{{
          state.dataList[state.currentItemIndex]?.name
        }}</div>
      </div>
      <div class="info-list">
        <QuYuYongDianItem
          v-for="(item, index) in state.dataList"
          :key="index"
          :data-item="item"
          :color="state.colors[index]"
          :show-bg="state.currentItemIndex === index"
          :height="'32px'"
        ></QuYuYongDianItem>
      </div>
    </ModuleBox>
    <ButtonGroup
      :label-data="state.btnList"
      :btn-module-key="state.btnModuleKey"
      class="btn-group"
    >
    </ButtonGroup>
  </div>
</template>

<script setup>
  import { useStore } from '@/store';
  import useEchart from '@/hooks/useEchart';
  import { equipmentEC } from '@/api/data-overview/pv-power';
  import ModuleBox from '../common/ModuleBox.vue';
  import ButtonGroup from '../common/ButtonGroup.vue';
  import QuYuYongDianItem from '../plant-monitor/left/QuYuYongDianItem.vue';
  import RingChart from '../common/RingChart.vue';

  const state = reactive({
    titleConfig: {
      text: '设备用电量统计',
      width: 542,
      height: 40,
    },
    boxConfig: {
      width: 542,
      height: 228,
    },
    btnList: [
      {
        key: 'day',
        label: '今日',
      },
      {
        key: 'month',
        label: '本月',
      },
      {
        key: 'year',
        label: '全年',
      },
    ],
    btnModuleKey: 6,
    dataList: [],
    labelUnit: [
      { label: '磁悬浮主机', unit: 'kWh' },
      { label: '冷却水泵', unit: 'kWh' },
      { label: '冷水泵', unit: 'kWh' },
      { label: '模块机', unit: 'kWh' },
      { label: '冷却塔', unit: 'kWh' },
    ],
    colors: [
      'linear-gradient(103deg, #328FFF 5.75%, #4A90E4 91.56%)',
      'linear-gradient(120deg, #716FFF 11.66%, #4560BD 66.23%)',
      'linear-gradient(167deg, #9B76CB 10.54%, #7366BE 84.92%)',
      'linear-gradient(103deg, #FFAD32 6.18%, #947A54 92%)',
      'linear-gradient(81deg, rgba(18, 228, 216, 0.85) 8.02%, rgba(49, 255, 243, 0.40) 99.18%)',
    ],
    currentItemIndex: 0,
    intervalIndex: null,
  });

  const { looping } = useEchart();
  const pvDevicePower = computed(() => useStore().pvDevicePower);

  const setIntervalIndex = () => {
    state.intervalIndex = setInterval(() => {
      state.currentItemIndex =
        (state.currentItemIndex + 1) % state.dataList.length;
    }, 5000);
  };

  const setCurrentIndex = () => {
    const trendValue = pvDevicePower.value;
    switch (trendValue) {
      case 'day':
        state.currentIndex = 0;
        break;
      case 'month':
        state.currentIndex = 1;
        break;
      default:
        state.currentIndex = 2;
        break;
    }
  };

  onMounted(() => {
    setIntervalIndex();
    setCurrentIndex();
  });

  onBeforeUnmount(() => {
    clearInterval(state.intervalIndex);
  });

  const setData = (data) => {
    state.dataList = [];
    state.dataList.push({
      name: state.labelUnit[0].label,
      unit: state.labelUnit[0].unit,
      per: data.mainEngineECProp,
      value: data.mainEngineEC,
    });
    state.dataList.push({
      name: state.labelUnit[1].label,
      unit: state.labelUnit[1].unit,
      per: data.coolingWaterPumpECProp,
      value: data.coolingWaterPumpEC,
    });
    state.dataList.push({
      name: state.labelUnit[2].label,
      unit: state.labelUnit[2].unit,
      per: data.chilledWaterPumpECProp,
      value: data.chilledWaterPumpEC,
    });
    state.dataList.push({
      name: state.labelUnit[3].label,
      unit: state.labelUnit[3].unit,
      per: data.modularUnitECProp,
      value: data.modularUnitEC,
    });
    state.dataList.push({
      name: state.labelUnit[4].label,
      unit: state.labelUnit[4].unit,
      per: data.coolingTowerECProp,
      value: data.coolingTowerEC,
    });
    state.dataList.sort((a, b) => b.value - a.value);
  };

  const fetchData = async () => {
    try {
      const { data } = await equipmentEC(pvDevicePower.value);
      setData(data);
    } catch (err) {
      // you can report use errorHandler or other
    }
  };

  watch(pvDevicePower, (newValue, oldValue) => {
    if (newValue !== oldValue) {
      fetchData();
      setCurrentIndex();
    }
  });
  looping(fetchData, 900 * 1000);
</script>

<style lang="less" scoped>
  .sbydltj-container {
    position: relative;

    .ring-bg1 {
      position: absolute;
      top: 33px;
      left: 42px;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 176px;
      height: 176px;

      .set-back('@/assets/imgs/energy-plant/ring_chart_bg1.png');

      .ring-bg2 {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100px;
        height: 100px;

        .set-back('@/assets/imgs/energy-plant/ring_chart_bg2.png');
      }
    }

    .ring-chart {
      position: absolute;
      top: 33px;
      left: 42px;
    }

    .info-card {
      position: absolute;
      top: 71px;
      left: 80px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 100px;
      height: 100px;

      .value-unit {
        color: #fff;
        font-weight: 700;
        font-size: 26px;
        font-family: Barlow-Italic, sans-serif;
        font-style: italic;

        span {
          color: rgb(255 255 255 / 64%);
          font-size: 14px;
        }
      }

      .name {
        color: #fff;
        font-weight: 350;
        font-size: 14px;
        font-family: SourceHanSansCN-Normal, sans-serif;
        font-style: normal;
        line-height: normal;
        text-align: center;
      }
    }

    .info-list {
      position: absolute;
      top: 32px;
      right: 28px;
    }

    .btn-group {
      position: absolute;
      top: 6px;
      right: 16px;
    }
  }
</style>
