<!--
 * @Author: zhkai 2572429235@qq.com
 * @Date: 2023-10-07 09:45:22
 * @LastEditors: zhangk 13182353591@163.com
 * @LastEditTime: 2024-01-08 08:52:06
 * @FilePath: \emp-admin-ui\src\views\load-forecast\common\ModuleTitle.vue
 * @Description: 模块标题
 * 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
-->
<template>
  <div
    class="md-title-container"
    :style="{
      width: `${config.titleWidth}%`,
      height: `${config.titleHeight}%`,
    }"
  >
    <div class="border-sign"></div>
    <div class="text" :text="config.text">{{ config.text }}</div>
    <div class="text-en">{{ config.textEn }}</div>
    <div class="right-sign"></div>
  </div>
</template>

<script setup>
  defineProps({
    config: {
      type: Object,
      default: () => ({
        titleWidth: 0,
        titleHeight: 0,
        text: '',
        textEn: '',
      }),
    },
  });
</script>

<style lang="less" scoped>
  .md-title-container {
    position: relative;
    display: flex;
    align-items: center;

    .set-back('@/assets/imgs/load-forecast/module-title-bg.png');

    .border-sign {
      width: 4px;
      height: 100%;
      background: #96aadb;
    }

    .arrow-sign {
      width: 24px;
      height: 24px;
      margin-left: 8px;

      .set-back(
        '@/assets/imgs/load-forecast/module-title-sign-left.png'
      );
    }

    .text {
      margin-left: 35px;
      font-weight: 400;
      font-size: 20px;
      font-family: YouSheBiaoTiHei, sans-serif;
      line-height: 23px;
      background: linear-gradient(180deg, #fff 27.19%, #b0d0ff 75.44%);
      background-clip: text;
      /* stylelint-disable */
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .text::before {
      position: absolute;
      z-index: -1;
      text-shadow: 0 0 4px rgb(43 102 255 / 80%);
      content: attr(text);
    }

    .text-en {
      margin-top: 4px;
      margin-left: 12px;
      color: #7e8298;
      font-weight: 400;
      font-size: 12px;
      font-family: HarmonyOS-Regular, sans-serif;
      font-style: normal;
      line-height: normal;
      text-transform: uppercase;
    }

    .right-sign {
      position: absolute;
      right: 0;
      bottom: 0;
      width: 169px;
      height: 8px;

      .set-back(
        '@/assets/imgs/load-forecast/module-title-sign-right.png'
      );
    }
  }
</style>
