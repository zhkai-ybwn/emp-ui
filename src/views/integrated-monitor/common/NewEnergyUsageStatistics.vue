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
  const color = ['#266FE8', '#4787F0', '#699EF5', '#96BBF8', '#BBD3FB'];
  const dataList = computed(() => props.data);

  const getSeries = () => {
    const dataC = Object.keys(dataList.value).map((key) => {
      return { name: key, value: dataList.value[key] };
    });
    // 使用 reduce 方法计算 value 的总和
    const totalValue = computed(() =>
      dataC.reduce((accumulator, item) => accumulator + item.value, 0)
    );

    const obj = [];
    dataC.forEach((item) => {
      if (dataC.length > 1) {
        obj.push(
          {
            value: item.value,
            name: item.name,
            label: {
              show: false,
            },
            itemStyle: {
              labelLine: {
                show: false,
              },
              borderWidth: 2,
              shadowBlur: 2,
              borderRadius: 0,
              borderColor: 'rgba(255,255,255,0.2)',
              shadowColor: 'rgba(255, 255, 255, 0.20)',
            },
          },
          {
            value: totalValue.value * 0.01,
            name: '',
            itemStyle: {
              labelLine: {
                show: false,
              },
              color: 'rgba(0, 0, 0, 0)',
              borderColor: 'rgba(0, 0, 0, 0)',
              borderWidth: 0,
            },
          }
        );
      } else {
        obj.push({
          value: item.value,
          name: item.name,
          label: {
            show: false,
          },
          itemStyle: {
            labelLine: {
              show: false,
            },
            borderWidth: 2,
            shadowBlur: 2,
            borderRadius: 0,
            borderColor: 'rgba(255,255,255,0.2)',
            shadowColor: 'rgba(255, 255, 255, 0.20)',
          },
        });
      }
    });
    return obj;
  };
  const getOptions = () => ({
    color,
    tooltip: {
      show: false,
    },
    title: [
      {
        text: '系统用能\n占比统计',
        top: 'center',
        left: 'center',
        textStyle: {
          fontSize: 18,
          fontWeight: 400,
          color: '#FFF',
          lineHeight: 24,
        },
      },
    ],
    series: [
      {
        name: '',
        type: 'pie',
        radius: ['90%', '110%'],
        center: ['50%', '50%'],
        emphasis: {
          scale: false,
        },
        clockwise: false,
        top: 'center',
        itemStyle: {
          label: {
            show: false,
          },
        },
        data: getSeries(),
      },
      {
        name: '',
        type: 'pie',
        radius: ['75%', '76%'],
        center: ['50%', '50%'],
        emphasis: {
          scale: false,
        },
        clockwise: false,
        top: 'center',
        label: {
          normal: {
            show: false,
          },
          emphasis: {
            show: false,
          },
        },
        labelLine: {
          normal: {
            show: false,
          },
          emphasis: {
            show: false,
          },
        },
        itemStyle: {
          label: {
            show: false,
          },
        },
        data: [
          {
            value: 1,
            itemStyle: {
              color: 'rgba(250,250,250,0.4)',
            },
          },
        ],
      },
      {
        name: '',
        type: 'pie',
        radius: ['130%', '131%'],
        center: ['50%', '50%'],
        emphasis: {
          scale: false,
        },
        clockwise: false,
        top: 'center',
        label: {
          normal: {
            show: false,
          },
          emphasis: {
            show: false,
          },
        },
        labelLine: {
          normal: {
            show: false,
          },
          emphasis: {
            show: false,
          },
        },
        itemStyle: {
          label: {
            show: false,
          },
        },
        data: [
          {
            value: 1,
            itemStyle: {
              color: 'rgba(250,250,250,0.2)',
            },
          },
        ],
      },
      {
        name: '',
        type: 'pie',
        radius: ['120%', '130%'],
        center: ['50%', '50%'],
        emphasis: {
          scale: false,
        },
        clockwise: false,
        top: 'center',
        label: {
          normal: {
            show: false,
          },
          emphasis: {
            show: false,
          },
        },
        labelLine: {
          normal: {
            show: false,
          },
          emphasis: {
            show: false,
          },
        },
        itemStyle: {
          label: {
            show: false,
          },
        },
        data: [
          {
            value: 1,
            itemStyle: {
              color: 'rgba(250,250,250,0.05)',
            },
          },
        ],
      },
    ],
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
