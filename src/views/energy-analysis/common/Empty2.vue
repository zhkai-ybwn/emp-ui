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
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    margin: 0 auto;
    background: rgb(83 109 167 / 10%);

    .img {
      width: 98px;
      height: 60px;
      .set-back('@/assets/imgs/energy-analysis/consumption/empty-image.png');
    }

    .text {
      color: #7787a2;
      font-weight: 400;
      font-size: 16px;
      font-family: HarmonyOS-Regular, sans-serif;
      font-style: normal;
      line-height: 30px;
      text-align: center;
    }
  }
</style>
