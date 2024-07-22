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
  // const xData = dataList.value.map((item) => item.name);
  const xData = () => {
    return dataList.value.map((item) => item.name);
  };
  // const yData = dataList.value.map((item) => item.value);
  const yData = () => {
    return dataList.value.map((item) => item.value);
  };

  const getSeries = () => {
    const series = [
      {
        type: 'bar',
        showBackground: true,
        backgroundStyle: {
          color: 'rgba(255, 255, 255, 0.08)',
        },
        label: {
          show: true,
          position: 'right',
          color: '#C9CDD0',
          fontFamily: ' PangMenZhengDaoBiaoTiTi',
          fontSize: 12,
          align: 'left',
        },
        barWidth: 16,
        itemStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
              {
                offset: 0,
                color: '#2C77E9',
              },
              {
                offset: 1,
                color: '#8FEBFF',
              },
            ]),
          },
        },
        data: yData(),
        z: 10,
        zlevel: 0,
      },
      {
        // 分隔
        type: 'pictorialBar',

        itemStyle: {
          normal: {
            color: '#273444',
          },
        },
        symbolRepeat: 'fixed',
        symbolMargin: 4,
        symbol: 'rect',
        symbolClip: true,
        symbolSize: [4, 16],
        symbolPosition: 'start',
        symbolOffset: [8, 0],
        data: yData(),
        width: 2,
        z: 0,
        zlevel: 1,
      },
    ];
    return series;
  };
  const getOptions = () => ({
    grid: {
      top: '4%',
      bottom: '2%',
      right: '7%',
      left: '7%',
      containLabel: true,
    },
    legend: {
      show: false,
    },
    xAxis: {
      max: Math.max(...yData()) * 1.2,
      type: 'value',
      axisLine: {
        show: false, // 隐藏X轴轴线
      },
      axisTick: {
        show: false, // 隐藏X轴轴线
      },
      splitLine: {
        show: false,
      },
      axisLabel: {
        show: false,
      },
    },
    yAxis: {
      type: 'category',
      nameLocation: 'end',
      nameTextStyle: {
        color: '#758396',
        fontSize: 12,
        padding: 10,
      },
      splitLine: {
        show: true,
        lineStyle: {
          width: 1,
          color: 'rgba(87, 208, 235, 0.10)',
          type: 'dashed',
        },
      },
      axisTick: {
        show: false,
      },
      axisLine: {
        show: false,
      },
      axisLabel: {
        show: true,
        fontSize: 12,
        fontFamily: 'HarmonyOS-Regular',
        textStyle: {
          color: '#C9CDD0',
        },
      },
      data: xData(),
    },
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
