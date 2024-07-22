<!--
 * @Author: zhangk 13182353591@163.com
 * @Date: 2024-01-18 09:56:41
 * @LastEditors: zhangkai 2572429235@qq.com
 * @LastEditTime: 2024-07-09 09:05:33
 * @FilePath: \emp-admin-ui\src\views\smart-maintenance\health-diagnosis\cooling-water-pump\components\CoolWaterTransmissionChart.vue
 * @Description: 冷水输送系数曲线图
 * 
 * Copyright (c) 2024 by ${git_name_email}, All Rights Reserved. 
-->
<template>
  <ModuleBox :config="state.title" :button-list="state.buttonList">
    <div class="chart-box-cool">
      <div class="chart-lengend">
        <div class="left-name"
          >{{ state.lineChartData.leftPointName }}<span></span>
        </div>
        <div class="right-name"
          >{{ state.lineChartData.rightPointName }}<span></span>
        </div>
      </div>
      <CurveChart
        v-if="
          state.lineChartData.lineChartDataList &&
          state.lineChartData.lineChartDataList.length !== 0 &&
          !state.chartLoading
        "
        :data="state.lineChartData.lineChartDataList"
        class="chart-cool"
        :labels="[
          state.lineChartData.leftPointName,
          state.lineChartData.rightPointName,
        ]"
      >
      </CurveChart>
      <a-spin
        v-if="state.chartLoading"
        :loading="state.chartLoading"
        tip="加载中"
        style="
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 290px;
        "
      >
      </a-spin>
      <div
        v-if="
          state.lineChartData.lineChartDataList &&
          state.lineChartData.lineChartDataList.length === 0 &&
          !state.chartLoading
        "
        class="empty"
      >
        <div class="img"></div>
        <div class="text">&nbsp;暂无数据</div>
      </div>
    </div>
  </ModuleBox>
</template>

<script setup lang="ts">
  import {
    getLineChartData,
    LineChartData,
    DeviceAlarmReq,
  } from '@/api/small-maintenance/health';
  import { useRoute } from 'vue-router';
  import CurveChart from '@/views/smart-maintenance/components/CurveChart.vue';
  import ModuleBox from '../../../components/ModuleBox.vue';

  const state = reactive({
    title: {
      Width: 'calc(50% - 12px)',
      titleHeight: '41px',
      text: '冷水输送系数曲线图',
      textEn: 'Chilled water delivery coefficient',
      bgClass: 'contain',
      Height: '422px',
    },
    buttonList: [{ title: '当前一天' }],
    lineChartData: {} as LineChartData,
    chartLoading: false,
  });

  const route = useRoute();

  const fetchData = async (
    params: DeviceAlarmReq = {
      deviceId: Number(route.meta.deviceId),
      pointTypes: ['INSTANT_TRANSPORT', 'TOTAL_TRANSPORT'],
      timeType: 1,
    }
  ) => {
    try {
      state.chartLoading = true;
      const { data } = await getLineChartData(params);
      state.lineChartData = data;
    } catch (err) {
      state.lineChartData = {} as LineChartData;
    } finally {
      state.chartLoading = false;
    }
  };
  fetchData();
</script>

<style lang="less" scoped>
  .chart-box-cool {
    height: 422px;

    .chart-cool {
      width: 90%;
      height: 290px;
      margin: 0 auto;
    }

    .chart-lengend {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 24px;
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
