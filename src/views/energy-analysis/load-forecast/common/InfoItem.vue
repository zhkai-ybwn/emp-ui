<!--
 * @Author: zhkai 2572429235@qq.com
 * @Date: 2023-10-11 09:34:11
 * @LastEditors: zhangk 13182353591@163.com
 * @LastEditTime: 2024-01-08 08:45:00
 * @FilePath: \emp-admin-ui\src\views\load-forecast\common\InfoItem.vue
 * @Description: 冷负荷预测-单个信息列表
 * 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
-->
<template>
  <div class="info-item">
    <div class="content">
      <div class="text com" :text="data.text">{{ data.text }}</div>
      <div class="value-unit">
        <div class="value com" :text="data.value">{{ data.value }}</div>
        <div class="unit com" :text="data.unit">{{ data.unit }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
  defineProps({
    data: {
      type: Object,
      default: () => ({
        text: '',
        value: 0,
        unit: '',
      }),
    },
  });
</script>

<style lang="less" scoped>
  .info-item {
    position: relative;
    display: flex;
    align-items: center;
    width: 364px;
    height: 68px;

    .set-back('@/assets/imgs/load-forecast/current-load-bg.png');

    .content {
      position: absolute;
      left: 117px;
      display: flex;

      .com {
        font-weight: 400;
        font-family: PangMenZhengDaoBiaoTiTi, sans-serif;
        font-style: normal;
        line-height: 20px;
        background: linear-gradient(180deg, #fff 0%, #c1daff 100%);
        background-clip: text;
        /* stylelint-disable */
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }

      .text {
        width: fit-content;
        font-size: 20px;
        font-family: PangMenZhengDaoBiaoTiTi, sans-serif;
        letter-spacing: 0.8px;
        letter-spacing: 00;
      }

      .text::before {
        position: absolute;
        z-index: -1;
        text-shadow: 0 0 2px rgb(0 121 255 / 80%), 0 0 5px #06f;
        content: attr(text);
      }

      .value-unit {
        position: absolute;
        left: 120px;
        display: flex;

        .value {
          font-size: 24px;
          font-family: PangMenZhengDaoBiaoTiTi, sans-serif;
        }

        .value::before {
          position: absolute;
          z-index: -1;
          text-shadow: 0 0 2px rgb(0 121 255 / 80%), 0 0 5px #06f;
          content: attr(text);
        }

        .unit {
          margin-top: 3px;
          margin-left: 8px;
          font-size: 14px;
          font-family: PangMenZhengDaoBiaoTiTi, sans-serif;
        }

        .unit::before {
          position: absolute;
          z-index: -1;
          text-shadow: 0 0 2px rgb(0 121 255 / 80%), 0 0 5px #06f;
          content: attr(text);
        }
      }
    }
  }
</style>
