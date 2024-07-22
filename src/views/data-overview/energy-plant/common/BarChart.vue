<!--
 * @Author: zhangk 13182353591@163.com
 * @Date: 2023-11-17 12:57:48
 * @LastEditors: zhangk 13182353591@163.com
 * @LastEditTime: 2024-04-09 10:19:02
 * @FilePath: \emp-admin-ui\src\views\data-overview\energy-plant\common\BarChart.vue
 * @Description: 柱形图公共组件
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
</template>

<script setup>
  import useEchart from '@/hooks/useEchart';
  import * as echarts from 'echarts';

  const props = defineProps({
    data: {
      type: Array,
      default: () => [],
    },
    config: {
      type: Object,
      default: () => ({
        width: 407,
        height: 223,
      }),
    },
  });

  const dataC = computed(() => props.data);

  const formatData = () => {
    const xData = [];
    const yData = [];
    const pictorialData = [];
    dataC.value.forEach((item) => {
      xData.push(item.orgName);
      yData.push(item.ec.toFixed(2));
      pictorialData.push({ value: item.ec.toFixed(2), symbolPosition: 'end' });
    });
    return { xData, yData, pictorialData };
  };

  const getSeries = () => {
    const series = [];
    series.push({
      type: 'pictorialBar',
      symbol: 'rect',
      symbolSize: [16, 3],
      symbolOffset: [0, 0],
      itemStyle: {
        color: '#fff',
      },
      z: 22,
      tooltip: { show: false },
      data: formatData().pictorialData,
    });
    series.push({
      type: 'bar',
      barWidth: 14,
      data: formatData().yData,
      itemStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: 'rgba(102, 182, 255, 1)',
          },
          {
            offset: 1,
            color: 'rgba(23, 101, 193, 1)',
          },
        ]),
      },
      label: {
        show: true,
        position: 'top',
        distance: 3,
        color: '#fff',
        fontFamily: 'Inter-Regular, sans-serif;',
        fontSize: 14,
      },
    });
    return series;
  };

  const getOptions = () => ({
    // tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
    grid: {
      top: '18%',
      bottom: '0%',
      left: '4%',
      right: '0%',
      containLabel: true,
    },
    xAxis: [
      {
        type: 'category',
        data: formatData().xData,
        axisTick: { alignWithLabel: true },
        axisLabel: {
          width: 60,
          fontSize: 14,
          color: '#fff',
          overflow: 'truncate',
          ellipsis: '...',
          interval: 0,
          fontFamily: 'SourceHanSansCN-Normal, sans-serif;',
        },
        axisLine: { show: false },
      },
    ],
    yAxis: [
      {
        type: 'value',
        name: '单位：%',
        nameTextStyle: {
          color: 'rgba(255,255,255, 0.85)',
          fontSize: 14,
          padding: [0, 0, 0, 5],
        },
        splitLine: {
          lineStyle: {
            color: 'rgba(255,255,255, 0.2)',
            width: 1,
            type: 'dashed',
          },
        },
        axisLabel: {
          fontSize: 14,
          color: '#fff',
          fontFamily: 'SourceHanSansCN-Normal, sans-serif;',
        },
        axisLine: { show: false },
        axisTick: false,
      },
    ],
    series: getSeries(),
  });

  const { echartRef, renderChart } = useEchart(getOptions, {
    isWatch: true,
    watchData: dataC,
  });
  renderChart(true, true);
</script>
