<template>
  <div class="bottom-box-container">
    <!-- 关键设备用电量排名top5 -->
    <GuanJianSheBeiYongDianLiang></GuanJianSheBeiYongDianLiang>
    <!-- 近7日关键设备开动率趋势分析 -->
    <KaiDongLvQuShi></KaiDongLvQuShi>
    <!-- 全场关键设备用电量趋势分析 -->
    <YongDianLiangQuShiFenXi></YongDianLiangQuShiFenXi>
  </div>
</template>

<script setup>
  import GuanJianSheBeiYongDianLiang from './GuanJianSheBeiYongDianLiang.vue';
  import KaiDongLvQuShi from './KaiDongLvQuShi.vue';
  import YongDianLiangQuShiFenXi from './YongDianLiangQuShiFenXi.vue';
</script>

<style lang="less" scoped>
  .bottom-box-container {
    position: relative;
    display: flex;
    width: 1920px;
    height: 324px;
    padding: 32px 24px 24px;
  }
</style>
