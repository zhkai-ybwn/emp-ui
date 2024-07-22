<!--
 * @Author: zhangk 13182353591@163.com
 * @Date: 2023-10-25 11:20:06
 * @LastEditors: zhangk 13182353591@163.com
 * @LastEditTime: 2024-01-04 10:07:00
 * @FilePath: \emp-admin-ui\src\views\data-overview\energy-plant\plant-monitor\left\LeftBox.vue
 * @Description: 全厂能源监控左边box组件
 * 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
-->
<template>
  <div class="left-box-container">
    <!-- 全厂总用电量概况 -->
    <QuanChangZongYongDianLiang class="qczydgl"></QuanChangZongYongDianLiang>
    <!-- 用电量趋势分析 -->
    <YongDianLiangQuShi class="ydlqs"></YongDianLiangQuShi>
    <!-- 区域用电占比统计 -->
    <QuYuYongDianZhanBi class="qyydzb"></QuYuYongDianZhanBi>
    <!-- 全厂空调用电量统计 -->
    <GuangFuYongDianTongJi class="qcktydtj"></GuangFuYongDianTongJi>
    <!-- 全厂空调用电量趋势分析 -->
    <QuanChangKongTiaoYongDianQuShi class="qcktydqs">
    </QuanChangKongTiaoYongDianQuShi>
  </div>
</template>

<script setup>
  import QuanChangZongYongDianLiang from './QuanChangZongYongDianLiang.vue';
  import YongDianLiangQuShi from './YongDianLiangQuShi.vue';
  import QuYuYongDianZhanBi from './QuYuYongDianZhanBi.vue';
  import GuangFuYongDianTongJi from './GuangFuYongDianTongJi.vue';
  import QuanChangKongTiaoYongDianQuShi from './QuanChangKongTiaoYongDianQuShi.vue';
</script>

<style lang="less" scoped>
  .left-box-container {
    position: relative;
    width: 1388px;
    height: 950px;

    .qczydgl {
      position: absolute;
      top: 80px;
      left: 24px;
    }

    .ydlqs {
      position: absolute;
      top: 275px;
      left: 24px;
    }

    .qyydzb {
      position: absolute;
      top: 275px;
      left: 1051px;
    }

    .qcktydtj {
      position: absolute;
      top: 764px;
      left: 24px;
    }

    .qcktydqs {
      position: absolute;
      top: 764px;
      left: 730px;
    }
  }
</style>
