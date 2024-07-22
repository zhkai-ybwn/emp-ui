<!--
 * @Author: zhangk 13182353591@163.com
 * @Date: 2023-12-07 15:02:05
 * @LastEditors: zhangk 13182353591@163.com
 * @LastEditTime: 2024-01-05 13:26:38
 * @FilePath: \emp-admin-ui\src\views\data-overview\energy-plant\pv-power\index.vue
 * @Description: 
 * 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
-->
<template>
  <ScaleBox
    :width="1920"
    :height="1080"
    bgc="transparent"
    :delay="100"
    :is-flat="true"
  >
    <div class="device-pv-bg">
      <div class="pv-power-container">
        <PvInformation></PvInformation>
        <SheBeiZhuangTai class="equipment-status"></SheBeiZhuangTai>
        <NengHaoTongJi class="consumption-statistics"></NengHaoTongJi>
        <SheBeiYongDianTongJi class="sbydltj"></SheBeiYongDianTongJi>
        <GuangFuFaDianNengHaoFenXi class="gffdnhfx"></GuangFuFaDianNengHaoFenXi>
        <ShiWaiHuanJingCanShu class="swhjcs"></ShiWaiHuanJingCanShu>
        <PvModel class="pvm"></PvModel> </div
    ></div>
  </ScaleBox>
</template>

<script setup>
  import ScaleBox from 'vue3-scale-box';
  import PvInformation from './PvInformation.vue';
  import SheBeiZhuangTai from './SheBeiZhuangTai.vue';
  import NengHaoTongJi from './NengHaoTongJi.vue';
  import SheBeiYongDianTongJi from './SheBeiYongDianTongJi.vue';
  import GuangFuFaDianNengHaoFenXi from './GuangFuFaDianNengHaoFenXi.vue';
  import ShiWaiHuanJingCanShu from './ShiWaiHuanJingCanShu.vue';
  import PvModel from './PvModel.vue';
</script>

<script>
  export default {
    name: 'PvPower',
  };
</script>

<style lang="less" scoped>
  .device-pv-bg {
    width: 1920px;
    height: 1080px;
    .set-back('@/assets/imgs/energy-plant/pv-device-bg.png');

    .pv-power-container {
      position: relative;
      width: 1920px;
      height: 1080px;

      .equipment-status {
        position: absolute;
        top: 80px;
        right: 24px;
      }

      .consumption-statistics {
        position: absolute;
        top: 273px;
        right: 24px;
      }

      .sbydltj {
        position: absolute;
        top: 764px;
        left: 24px;
      }

      .gffdnhfx {
        position: absolute;
        top: 764px;
        left: 590px;
      }

      .swhjcs {
        position: absolute;
        top: 764px;
        right: 24px;
      }

      .pvm {
        position: absolute;
        top: 224px;
        left: 24px;
      }
    }
  }
</style>
