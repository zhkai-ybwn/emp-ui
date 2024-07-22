<template>
  <div ref="echartRef" class="chart-conatiner"> </div>
</template>

<script setup>
  import useEchart from '@/hooks/useEchart';
  import * as echarts from 'echarts';
  import moment from 'moment';
  import blue from '@/assets/imgs/smart/health/blue.png';
  import green from '@/assets/imgs/smart/health/green.png';

  const props = defineProps({
    data: {
      type: Array,
      default: () => [],
    },
    timeType: {
      type: Number,
      default: 1,
    },
    check: {
      type: Array,
      default: () => [0, 1],
    },
    title: {
      type: Array,
      default: () => [],
    },
    colorList: {
      type: Array,
      default: () => [],
    },
    iconList: {
      type: Array,
      default: () => [green, blue],
    },
    pointList: {
      type: Array,
      default: () => [0, 1, 2, 3],
    },
    unit: {
      type: String,
      default: () => '',
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
  const colorList = computed(() => props.colorList);
  const title = computed(() => props.title);
  const check = computed(() => props.check);
  const dataList = computed(() => props.data);
  const pointList = computed(() => props.pointList);

  function convertToDesiredFormat(data) {
    return data.reduce((acc, item) => {
      // 遍历lineChartDataList
      item.lineChartDataList.forEach((point) => {
        // 如果acc中还没有这个pointId，则初始化一个空数组
        if (!acc[point.pointId]) {
          acc[point.pointId] = [];
        }
        // 将pointTime和pointValue添加到对应的pointId数组中
        acc[point.pointId].push([
          moment(item.pointTime, 'MM-DD hh:mm').format(),
          parseFloat(point.pointValue).toFixed(2),
        ]);
      });
      return acc;
    }, {});
  }

  const getSeries = () => {
    let data = [];
    if (dataList.value && dataList.value.length !== 0) {
      data = convertToDesiredFormat(dataList.value);
    } else {
      data = [];
    }
    const series = [];
    check.value.forEach((el) => {
      series.push({
        type: 'line',
        name: title.value[el],
        showSymbol: false,
        symbolSize: 25,
        color: colorList.value[el],
        symbol: `image://${props.iconList[el]}`,
        data: data[pointList.value[el]] ? data[pointList.value[el]] : [],
      });
    });
    return series;
  };

  const getOptions = () => ({
    grid: {
      top: '6%',
      bottom: '3%',
      left: '2%',
      right: '3%',
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
      extraCssText: 'border:none; backdrop-filter: blur(4px)',
      formatter(params) {
        // params 是一个数组，包含了所有系列的数据信息
        let result = ''; // 存储最终的提示框内容
        result += `${moment(params[0].value[0]).format('MM-DD HH:mm')}<br>`;
        params.forEach((el) => {
          result += `<div style='display:flex;align-items:center;'><div style='width:10px;height:10px;margin-right:5px;background:${el.color}'></div><div>${el.seriesName}</div><div style="flex:1;margin-left:10px;text-align: right">${el.value[1]}${props.unit}</div></div>`;
        });
        return result;
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
        // min: getMin(),
        // max: getMax(),
        axisLabel: {
          color: 'rgba(255,255,255,0.6)',
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
          color: 'rgba(255,255,255,0.6)',
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
    watchData: check,
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
    position: relative;
    width: 100%;
    height: calc(100% - 30px);
  }
</style>
