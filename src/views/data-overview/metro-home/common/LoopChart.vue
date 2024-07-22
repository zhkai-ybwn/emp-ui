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

  const colorList = ['#00A7FF', '#00FFFF', '#3AFF8C'];

  const data1 = [];
  const data2 = [];
  const data3 = [];

  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < dataList.value.length; i++) {
    data1.push({
      value: dataList.value[i].value,
      name: dataList.value[i].name,
      itemStyle: {
        color: colorList[i],
        shadowColor: colorList[i],
        shadowBlur: 8,
      },
    });
    data2.push({
      value: dataList.value[i].value,
      name: dataList.value[i].name,
      itemStyle: {
        color: colorList[i],
        opacity: 0.4,
      },
    });

    data3.push({
      value: dataList.value[i].value,
      name: dataList.value[i].name,
      itemStyle: {
        color: colorList[i],
        opacity: 0.1,
      },
    });
  }
  const getSeries = () => {
    const series = [
      {
        type: 'pie',
        radius: ['60%', '70%'],
        center: ['50%', '50%'],
        z: 10,
        label: {
          show: false,
          position: 'center',
          formatter: (params) => {
            return `${params.name}\r\n${params.value}`;
          },
          rich: {
            total: {
              fontSize: 16,
              color: '#04F5FE',
            },
            efficiency: {
              fontSize: 12,
              color: '#00FD6D',
            },
          },
          color: '#FFFFFF',
          fontSize: 12,
          lineHeight: 16,
        },
        data: data1,
        labelLine: {
          show: false,
        },
      },
      {
        type: 'pie',
        radius: ['49%', '60%'],
        center: ['50%', '50%'],
        label: {
          show: false,
        },
        data: data2,
        labelLine: {
          show: false,
        },
      },
      {
        type: 'pie',
        radius: ['38%', '49%'],
        center: ['50%', '50%'],
        label: {
          show: false,
        },
        data: data3,
        labelLine: {
          show: false,
        },
      },
      {
        type: 'pie',
        radius: ['80%', '81%'],
        center: ['50%', '50%'],
        label: {
          show: false,
        },
        data: [10],
        itemStyle: {
          color: '#104459',
        },
        labelLine: {
          show: false,
        },
      },
    ];
    return series;
  };

  const getOptions = () => ({
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
