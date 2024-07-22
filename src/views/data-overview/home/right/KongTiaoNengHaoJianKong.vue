<template>
  <div class="ktnhjk-container">
    <ModuleTitle
      :config="{
        width: 480,
        height: 40,
        title: state.moduleTitle,
        subTitle: '今日内',
      }"
    ></ModuleTitle>
    <div class="title-legend">
      <div class="line-title">{{ state.lineChartTitle }}</div>
      <div class="line-legend">
        <div class="sign sign1"></div>
        <div class="label">{{ state.legend1 }}</div>
        <div
          class="total-value total-value1"
          :text="state.todayEC.toFixed(2).toLocaleString()"
        >
          {{ state.todayEC.toFixed(2).toLocaleString() }}
        </div>
        <div class="sign sign2"></div>
        <div class="label"> {{ state.legend2 }}</div>
        <div
          class="total-value total-value2"
          :text="state.yesterdayEC.toFixed(2).toLocaleString()"
        >
          {{ state.yesterdayEC.toFixed(2).toLocaleString() }}
        </div>
      </div>
      <div class="line-unit">kWh</div>
    </div>
    <TwoLineChart
      class="line-chart"
      :data="state.linesData"
      :config="{ width: 449, height: 220 }"
    ></TwoLineChart>
  </div>
</template>

<script setup>
  import useEchart from '@/hooks/useEchart';
  import { airconditionEC } from '@/api/data-overview/home';
  import ModuleTitle from '../common/ModuleTitle.vue';
  import TwoLineChart from '../common/TwoLineChart.vue';

  const { looping } = useEchart();
  const state = reactive({
    linesData: {
      todayECInfo: [],
      yesterdayECInfo: [],
    },
    moduleTitle: '空调能耗监控',
    lineChartTitle: '',
    legend1: '今日能耗',
    legend2: '昨日能耗',
    todayEC: 0,
    yesterdayEC: 0,
  });

  const fetchData = async () => {
    try {
      const { data } = await airconditionEC(state.currentDate);
      state.linesData = {
        todayECInfo: data.todayECInfo,
        yesterdayECInfo: data.yestodayECInfo,
      };
      state.todayEC = data.todayEC;
      state.yesterdayEC = data.yesterdayEC;
    } catch (err) {
      // you can report use errorHandler or other
    }
  };
  looping(fetchData, 900 * 1000);
</script>

<style lang="less" scoped>
  .ktnhjk-container {
    position: relative;
    width: 480px;
    height: 312px;
    background: rgb(6 12 28 / 50%);
    backdrop-filter: blur(7.5px);

    .title-legend {
      position: absolute;
      top: 65px;
      left: 26px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 421px;
      height: 24px;

      .line-title {
        width: 235px;
        color: rgb(255 255 255 / 90%);
        font-weight: 400;
        font-size: 16px;
        font-family: HarmonyOS-Regular, sans-serif;
        font-style: normal;
        text-align: left;
      }

      .line-legend {
        display: flex;
        align-items: center;
        justify-content: space-around;
        width: fit-content;

        .sign {
          width: 10px;
          height: 10px;
        }

        .sign1 {
          background: linear-gradient(
            180deg,
            #1890ff 0%,
            rgb(24 144 255 / 20%) 100%
          );
        }

        .sign2 {
          margin-left: 24px;
          background: rgb(255 255 255 / 80%);
        }

        .label {
          width: 60px;
          margin-left: 8px;
          color: rgb(255 255 255 / 80%);
          font-weight: 400;
          font-size: 14px;
          font-family: HarmonyOS-Regular, sans-serif;
          font-style: normal;
        }

        .total-value {
          width: fit-content;
          margin-left: 8px;
          font-weight: 700;
          font-size: 16px;
          font-family: AlimamaShuHeiTi-Bold, sans-serif;
          font-style: normal;
          background: linear-gradient(180deg, #fff 0%, #c1daff 100%);
          background-clip: text;
          /* stylelint-disable */
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .total-value::before {
          position: absolute;
          z-index: -1;
          text-shadow: 0 0 2px rgb(0 121 255 / 80%), 0 0 5px #06f;
          content: attr(text);
        }

        // .total-value1 {}

        // .total-value1 {}
      }

      .line-unit {
        position: absolute;
        top: 10px;
        left: 0;
        color: rgb(255 255 255 / 80%);
        font-weight: 400;
        font-size: 10px;
        font-family: HarmonyOS-Regular, sans-serif;
        font-style: normal;
        line-height: 20px;
        text-align: right;
      }
    }

    .line-chart {
      position: absolute;
      top: 79px;
    }
  }
</style>
