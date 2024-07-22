<template>
  <div class="weather-info-container">
    <img class="icon" :src="getIconByWeather(state.weather)" />
    <div class="info-tem-box">
      <!-- <div class="info">{{ state.weather }}</div> -->
      <div class="tem">
        {{ state.temperature }}<sup class="unit">{{ state.unit }}</sup>
      </div>
    </div>
  </div>
</template>

<script setup>
  // 天气图标静态资源
  import qing from '@/assets/imgs/energy-plant/weather/qing.png';
  import yin from '@/assets/imgs/energy-plant/weather/yin.png';
  import duoyun from '@/assets/imgs/energy-plant/weather/duoyun.png';
  import xiayu from '@/assets/imgs/energy-plant/weather/xiayu.png';
  import xiaxue from '@/assets/imgs/energy-plant/weather/xiaxue.png';
  import dafeng from '@/assets/imgs/energy-plant/weather/dafeng.png';
  import dawu from '@/assets/imgs/energy-plant/weather/dawu.png';
  import shachenbao from '@/assets/imgs/energy-plant/weather/shachenbao.png';

  // 工具相关
  import axiosAPI from '@/axios/index';
  import useEchart from '@/hooks/useEchart';

  const { looping } = useEchart();

  // eslint-disable-next-line consistent-return
  const getIconByWeather = (weather) => {
    const weatherIconList = [
      qing,
      yin,
      duoyun,
      xiayu,
      xiaxue,
      dafeng,
      dawu,
      shachenbao,
    ];
    if (weather.includes('晴')) return weatherIconList[0];
    if (weather.includes('阴')) return weatherIconList[1];
    if (weather.includes('多云')) return weatherIconList[2];
    if (weather.includes('雨')) return weatherIconList[3];
    if (weather.includes('雪')) return weatherIconList[4];
    if (weather.includes('风')) return weatherIconList[5];
    if (weather.includes('雾')) return weatherIconList[6];
    if (weather.includes('沙')) return weatherIconList[7];
    return weatherIconList[6];
  };

  const state = reactive({
    weather: '晴',
    temperature: 0,
    unit: window.ENERGYMONITOR.text.weather.unit,
  });

  const getData = async () => {
    const res = await axiosAPI.get(window.ENERGY.urls.weather, {
      key: window.ENERGY.weather.key,
      cityId: window.ENERGY.weather.cityId,
    });
    if (res.info === 'OK' && res.lives) {
      state.weather = res.lives[0].weather;
      state.temperature = res.lives[0].temperature;
    }
  };

  looping(getData, window.ENERGY.looping.quanchangnenghao);
</script>

<style lang="less" scoped>
  .weather-info-container {
    display: flex;
    align-items: center;
    height: 100%;

    .icon {
      width: 30px;
      height: 30px;
    }

    .info-tem-box {
      color: #bcc4d0;
      font-weight: 400;
      font-size: 16px;
      font-family: 'HarmonyOS Sans SC', sans-serif;
      font-style: normal;
      line-height: 42px; /* 262.5% */

      sup {
        font-size: 10px;
        vertical-align: baseline;
      }
    }
  }
</style>
@/hooks/useEchart-ccc
