<!--
 * @Author: zhangkai 2572429235@qq.com
 * @Date: 2023-09-18 14:24:36
 * @LastEditors: zhangk 13182353591@163.com
 * @LastEditTime: 2024-01-02 10:38:05
 * @FilePath: \emp-admin-ui\src\views\data-overview\home\common\WeatherInfo.vue
-->
<template>
  <div class="weather-info-container">
    <!-- 天气图标 -->
    <img class="icon" :src="getIconByWeather(state.weather)" />
    <!-- 分隔线 -->
    <div class="divider"></div>
    <!-- 温度 -->
    <div class="value-unit">
      <div class="value">{{ state.temperature }}</div>
      <div class="unit">{{ state.unit }}</div>
    </div>
    <!-- 文本信息（天气） -->
    <div class="text">{{ state.weather }}</div>
  </div>
</template>

<script setup>
  // 天气图标静态资源
  import qing from '@/assets/imgs/home/weather/qing.png';
  import yin from '@/assets/imgs/home/weather/yin.png';
  import duoyun from '@/assets/imgs/home/weather/duoyun.png';
  import xiaoyu from '@/assets/imgs/home/weather/xiaoyu.png';
  import xiaxue from '@/assets/imgs/home/weather/xiaxue.png';
  import dafeng from '@/assets/imgs/home/weather/dafeng.png';
  import dawu from '@/assets/imgs/home/weather/dawu.png';
  import shachenbao from '@/assets/imgs/home/weather/shachenbao.png';

  // 工具相关
  import axiosAPI from '@/axios/index';
  import useEchart from '@/hooks/useEchart';

  const { looping } = useEchart();

  const getIconByWeather = (weather) => {
    const weatherIconList = [
      qing,
      yin,
      duoyun,
      xiaoyu,
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
    unit: window.ENERGY.text.weather.unit,
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
    justify-content: space-evenly;
    width: 181px;
    height: 50px;

    .icon {
      width: 30px;
      height: 30px;
    }

    .divider {
      width: 2px;
      height: 26px;
      background: rgb(255 255 255 / 60%);
    }

    .value-unit {
      display: flex;

      .value {
        color: rgb(255 255 255 / 90%);
        font-weight: 500;
        font-size: 32px;
        font-family: HarmonyOS-Regular, sans-serif;
        font-style: normal;
        line-height: 42px; /* 131.25% */
      }

      .unit {
        margin-top: 6px;
        color: rgb(255 255 255 / 90%);
        font-weight: 500;
        font-size: 16px;
        font-family: HarmonyOS-Regular, sans-serif;
        font-style: normal;
      }
    }

    .text {
      color: rgb(255 255 255 / 90%);
      font-weight: 400;
      font-size: 20px;
      font-family: HarmonyOS-Regular, sans-serif;
      font-style: normal;
    }
  }
</style>
