<template>
  <div ref="echartRef" class="chart-conatiner"> </div>
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
  const getSeries = () => {
    const data1 = [];
    const data2 = [];
    dataList.value.forEach((el) => {
      el.chartDataList.forEach((item) => {
        if (item.pointDisplayName === '制冷机房') {
          data1.push([
            el.pointTime.replace('-', '.'),
            parseFloat(item.pointValue).toFixed(2),
          ]);
        }
        if (item.pointDisplayName === '空调末端') {
          data2.push([
            el.pointTime.replace('-', '.'),
            parseFloat(item.pointValue).toFixed(2),
          ]);
        }
      });
    });
    const series = [
      {
        name: '制冷机房',
        type: 'bar',
        barWidth: 10,
        data: data1,
        itemStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: '#008DFF',
              },
              {
                offset: 1,
                color: '#00C2FF',
              },
            ]),
          },
        },
      },
      {
        name: '空调末端',
        type: 'bar',
        barWidth: 10,
        data: data2,
        itemStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: '#00FFC2',
              },
              {
                offset: 1,
                color: '#A9FFEB',
              },
            ]),
          },
        },
      },
    ];
    return series;
  };
  const getOptions = () => ({
    grid: {
      top: '20%',
      left: '2%',
      right: '2%',
      bottom: '2%',
      containLabel: true,
    },
    legend: {
      selectedMode: false,
      icon: 'roundRect',
      right: '20%',
      top: '5%',
      show: true,
      itemWidth: 9,
      itemHeight: 7,
      itemGap: 28,
      textStyle: {
        fontSize: 12,
        fontFamily: 'HarmonyOS-Regular',
        rich: {
          a: {
            verticalAlign: 'middle',
          },
        },
      },
      data: [
        {
          name: '制冷机房',
          textStyle: {
            color: '#018DFF',
          },
          itemStyle: {
            color: '#018DFF',
          },
        },
        {
          name: '空调末端',
          textStyle: {
            color: '#5BFFD8',
          },
          itemStyle: {
            color: '#5BFFD8',
          },
        },
      ],
    },
    tooltip: {
      backgroundColor: 'rgba(9, 43, 68, 0.60)',
      borderColor: '#39456A',
      trigger: 'axis',
      axisPointer: {
        lineStyle: {
          color: '#fff',
          type: 'dashed',
        },
        z: 1,
      },
      // extraCssText: 'backdrop-filter: blur(4px);',
      textStyle: {
        color: 'rgba(227, 234, 240, 1)',
        fontSize: 10,
        fontFamily: 'Barlow-Regular',
      },
      formatter: (params) => {
        let tip = '';
        const time = params[0].axisValue;
        tip += time;
        params.forEach((item) => {
          if (item.seriesName === '制冷机房') {
            tip += ` <div style="margin:5px 0"><span style="background:#018DFF;display:inline-block;width:8px;height:8px;margin-right:5px"></span><span  style="color:rgb(255,255,255);">${item.seriesName}</span><span style="margin-left:12px">${item.value[1]}kWh</span></div>`;
          } else {
            tip += ` <div style="margin:5px 0"><span style="background:#5BFFD8;display:inline-block;width:8px;height:8px;margin-right:5px"></span><span  style="color:rgb(255,255,255);">${item.seriesName}</span><span style="margin-left:12px">${item.value[1]}kWh</span></div>`;
          }
        });
        return tip;
      },
    },
    xAxis: {
      type: 'category',
      boundaryGap: true,
      axisLine: {
        show: true,
        lineStyle: {
          color: '#39456A',
        },
      },
      axisTick: {
        show: false,
      },
      axisLabel: {
        color: '#E3EAF0',
        fontSize: 14,
        fontFamily: 'Barlow-Regular',
        interval: 0,
      },
    },
    yAxis: [
      {
        type: 'value',
        name: '单位:kWh',
        nameTextStyle: {
          color: '#E3EAF0',
          fontSize: 12,
          fontWeight: 400,
          fontFamily: 'HarmonyOS-Regular',
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: '#39456A',
          },
        },
        axisLabel: {
          color: '#E3EAF0',
          fontSize: 14,
          fontFamily: 'Barlow-Regular',
        },
        splitLine: {
          // 网格线
          show: false,
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
    height: 200px;
  }
</style>
