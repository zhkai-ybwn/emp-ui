<!-- eslint-disable no-plusplus -->
<template>
  <div ref="echartRef" class="chart-conatiner"> </div>
</template>

<script setup>
  import { reactive, nextTick, computed, onMounted, onUnmounted } from 'vue';
  import moment from 'moment';
  import useEchart from '@/hooks/useEchart';
  import * as echarts from 'echarts';
  import symbol1 from '@/assets/imgs/energy-analysis/query/item1.png';
  import symbol2 from '@/assets/imgs/energy-analysis/query/item2.png';
  import symbol3 from '@/assets/imgs/energy-analysis/query/item3.png';
  import symbol4 from '@/assets/imgs/energy-analysis/query/item4.png';
  import symbol5 from '@/assets/imgs/energy-analysis/query/item5.png';

  import bus from '@/utils/bus';

  const symbols = [symbol1, symbol2, symbol3, symbol4, symbol5];

  const props = defineProps({
    data: {
      type: Object,
      default: () => ({}),
    },
    time: {
      type: Array,
      default: () => [],
    },
  });

  const state = reactive({
    info: {},
  });

  const dataList = computed(() => props.data);

  // 默认配色
  const colorList = ['#4787F0', '#FA541C', '#FAAD14', '#52C41A', '#13C2C2'];
  const getSeries = () => {
    const series = [];
    const pieData = dataList.value.selected;
    pieData.map((item, index) => {
      if (dataList.value.selectBox.includes(item)) {
        series.push({
          name: dataList.value.faltTree.find((el) => el.key === item)
            ? dataList.value.faltTree.find((el) => el.key === item)?.title
            : '',
          type: 'line',
          smooth: true,
          showSymbol: false,
          symbol: `image://${symbols[index]}`,
          symbolSize: 20,
          itemStyle: {
            normal: {
              color: colorList[index],
              lineStyle: {
                color: colorList[index],
                width: 2,
              },
            },
          },
          markLine: {
            data: [
              {
                type: 'average',
                name: '平均值',
                label: {
                  show: true,
                  // position: 'insideEndTop',
                  formatter: (params) => {
                    return params.value > 0 ? `${params.value}` : '';
                  },
                  color: 'rgba(255, 255, 255, 0.85)',
                  fontFamily: 'HarmonyOS-Regular, sans-serif',
                  fontSize: 14,
                  fontWeight: 400,
                  lineHeight: 20,
                },
                lineStyle: {
                  color: colorList[index],
                },
              },
            ],
            lineStyle: {
              type: 'dashed',
              color: '#5F7292',
              width: 1.5,
            },
            silent: true,
            symbol: false,
          },
          data: [
            [dataList.value.rangePicker[0], 1000 * Math.random()],
            [dataList.value.rangePicker[1], 1000 * Math.random()],
          ],
        });
      }
      return series;
    });
    return series;
  };

  let dataZoom = [];

  dataZoom = [
    {
      show: true,
      height: 12,
      xAxisIndex: [0],
      bottom: '3%',
      start: 0,
      end: 100,
      handleIcon:
        'path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z',
      handleSize: '110%',
      handleStyle: {
        color: '#d3dee5',
      },
      textStyle: {
        color: '#C9CDD0',
      },
      borderColor: '#90979c',
      labelFormatter(value) {
        // return moment(value).format('YYYY-MM-DD HH:mm');
        return null;
      },
    },
  ];

  const getOptions = () => ({
    color: colorList,
    grid: {
      left: '1%',
      right: '5%',
      top: '2%',
      bottom: '10%',
      containLabel: true,
    },
    tooltip: {
      show: true,
      trigger: 'axis',
      backgroundColor: 'rgba(6, 12, 28, 0.5)',
      borderColor: 'rgba(255, 255, 255, 0)',
      axisPointer: {
        lineStyle: {
          color: 'rgba(255, 255, 255, 0.40)',
          type: 'dashed',
          width: 1.5,
        },
        z: 1,
      },
      extraCssText: 'backdrop-filter: blur(1px);border-radius:2px;',
      textStyle: {
        fontFamily: 'HarmonyOS-Regular, sans-serif',
        fontSize: 14,
      },
      formatter: (params) => {
        const time = moment(params[0].data[0]).format('YYYY-MM-DD HH:mm');
        let content = '';
        params.forEach((item) => {
          content += ` <div style="color:rgb(188, 196, 208);"><span style="background:${item.color};display:inline-block;width:10px;height:10px;margin-right:5px"></span><span>${item.seriesName}</span><span style="margin-left:12px">${item.value[1]}</span></div>`;
        });
        const tip = `<div style="color:rgb(151, 163, 183)">${time}</div>${content}`;
        return tip;
      },
    },

    xAxis: [
      {
        type: 'time',
        axisLabel: {
          interval: 0,
          hideOverlap: true,
          color: '#C9CDD0',
          fontSize: 16,
          fontFamily: 'HarmonyOS-Regular, sans-serif',
          fontWeight: 400,
          formatter(value) {
            const time = moment(value);
            if (dataList.value.value === 4) return time.format('MM-DD');
            return time.format('MM-DD HH:mm');
          },
        },
        axisTick: { show: false },
        boundaryGap: false,
        axisLine: {
          show: true,
          lineStyle: {
            width: 1,
            color: 'rgba(255, 255, 255, 0.3)',
            type: 'solid',
          },
        },
        splitLine: {
          show: true,
          lineStyle: {
            width: 1,
            color: 'rgba(60, 72, 92, 1)',
            type: 'dashed',
          },
        },
        // data: xDate,
      },
    ],
    yAxis: [
      {
        name: '',
        type: 'value',
        axisTick: {
          show: false,
        },
        axisLine: {
          show: true,
          lineStyle: {
            width: 1,
            color: 'rgba(255, 255, 255, 0.30)',
            type: 'solid',
          },
        },
        axisLabel: {
          color: '#C9CDD0',
          fontSize: 16,
          fontFamily: 'HarmonyOS-Regular, sans-serif',
          fontWeight: 400,
          minWidth: 600,
        },
        splitLine: {
          show: true,
          lineStyle: {
            width: 1,
            color: 'rgba(60, 72, 92, 1)',
            type: 'dashed',
          },
        },
      },
    ],
    dataZoom,
    // series,
    series: getSeries(),
  });

  const { echartRef, renderChart } = useEchart(getOptions, {
    isWatch: true,
    watchData: dataList,
  });

  bus.on('search', (params) => {
    state.info = params;
    // renderChart(true, true);
    // nextTick(() => {
    //   const chart = echarts.getInstanceByDom(echartRef.value);
    //   if (chart) {
    //     chart.resize();
    //   }
    // });
    // console.log(params);
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
