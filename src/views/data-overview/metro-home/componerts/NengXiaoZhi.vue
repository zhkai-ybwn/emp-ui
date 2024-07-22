<template>
  <div>
    <Title :title="'累计能效值'"></Title>
    <div class="chart">
      <div class="chart1">
        <RingChart
          v-if="state.data1 && !state.loading1"
          :data="state.data1"
          :name="state.name1"
        ></RingChart>
        <Empty v-if="!state.data1 && !state.loading1"></Empty>
        <Loading v-if="state.loading1"></Loading>
        <div v-if="state.data1 && !state.loading1" class="info">
          <div class="value">{{
            state.data1 ? parseFloat(state.data1).toFixed(2) : '- -'
          }}</div>
          <div class="name">{{ state.name1 }}</div>
        </div>
      </div>
      <div class="chart2">
        <RingChart
          v-if="state.data2 && !state.loading2"
          :data="state.data2"
          :name="state.name2"
        ></RingChart>
        <div v-if="state.data2 && !state.loading2" class="info">
          <div class="value">{{
            state.data2 ? parseFloat(state.data2).toFixed(2) : '- -'
          }}</div>
          <div class="name">{{ state.name2 }}</div>
        </div>
        <Empty v-if="!state.data2 && !state.loading2"></Empty>
        <Loading v-if="state.loading2"></Loading>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { getTotalCOP } from '@/api/data-overview/metro-home';
  import Title from '../common/Title.vue';
  import RingChart from '../common/RingChart.vue';
  import Empty from '../common/Empty.vue';
  import Loading from '../common/Loading.vue';

  const state = reactive({
    data1: '',
    data2: '',
    name1: '空调系统COP',
    name2: '制冷机房COP',
    loading1: false,
    loading2: false,
  });

  const fetchData = async () => {
    try {
      state.loading1 = true;
      state.loading2 = true;
      const { data } = await getTotalCOP();
      state.data1 = data.airCOP;
      state.data2 = data.chillerRoomCOP;
    } catch (err) {
      // you can report use errorHandler or other
    } finally {
      state.loading1 = false;
      state.loading2 = false;
    }
  };
  fetchData();
</script>

<style scoped lang="less">
  .chart {
    display: flex;
    height: 135px;

    .chart1,
    .chart2 {
      position: relative;
      width: 50%;

      .info {
        position: absolute;
        bottom: 20%;
        left: 50%;
        text-align: center;
        transform: translateX(-50%);

        .value {
          color: #fff;
          font-weight: 600;
          font-size: 20px;
          font-family: Barlow-SemiBold, sans-serif;
        }

        .name {
          font-weight: 400;
          font-size: 12px;
          font-family: HarmonyOS-Regular, sans-serif;
          background: linear-gradient(186deg, #fff 5.79%, #9cc4ff 96.02%);
          background-clip: text;
          /* stylelint-disable */
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
      }
    }
  }
</style>
