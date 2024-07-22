<!--
 * @Author: zhangk 13182353591@163.com
 * @Date: 2024-01-03 13:58:20
 * @LastEditors: zhangk 13182353591@163.com
 * @LastEditTime: 2024-01-04 10:10:27
 * @FilePath: \emp-admin-ui\src\views\data-overview\energy-plant\plant-monitor\index.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by ${git_name_email}, All Rights Reserved. 
-->
<template>
  <ScaleBox
    :width="1920"
    :height="1080"
    bgc="transparent"
    :delay="100"
    :is-flat="true"
  >
    <div class="plant-bg">
      <div class="energy-plant-container">
        <LeftBox></LeftBox>
        <RightBox class="rb"></RightBox></div
    ></div>
  </ScaleBox>
</template>

<script setup>
  import ScaleBox from 'vue3-scale-box';
  import LeftBox from './left/LeftBox.vue';
  import RightBox from './right/RightBox.vue';
</script>

<script>
  export default {
    name: 'PlantMonitor',
  };
</script>

<style lang="less" scoped>
  .plant-bg {
    width: 1920px;
    height: 1080px;
    .set-back('@/assets/imgs/energy-plant/energy-monitor-bg.png');

    .energy-plant-container {
      position: relative;
      width: 1920px;
      height: 1080px;

      .rb {
        position: absolute;
        top: 80px;
        right: 24px;
      }
    }
  }
</style>
