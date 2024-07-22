<!--
 * @Author: zhangkai 2572429235@qq.com
 * @Date: 2023-09-19 16:31:09
 * @LastEditors: zhangk 13182353591@163.com
 * @LastEditTime: 2024-04-01 10:30:36
 * @FilePath: \emp-admin-ui\src\views\data-overview\home\left\QuanChangNengHaoJianKong.vue
 * @Description: 全厂能耗监控
-->
<template>
  <div class="qcnhjk-container">
    <ModuleTitle
      :config="{
        width: 480,
        height: 40,
        title: state.moduleTitle,
        subTitle: '今日内',
      }"
    ></ModuleTitle>
    <!-- 全场能耗趋势 -->
    <div class="qcnhqs-box">
      <div class="title-legend">
        <div class="line-title">{{ state.lineChartTitle }}</div>
        <div class="line-legend">
          <div class="sign sign1"></div>
          <div class="label">{{ state.lineLegend1 }}</div>
          <div class="sign sign2"></div>
          <div class="label">{{ state.lineLegend2 }}</div>
        </div>
        <div class="line-unit">kWh</div>
      </div>
      <TwoLineChart class="line-chart" :data="state.linesData"></TwoLineChart>
    </div>
    <!-- 分区域能耗 -->
    <div class="fqynh-box">
      <div class="title-legend">
        <div class="bar-title">{{ state.barChartTitle }}</div>
        <div class="bar-legend">
          <div class="sign sign3"></div>
          <div class="label">{{ state.barLegend1 }}</div>
          <div class="sign sign4"></div>
          <div class="label">{{ state.barLegend2 }}</div>
          <div class="sign sign5"></div>
          <div class="label">{{ state.barLegend3 }}</div>
        </div>
        <div class="bar-unit">kWh</div>
      </div>
      <DBarChart class="bar-chart" :data="state.barData"></DBarChart>
      <div class="cir-chart-box">
        <CircularChart
          v-for="(item, index) in state.cirDataList"
          :key="index"
          :data="item"
          :config="state.configList[index]"
        ></CircularChart>
      </div>
    </div>
  </div>
</template>

<script setup>
  import useEchart from '@/hooks/useEchart';
  import { getHoleFactEcInfo } from '@/api/data-overview/home';
  import ModuleTitle from '../common/ModuleTitle.vue';
  import TwoLineChart from '../common/TwoLineChart.vue';
  import DBarChart from '../common/3dBarChart.vue';
  import CircularChart from '../common/CircularChart.vue';

  const { looping } = useEchart();
  const state = reactive({
    linesData: {
      todayECInfo: [],
      yesterdayECInfo: [],
    },
    moduleTitle: '全厂能耗监控',
    lineChartTitle: '全厂能耗趋势',
    lineLegend1: '今日用能',
    lineLegend2: '昨日用能',
    barData: {
      xData: [],
      yData: [],
    },
    barChartTitle: '分区域能耗',
    barLegend1: '综合楼',
    barLegend2: '成品储运部',
    barLegend3: '其他',
    cirDataList: [],
    configList: [
      {
        width: 108,
        height: 108,
        color: ['rgba(24, 144, 255, 1)', 'rgba(24, 144, 255, 1)'],
      },
      {
        width: 108,
        height: 108,
        color: ['rgba(255, 133, 46, 1)', 'rgba(255, 133, 46, 1)'],
      },
      {
        width: 108,
        height: 108,
        color: ['rgba(24, 144, 255, 1)', 'rgba(24, 144, 255, 1)'],
      },
    ],
  });

  const getBarData = (yData) => {
    const xData = [
      '制造厂区',
      '测试中心',
      '思茂特生产',
      '综合楼',
      '成品储运部',
    ];
    const roundedYData = yData.map((value) => parseFloat(value).toFixed(2));
    const sortedIndex = roundedYData
      .map((value, index) => index)
      .sort((a, b) => roundedYData[b] - roundedYData[a]);
    const sortedXData = sortedIndex.map((index) => xData[index]);
    const sortedYData = sortedIndex.map((index) => roundedYData[index]);
    return { xData: sortedXData, yData: sortedYData };
  };

  const setCirData = (datas) => {
    state.cirDataList = [
      {
        value: Math.abs(datas.manufacturePlantECQOQ).toFixed(1),
        increaseOrDecrease: datas.manufacturePlantECQOQ > 0,
        text: '制造厂区',
      },
      {
        value: Math.abs(datas.comprehensiveBuildECQOQ).toFixed(1),
        increaseOrDecrease: datas.comprehensiveBuildECQOQ > 0,
        text: '综合楼',
      },
      {
        value: Math.abs(datas.testCenterECQOQ).toFixed(1),
        increaseOrDecrease: datas.testCenterECQOQ > 0,
        text: '测试中心',
      },
    ];
  };

  const fetchData = async () => {
    try {
      const { data } = await getHoleFactEcInfo();
      state.linesData = {
        todayECInfo: data.todayECInfo,
        yesterdayECInfo: data.yesterdayECInfo,
      };
      state.barData = getBarData([
        data.manufacturePlantEC,
        data.testCenterEC,
        data.smtProductionEC,
        data.comprehensiveBuildEC,
        data.productTransportationEC,
      ]);
      setCirData(data);
    } catch (err) {
      // you can report use errorHandler or other
    }
  };
  looping(fetchData, 900 * 1000);
</script>

<style lang="less" scoped>
  .qcnhjk-container {
    position: relative;
    width: 480px;
    height: 770px;
    background: rgb(6 12 28 / 50%);
    backdrop-filter: blur(7.5px);

    .qcnhqs-box {
      position: absolute;
      top: 73px;
      left: 26px;

      .title-legend {
        position: absolute;
        left: 5px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 413px;
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
          width: 168px;

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
            background: rgb(255 255 255 / 80%);
          }

          .label {
            color: rgb(255 255 255 / 80%);
            font-weight: 400;
            font-size: 14px;
            font-family: HarmonyOS-Regular, sans-serif;
            font-style: normal;
          }
        }
      }

      .line-chart {
        position: absolute;
        top: 35px;
        left: -26px;
      }

      .line-unit {
        position: absolute;
        top: 30px;
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

    .fqynh-box {
      position: absolute;
      top: 356px;
      left: 26px;

      .title-legend {
        position: absolute;
        left: 5px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 413px;
        height: 24px;

        .bar-title {
          width: 235px;
          color: rgb(255 255 255 / 90%);
          font-weight: 400;
          font-size: 16px;
          font-family: HarmonyOS-Regular, sans-serif;
          font-style: normal;
          text-align: left;
        }

        .bar-legend {
          display: flex;
          align-items: center;
          justify-content: space-around;
          width: 300px;

          .sign {
            width: 10px;
            height: 10px;
          }

          .sign3 {
            background: linear-gradient(
              180deg,
              #ff852e 0%,
              rgb(255 133 46 / 20%) 100%
            );
          }

          .sign4 {
            background: linear-gradient(
              180deg,
              #01ffc2 0%,
              rgb(1 255 194 / 20%) 100%
            );
          }

          .sign5 {
            background: var(
              --dark-linear-1,
              linear-gradient(180deg, #1890ff 0%, rgb(24 144 255 / 20%) 100%)
            );
          }

          .label {
            color: rgb(255 255 255 / 80%);
            font-weight: 400;
            font-size: 14px;
            font-family: HarmonyOS-Regular, sans-serif;
            font-style: normal;
          }
        }
      }

      .bar-unit {
        position: absolute;
        top: 40px;
        left: 0;
        color: rgb(255 255 255 / 80%);
        font-weight: 400;
        font-size: 10px;
        font-family: HarmonyOS-Regular, sans-serif;
        font-style: normal;
        line-height: 20px;
        text-align: right;
      }

      .bar-chart {
        position: absolute;
        top: 51px;
        left: -26px;
      }

      .cir-chart-box {
        position: absolute;
        top: 271px;
        left: 22px;
        display: flex;
        justify-content: space-between;
        width: 364px;
      }
    }
  }
</style>
