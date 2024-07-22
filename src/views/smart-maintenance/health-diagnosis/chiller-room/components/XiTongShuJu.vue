<template>
  <ModuleBox :config="state.title" class="box">
    <div class="contain">
      <div class="table">
        <div class="top">
          <div class="energy">
            <div class="title">累计电能 (kWh)</div>
            <div class="value" :data-value="state.info.totalEnergy">
              {{ state.info.totalEnergy ?? '-' }}
            </div>
          </div>
          <div class="power">
            <div class="title">瞬时功率 (kW)</div>
            <div class="value" :data-value="state.info.instantPower">
              {{ state.info.instantPower ?? '-' }}</div
            >
          </div>
        </div>
        <div class="bottom">
          <table>
            <tr>
              <td class="blank"></td>
              <td class="title">制冷量 (kWh)</td>
              <td class="title">冷水输送系数</td>
              <td class="title">冷却水输送系数</td>
            </tr>
            <tr>
              <td class="title">瞬时</td>
              <td>{{ state.info.instantCooling ?? '-' }}</td>
              <td>{{ state.info.instantChilledTC ?? '-' }}</td>
              <td>{{ state.info.instantCoolingTC ?? '-' }}</td>
            </tr>
            <tr>
              <td class="title">累计</td>
              <td>{{ state.info.totalCooling ?? '-' }}</td>
              <td>{{ state.info.totalChilledTC ?? '-' }}</td>
              <td>{{ state.info.totalCoolingTC ?? '-' }}</td>
            </tr>
          </table>
        </div>
      </div>
      <div class="chart">
        <div class="check">
          <div class="name">进出水温度</div>
          <a-checkbox-group v-model="state.checked">
            <a-checkbox
              v-for="(item, index) in state.titleList"
              :key="index"
              :value="index"
            >
              <div :style="{ color: colorList[index] }">{{ item }}</div>
            </a-checkbox>
          </a-checkbox-group>
        </div>
        <LineChart
          v-if="!state.loading && state.dataList && state.dataList.length !== 0"
          :data="state.dataList"
          :title="state.titleList"
          :check="state.checked"
          :color-list="colorList"
          :icon-list="iconList"
          :point-list="state.pointIds"
          :unit="'℃'"
        ></LineChart>
        <a-spin
          v-if="state.loading"
          :loading="state.loading"
          tip="加载中"
          style="display: flex; align-items: center; justify-content: center"
        >
        </a-spin>
        <div
          v-if="!state.loading && state.dataList && state.dataList.length === 0"
          class="empty"
        >
          <div class="img"></div>
          <div class="text">&nbsp;暂无数据</div>
        </div>
      </div>
    </div>
  </ModuleBox>
</template>

<script setup lang="ts">
  import { reactive } from 'vue';
  import {
    getSystemData,
    getDynamicLineChartData,
  } from '@/api/small-maintenance/newHealth';
  import ModuleBox from '@/views/smart-maintenance/components/ModuleBox.vue';
  import LineChart from '@/views/smart-maintenance/components/LineChart.vue';
  import item1 from '@/assets/imgs/smart/health/item1.png';
  import item2 from '@/assets/imgs/smart/health/item2.png';
  import item3 from '@/assets/imgs/smart/health/item3.png';
  import item4 from '@/assets/imgs/smart/health/item4.png';

  const colorList = ['#2C9745', '#4DE748', '#4881FF', '#4ADEFF'];
  const iconList = [item1, item2, item4, item3];

  interface Info {
    instantChilledTC: string;
    instantCooling: string;
    instantCoolingTC: string;
    instantPower: string;
    totalChilledTC: string;
    totalCooling: string;
    totalCoolingTC: string;
    totalEnergy: string;
  }

  const state = reactive({
    title: {
      Width: '100%',
      titleHeight: '36px',
      text: '系统数据',
      textEn: '',
      Height: '55%',
      bgClass: 'shadow-contain',
    },
    loading: false,
    dataList: [],
    titleList: ['冷水供水', '冷水回水', '冷却水供水', '冷却水回水'],
    checked: [0, 1, 2, 3],
    pointIds: [
      '171341740794087463',
      '171341740738980478',
      '223735165508131926',
      '171341740792782227',
    ],
    info: {} as Info,
  });

  const fetchData1 = () => {
    getSystemData()
      .then((res) => {
        state.info = res.data;
      })
      .catch(() => {
        //
      });
  };
  fetchData1();
  const fetchData2 = () => {
    state.loading = true;
    getDynamicLineChartData({
      pointIds: [
        '171341740794087463',
        '171341740738980478',
        '223735165508131926',
        '171341740792782227',
      ],
    })
      .then((res) => {
        state.dataList = res.data;
      })
      .catch(() => {
        state.dataList = [];
      })
      .finally(() => {
        state.loading = false;
      });
  };
  fetchData2();
</script>

<style lang="less" scoped>
  .contain {
    height: calc(100% - 36px);
    padding: 0 16px;

    .table {
      height: 45%;

      .top {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 45%;
        padding: 5px 0;

        > div {
          display: flex;
          flex-direction: column;
          justify-content: center;
          width: 49%;
          height: 90%;
          padding: 0 16px;
          background: linear-gradient(
            270deg,
            rgb(157 180 220 / 6%) 0%,
            rgb(85 137 255 / 30%) 100%
          );
          border-radius: 4px;
        }

        .title {
          // margin-bottom: 5px;
          color: rgb(255 255 255 / 80%);
          font-weight: 400;
          font-size: 14px;
          font-family: HarmonyOS-Regular, sans-serif;
          line-height: 1.5;
        }

        .value {
          font-weight: 400;
          font-size: 20px;
          font-family: YouSheBiaoTiHei, sans-serif;
          font-style: normal;
          //   text-shadow: 0 0 2px rgb(0 121 255 / 80%), 0 0 5px #06f;
          background: linear-gradient(90deg, #fff 0%, #c1daff 100%);
          background-clip: text;
          /* stylelint-disable */
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          &::before {
            position: absolute;
            z-index: -1;
            text-shadow: 0 0 2px rgb(0 121 255 / 80%), 0 0 5px #06f;
            content: attr(data-value);
          }
        }
      }

      .bottom {
        height: 60%;
        table {
          height: 100%;
          width: 100%;
          border-collapse: separate;
          border-spacing: 2px 2px;
          font-family: HarmonyOS-Regular, sans-serif;
          font-weight: 400;
          font-size: 14px;
          color: rgba(255, 255, 255, 0.85);
          .blank {
            background: rgba(255, 255, 255, 0.1);
          }
          .title {
            padding-left: 0px;
            text-align: center;
            // background: linear-gradient(
            //   270deg,
            //   rgb(157 180 220 / 3%) 0%,
            //   rgb(85 137 255 / 15%) 100%
            // );
            background: linear-gradient(
              270deg,
              rgba(157, 180, 220, 0.12) 0%,
              rgba(85, 137, 255, 0.6) 100%
            );
          }
          td {
            padding-left: 16px;
            background: linear-gradient(
              270deg,
              rgb(157 180 220 / 6%) 0%,
              rgb(85 137 255 / 30%) 100%
            );
          }
        }
      }
    }

    .chart {
      width: 100%;
      height: 55%;
      padding: 10px 0;
      .check {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 30px;

        .name {
          color: rgb(255 255 255 / 80%);
          font-weight: 400;
          font-size: 14px;
          font-family: HarmonyOS-Regular, sans-serif;
          line-height: 20px;
        }
      }
    }
  }

  .box {
    margin-bottom: 16px;
  }

  .shadow-contain {
    backdrop-filter: blur(10px);
  }

  .empty {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: calc(100% - 40px);
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

  :deep(.arco-spin.arco-spin-loading.arco-spin-with-tip) {
    width: 100%;
    height: calc(100% - 40px);
    margin: 0 auto;
    background: rgb(53 81 145 / 10%);
    border-radius: 4px;
    backdrop-filter: blur(5px);
  }

  :deep(.arco-checkbox-group .arco-checkbox) {
    margin-right: 2px;
  }
</style>
