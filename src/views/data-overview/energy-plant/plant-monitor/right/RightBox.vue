<!--
 * @Author: zhangk 13182353591@163.com
 * @Date: 2023-10-31 10:32:14
 * @LastEditors: zhangk 13182353591@163.com
 * @LastEditTime: 2024-01-04 10:08:07
 * @FilePath: \emp-admin-ui\src\views\data-overview\energy-plant\plant-monitor\right\RightBox.vue
 * @Description: 全厂能源监控右边box组件
 * 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
-->
<template>
  <div class="right-box-container">
    <XingZhengZuZhiYongDian class="xzzz"></XingZhengZuZhiYongDian>
    <GuanJianSheBeiYongDian class="gjsbyd"></GuanJianSheBeiYongDian>
  </div>
</template>

<script setup>
  import XingZhengZuZhiYongDian from './XingZhengZuZhiYongDian.vue';
  import GuanJianSheBeiYongDian from './GuanJianSheBeiYongDian.vue';
</script>

<style lang="less" scoped>
  .right-box-container {
    position: relative;
    width: 460px;
    height: 950px;

    .xzzz {
      position: absolute;
      top: 0;
      left: 0;
    }

    .gjsbyd {
      position: absolute;
      top: 325px;
      left: 0;
    }
  }
</style>
