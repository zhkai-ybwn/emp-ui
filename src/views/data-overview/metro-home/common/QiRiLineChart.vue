<template>
  <div ref="echartRef" class="chart-conatiner"> </div>
</template>

<script setup>
  import useEchart from '@/hooks/useEchart';
  import * as echarts from 'echarts';
  import moment from 'moment';
  import yellow from '@/assets/imgs/metro-home/point-y.png';
  import blue from '@/assets/imgs/metro-home/point-b.png';
  import green from '@/assets/imgs/metro-home/point-g.png';

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
    const data3 = [];
    dataList.value.forEach((el) => {
      el.chartDataList.forEach((item, index) => {
        if (index === 0) {
          data1.push([
            el.pointTime.replace('-', '.'),
            parseFloat(item.pointValue).toFixed(2),
          ]);
        }
        if (index === 1) {
          data2.push([
            el.pointTime.replace('-', '.'),
            parseFloat(item.pointValue).toFixed(2),
          ]);
        }
        if (index === 2) {
          data3.push([
            el.pointTime.replace('-', '.'),
            parseFloat(item.pointValue).toFixed(2),
          ]);
        }
      });
    });
    const series = [
      {
        name: '空调大系统',
        type: 'line',
        smooth: true,
        symbol: `image://${green}`,
        symbolSize: 20,
        showSymbol: false,
        data: data1,
        itemStyle: {
          normal: {
            color: '#00FF8B',
          },
        },
      },
      {
        name: 'A端小系统',
        type: 'line',
        smooth: true,
        symbol: `image://${blue}`,
        symbolSize: 20,
        showSymbol: false,
        data: data2,
        itemStyle: {
          normal: {
            color: '#27D8FF',
          },
        },
      },
      {
        name: 'B端小系统',
        type: 'line',
        smooth: true,
        symbol: `image://${yellow}`,
        symbolSize: 20,
        showSymbol: false,
        data: data3,
        itemStyle: {
          normal: {
            color: '#FCC679',
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
      right: '5%',
      bottom: '2%',
      containLabel: true,
    },
    legend: {
      selectedMode: false,
      icon: 'roundRect',
      right: '3%',
      top: '5%',
      show: true,
      itemWidth: 9,
      itemHeight: 7,
      itemGap: 20,
      textStyle: {
        color: 'inherit',
        fontSize: 12,
        fontFamily: 'HarmonyOS-Regular',
        rich: {
          a: {
            verticalAlign: 'middle',
          },
        },
      },
    },
    tooltip: {
      backgroundColor: 'rgba(9, 43, 68, 0.60)',
      borderColor: '#39456A',
      trigger: 'axis',
      axisPointer: {
        lineStyle: {
          color: '#fff',
          type: 'solid',
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
          tip += ` <div style="margin:5px 0"><span style="background:${item.color};display:inline-block;width:8px;height:8px;margin-right:5px"></span><span  style="color:rgb(255,255,255);width:60px;display:inline-block">${item.seriesName}</span><span>${item.value[1]}kWh</span></div>`;
        });
        return tip;
      },
    },
    xAxis: {
      type: 'category',
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
      },
      boundaryGap: false,
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
