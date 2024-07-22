<template>
  <ModuleBox :config="state.title" :button-list="state.buttonList" class="box">
    <div class="contain">
      <div class="chart">
        <div class="title">
          <div class="top">机房总电能</div>
          <div class="middle" :data-value="state.value">{{
            state.value ?? '-'
          }}</div>
          <div class="bottom">kWh</div>
        </div>
        <AnnularChart :data="state.info" class="annular-chart"></AnnularChart>
      </div>
      <div class="legend">
        <div
          v-for="(item, index) in state.dataList"
          :key="index"
          class="legend-item"
        >
          <div
            class="block"
            :style="{
              background: state.colorList[index],
              width: '8px',
              height: '8px',
            }"
          ></div>
          <div class="title">{{ item.title }}</div>
          <div class="percent">{{ item.percent ?? '-' }}</div>
          <div class="value">
            {{ item.value ? parseFloat(item.value) : '-'
            }}<span style="font-size: 12px">{{
              item.value ? item.value.split(' ')[1] : ''
            }}</span>
          </div>
        </div>
      </div>
    </div>
  </ModuleBox>
</template>

<script setup lang="ts">
  import { reactive } from 'vue';
  import { getEnergyRatio } from '@/api/small-maintenance/newHealth';
  import ModuleBox from '@/views/smart-maintenance/components/ModuleBox.vue';
  import AnnularChart from '@/views/smart-maintenance/components/AnnularChart.vue';

  const state = reactive({
    title: {
      Width: '100%',
      titleHeight: '36px',
      text: '电能占比',
      textEn: '',
      Height: '25%',
      bgClass: 'shadow-contain',
      size: 14,
    },
    buttonList: [{ title: '累计' }],
    loading: true,
    dataList: [
      {
        title: '冷水机组',
        percent: null,
        value: null as null | string,
      },
      {
        title: '冷水泵',
        percent: null,
        value: null as null | string,
      },
      {
        title: '冷却水泵',
        percent: null,
        value: null as null | string,
      },
      {
        title: '冷却塔',
        percent: null,
        value: null as null | string,
      },
    ],
    colorList: [
      'linear-gradient(to bottom, #7EC1FF, #1A84E9)',
      'linear-gradient(to bottom, #D3FFBE, #6ABE43)',
      'linear-gradient(to bottom, #FFF06A, #FFC327)',
      'linear-gradient(to bottom, #7EFFF0, #41B9B9)',
    ],
    info: [],
    value: null as null | number | string,
  });

  const fetchData = async () => {
    try {
      const { data } = await getEnergyRatio();
      state.dataList[0].value = data.waterChillingEc;
      state.dataList[0].percent = data.waterChillingEcRatio;
      state.dataList[1].value = data.chilledWaterPumpEc;
      state.dataList[1].percent = data.chilledWaterPumpEcRatio;
      state.dataList[2].value = data.coolingWaterPumpEc;
      state.dataList[2].percent = data.coolingWaterPumpEcRatio;
      state.dataList[3].value = data.coolingTowerEc;
      state.dataList[3].percent = data.chillingTowerEcRatio;
      state.info = data;
      state.value =
        (data.waterChillingEc ? parseFloat(data.waterChillingEc) : 0) +
        (data.waterChillingEc ? parseFloat(data.chilledWaterPumpEc) : 0) +
        (data.waterChillingEc ? parseFloat(data.coolingTowerEc) : 0);
      state.value = state.value.toFixed(1);
    } catch (err) {
      //
    }
  };
  fetchData();
</script>

<style lang="less" scoped>
  .box {
    margin-bottom: 16px;

    .contain {
      display: flex;
      height: calc(100% - 36px);
    }

    .chart {
      position: relative;
      width: 50%;

      .title {
        position: absolute;
        top: 52%;
        left: 50%;
        z-index: 999;
        width: 100%;
        font-family: HarmonyOS-Regular, sans-serif;
        text-align: center;
        transform: translate(-50%, -50%);

        .top {
          height: 19px;
          color: transparent;
          font-weight: 400;
          font-size: 14px;
          font-style: normal;
          line-height: 19px;
          vertical-align: baseline;
          background: linear-gradient(90deg, #fff 0%, #b0d0ff 100%);
          background-clip: text;
          /* stylelint-disable */
          -webkit-background-clip: text;

          &::before {
            position: absolute;
            z-index: -1;
            text-shadow: 0 0 4px rgb(43 102 255 / 80%);
            content: '机房总电能';
          }
        }

        .middle {
          height: 20px;
          color: transparent;
          font-weight: bold;
          font-size: 16px;
          font-family: harmonyOS-Regular, sans-serif;
          font-style: normal;
          line-height: 20px;
          vertical-align: baseline;
          background: linear-gradient(90deg, #fff 0%, #c1daff 100%);
          background-clip: text;
          /* stylelint-disable */
          -webkit-background-clip: text;

          &::before {
            position: absolute;
            z-index: -1;
            text-shadow: 0 0 2px rgb(0 121 255 / 80%), 0 0 5px #06f;
            content: attr(data-value);
          }
        }

        .bottom {
          height: 20px;
          color: transparent;
          font-weight: 400;
          font-size: 12px;
          font-family: PangMenZhengDaoBiaoTiTi, sans-serif;
          font-style: normal;
          line-height: 20px;
          text-transform: none;
          vertical-align: baseline;
          background: linear-gradient(90deg, #fff 0%, #c1daff 100%);
          background-clip: text;
          /* stylelint-disable */
          -webkit-background-clip: text;

          &::before {
            position: absolute;
            z-index: -1;
            text-shadow: 0 0 2px rgb(0 121 255 / 80%), 0 0 5px #06f;
            content: 'kWh';
          }
        }
      }

      .annular-chart {
        height: 100%;
      }
    }

    .legend {
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
      width: 50%;
      .legend-item {
        display: flex;
        align-items: center;
        font-family: HarmonyOS-Regular, san-serif;
        font-weight: 400;
        font-size: 14px;
        color: rgba(255, 255, 255, 0.85);
        line-height: 16px;

        .title {
          margin-left: 10px;
          width: 25%;
        }
        .percent {
          width: 25%;
        }
        .value {
          width: 50%;
        }
      }
    }
  }

  .shadow-contain {
    backdrop-filter: blur(10px);
  }
</style>
