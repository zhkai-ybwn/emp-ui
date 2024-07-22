<template>
  <div>
    <Title :title="'室外气象监测'"></Title>
    <div class="contain">
      <div class="img"></div>
      <div v-for="(item, index) in state.dataList" :key="index" class="item">
        <div class="top">
          <div class="value">{{
            item.value ? parseFloat(item.value).toFixed(1) : '- -'
          }}</div>
          <div class="unit">{{ item.unit }}</div>
        </div>
        <div class="title">{{ item.title }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { getWeatherMonitor } from '@/api/data-overview/metro-home';
  import Title from '../common/Title.vue';

  const state = reactive({
    dataList: [
      {
        title: '室外温度',
        value: '',
        unit: '℃',
      },
      {
        title: '室外湿度',
        value: '',
        unit: '%',
      },
      {
        title: '室外湿球',
        value: '',
        unit: '℃',
      },
      {
        title: '室外焓值',
        value: '',
        unit: 'kJ/kg',
      },
    ],
  });

  const fetchData = async () => {
    try {
      const { data } = await getWeatherMonitor();
      state.dataList[0].value = data.outTemp;
      state.dataList[1].value = data.outHumidity;
      state.dataList[2].value = data.outWetBulb;
      state.dataList[3].value = data.outEnthalpy;
    } catch (err) {
      state.dataList[0].value = '';
      state.dataList[1].value = '';
      state.dataList[2].value = '';
      state.dataList[3].value = '';
    }
  };
  fetchData();
</script>

<style scoped lang="less">
  .contain {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 107px;

    .top {
      display: flex;
      align-items: flex-end;

      .unit {
        height: 12px;
        margin-left: 4px;
        color: #b4c0cc;
        font-weight: 400;
        font-size: 10px;
        font-family: Inter-Regular, sans-serif;
        font-style: normal;
        line-height: 12px;
        text-transform: none;
      }

      .value {
        height: 20px;
        font-weight: 600;
        font-size: 20px;
        font-family: Barlow-Bold-Italic, sans-serif;
        font-style: normal;
        line-height: 20px;
        background: linear-gradient(180deg, #fff 0%, #9cc4ff 100%);
        background-clip: text;
        /* stylelint-disable */
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        // text-shadow: 0px 0px 2px rgba(0, 0, 0, 0.32),
        //   0px 0px 5px rgba(0, 102, 255, 0.49);
      }
    }

    .title {
      margin-top: 9px;
      width: 56px;
      height: 16px;
      color: #f0f7fd;
      font-weight: 400;
      font-size: 14px;
      font-family: HarmonyOS-Regular, sans-serif;
      font-style: normal;
      line-height: 16px;
      text-align: center;
      text-transform: none;
      text-shadow: 0 1px 4px rgb(0 133 255 / 70%);
    }

    .img {
      width: 50px;
      height: 50px;
      margin-top: 13px;
      .set-back('@/assets/imgs/metro-home/weather-icon.png');
    }
  }
</style>
