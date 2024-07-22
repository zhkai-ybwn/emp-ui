<!--
 * @Author: zhangk 13182353591@163.com
 * @Date: 2023-12-11 09:37:50
 * @LastEditors: zhangk 13182353591@163.com
 * @LastEditTime: 2024-03-18 17:03:04
 * @FilePath: \emp-admin-ui\src\views\data-overview\energy-plant\device-monitor\KongTiaoKaiQiLv.vue
 * @Description: 近7日空调开启率趋势分析
 * 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
-->

<template>
  <div class="ktkql-container">
    <ModuleBox :title-config="state.titleConfig" :box-config="state.boxConfig">
      <RateTrend
        class="trend-chart"
        :data="state.chartData"
        :config="state.chartConfig"
      ></RateTrend>
    </ModuleBox>
  </div>
</template>

<script setup>
  import useEchart from '@/hooks/useEchart';
  import { useStore } from '@/store';
  import { last7DaysOpenRate } from '@/api/data-overview/device-monitor';
  import RateTrend from '../common/RateTrend.vue';
  import ModuleBox from '../common/ModuleBox.vue';

  const region = computed(() => useStore().region);
  const floor = computed(() => useStore().floor);

  const state = reactive({
    titleConfig: {
      text: '当前楼层近7日空调开启率趋势分析',
      width: 566,
      height: 40,
    },
    boxConfig: {
      width: 566,
      height: 228,
    },
    chartConfig: {
      width: 518,
      height: 208,
      tooltipText: '开启率',
    },
  });

  const { looping } = useEchart();

  const formatRegionFloor = (s) => {
    const regionFloorMap = {
      west_f1: '13,20,25,30',
      west_f2: '13,20,25,31',
      west_f3: '13,20,25,32',
      east_f1: '13,20,24,27',
      east_f2: '13,20,24,28',
      east_f3: '13,20,24,29',
    };
    return regionFloorMap[s] || '';
  };

  const getParam = () => {
    const regionStr = region.value === 0 ? 'east' : 'west';
    return formatRegionFloor(`${regionStr}_f${floor.value}`);
  };

  const fetchData = async () => {
    const formData = new FormData();
    formData.append('location', getParam());
    try {
      const { data } = await last7DaysOpenRate(formData);
      state.chartData = data.reteInfo;
    } catch (err) {
      // you can report use errorHandler or other
    }
  };

  watch([region, floor], ([newValue1, newValue2], [oldValue1, oldValue2]) => {
    if (newValue1 !== oldValue1) fetchData();
    if (newValue2 !== oldValue2) fetchData();
  });

  looping(fetchData, 900 * 1000);
</script>

<style lang="less" scoped>
  .ktkql-container {
    position: relative;

    .btn-group {
      position: absolute;
      top: 6px;
      right: 16px;
    }

    .trend-chart {
      margin: 12px 24px 0;
    }
  }
</style>
