<template>
  <div>
    <div class="top">
      <div class="icon"></div>
      <div class="title">{{ title }}</div>
      <div class="right">
        <slot></slot>
      </div>
    </div>
    <div class="line">
      <div class="dot"></div>
      <div class="middle"></div>
      <div class="dot"></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  defineProps({
    title: {
      type: String,
      default: () => '',
    },
  });
</script>

<style lang="less" scoped>
  .top {
    display: flex;
    align-items: center;

    .icon {
      width: 166px;
      height: 30px;
      .set-back('@/assets/imgs/metro-home/title-bg.png');
    }

    .title {
      font-weight: 400;
      font-size: 18px;
      font-family: YouSheBiaoTiHei, sans-serif;
      background: linear-gradient(90deg, #fff 0%, #bee8ff 100%);
      background-clip: text;
      /* stylelint-disable */
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      margin-left: -142px;
      margin-top: 2px;
    }

    .right {
      margin-top: 2px;
      margin-left: auto;
    }
  }
  .line {
    display: flex;
    margin-top: 5px;
    .dot {
      width: 5px;
      height: 1px;
      background: rgba(108, 185, 255, 0.87);
    }
    .middle {
      width: 378px;
      height: 1px;
      background: rgba(35, 133, 223, 0.46);
    }
  }
</style>
