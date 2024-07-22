<!--
 * @Author: zhangk 13182353591@163.com
 * @Date: 2024-02-21 09:42:03
 * @LastEditors: zhangk 13182353591@163.com
 * @LastEditTime: 2024-03-27 13:55:51
 * @FilePath: \emp-admin-ui\src\views\integrated-monitor\energy-monitor\components\AirConditionerEnergySavingStatus.vue
 * @Description: 空调系统节能情况
 * 
 * Copyright (c) 2024 by ${git_name_email}, All Rights Reserved. 
-->
<template>
  <div class="ktxtjn-container">
    <ModuleBox :config="state.title">
      <div
        v-if="
          !state.loading &&
          state.ecData.savingInfo &&
          state.ecData.savingInfo.length !== 0
        "
        class="chart-unit"
      >
        单位：kWh
      </div>
      <LineChart
        v-if="
          !state.loading &&
          state.ecData.savingInfo &&
          state.ecData.savingInfo.length !== 0
        "
        class="chart"
        :config="state.chartConfig"
        :data="state.ecData.savingInfo"
      ></LineChart>
      <div
        v-if="
          !state.loading &&
          state.ecData.savingInfo &&
          state.ecData.savingInfo.length !== 0
        "
        class="info-section"
      >
        <div
          v-for="(item, index) in state.icons"
          :key="index"
          class="info-item"
        >
          <div class="info-line"></div>
          <img class="info-icon" :src="item" />
          <div class="info-label">{{ state.labels[index] }}</div>
          <div class="info-value">{{
            state.values[index] || state.values[index] === 0
              ? state.values[index].toLocaleString()
              : '-'
          }}</div>
          <div class="info-unit">{{ state.units[index] }}</div>
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
          height: 295px;
        "
        tip="加载中"
      ></a-spin>
      <div
        v-if="
          state.ecData.savingInfo &&
          state.ecData.savingInfo.length === 0 &&
          !state.loading
        "
        class="empty"
      >
        <div class="img"></div>
        <div class="text">&nbsp;暂无数据</div>
      </div>
    </ModuleBox>
    <div class="time">今日内</div>
  </div>
</template>

<script lang="ts" setup>
  import {
    airConditionSysECSaving,
    AirConditionSysECSaving,
  } from '@/api/integrated-monitor/energy-monitor';
  import icon1 from '@/assets/imgs/integrated-monitor/electricity_saving_icon.png';
  import icon2 from '@/assets/imgs/integrated-monitor/reduced_standard_coal_icon.png';
  import icon3 from '@/assets/imgs/integrated-monitor/reduce_CO2_emissions_icon.png';
  import icon4 from '@/assets/imgs/integrated-monitor/reduce_SO2_emissions_icon.png';
  import ModuleBox from '../../common/ModuleBox.vue';
  import LineChart from '../../common/LineChart.vue';

  const state = reactive({
    loading: false,
    ecData: {} as AirConditionSysECSaving,
    title: {
      Width: '100%',
      titleHeight: '40px',
      text: '空调系统节能情况',
      textEn: '',
      Height: '380px',
    },
    chartConfig: {
      width: '64.8%',
      height: '295px',
    },
    icons: [icon1, icon2, icon3, icon4],
    labels: ['节省用电', '减少标煤', '减少CO₂排放', '减少SO₂排放'],
    values: [] as number[],
    units: ['(kWh)', '(吨)', '(吨)', '(吨)'],
  });
  const fetchData = async () => {
    try {
      state.loading = true;
      state.values = [];
      const { data } = await airConditionSysECSaving();
      state.ecData = data;
      state.values.push(data.electricitySaving);
      state.values.push(data.reducedStandardCoal);
      state.values.push(data.reduceCO2Emissions);
      state.values.push(data.reduceSO2Emissions);
    } catch (err) {
      state.values = [];
    } finally {
      state.loading = false;
    }
  };
  fetchData();
</script>

<style lang="less" scoped>
  .ktxtjn-container {
    position: relative;

    .chart-unit {
      margin: 24px 0 0 20px;
      color: #fff;
      font-weight: 400;
      font-size: 14px;
      font-family: HarmonyOS-Regular, sans-serif;
      font-style: normal;
      line-height: 20px;
    }

    .chart {
      padding: 9px 0 13px 18px;
    }

    .info-section {
      position: absolute;
      top: 65px;
      right: 40px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      width: 26.92%;
      height: 299px;

      .info-item {
        position: relative;
        display: flex;
        align-items: center;
        box-sizing: border-box;
        // justify-content: space-between;
        width: 100%;
        height: 48.5px;

        .info-line {
          position: absolute;
          bottom: 2px;
          left: 0;
          width: 100%;
          height: 1px;
          background: linear-gradient(
            270deg,
            rgb(182 209 254 / 4%),
            rgb(164 199 255 / 20%)
          );
        }

        .info-icon {
          width: 49.58px;
          height: 48.46px;
        }

        .info-label {
          width: 30%;
          margin-left: 16.5px;
          color: #f2f6fa;
          font-weight: 400;
          font-size: 14px;
          font-family: HarmonyOS-Regular, sans-serif;
          font-style: normal;
          line-height: 28px;
        }

        .info-value {
          width: 40%;
          color: #fff;
          font-weight: 500;
          font-size: 20px;
          font-family: Barlow-Normal-Medium-Italic, sans-serif;
          font-style: normal;
          line-height: normal;
          text-align: right;
        }

        .info-unit {
          margin: 4px 0 0 4px;
          color: rgb(255 255 255 / 80%);
          font-weight: 300;
          font-size: 10px;
          font-family: HarmonyOS-Regular, sans-serif;
          font-style: normal;
          line-height: normal;
        }
      }
    }

    .time {
      position: absolute;
      top: 10px;
      right: 16px;
      color: #97a3b7;
      font-size: 14px;
      font-family: SourceHanSansCN-Normal, sans-serif;
      line-height: 22px;
    }

    .empty {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 295px;
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
      line-height: 24px;
    }
  }
</style>
