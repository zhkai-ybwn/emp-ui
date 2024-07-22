<!--
 * @Author: zhkai 2572429235@qq.com
 * @Date: 2023-10-07 09:54:04
 * @LastEditors: zhangk 13182353591@163.com
 * @LastEditTime: 2024-01-08 13:34:33
 * @FilePath: \emp-admin-ui\src\views\load-forecast\LoadForecast.vue
 * @Description: 智慧-负荷预测
 * 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
-->
<template>
  <div class="load-forecast-bg">
    <Breadcrumb style="margin-left: 1%" :items="['用能分析', '负荷预测']" />
    <!-- <Upper></Upper> -->
    <div class="content-box">
      <LengFuHeYuCe class="lfhyc"></LengFuHeYuCe>
      <LiShiYuCe class="lsyc"></LiShiYuCe>
    </div>
  </div>
</template>

<script setup>
  // import Upper from './upper/Upper.vue';
  import LengFuHeYuCe from './middle/LengFuHeYuCe.vue';
  import LiShiYuCe from './lower/LiShiYuCe.vue';
  // import ScaleBox from 'vue3-scale-box'
</script>

<script>
  export default {
    name: 'LoadForecast',
  };
</script>

<style lang="less" scoped>
  .load-forecast-bg {
    position: relative;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;

    .set-back('@/assets/imgs/load-forecast/home-bg.png');

    .content-box {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      width: 100%;
      height: 100%;
      padding: 0 1%;

      .lfhyc {
        height: 58%;
      }

      .lsyc {
        height: 35%;
      }
    }
  }
</style>
