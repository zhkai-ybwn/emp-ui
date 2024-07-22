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
    labels: {
      type: Array,
      default: () => [],
    },
  });
  // const dataList1 = computed(() => props.data[0]);
  // const dataList2 = computed(() => props.data[1]);
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
    const list1 = [];
    const list2 = [];
    dataList.value.forEach((t) => {
      list1.push([
        moment(t.pointTime, 'YYYY-MM-DD hh:mm:ss').format(),
        t.leftPointValue,
      ]);
      list2.push([
        moment(t.pointTime, 'YYYY-MM-DD hh:mm:ss').format(),
        t.rightPointValue,
      ]);
    });
    // dataList1.value.forEach((t) => {
    //   // index === 0
    //   //     ? actualArr.push([moment(Number(t.ts)).add(1, 'seconds').format(), t.v])
    //   //     : actualArr.push([moment(Number(t.ts)).format(), t.v])
    //   list1.push([moment(Number(t.ts)).format(), parseInt(t.v, 10)]);
    // });
    // dataList2.value.forEach((t) => {
    //   // index === 0
    //   //     ? actualArr.push([moment(Number(t.ts)).add(1, 'seconds').format(), t.v])
    //   //     : actualArr.push([moment(Number(t.ts)).format(), t.v])
    //   list2.push([moment(Number(t.ts)).format(), parseInt(t.v, 10)]);
    // });
    const series = [
      {
        type: 'line',
        name: props.labels[0],
        showSymbol: list1.length < 2,
        symbolSize: 25,
        color: '#76E144',
        yAxisIndex: 0,
        symbol: `image://${green}`,
        zlevel: 11,
        data: list1,
      },
      {
        type: 'line',
        name: props.labels[1],
        showSymbol: list2.length < 2,
        symbolSize: 25,
        color: '#0079FF',
        yAxisIndex: 1,
        symbol: `image://${blue}`,
        zlevel: 11,
        data: list2,
      },
    ];
    return series;
  };
  const getOptions = () => ({
    grid: {
      top: '6%',
      bottom: '3%',
      left: '2%',
      right: '2%',
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
        result += `<div style='display:flex;align-items:center;'><div style='width:10px;height:10px;margin-right:5px;background:linear-gradient(180deg, #76E144 0%, rgba(118, 225, 68, 0.20) 100%);'></div><div>${params[0].seriesName}</div><div style="flex:1;margin-left:10px;text-align: right">${params[0].value[1]}kW</div></div>`;
        result += `<div style='display:flex;align-items:center;'><div style='width:10px;height:10px;margin-right:5px;background: linear-gradient(180deg, #1890FF 0%, rgba(24, 144, 255, 0.20) 100%)'></div><div>${params[1].seriesName}</div><div style="flex:1;margin-left:10px;text-align: right">${params[1].value[1]}kW</div></div>`;
        return result; // 返回最终的提示框内容
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
          hideOverlap: true,
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
            color: '#76E144',
            width: 2,
          },
        },
        axisLabel: {
          hideOverlap: true,
          color: '#76E144',
          fontSize: 16,
          fontFamily: 'HarmonyOS-Regular,sans-serif',
          fontWeight: 400,
          formatter(value) {
            return Number(value).toFixed(2);
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
      {
        type: 'value',
        axisTick: {
          show: false,
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: '#0079FF',
            width: 2,
          },
        },
        axisLabel: {
          hideOverlap: true,
          color: '#0079FF',
          fontSize: 16,
          fontFamily: 'HarmonyOS-Regular,sans-serif',
          fontWeight: 400,
          formatter(value) {
            return Number(value).toFixed(2); // 设置 Y 轴标签保留两位小数
          },
        },
        splitLine: {
          show: false,
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
