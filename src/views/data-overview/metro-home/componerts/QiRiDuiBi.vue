<template>
  <div class="contain">
    <Title :title="'空调系统分项近7日用电对比'"></Title>
    <div class="chart">
      <QiRiBarChart
        v-if="!state.loading && state.dataList && state.dataList.length !== 0"
        :data="state.dataList"
      ></QiRiBarChart>
      <Loading v-if="state.loading" style="height: 100%"></Loading>
      <Empty
        v-if="
          !state.loading && (!state.dataList || state.dataList.length === 0)
        "
      ></Empty>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { getAcSystemItemEnergy } from '@/api/data-overview/metro-home';
  import Title from '../common/Title.vue';
  import QiRiBarChart from '../common/QiRiBarChart.vue';
  import Loading from '../common/Loading.vue';
  import Empty from '../common/Empty.vue';

  const state = reactive({
    dataList: [],
    loading: false,
  });

  const fetchData = async () => {
    try {
      state.loading = true;
      const { data } = await getAcSystemItemEnergy();
      state.dataList = data;
    } catch (err) {
      // you can report use errorHandler or other
    } finally {
      state.loading = false;
    }
  };
  fetchData();
</script>

<style scoped lang="less">
  .contain {
    width: 100%;
    margin: 45px 0;

    .chart {
      height: 210px;
      margin-top: 10px;
    }
  }
</style>
