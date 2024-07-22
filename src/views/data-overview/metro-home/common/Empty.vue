<template>
  <div class="empty">
    <div class="img"></div>
    <div class="text">&nbsp;暂无数据</div>
  </div>
</template>

<script lang="ts" setup></script>

<style lang="less" scoped>
  .empty {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    margin: 0 auto;

    .img {
      width: 24px;
      height: 24px;
      .set-back('@/assets/imgs/load-forecast/no-data.png');
    }

    .text {
      color: #7787a2;
      font-weight: 400;
      font-size: 16px;
      font-family: HarmonyOS-Regular, sans-serif;
      font-style: normal;
      line-height: 24px;
      text-align: center;
    }
  }
</style>
