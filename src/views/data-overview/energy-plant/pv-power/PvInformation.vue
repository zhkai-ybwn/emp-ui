<!-- 光伏直驱信息组件 -->
<template>
  <div class="container">
    <div class="content-box">
      <PvInformationSingle
        v-for="(item, index) in state.dataList"
        :key="index"
        :index="index"
        :data="item"
      ></PvInformationSingle>
    </div>
  </div>
</template>

<script setup>
  import useEchart from '@/hooks/useEchart';
  import { pvOverview } from '@/api/data-overview/pv-power';
  import PvInformationSingle from './PvInformationSingle.vue';

  const { looping } = useEchart();

  const state = reactive({
    dataList: [],
  });

  const fetchData = async () => {
    try {
      const { data } = await pvOverview();
      state.dataList = [];
      state.dataList.push({
        title: '当日光伏发电量',
        num: data.todayElecGen || 0,
        ynum: data.yesterdayElecGen || 0,
        rate: data.todayElecGenYOY || 0,
        rateT: '同比',
      });
      state.dataList.push({
        title: '当日主机耗电量',
        num: data.mainEngineConsumption || 0,
        ynum: data.yesterdayMainEngineConsumption || 0,
        rate: data.mainEngineConsumptionYOY || 0,
        rateT: '同比',
      });
      state.dataList.push({
        title: '当日并网发电量',
        num: data.todayOnGridElecGen || 0,
        ynum: data.yesterdayOnGridElecGen || 0,
        rate: data.todayOnGridElecGenYOY || 0,
        rateT: '同比',
      });
      state.dataList.push({
        title: '全年累计光伏发电量',
        num: data.totalElecGen || 0,
        rate: data.totalElecGenQOQ || 0,
        rateT: '环比',
      });
      state.dataList.push({
        title: '全年CO2累计减排量',
        num: data.totalCarbonEmissionReduction || 0,
        rate: data.totalCarbonEmissionReductionYOY || 0,
        rateT: '环比',
      });
    } catch (err) {
      // you can report use errorHandler or other
    }
  };

  looping(fetchData, 900 * 1000);
</script>

<style lang="less" scoped>
  .container {
    width: 1388px;
    height: 78px;
    padding-top: 80px;

    .content-box {
      display: flex;
      align-items: center;
      justify-content: space-around;
    }
  }
</style>
