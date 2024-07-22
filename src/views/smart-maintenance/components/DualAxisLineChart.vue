<!--
 * @Author: zhangk 13182353591@163.com
 * @Date: 2024-01-18 14:07:31
 * @LastEditors: zhangk 13182353591@163.com
 * @LastEditTime: 2024-03-26 13:20:28
 * @FilePath: \emp-admin-ui\src\views\smart-maintenance\components\DualAxisLineChart.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by ${git_name_email}, All Rights Reserved. 
-->
<template>
  <div ref="echartRef" class="chart-conatiner"> </div>
</template>

<script setup>
  import useEchart from '@/hooks/useEchart';
  import * as echarts from 'echarts';

  const props = defineProps({
    data: {
      type: Array,
      default: () => [],
    },
  });
  const dataList = computed(() => props.data);
  const getSeries = () => {
    const list = [];
    dataList.value.forEach((t) => {
      list.push([t.abscissaPointValue, t.ordinatePointValue]);
    });
    const series = [
      {
        type: 'line',
        // name: '实时功率(kW)',
        // nameTextStyle: {
        //   color: 'rgba(255, 255, 255, 0.8)',
        //   fontFamily: 'HarmonyOS-Regular, sans-serif',
        //   fontSize: 14,
        // },
        showSymbol: list.length < 2,
        symbolSize: 8,
        color: '#0079FF',
        z: 11,
        data: list,
      },
    ];
    return series;
  };
  const getOptions = () => ({
    grid: {
      top: '6%',
      bottom: '0%',
      left: '2%',
      right: '10%',
      containLabel: true,
    },
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(6, 12, 28, 0.50)',
      borderColor: 'rgba(6, 12, 28, 0.50)',
      textStyle: {
        color: '#BCC4D0',
        fontFamily: 'HarmonyOS-Regular,sans-serif',
      },
      formatter(params) {
        // params 是一个数组，包含了所有系列的数据信息
        let result = '';
        result += `<div style='display:flex;align-items:center;'><div>频率</div><div style="flex:1;margin-left:10px;text-align: right">${params[0].value[0]}Hz</div></div>`;
        result += `<div style='display:flex;align-items:center;'><div>实时功率</div><div style="flex:1;margin-left:10px;text-align: right">${params[0].value[1]}kW</div></div>`;
        return result; // 返回最终的提示框内容
      },
    },
    xAxis: [
      {
        name: '频率(Hz)',
        nameTextStyle: {
          color: 'rgba(255, 255, 255, 0.8)',
          fontFamily: 'HarmonyOS-Regular, sans-serif',
          fontSize: 14,
        },
        splitLine: {
          show: true,
          lineStyle: {
            width: 1,
            color: 'rgba(255, 255, 255, 0.15)',
            type: 'dashed',
          },
        },
        axisLabel: {
          color: 'rgba(255,255,255,0.8)',
          fontSize: 16,
          fontFamily: 'HarmonyOS-Regular,sans-serif',
          fontWeight: 400,
        },
        axisTick: { show: false },
        axisLine: {
          lineStyle: {
            width: 2,
            color: '#8A9194',
          },
        },
      },
    ],
    legend: {
      show: false,
    },
    yAxis: [
      {
        // name: '实时功率(kW)',
        // nameTextStyle: {
        //   color: 'rgba(255, 255, 255, 0.8)',
        //   fontFamily: 'HarmonyOS-Regular, sans-serif',
        //   fontSize: 14,
        // },
        axisTick: {
          show: false,
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: '#8A9194',
            width: 2,
          },
        },
        axisLabel: {
          color: 'rgba(255,255,255,0.8)',
          fontSize: 16,
          fontFamily: 'HarmonyOS-Regular,sans-serif',
          fontWeight: 400,
          formatter(value) {
            return Number(value).toFixed(2); // 设置 Y 轴标签保留两位小数
          },
        },
        splitLine: {
          lineStyle: {
            width: 1,
            color: 'rgba(255, 255, 255, 0.15)',
            type: 'dashed',
          },
        },
      },
    ],
    series: getSeries(),
  });
  const { echartRef, renderChart } = useEchart(getOptions, {
    isWatch: true,
    watchData: dataList,
  });
  const handleResize = () => {
    const chart = echarts.getInstanceByDom(echartRef.value);
    if (chart) {
      chart.resize();
    }
  };

  let resizeObserver;
  const selfResize = () => {
    nextTick(() => {
      const chart = echarts.getInstanceByDom(echartRef.value);
      if (chart) {
        resizeObserver = new ResizeObserver(() => {
          chart.resize();
        });
        resizeObserver.observe(echartRef.value?.parentElement);
      }
    });
  };

  onMounted(() => {
    renderChart(true, true);
    window.addEventListener('resize', handleResize);
    selfResize();
  });

  onUnmounted(() => {
    window.removeEventListener('resize', handleResize);
    resizeObserver?.disconnect();
  });
</script>

<style scoped lang="less">
  .chart-conatiner {
    width: 100%;
    height: 100%;
  }
</style>
