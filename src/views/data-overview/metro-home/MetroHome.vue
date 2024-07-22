<!--
 * @Author: zhangkai 2572429235@qq.com
 * @Date: 2023-09-18 09:15:01
 * @LastEditors: zhangk 13182353591@163.com
 * @LastEditTime: 2024-01-02 14:27:11
 * @FilePath: \emp-admin-ui\src\views\data-overview\home\Home.vue
-->
<template>
  <ScaleBox
    :width="1920"
    :height="1080"
    bgc="transparent"
    :delay="100"
    :is-flat="true"
  >
    <div class="home-bg">
      <div class="left">
        <YongDianZongLan></YongDianZongLan>
        <QiRiDuiBi></QiRiDuiBi>
        <QiRiQuShi></QiRiQuShi>
      </div>
      <div class="bottom1">
        <ZhanTing :data="state.stationAirQuality"></ZhanTing>
      </div>
      <div class="bottom2">
        <ZhanTai :data="state.platformAirQuality"></ZhanTai>
      </div>
      <div class="right">
        <QiXiangJianCe></QiXiangJianCe>
        <NengXiaoZhi></NengXiaoZhi>
        <ZhiLengLiang></ZhiLengLiang>
        <JieNengJianPai></JieNengJianPai>
        <JianKangDu></JianKangDu>
      </div>
    </div>
  </ScaleBox>
</template>

<script setup lang="ts">
  import ScaleBox from 'vue3-scale-box';
  import { getAirQuality } from '@/api/data-overview/metro-home';
  import YongDianZongLan from './componerts/YongDianZongLan.vue';
  import QiRiDuiBi from './componerts/QiRiDuiBi.vue';
  import QiRiQuShi from './componerts/QiRiQuShi.vue';
  import ZhanTing from './componerts/ZhanTing.vue';
  import ZhanTai from './componerts/ZhanTai.vue';
  import QiXiangJianCe from './componerts/QiXiangJianCe.vue';
  import NengXiaoZhi from './componerts/NengXiaoZhi.vue';
  import ZhiLengLiang from './componerts/ZhiLengLiang.vue';
  import JieNengJianPai from './componerts/JieNengJianPai.vue';
  import JianKangDu from './componerts/JianKangDu.vue';

  const state = reactive({
    platformAirQuality: {},
    stationAirQuality: {},
  });

  const fetchData = async () => {
    try {
      const { data } = await getAirQuality();
      state.platformAirQuality = data.platformAirQuality;
      state.stationAirQuality = data.stationAirQuality;
    } catch (err) {
      // you can report use errorHandler or other
    }
  };

  fetchData();
</script>

<script lang="ts">
  export default {
    name: 'MetroHome',
  };
</script>

<style lang="less" scoped>
  @keyframes leftslide {
    0% {
      transform: translateX(-100%);
      opacity: 0;
    }

    80% {
      transform: translateX(20px);
      opacity: 1;
    }

    100% {
      transform: translateX(0);
    }
  }

  @keyframes rightslide {
    0% {
      transform: translateX(100%);
      opacity: 0;
    }

    80% {
      transform: translateX(-20px);
      opacity: 1;
    }

    100% {
      transform: translateX(0);
    }
  }

  @keyframes bottomslide {
    0% {
      transform: translateY(100%);
      opacity: 0;
    }

    100% {
      transform: translateX(0);
      opacity: 1;
    }
  }

  .home-bg {
    position: relative;
    width: 1920px;
    height: 1080px;
    .set-back('@/assets/imgs/metro-home/bg.png');

    .left {
      position: absolute;
      top: 88px;
      left: 20px;
      width: 420px;
      height: 958px;
      padding: 20px 16px 0;
      background: rgb(6 41 61 / 76%);
      border: 1px solid rgb(35 133 223 / 10%);
      border-radius: 4px;
      animation: leftslide 2s;
    }

    .bottom1 {
      position: absolute;
      top: 916px;
      left: 522px;
      width: 428px;
      height: 130px;
      padding: 12px 20px;
      background: rgb(6 41 61 / 76%);
      border: 1px solid rgb(35 133 223 / 10%);
      border-radius: 4px;
      animation: bottomslide 2s;
    }

    .bottom2 {
      position: absolute;
      top: 916px;
      left: 970px;
      width: 428px;
      height: 130px;
      padding: 12px 20px;
      background: rgb(6 41 61 / 76%);
      border: 1px solid rgb(35 133 223 / 10%);
      border-radius: 4px;
      animation: bottomslide 2s;
    }

    .right {
      position: absolute;
      top: 88px;
      right: 20px;
      width: 420px;
      height: 958px;
      padding: 20px 16px 0;
      background: rgb(6 41 61 / 76%);
      border: 1px solid rgb(35 133 223 / 10%);
      border-radius: 4px;
      animation: rightslide 2s;
    }
  }
</style>
