<!-- 空调设备信息组件 -->
<template>
  <div class="ktsbxx-container">
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
  import { overView } from '@/api/data-overview/device-monitor';
  import DeviceStateItem from '../DeviceStateItem.vue';

  const { looping } = useEchart();

  const state = reactive({
    config: [
      {
        type: 0,
        isPer: [false, false],
        class1: 'data-value1',
        class2: 'data-value2',
        title: '全厂空调总数',
        unit: '台',
        label1: '多联机',
        unit1: '台',
        label2: '室内机',
        unit2: '台',
      },
      {
        type: 0,
        isPer: [false, false],
        class1: 'data-value1',
        class2: 'data-value2',
        title: '全厂多联机总数',
        unit: '台',
        label1: '运行',
        unit1: '台',
        label2: '关机',
        unit2: '台',
      },
      {
        type: 0,
        isPer: [false, false],
        class1: 'data-value1',
        class2: 'data-value2',
        title: '全厂室内机总数',
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
        title: '今日空调运行总数/开启率',
        unit: ['台', '%'],
        label1: '昨日',
        unit1: '台',
        label2: '环比',
        unit2: '%',
      },
    ],
    data: [],
  });

  const fetchData = async () => {
    try {
      const { data } = await overView();
      state.data = [];
      state.data.push([data.totalEquNum, data.vrvNum, data.inDoorUnitNum]);
      state.data.push([data.vrvNum, data.vrvRunningNum, data.vrvOffNum]);
      state.data.push([
        data.inDoorUnitNum,
        data.inDoorRunningNum,
        data.inDoorOffNum,
      ]);
      state.data.push([
        [data.todayAirconditionRunningNum, data.openRate],
        data.yesterdayAirconditionRunningNum,
        data.airconditionRunningNumQOQ,
      ]);
    } catch (err) {
      // you can report use errorHandler or other
    }
  };

  looping(fetchData, 900 * 1000);
</script>

<style lang="less" scoped>
  .ktsbxx-container {
    display: flex;
    width: 1030px;
    height: 83px;
  }
</style>
