<template>
  <ModuleBox
    :config="state.title"
    :button-list="state.buttonList"
    @change="change"
  >
    <div class="title">
      <div class="first">
        瞬时制冷量
        <span style="font-size: 12px">(kW)</span>
      </div>
      <div class="last">
        累计制冷量
        <span style="font-size: 12px">(kW)</span>
      </div>
    </div>
    <a-spin
      v-if="state.loading"
      :loading="state.loading"
      style="
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 290px;
      "
      tip="加载中"
    >
    </a-spin>
    <CurveChart
      v-if="
        state.lineChartData.lineChartDataList &&
        !state.loading &&
        state.lineChartData?.lineChartDataList?.length !== 0
      "
      :data="state.lineChartData.lineChartDataList"
      :labels="[
        state.lineChartData.leftPointName,
        state.lineChartData.rightPointName,
      ]"
      :time-type="state.timeType"
      class="chart"
    ></CurveChart>
    <div
      v-if="
        state.lineChartData.lineChartDataList &&
        state.lineChartData?.lineChartDataList?.length === 0 &&
        !state.loading
      "
      class="empty"
    >
      <div class="img"></div>
      <div class="text">&nbsp;暂无数据</div>
    </div>
  </ModuleBox>
</template>

<script setup lang="ts">
  import {
    DeviceAlarmReq,
    getLineChartData,
    LineChartData,
  } from '@/api/small-maintenance/health';
  import { useRoute } from 'vue-router';
  import ModuleBox from '../../../components/ModuleBox.vue';
  import CurveChart from '../../../components/CurveChart.vue';

  const route = useRoute();

  const state = reactive({
    loading: false,
    title: {
      Width: 'calc(50% - 12px)',
      titleHeight: '41px',
      text: '制冷量曲线图',
      textEn: 'Refrigeration capacity',
      Height: '422px',
    },
    buttonList: [
      { title: '当前一天' },
      { title: '最近七天' },
      { title: '本月' },
    ],
    lineChartData: {} as LineChartData,
    timeType: 1,
  });

  const fetchData3 = async (
    params: DeviceAlarmReq = {
      deviceId: Number(route.meta.deviceId),
      pointTypes: ['INSTANT_COOL', 'TOTAL_COOL'],
      timeType: 1,
    }
  ) => {
    try {
      const { data } = await getLineChartData(params);
      state.lineChartData = data;
    } catch (err) {
      state.lineChartData = {} as LineChartData;
    }
  };
  fetchData3();

  interface itemTitle {
    title: string;
  }

  const change = (item: itemTitle) => {
    let timeTypeValue = 1;
    state.timeType = 1;
    if (item.title === '最近七天') {
      timeTypeValue = 2;
      state.timeType = 2;
    } else if (item.title === '本月') {
      timeTypeValue = 3;
      state.timeType = 3;
    }
    fetchData3({
      deviceId: Number(route.meta.deviceId),
      pointTypes: ['INSTANT_COOL', 'TOTAL_COOL'],
      timeType: timeTypeValue,
    });
  };
</script>

<style lang="less" scoped>
  .title {
    display: flex;
    align-items: end;
    justify-content: space-between;
    width: 90%;
    height: 10%;
    margin: 0 auto 5px;

    .first {
      color: #76e144;
      font-weight: 400;
      font-size: 14px;
      font-family: HarmonyOS-Regular, sans-serif;
      font-style: normal;
      line-height: 20px; /* 142.857% */
    }

    .last {
      color: #0079ff;
      font-weight: 400;
      font-size: 14px;
      font-family: HarmonyOS-Regular, sans-serif;
      font-style: normal;
      line-height: 20px; /* 142.857% */
      text-align: right;
    }
  }

  .chart {
    width: 90%;
    height: 290px;
    margin: 0 auto;
  }

  .empty {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 90%;
    height: 290px;
    margin: 0 auto;
    background: rgb(53 81 145 / 10%);
    border-radius: 4px;
    backdrop-filter: blur(5px);

    .img {
      width: 24px;
      height: 24px;
      .set-back('@/assets/imgs/load-forecast/no-data.png');
    }

    .text {
      color: #7787a2;
      font-weight: 400;
      font-size: 16px;
      font-family: HarmonyOS-Regular, sans-serif;
      font-style: normal;
      line-height: 24px; /* 150% */
      text-align: center;
    }
  }

  :deep(.arco-spin-mask) {
    width: 90%;
    margin: 0 auto;
    background: rgb(53 81 145 / 10%);
    border-radius: 4px;
    backdrop-filter: blur(5px);
  }
</style>
