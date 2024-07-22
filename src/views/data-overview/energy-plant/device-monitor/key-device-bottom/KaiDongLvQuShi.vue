<template>
  <div class="kaidonglv">
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
  import { keyEquipmentAcRateHist } from '@/api/data-overview/device-monitor';
  import RateTrend from '../../common/RateTrend.vue';
  import ModuleBox from '../../common/ModuleBox.vue';

  const state = reactive({
    titleConfig: {
      text: '近7日关键设备开动率趋势分析',
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
      tooltipText: '开动率',
    },
  });

  const { looping } = useEchart();
  const ariTrend = computed(() => useStore().ariTrend);

  const formatData = (data) => {
    const currentTimeStamp = Date.now();
    return Array.from({ length: 7 }, (_, i) => {
      const timestamp = currentTimeStamp - (6 - i) * 24 * 60 * 60 * 1000;
      return {
        ts: timestamp.toString(),
        v: data[i],
      };
    });
  };

  const fetchData = async () => {
    const formData = new FormData();
    formData.append('dimension', ariTrend.value);
    try {
      const { data } = await keyEquipmentAcRateHist(formData);
      state.chartData = formatData(data);
    } catch (err) {
      // you can report use errorHandler or other
    }
  };

  looping(fetchData, 900 * 1000);
</script>

<style lang="less" scoped>
  .kaidonglv {
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
