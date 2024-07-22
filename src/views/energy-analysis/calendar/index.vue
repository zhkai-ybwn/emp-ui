<template>
  <div class="calendar-bg">
    <Breadcrumb :items="['用能分析', '能效日历']" />
    <div class="contain">
      <div class="right">
        <LengShuiJiFangNengXiaoRiLi></LengShuiJiFangNengXiaoRiLi>
      </div>
      <div class="left">
        <NengXiaoPingJia style="margin-bottom: 24px"></NengXiaoPingJia>
        <FenXiangNengHao></FenXiangNengHao>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import LengShuiJiFangNengXiaoRiLi from './components/LengShuiJiFangNengXiaoRiLi.vue';
  import NengXiaoPingJia from './components/NengXiaoPingJia.vue';
  import FenXiangNengHao from './components/FenXiangNengHao.vue';
</script>

<style lang="less" scoped>
  .calendar-bg {
    position: relative;
    width: 100%;
    height: calc(100vh - 60px);
    padding: 0 24px;
    .set-back('@/assets/imgs/load-forecast/home-bg.png');

    .contain {
      display: flex;
      width: 100%;
      margin-bottom: 24px;

      .right {
        flex: 1;
      }

      .left {
        width: 37.125rem;
        margin-left: 1.5rem;
      }
    }
  }
</style>
