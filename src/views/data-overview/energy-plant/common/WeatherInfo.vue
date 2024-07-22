<!--
 * @Author: zhangk 13182353591@163.com
 * @Date: 2023-10-24 08:38:10
 * @LastEditors: zhangk 13182353591@163.com
 * @LastEditTime: 2024-01-03 10:55:36
 * @FilePath: \emp-admin-ui\src\views\data-overview\energy-plant\common\WeatherInfo.vue
 * @Description: 天气信息组件
 * 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
-->
<template>
  <div class="weather-info-container">
    <img class="icon" :src="getIconByWeather(state.weather)" />
    <div class="info-tem-box">
      <div class="info">{{ state.weather }}</div>
      <div class="tem">{{ `${state.temperature}${state.unit}` }}</div>
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
      width: 50px;
      height: 50px;
    }

    .info-tem-box {
      color: #fff;
      font-weight: 400;
      font-size: 14px;
      line-height: normal;

      .info {
        font-family: SourceHanSansCN-Normal, sans-serif;
        font-style: normal;

        .tem {
          font-family: Barlow-Normal-Medium-Italic, sans-serif;
          font-style: italic;
        }
      }
    }
  }
</style>
