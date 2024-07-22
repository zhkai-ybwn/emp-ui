<template>
  <div class="chart">
    <ModuleBox :config="state.title">
      <GradientBarChart
        v-if="!state.loading && state.dataList.length !== 0"
        :data="state.dataList"
      />
      <a-spin
        v-if="state.loading"
        :loading="state.loading"
        style="
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 278px;
        "
        tip="加载中"
      ></a-spin>
      <div
        v-if="state.dataList.length === 0 && state.loading === false"
        class="empty"
      >
        <div class="img"></div>
        <div class="text">&nbsp;暂无数据</div>
      </div>
    </ModuleBox>
    <div v-if="!state.loading && state.dataList.length !== 0" class="unit"
      >单位:kWh</div
    >
  </div>
</template>

<script lang="ts" setup>
  import {
    ECRanking,
    ConParams,
  } from '@/api/energy-analysis/consumption-panel';
  import bus from '@/utils/bus';
  import ModuleBox from '../../common/ModuleBox.vue';
  import GradientBarChart from '../../common/GradientBarChart.vue';

  const state = reactive({
    loading: false,
    dataList: [] as any[],
    title: {
      Width: '100%',
      titleHeight: '40px',
      text: '能耗排名',
      textEn: 'Energy consumption ranking',
      Height: '318px',
    },
  });

  const fetchData = async (params: ConParams) => {
    try {
      state.loading = true;
      const { data } = await ECRanking(params);
      // @ts-ignore
      state.dataList = data.sort((a: any, b: any) => a.value - b.value);
    } catch (err) {
      state.dataList = [];
    } finally {
      state.loading = false;
    }
  };

  bus.on('search-consumption', (params: any) => {
    fetchData(params);
  });
</script>

<style lang="less" scoped>
  .chart {
    position: relative;

    .unit {
      position: absolute;
      right: 5%;
      bottom: 5%;
      color: #fff;
      font-weight: 400;
      font-size: 14px;
      font-family: HarmonyOS-Regular, sans-serif;
      font-style: normal;
      line-height: 20px; /* 142.857% */
    }
  }

  .empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 278px;
  }

  .img {
    width: 98px;
    height: 60px;
    .set-back('@/assets/imgs/energy-analysis/empty-image.png');
  }

  .text {
    color: #7787a2;
    font-weight: 400;
    font-size: 16px;
    font-family: HarmonyOS-Regular, sans-serif;
    font-style: normal;
    line-height: 24px; /* 150% */
  }
</style>
