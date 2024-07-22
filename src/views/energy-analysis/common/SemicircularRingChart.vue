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
    const series = [
      {
        name: 'Access From',
        z: 2,
        type: 'pie',
        radius: ['70%', '90%'],
        center: ['50%', '65%'],
        startAngle: 180,
        label: {
          show: true,
          color: 'rgba(255, 255, 255, 0.85)',
          fontFamily: 'Barlow-Italic',
          fontWeight: 600,
          fontSize: 18,
          formatter(param) {
            // correct the percentage
            return `${param.percent * 2}%`;
          },
        },
        labelLine: {
          show: true,
          lineStyle: {
            color: 'rgba(255, 255, 255, 0.85)',
          },
        },
        itemStyle: {
          shadowColor: 'rgba(0, 0, 0, 0.25)',
          shadowBlur: 10,
        },
        data: [
          ...dataList.value.values,
          {
            // make an record to fill the bottom 50%
            // value:
            //   dataList.value.values.reduce(
            //     (sum, item) => sum + item.value,
            //     0
            //   ) ?? 1,
            value: 1,
            itemStyle: {
              // stop the chart from rendering this piece
              color: 'none',
              decal: {
                symbol: 'none',
              },
            },
            label: {
              show: false,
            },
          },
        ],
      },
      {
        name: 'Access From',
        z: 1,
        type: 'pie',
        radius: ['70%', '90%'],
        center: ['50%', '65%'],
        startAngle: 180,
        label: {
          show: false,
        },
        labelLine: {
          show: false,
        },
        data: [
          {
            value: 1,
            itemStyle: {
              // stop the chart from rendering this piece
              color: 'rgba(255, 255, 255, 0.26)',
              decal: {
                symbol: 'none',
              },
            },
            label: {
              show: false,
            },
          },
          {
            // make an record to fill the bottom 50%
            // value: dataList.value.values.reduce(
            //   (sum, item) => sum + item.value,
            //   0
            // ),
            value: 1,
            itemStyle: {
              // stop the chart from rendering this piece
              color: 'none',
              decal: {
                symbol: 'none',
              },
            },
            label: {
              show: false,
            },
          },
        ],
      },
      {
        type: 'pie',
        hoverAnimation: false,
        label: {
          normal: {
            rich: {
              a: {
                color: 'rgba(255, 255, 255, 0.40)',
                align: 'center',
                fontSize: 16,
                fontWeight: 'normal',
                padding: [30, 0, 10, 0],
                fontFamily: 'HarmonyOS-Regular',
              },
              b: {
                color: 'rgba(255, 255, 255, 0.85)',
                align: 'center',
                verticalAlign: 'middle',
                fontSize: 20,
                padding: [0, 0, 5, 0],
                fontFamily: 'Barlow-Bold-Italic',
              },
              c: {
                color: 'rgba(255, 255, 255, 0.85)',
                align: 'center',
                verticalAlign: 'middle',
                fontSize: 12,
                fontFamily: 'Barlow-Bold-Italic',
              },
            },
            formatter() {
              return (
                // eslint-disable-next-line no-useless-concat
                '{a|能耗值}\n' + `{b|${dataList.value.totalValue}}` + '{c|kWh}'
              );
            },
            position: 'inside',
            show: true,
            textStyle: {
              fontSize: '14',
              fontWeight: 'normal',
              color: '#fff',
            },
          },
        },
        center: ['50%', '65%'],
        radius: ['0%', '50%'],
        startAngle: 180,
        data: [
          {
            name: '',
            value: 100,
            itemStyle: {
              color: 'rgba(255, 255, 255, 0.06)',
            },
          },
          {
            name: '',
            value: 100,
            itemStyle: {
              color: 'transparent',
            },
            label: {
              show: false,
            },
          },
        ],
      },
    ];
    return series;
  };
  const getOptions = () => ({
    legend: {
      show: false,
      bottom: '10%',
      left: 'center',
      selectedMode: false,
      textStyle: {
        color: 'rgba(255, 255, 255, 0.85)',
        fontFamily: 'HarmonyOS-Regular',
        fontSize: 12,
      },
    },
    color: [
      '#A3C5FF',
      '#BBD3FB',
      '#96BBF8',
      '#699EF5',
      '#4787F0',
      '#266FE8',
      '#0052D9',
      '#0744DA',
      '#103CAA',
      '#033381',
      '#0D2F66',
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
    height: 280px;
    margin: 0 auto;
  }
</style>
