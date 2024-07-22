<!--
 * @Author: zhangk 13182353591@163.com
 * @Date: 2023-11-15 09:02:01
 * @LastEditors: zhangk 13182353591@163.com
 * @LastEditTime: 2024-03-18 14:36:08
 * @FilePath: \emp-admin-ui\src\views\data-overview\energy-plant\common\RingPercentage.vue
 * @Description: 环形进度条
 * 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
-->
<template>
  <div
    ref="echartRef"
    :style="{
      width: `${props.config.width}px`,
      height: `${props.config.height}px`,
    }"
  >
  </div>
  <div
    class="rate"
    :style="{
      '--font-size': `${config.fontSize}`,
    }"
    >{{ data.toFixed(1) }}%</div
  >
</template>

<script setup>
  import useEchart from '@/hooks/useEchart';

  const props = defineProps({
    data: {
      type: Number,
      default: 0,
    },
    config: {
      type: Object,
      default: () => ({
        width: 74,
        height: 74,
        barWidth: 10,
        fontSize: '14px',
      }),
    },
    color: {
      type: Object,
      default: () => ({}),
    },
  });

  const dataC = computed(() => props.data);

  const getOptions = () => ({
    angleAxis: {
      max: '100',
      clockwise: true, // 逆时针
      // 隐藏刻度线
      show: false,
    },
    radiusAxis: {
      type: 'category',
      show: false,
      axisLabel: {
        show: false,
      },
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
    },
    polar: {
      center: ['50%', '50%'],
      radius: '166%', // 图形大小
    },
    series: [
      {
        type: 'bar',
        data: [dataC.value],
        showBackground: false,
        coordinateSystem: 'polar',
        roundCap: false,
        barWidth: props.config.barWidth || 10,
        itemStyle: {
          borderWidth: 1,
          borderColor: 'rgba(255, 255, 255, 0.20)',
          color: props.color,
        },
      },
    ],
  });

  const { echartRef, renderChart } = useEchart(getOptions, {
    isWatch: true,
    watchData: dataC,
  });
  renderChart(true, true);
</script>

<style lang="less" scoped>
  .rate {
    position: absolute;
    color: white;
    font-size: var(--font-size);
  }
</style>
