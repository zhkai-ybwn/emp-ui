<!--
 * @Author: zhkai 2572429235@qq.com
 * @Date: 2023-10-07 09:18:54
 * @LastEditors: zhangk 13182353591@163.com
 * @LastEditTime: 2024-01-08 08:58:00
 * @FilePath: \emp-admin-ui\src\views\load-forecast\upper\Upper.vue
 * @Description: 负荷预测-上面区域入口组件
 * 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
-->
<template>
  <div class="upper-container">
    <div class="title-box">
      <div class="posi-ab title">{{ state.title }}</div>
      <div class="posi-ab sub-title" :text="state.subTitle">{{
        state.subTitle
      }}</div>
    </div>
    <DateTime class="posi-ab time"></DateTime>
  </div>
</template>

<script setup>
  import DateTime from '../common/DateTime.vue';

  const state = reactive({
    title: '智慧',
    subTitle: '负荷预测',
  });
</script>

<style lang="less" scoped>
  .upper-container {
    display: flex;
    flex-shrink: 0;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 7.41%;
    padding: 0 0 0 10.16%;
    border-radius: 0;

    .set-back('@/assets/imgs/load-forecast/upper-bg.png');

    .title-box {
      display: flex;
      align-items: center;
    }

    .title {
      top: 12px;
      left: 195px;
      font-weight: 400;
      font-size: 40px;
      font-family: YouSheBiaoTiHei, sans-serif;
      line-height: 57px;
      letter-spacing: 2px;
      background: linear-gradient(180deg, #fff 27.19%, #b0d0ff 75.44%);
      background-clip: text;
      /* stylelint-disable */
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .sub-title {
      top: 12px;
      left: 283px;
      font-weight: 400;
      font-size: 36px;
      font-family: YouSheBiaoTiHei, sans-serif;
      line-height: 51px;
      letter-spacing: 2px;
      background: linear-gradient(180deg, #33f3ff 27.19%, #418dff 75.44%);
      background-clip: text;
      /* stylelint-disable */
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .sub-title::before {
      position: absolute;
      z-index: -1;
      text-shadow: 0 0 4px rgb(43 102 255 / 80%);
      content: attr(text);
    }
  }
</style>
