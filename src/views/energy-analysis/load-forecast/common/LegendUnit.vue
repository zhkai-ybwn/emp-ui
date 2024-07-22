<!--
 * @Author: zhkai 2572429235@qq.com
 * @Date: 2023-10-11 16:34:39
 * @LastEditors: zhangk 13182353591@163.com
 * @LastEditTime: 2024-01-08 08:46:45
 * @FilePath: \emp-admin-ui\src\views\load-forecast\common\LegendUnit.vue
 * @Description: 图例和单位组件
 * 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
-->
<template>
  <div class="legend-unit-container">
    <div v-for="(item, index) in unitList" :key="index" class="unit-box">
      <div class="text">{{ item.text }}</div>
      <div class="unit">{{ item.unit }}</div>
    </div>
    <div v-for="(item, index) in legendList" :key="index" class="legend-box">
      <div class="sign" :style="{ background: `${item.color}` }"></div>
      <div class="text">{{ item.text }}</div>
    </div>
  </div>
</template>

<script setup>
  defineProps({
    unitList: {
      type: Array,
      default: () => [{ text: '', unit: '' }],
    },
    legendList: {
      type: Array,
      default: () => [{ text: '', color: '' }],
    },
  });
</script>

<style lang="less" scoped>
  .legend-unit-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;

    .unit-box {
      display: flex;
      width: fit-content;
      color: #fff;
      font-weight: 400;
      font-size: 14px;
      font-family: HarmonyOS-Regular, sans-serif;
      font-style: normal;
      line-height: 20px;

      .unit {
        margin-left: 2px;
      }
    }

    .legend-box {
      display: flex;
      align-items: center;
      color: rgb(255 255 255 / 80%);
      font-weight: 400;
      font-size: 18px;
      font-family: HarmonyOS-Regular, sans-serif;
      font-style: normal;
      line-height: 20px;

      .sign {
        width: 10px;
        height: 10px;
      }

      .text {
        margin-left: 8px;
      }
    }
  }
</style>
