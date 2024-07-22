<!--
 * @Author: zhangk 13182353591@163.com
 * @Date: 2024-01-15 08:42:14
 * @LastEditors: zhangk 13182353591@163.com
 * @LastEditTime: 2024-03-28 16:26:09
 * @FilePath: \emp-admin-ui\src\views\smart-maintenance\health-diagnosis\chiller-room\components\WaterSystemEfficiency.vue
 * @Description: 水系统能效
 * 
 * Copyright (c) 2024 by ${git_name_email}, All Rights Reserved. 
-->
<template>
  <ModuleBox
    :config="state.title"
    :button-list="state.buttonList"
    class="m-box"
    @change="change"
  >
    <!-- <div class="cop-box">
      <div class="legend1">
        <div class="left-name1">{{
          state.latticeDiagramData1.leftPointName
        }}</div>
        <div class="right1">
          <div class="right-name1">{{
            state.latticeDiagramData1.rightPointName
          }}</div>
          <div
            class="right-value1"
            :text="state.latticeDiagramData1.rightPointValue"
            >{{
              state.latticeDiagramData1.rightPointValue
                ? state.latticeDiagramData1.rightPointValue
                : '-'
            }}</div
          ></div
        >
      </div>
      <ScatterChart
        v-if="
          !state.copLoading &&
          state.latticeDiagramData1.latticeDataList &&
          state.latticeDiagramData1.latticeDataList.length !== 0
        "
        :data="state.latticeDiagramData1.latticeDataList"
        class="chart1"
      ></ScatterChart>
      <div
        v-if="
          state.latticeDiagramData1.latticeDataList &&
          state.latticeDiagramData1.latticeDataList.length === 0 &&
          !state.copLoading
        "
        class="empty"
      >
        <div class="img"></div>
        <div class="text">&nbsp;暂无数据</div>
      </div>
      <a-spin
        v-if="state.copLoading"
        :loading="state.copLoading"
        tip="加载中"
        style="
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 85%;
        "
      >
      </a-spin>
    </div> -->
    <div class="scop-box">
      <div class="legend1">
        <div class="left-name1">{{
          state.latticeDiagramData2.leftPointName
        }}</div>
        <div v-if="false" class="right1">
          <div class="right-name1">{{
            state.latticeDiagramData2.rightPointName
          }}</div>
          <div
            class="right-value1"
            :text="state.latticeDiagramData2.rightPointValue"
            >{{
              state.latticeDiagramData2.rightPointValue
                ? state.latticeDiagramData2.rightPointValue
                : '-'
            }}</div
          ></div
        >
      </div>
      <ScatterChart
        v-if="
          !state.scopLoading &&
          state.latticeDiagramData2.latticeDataList &&
          state.latticeDiagramData2.latticeDataList.length !== 0
        "
        :time-type="state.timeType"
        :data="state.latticeDiagramData2.latticeDataList"
        class="chart2"
      ></ScatterChart>
      <a-spin
        v-if="state.scopLoading"
        :loading="state.scopLoading"
        tip="加载中"
        style="
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 85%;
        "
      >
      </a-spin>
      <div
        v-if="
          state.latticeDiagramData2.latticeDataList &&
          state.latticeDiagramData2.latticeDataList.length === 0 &&
          !state.scopLoading
        "
        class="empty"
      >
        <div class="img"></div>
        <div class="text">&nbsp;暂无数据</div>
      </div>
    </div>
    <div class="cooling-box">
      <div class="chart-lengend">
        <div class="left-name"
          >{{ state.lineChartData.leftPointName }}<span>(kW)</span></div
        >
        <div class="right-name"
          >{{ state.lineChartData.rightPointName }}<span>(kW)</span></div
        >
      </div>
      <CurveChart
        v-if="
          !state.coolingLoading &&
          state.lineChartData.lineChartDataList &&
          state.lineChartData.lineChartDataList.length !== 0
        "
        :time-type="state.timeType"
        :data="state.lineChartData.lineChartDataList"
        class="chart3"
        :labels="[
          state.lineChartData.leftPointName,
          state.lineChartData.rightPointName,
        ]"
      >
      </CurveChart>
      <div
        v-if="
          state.lineChartData.lineChartDataList &&
          state.lineChartData.lineChartDataList.length === 0 &&
          !state.coolingLoading
        "
        class="empty"
      >
        <div class="img"></div>
        <div class="text">&nbsp;暂无数据</div>
      </div>
      <a-spin
        v-if="state.coolingLoading"
        :loading="state.coolingLoading"
        tip="加载中"
        style="
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 85%;
        "
      >
      </a-spin>
    </div>
  </ModuleBox>
</template>

<script setup lang="ts">
  import ModuleBox from '@/views/smart-maintenance/components/ModuleBox.vue';
  import ScatterChart from '@/views/smart-maintenance/components/ScatterChart.vue';
  import {
    getLatticeDiagramData,
    DeviceAlarmReq,
    LatticeDiagramData,
    getLineChartData,
    LineChartData,
  } from '@/api/small-maintenance/health';
  import { useRoute } from 'vue-router';
  import CurveChart from '@/views/smart-maintenance/components/CurveChart.vue';

  const state = reactive({
    title: {
      Width: '28.5%',
      titleHeight: '41px',
      text: '水系统能效',
      textEn: '',
      Height: 'calc(100% - 440px)',
      bgClass: 'shadow-contain',
    },
    buttonList: [
      { title: '当前一天', key: 1 },
      { title: '最近七天', key: 2 },
      { title: '本月', key: 3 },
    ],
    timeType: 1,
    latticeDiagramData1: {} as LatticeDiagramData,
    latticeDiagramData2: {} as LatticeDiagramData,
    lineChartData: {} as LineChartData,
    copLoading: false,
    scopLoading: false,
    coolingLoading: false,
  });

  interface Button {
    title: string;
    key: number;
  }

  const route = useRoute();

  // const fetchData1 = async (
  //   params: DeviceAlarmReq = {
  //     deviceId: Number(route.meta.deviceId),
  //     pointTypes: ['INSTANT_COP', 'AVG_COP'],
  //     timeType: 1,
  //   }
  // ) => {
  //   try {
  //     state.copLoading = true;
  //     const { data } = await getLatticeDiagramData(params);
  //     state.latticeDiagramData1 = data;
  //   } catch (err) {
  //     // you can report use errorHandler or other
  //   } finally {
  //     state.copLoading = false;
  //   }
  // };
  // fetchData1();
  const fetchData2 = async (
    params: DeviceAlarmReq = {
      deviceId: Number(route.meta.deviceId),
      pointTypes: ['INSTANT_SCOP', 'AVG_SCOP'],
      timeType: 1,
    }
  ) => {
    try {
      state.scopLoading = true;
      const { data } = await getLatticeDiagramData(params);
      state.latticeDiagramData2 = data;
    } catch (err) {
      state.latticeDiagramData2 = {} as LatticeDiagramData;
    } finally {
      state.scopLoading = false;
    }
  };
  fetchData2();
  const fetchData3 = async (
    params: DeviceAlarmReq = {
      deviceId: Number(route.meta.deviceId),
      pointTypes: ['INSTANT_COOL', 'TOTAL_COOL'],
      timeType: 1,
    }
  ) => {
    try {
      state.coolingLoading = true;
      const { data } = await getLineChartData(params);
      state.lineChartData = data;
    } catch (err) {
      state.lineChartData = {} as LineChartData;
    } finally {
      state.coolingLoading = false;
    }
  };
  fetchData3();

  const change = (item: Button) => {
    // fetchData1({
    //   deviceId: Number(route.meta.deviceId),
    //   pointTypes: ['INSTANT_COP', 'AVG_COP'],
    //   timeType: item.key,
    // });
    fetchData2({
      deviceId: Number(route.meta.deviceId),
      pointTypes: ['INSTANT_SCOP', 'AVG_SCOP'],
      timeType: item.key,
    });
    fetchData3({
      deviceId: Number(route.meta.deviceId),
      pointTypes: ['INSTANT_COOL', 'TOTAL_COOL'],
      timeType: item.key,
    });
    state.timeType = item.key;
  };
</script>

<style lang="less" scoped>
  .m-box {
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .cop-box {
      height: 30%;
      margin-top: 10px;
      padding: 0 0 22px;

      .chart1 {
        width: 95%;
        height: 85%;
        margin: 8px 12px 0;
      }
    }

    .scop-box {
      height: 45%;
      margin-top: 24px;
      padding: 0 0 22px;

      .chart2 {
        width: 95%;
        height: 85%;
        margin: 8px 12px 0;
      }
    }

    .cooling-box {
      height: 45%;
      padding: 0 0 22px;

      .chart3 {
        width: 95%;
        height: 85%;
        margin: 8px 12px 0;
      }
    }

    .legend1 {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 24px;

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

    .chart-lengend {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 24px;

      .left-name {
        color: #76e144;
        font-weight: 400;
        font-size: 14px;
        font-family: HarmonyOS-Regular, sans-serif;
        font-style: normal;
        line-height: 20px;

        span {
          font-size: 12px;
        }
      }

      .right-name {
        color: #0079ff;
        font-weight: 400;
        font-size: 14px;
        font-family: HarmonyOS-Regular, sans-serif;
        font-style: normal;
        line-height: 20px;

        span {
          font-size: 12px;
        }
      }
    }

    .empty {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 90%;
      height: 85%;
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
        line-height: 24px;
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
  }
</style>
