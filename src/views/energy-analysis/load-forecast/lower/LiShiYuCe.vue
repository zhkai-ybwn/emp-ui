<!--
 * @Author: zhkai 2572429235@qq.com
 * @Date: 2023-10-08 08:52:11
 * @LastEditors: zhangk 13182353591@163.com
 * @LastEditTime: 2024-04-02 16:21:24
 * @FilePath: \emp-admin-ui\src\views\energy-analysis\load-forecast\lower\LiShiYuCe.vue
 * @Description: 历史预测
 * 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
-->
<template>
  <div class="lsyc-container">
    <ModuleTitle :config="state.config"></ModuleTitle>
    <div class="content-box">
      <div class="left-box">
        <div class="left-title-lu-box">
          <div class="title left-title">{{ state.title1 }}</div>
          <LegendUnit
            class="left-lu"
            :unit-list="state.unitList"
            :legend-list="state.legendList"
          ></LegendUnit>
        </div>
        <LineChart
          v-if="!state.isShowYesSpin"
          :data="state.yesterdayForecast"
          class="yes-line-chart"
          :config="{ width: 38.33, height: 18.52 }"
        ></LineChart>
        <a-spin
          v-if="state.isShowYesSpin"
          tip="加载中"
          class="yes-spin"
        ></a-spin>
      </div>
      <div class="center-box">
        <div class="center-title-lu-box">
          <div class="title center-title">{{ state.title2 }}</div>
          <LegendUnit
            class="center-lu"
            :unit-list="state.unitList"
            :legend-list="state.legendList"
          ></LegendUnit>
        </div>
        <LineChart
          v-if="!state.isShowWeekSpin"
          :data="state.lastWeekForecast"
          class="week-line-chart"
          :config="{ width: 38.33, height: 18.52 }"
        ></LineChart>
        <a-spin
          v-if="state.isShowWeekSpin"
          tip="加载中"
          class="week-spin"
        ></a-spin>
      </div>
      <div class="right-box">
        <AccuracyInfo
          class="acc1"
          :data="state.yesterdayAverAcc"
        ></AccuracyInfo>
        <AccuracyInfo class="acc2" :data="state.lastWeekAverAcc"></AccuracyInfo>
      </div>
    </div>
    <BoxTriangle></BoxTriangle>
  </div>
</template>

<script setup>
  import useEchart from '@/hooks/useEchart';
  import moment from 'moment';
  import { histPredict } from '@/api/energy-analysis/load-forecast';
  import ModuleTitle from '../common/ModuleTitle.vue';
  import LineChart from '../common/LineChart.vue';
  import LegendUnit from '../common/LegendUnit.vue';
  import AccuracyInfo from './AccuracyInfo.vue';
  import BoxTriangle from '../common/BoxTriangle.vue';

  const { looping } = useEchart();

  const state = reactive({
    config: {
      boxWidth: 100,
      boxHeigth: 53.7,
      titleWidth: 100,
      titleHeight: 11.48,
      text: '历史预测',
      textEn: 'HISTORICAL FORECAST',
    },
    yesterdayForecast: {
      actualData: [],
      forecastData: [],
    },
    lastWeekForecast: {
      actualData: [],
      forecastData: [],
    },
    unitList: [
      {
        text: '单位：',
        unit: 'kW',
      },
    ],
    legendList: [
      { text: '实际负荷', color: '#ccdfff' },
      { text: '预测负荷', color: '#0079ff' },
    ],
    title1: '昨日冷负荷预测',
    title2: '上周冷负荷预测',
    yesterdayAverAcc: {
      text: '昨日平均偏差',
      value: 0,
    },
    lastWeekAverAcc: {
      text: '上周平均偏差',
      value: 0,
    },
    isShowYesSpin: true,
    isShowWeekSpin: true,
  });

  const getYesParams = () => {
    const yesterday = moment().subtract(1, 'days').format('YYYY-MM-DD');
    return { startTime: yesterday, endTime: yesterday };
  };

  const fetchYesData = async () => {
    state.isShowYesSpin = true;
    const yesParams = getYesParams();
    try {
      const { data } = await histPredict(yesParams);
      state.yesterdayForecast = {
        actualData: data.actValue,
        forecastData: data.histPreValue,
      };
      state.yesterdayAverAcc.value = data.avaccuracy;
      state.isShowYesSpin = false;
    } catch (err) {
      // you can report use errorHandler or other
    }
  };

  const getWeekParams = () => {
    const currentDate = moment();
    // 获取上一周的开始日期（上周一）
    const lastWeekStartDate = currentDate
      .clone()
      .subtract(1, 'weeks')
      .startOf('isoWeek');
    // 获取上一周的结束日期（上周日）
    const lastWeekEndDate = currentDate
      .clone()
      .subtract(1, 'weeks')
      .endOf('isoWeek');
    // 格式化日期范围
    const startDateFormatted = lastWeekStartDate.format('YYYY-MM-DD');
    const endDateFormatted = lastWeekEndDate.format('YYYY-MM-DD');
    return { startTime: startDateFormatted, endTime: endDateFormatted };
  };

  const fetchWeekData = async () => {
    state.isShowYesSpin = true;
    const weekParams = getWeekParams();
    try {
      const { data } = await histPredict(weekParams);
      state.lastWeekForecast = {
        actualData: data.actValue,
        forecastData: data.histPreValue,
      };
      state.lastWeekAverAcc.value = data.avaccuracy;
      state.isShowWeekSpin = false;
    } catch (err) {
      // you can report use errorHandler or other
    }
  };

  looping(fetchYesData, 900 * 1000);

  looping(fetchWeekData, 900 * 1000);
</script>

<style lang="less" scoped>
  .lsyc-container {
    position: relative;
    width: 100%;
    height: 32.22%;
    background: linear-gradient(
      180deg,
      rgb(12 28 43 / 60%) 0%,
      rgb(31 47 80 / 60%) 100%
    );
    border-bottom: 1px solid rgb(204 224 255 / 70%);
    box-shadow: 0 0 22px 0 rgb(153 193 255 / 30%) inset;

    .content-box {
      display: flex;
      justify-content: space-between;
      width: 100%;
      height: 85%;
      padding: 1.5% 2.9% 0;

      .left-box {
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        width: 42%;

        .left-title-lu-box {
          display: flex;
          justify-content: space-between;
          width: 100%;
          height: 9%;

          .left-title {
            width: 25%;
          }

          .left-lu {
            width: 42%;
          }
        }

        .yes-line-chart {
          height: 85%;
        }

        .yes-spin {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
      }

      .center-box {
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        width: 42%;

        .center-title-lu-box {
          display: flex;
          justify-content: space-between;
          width: 100%;
          height: 9%;

          .center-title {
            width: 25%;
          }

          .center-lu {
            width: 43%;
          }
        }

        .week-line-chart {
          height: 85%;
        }

        .week-spin {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
      }

      .right-box {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        width: 10%;

        .acc1 {
          margin-top: -20px;
        }

        .acc2 {
          margin-top: -20px;
        }
      }
    }

    .title {
      color: rgb(255 255 255 / 80%);
      font-weight: 400;
      font-size: 18px;
      font-family: HarmonyOS-Regular, sans-serif;
      font-style: normal;
      line-height: 20px;
    }
  }
</style>
