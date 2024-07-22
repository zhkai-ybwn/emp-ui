<!--
 * @Author: zhangk 13182353591@163.com
 * @Date: 2024-01-18 09:56:00
 * @LastEditors: zhangk 13182353591@163.com
 * @LastEditTime: 2024-04-09 10:35:55
 * @FilePath: \emp-admin-ui\src\views\smart-maintenance\health-diagnosis\cooling-tower\components\FrequencyPowerCurveChart.vue
 * @Description: 频率-功率对应关系曲线图
 * 
 * Copyright (c) 2024 by ${git_name_email}, All Rights Reserved. 
-->
<template>
  <ModuleBox :config="state.title" :button-list="state.buttonList">
    <div class="chart-box-fre">
      <div class="chart-lengend">
        <div class="left-name"
          >{{ state.pointCorrespondence.ordinatePointName }}<span>(kW)</span>
        </div>
        <!-- <div class="right-name"
          >{{ state.pointCorrespondence.ordinatePointName }}<span></span>
        </div> -->
      </div>

      <DualAxisLineChart
        v-if="
          state.pointCorrespondence.pointDataList &&
          state.pointCorrespondence.pointDataList.length !== 0 &&
          !state.chartLoading
        "
        :data="state.pointCorrespondence.pointDataList"
        class="chart-fre"
      >
      </DualAxisLineChart>
      <a-spin
        v-if="state.chartLoading"
        :loading="state.chartLoading"
        tip="加载中"
        style="
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 83%;
        "
      >
      </a-spin>
      <div
        v-if="
          state.pointCorrespondence.pointDataList &&
          state.pointCorrespondence.pointDataList.length === 0 &&
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
    getPointCorrespondence,
    PointCorrespondence,
    DeviceAlarmReq,
  } from '@/api/small-maintenance/health';
  import DualAxisLineChart from '@/views/smart-maintenance/components/DualAxisLineChart.vue';
  import { useRoute } from 'vue-router';
  import ModuleBox from '../../../components/ModuleBox.vue';

  const route = useRoute();
  const { deviceId } = route.meta;

  const state = reactive({
    title: {
      Width: 'calc(50% -12px)',
      titleHeight: '41px',
      text: '频率-功率对应关系曲线图',
      textEn: 'Frequency-power correspondence',
      bgClass: 'contain',
      Height: '422px',
    },
    buttonList: [{ title: '当前一天' }],
    pointCorrespondence: {} as PointCorrespondence,
    chartLoading: false,
  });

  const fetchData = async (
    params: DeviceAlarmReq = {
      deviceId: Number(deviceId),
      pointTypes: ['FREQUENCY_FEEDBACK', 'INSTANT_POWER'],
      timeType: 1,
    }
  ) => {
    try {
      state.chartLoading = true;
      const { data } = await getPointCorrespondence(params);
      state.pointCorrespondence = data;
    } catch (err) {
      state.pointCorrespondence = {} as PointCorrespondence;
    } finally {
      state.chartLoading = false;
    }
  };
  fetchData();
</script>

<style lang="less" scoped>
  .chart-box-fre {
    height: 422px;

    .chart-fre {
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
        color: rgb(255 255 255 / 80%);
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
      height: 90%;
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
