<template>
  <ModuleBox
    :config="state.title"
    :button-list="state.buttonList"
    @change="change"
  >
    <!-- <div class="title">
      <div class="first">瞬时COP</div>
      <div class="last"
        >平均COP
        <span>{{ state.dataList.rightPointValue }}</span>
      </div>
    </div> -->
    <div class="legend1">
      <div class="left-name1">{{ state.dataList.leftPointName }}</div>
      <!-- <div class="right1">
        <div class="right-name1">{{ state.dataList.rightPointName }}</div>
        <div class="right-value1" :text="state.dataList.rightPointValue">{{
          state.dataList.rightPointValue ? state.dataList.rightPointValue : '-'
        }}</div></div
      > -->
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
    <ScatterChart
      v-if="!state.loading && state.dataList?.latticeDataList?.length !== 0"
      :data="state.dataList?.latticeDataList"
      :time-type="state.timeType"
      class="chart"
    ></ScatterChart>
    <div
      v-if="state.dataList?.latticeDataList?.length === 0 && !state.loading"
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
    getLatticeDiagramData,
    LatticeDiagramData,
  } from '@/api/small-maintenance/health';
  import { useRoute } from 'vue-router';
  import ModuleBox from '../../../components/ModuleBox.vue';
  import ScatterChart from '../../../components/ScatterChart.vue';

  interface Button {
    title: string;
    key: number;
  }

  const route = useRoute();
  const state = reactive({
    loading: false,
    title: {
      Width: 'calc(50% - 12px)',
      titleHeight: '41px',
      text: '冷水机组COP点阵图',
      textEn: 'Chiller COP',
      Height: '422px',
    },
    buttonList: [
      { title: '当前一天', key: 1 },
      { title: '最近七天', key: 2 },
      { title: '本月', key: 3 },
    ],
    dataList: {} as LatticeDiagramData,
    timeType: 1,
  });

  const fetchData = async (
    params: DeviceAlarmReq = {
      deviceId: Number(route.meta.deviceId),
      pointTypes: ['INSTANT_COP', 'AVG_COP'],
      timeType: 1,
    }
  ) => {
    try {
      const { data } = await getLatticeDiagramData(params);
      state.dataList = data;
    } catch (err) {
      state.dataList = {} as LatticeDiagramData;
    }
  };
  fetchData();

  const change = (item: Button) => {
    fetchData({
      deviceId: Number(route.meta.deviceId),
      pointTypes: ['INSTANT_COP', 'AVG_COP'],
      timeType: item.key,
    });
    state.timeType = item.key;
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

    .first,
    .last {
      color: rgb(255 255 255 / 80%);
      font-weight: 400;
      font-size: 14px;
      font-family: HarmonyOS-Regular, sans-serif;
      font-style: normal;
      line-height: 20px; /* 142.857% */
    }

    .last span {
      // margin-left: 8px;
      display: inline-block;
      font-weight: 700;
      font-size: 16px;
      font-family: HarmonyOS-Regular, sans-serif;
      font-style: normal; /* 125% */
      line-height: 20px;
      // text-shadow: 0 0 4px rgb(43 102 255 / 80%);
      background: linear-gradient(180deg, #fff 0%, #c1daff 100%);
      background-clip: text;
      /* stylelint-disable */
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;

      &::before {
        position: absolute;
        z-index: -1;
        text-shadow: 0 0 2px rgb(0 121 255 / 80%), 0 0 5px #06f;
        content: attr(text);
      }
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

  .legend1 {
    display: flex;
    align-items: end;
    justify-content: space-between;
    width: 90%;
    height: 10%;
    margin: 0 auto 5px;
    // padding: 0 24px;
    .left-name1 {
      color: rgb(255 255 255 / 80%);
      font-weight: 400;
      font-size: 14px;
      font-family: HarmonyOS-Regular, sans-serif;
      font-style: normal;
      line-height: 20px;
    }

    .right1 {
      display: flex;

      .right-name1 {
        color: rgb(255 255 255 / 80%);
        font-weight: 400;
        font-size: 14px;
        font-family: HarmonyOS-Regular, sans-serif;
        font-style: normal;
        line-height: 20px;
      }

      .right-value1 {
        margin-left: 8px;
        font-weight: 700;
        font-size: 16px;
        font-family: HarmonyOS-Regular, sans-serif;
        font-style: normal;
        line-height: 20px;
        background: linear-gradient(180deg, #fff 0%, #c1daff 100%);
        background-clip: text;
        /* stylelint-disable */
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;

        &::before {
          position: absolute;
          z-index: -1;
          text-shadow: 0 0 2px rgb(0 121 255 / 80%), 0 0 5px #06f;
          content: attr(text);
        }
      }
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
