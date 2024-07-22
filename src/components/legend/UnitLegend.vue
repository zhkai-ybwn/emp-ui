<!--
 * @Author: zhangk 13182353591@163.com
 * @Date: 2024-03-18 14:16:53
 * @LastEditors: zhangk 13182353591@163.com
 * @LastEditTime: 2024-03-18 14:25:09
 * @FilePath: \emp-admin-ui\src\components\legend\UnitLegend.vue
 * @Description: 单位、图例公共组件
 * 
 * Copyright (c) 2024 by ${git_name_email}, All Rights Reserved. 
-->
<template>
  <div class="unit-legend-container">
    <div class="unit-section">
      {{ config.unit }}
    </div>
    <div
      v-for="(item, index) in config.legends"
      :key="index"
      class="legend-section"
    >
      <div class="legend-label">{{ item.label }}</div>
      <img :src="item.icon"
    /></div>
  </div>
</template>

<script setup lang="ts">
  defineProps({
    config: {
      type: Object,
      default: () => ({
        unit: '',
        legends: [
          { label: '', icon: '' },
          { label: '', icon: '' },
        ],
      }),
    },
  });
</script>
