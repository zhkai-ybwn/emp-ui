<template>
  <div ref="echartRef" class="chart-conatiner"></div>
</template>

<script setup>
  import useEchart from '@/hooks/useEchart';
  import * as echarts from 'echarts';

  const props = defineProps({
    data: {
      type: Object,
      default: () => ({}),
    },
  });
  const dataList = computed(() => props.data);
  // 图表X轴数据
  const Xdata = Object.keys(dataList.value);

  // 图表项目
  const fp_key = ['用能值', '用能占比'];
  // 左侧数据
  const LF_val = Object.values(dataList.value);
  // 右侧数据
  const sum = LF_val.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
  );
  const TS_val = LF_val.map((num) => ((num / sum) * 100).toFixed(1));

  const getSeries = () => {
    const series = [
      {
        name: fp_key[0],
        type: 'bar',
        showBackground: true,
        backgroundStyle: {
          color: 'rgba(255, 255, 255, 0.08)',
        },
        label: {
          show: true,
          position: 'left',
          color: '#C9CDD0',
          fontFamily: ' PangMenZhengDaoBiaoTiTi',
          fontSize: 12,
          align: 'right',
        },
        barWidth: 16,
        xAxisIndex: 0,
        yAxisIndex: 0,
        itemStyle: {
          color: {
            type: 'linear',
            x: 0, // 右
            y: 0, // 下
            x2: 1, // 左
            y2: 0, // 上
            colorStops: [
              {
                offset: 0,
                color: '#8FEBFF',
                // 0% 处的颜色
              },
              {
                offset: 1,
                color: '#2C77E9',
                // 100% 处的颜色
              },
            ],
          },
        },
        // 左侧数据
        data: LF_val,
      },
      {
        // 分隔
        type: 'pictorialBar',
        xAxisIndex: 0,
        yAxisIndex: 0,
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
        symbolOffset: [4, 0],
        data: LF_val,
        width: 2,
        z: 0,
        zlevel: 1,
      },
      {
        name: fp_key[1],
        stack: 'right',
        type: 'scatter',
        // realtimeSort: false,
        symbolSize: 26,
        color: 'rgba(38, 111, 232, 1)',
        xAxisIndex: 2,
        yAxisIndex: 2,
        label: {
          show: true,
          position: 'inside',
          offset: [0, 0],
          color: '#FFF',
          fontFamily: ' HarmonyOS-Regular',
          fontSize: 12,
        },

        // 右侧数据
        data: TS_val,
      },
    ];
    return series;
  };
  const getOptions = () => ({
    legend: {
      show: false,
    },

    grid: [
      {
        // 左侧边框
        show: false,
        left: '5%',
        top: '0%',
        bottom: '1%',
        containLabel: true,
        width: '55%',
      },
      {
        // 中间文字边框
        show: false,
        left: '63%',
        top: '0%',
        bottom: '1%',
        containLabel: false,
        width: '30%',
      },
      {
        // 右侧边框
        show: false,
        left: '77%',
        right: '3%',
        top: '0%',
        bottom: '1%',
        containLabel: false,
        width: '17%',
      },
    ],

    xAxis: [
      {
        gridIndex: 0,
        max: Math.max(...LF_val) * 1.3,
        type: 'value',
        triggerEvent: true,
        // 翻转
        inverse: true,
        axisLine: {
          show: false,
          lineStyle: {
            color: '#BDD8FB',
          },
        },
        axisTick: {
          show: false,
        },
        position: 'top',
        axisLabel: {
          show: false,
          textStyle: {
            color: '#BDD8FB',
            fontSize: 12,
          },
        },
        splitLine: {
          show: false,
        },
      },
      {
        gridIndex: 1,
        show: false,
      },
      {
        gridIndex: 2,
        type: 'value',
        axisLine: {
          show: false,
          lineStyle: {
            color: '#BDD8FB',
          },
        },
        axisTick: {
          show: false,
        },
        position: 'top',
        axisLabel: {
          show: false,
        },
        splitLine: {
          show: false,
        },
      },
    ],
    yAxis: [
      {
        gridIndex: 0,
        type: 'category',
        inverse: true,
        position: 'right',
        axisLine: {
          show: true,
          lineStyle: {
            color: '#C9CDD0',
          },
        },
        axisTick: {
          show: false,
        },
        splitLine: {
          show: true,
          lineStyle: {
            width: 1,
            color: 'rgba(87, 208, 235, 0.10)',
            type: 'dashed',
          },
        },
        axisLabel: {
          show: false,
        },
        z: 999,
        data: Xdata,
      },
      {
        gridIndex: 1,
        type: 'category',
        inverse: true,
        position: 'left',
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          show: true,
          textStyle: {
            color: '#C9CDD0',
            fontSize: 12,
            align: 'left',
            verticalAlign: 'middle',
          },
        },
        data: Xdata,
      },
      {
        gridIndex: 2,
        type: 'category',
        inverse: true,
        position: 'left',
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          show: false,
          textStyle: {
            color: '#BDD8FB',
            fontSize: 12,
          },
        },
        data: Xdata,
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
    height: 80%;
  }
</style>
