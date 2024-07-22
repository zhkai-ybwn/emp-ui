<!--
 * @Author: zhangk 13182353591@163.com
 * @Date: 2023-11-13 08:59:54
 * @LastEditors: zhangk 13182353591@163.com
 * @LastEditTime: 2024-03-29 09:20:18
 * @FilePath: \emp-admin-ui\src\views\data-overview\energy-plant\plant-monitor\left\QuYuYongDianItem.vue
 * @Description: 区域用电统计List单个Item
 * 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
-->
<template>
  <div
    :class="['qyyd-list-item', showBg ? 'qyyd-list-item-selected' : '']"
    :style="{ '--heightx': height }"
  >
    <div class="legend" :style="{ background: `${color}` }"></div>
    <div class="name">{{ dataItem.name }}</div>
    <div class="percent-value"
      >{{ Number(dataItem.per).toFixed(1) }}<span>%</span></div
    >
    <div class="driver"></div>
    <div class="value">{{ dataItem.value }}</div>
    <div class="unit">{{ dataItem.unit }}</div>
  </div>
</template>

<script setup>
  defineProps({
    dataItem: {
      type: Object,
      default: () => ({
        name: '',
        unit: '',
        per: '',
        value: '',
      }),
    },
    color: {
      type: String,
      default: '',
    },
    showBg: {
      type: Boolean,
      default: false,
    },
    height: {
      type: String,
      default: '40px',
    },
  });
</script>

<style lang="less" scoped>
  .qyyd-list-item {
    display: flex;
    align-items: center;
    width: 300px;
    height: var(--heightx);

    .legend {
      width: 10px;
      height: 10px;
      margin-left: 30px;
      background: #2871ca;
      border: 2px solid rgb(255 255 255 / 20%);
    }

    .name {
      min-width: 100px;
      margin-left: 8px;
      color: #fff;
      font-weight: 350;
      font-size: 14px;
      font-family: SourceHanSansCN-Normal, sans-serif;
      font-style: normal;
    }

    .percent-value {
      min-width: 35px;
      color: #fff;
      font-weight: 700;
      font-size: 18px;
      font-family: Barlow-Italic, sans-serif;
      font-style: italic;

      span {
        margin: 6px 0 0 4px;
        color: rgb(255 255 255 / 64%);
        font-weight: 400;
        font-size: 14px;
        font-family: SourceHanSansCN-Normal, sans-serif;
        font-style: normal;
      }
    }

    .driver {
      width: 1px;
      height: 10px;
      margin-top: 4px;
      margin-left: 8px;
      background: rgb(255 255 255 / 20%);
    }

    .value {
      margin-left: 8px;
      color: #fff;
      font-weight: 700;
      font-size: 18px;
      font-family: Barlow-Italic, sans-serif;
      font-style: italic;
    }

    .unit {
      margin-top: 5px;
      margin-left: 4px;
      color: rgb(255 255 255 / 64%);
      font-weight: 400;
      font-size: 14px;
      font-family: SourceHanSansCN-Normal, sans-serif;
      font-style: normal;
    }
  }

  .qyyd-list-item-selected {
    .set-back('@/assets/imgs/energy-plant/quyuyongdian-item-bg.png');
  }
</style>
