<template>
  <div ref="echartRef" class="chart-conatiner"> </div>
</template>

<script setup>
  import useEchart from '@/hooks/useEchart';
  import * as echarts from 'echarts';
  import moment from 'moment';

  const props = defineProps({
    data: {
      type: Array,
      default: () => [],
    },
    timeType: {
      type: Number,
      default: 1,
    },
  });
  const currentDate = new Date();

  const getMin = () => {
    if (props.timeType === 3) {
      return new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    }
    if (props.timeType === 2) {
      return moment().subtract(8, 'days').format('YYYY-MM-DD HH:mm:ss');
    }
    if (props.timeType === 1) {
      return moment().startOf('day').format('YYYY-MM-DD HH:mm:ss');
    }
    return undefined;
  };

  const getMax = () => {
    if (props.timeType === 3) {
      const nextMonth = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + 1,
        1
      );
      return new Date(nextMonth - 1);
    }
    if (props.timeType === 1) {
      return moment().endOf('day').format('YYYY-MM-DD HH:mm:ss');
    }
    return undefined;
  };
  const dataList = computed(() => props.data);
  const getSeries = () => {
    const list = [];
    dataList.value.forEach((t) => {
      list.push([
        moment(t.pointTime, 'YYYY-MM-DD hh:mm:ss').format(),
        Number(t.pointValue).toFixed(2),
      ]);
    });
    const series = {
      type: 'scatter',
      smooth: true,
      symbolSize: 10,
      symbol: 'circle',
      color: 'rgba(255, 255, 255, 0.60)',
      data: list,
      itemStyle: {
        emphasis: {
          color: 'rgba(210, 216, 247, 0.90)',
        },
      },
      z: 11,
    };
    return series;
  };
  const getOptions = () => ({
    grid: {
      top: '6%',
      bottom: '3%',
      left: '2%',
      right: '1%',
      containLabel: true,
    },
    tooltip: {
      // trigger: 'none',
      backgroundColor: 'rgba(6,12,28,0.5)',
      textStyle: {
        color: '#BCC4D0',
        fontSize: 14,
        fontFamily: 'HarmonyOS-Regular',
      },
      extraCssText: 'border:none; backdrop-filter: blur(4px)',
      formatter(params) {
        return ` ${
          props.timeType === 1
            ? `${moment(params.value[0]).format('HH:mm')}`
            : moment(params.value[0]).format('MM-DD HH:mm')
        } ${params.value[1]}`;
      },
      axisPointer: {
        type: 'cross',
        snap: 'false',
        crossStyle: {
          type: [4, 4],
          dashOffset: 4,
          color: 'rgba(255, 255, 255, 0.6)',
        },
        label: {
          color: 'rgba(255, 255, 255, 0.90)',
          fontStyle: 'normal',
          fontWeight: 400,
          fontFamily: 'HarmonyOS-Regular,sans-serif',
          fontSize: '16px',
          backgroundColor: 'rgba(0,0,0,0.85)',
          formatter(params) {
            const { value, axisDimension } = params;
            // 对横坐标进行格式化
            if (axisDimension === 'x') {
              return props.timeType === 1
                ? `${moment(value).format('HH:mm')}`
                : moment(value).format('MM-DD HH:mm');
            }
            // 对纵坐标进行格式化
            if (axisDimension === 'y') {
              return `${value.toFixed(2)}`;
            }
            return value;
          },
        },
      },
    },
    xAxis: [
      {
        type: 'time', // x轴为 时间轴
        splitLine: {
          show: true,
          lineStyle: {
            width: 1,
            color: 'rgba(255, 255, 255, 0.15)',
            type: 'dashed',
          },
        },
        min: getMin(),
        max: getMax(),
        axisLabel: {
          color: 'rgba(255,255,255,0.8)',
          fontSize: 16,
          fontFamily: 'HarmonyOS-Regular,sans-serif',
          fontWeight: 400,
          formatter: (value) =>
            `${
              props.timeType === 1
                ? `${moment(value).format('H')}时`
                : moment(value).format('MM-DD')
            }`,
        },
        axisTick: { show: false },
        // boundaryGap: ['20%', '20%'],
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
        type: 'value',
        axisTick: {
          show: false,
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: '#8a9194',
            width: 2,
          },
        },
        axisLabel: {
          hideOverlap: true,
          color: 'rgba(255,255,255,0.8)',
          fontSize: 16,
          fontFamily: 'HarmonyOS-Regular,sans-serif',
          fontWeight: 400,
          formatter(value) {
            return value.toFixed(2); // 设置 Y 轴标签保留两位小数
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
