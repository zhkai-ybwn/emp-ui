<template>
  <div ref="echartRef" class="chart-conatiner"> </div>
</template>

<script setup>
  import useEchart from '@/hooks/useEchart';
  import * as echarts from 'echarts';

  const props = defineProps({
    data: {
      type: [Number, null],
      default: () => null,
    },
  });

  const dataList = computed(() => props.data);

  const getvalue = () => {
    return dataList.value;
  };

  const getmax = 10;
  const colorList = ['#DDE379', '#1DB571'];

  function interpolateColor(percent) {
    // 将起始颜色和终点颜色转换为RGB格式
    const startRGB = { r: 221, g: 227, b: 121 };
    const endRGB = { r: 29, g: 181, b: 113 };

    // 计算中间颜色的RGB值
    const r = Math.round(startRGB.r + (endRGB.r - startRGB.r) * percent);
    const g = Math.round(startRGB.g + (endRGB.g - startRGB.g) * percent);
    const b = Math.round(startRGB.b + (endRGB.b - startRGB.b) * percent);

    // 将RGB值转换为十六进制颜色并返回
    return `rgb(${r}, ${g},${b})`;
  }

  const getSeries = () => {
    const series = [
      {
        type: 'bar',
        data: [
          {
            // 上层圆环，显示数据
            value: getvalue(),
            itemStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 1,
                y2: 0,
                colorStops: [
                  {
                    offset: 0,
                    color: colorList[0],
                  },
                  {
                    offset: 1,
                    // color: colorList[1],
                    color: interpolateColor(getvalue() / 10),
                  },
                ],
              },
            },
          },
        ],
        barGap: '-100%', // 柱间距离,上下两层圆环重合
        coordinateSystem: 'polar',
        // barWidth: 10,
        roundCap: true, // 顶端圆角
        z: 3, // 圆环层级，同zindex
      },
      {
        // 下层圆环，显示最大值
        type: 'bar',
        data: [
          {
            value: getmax,
            itemStyle: {
              color: '#4B5B76',
              borderWidth: 0,
            },
          },
        ],
        barGap: '-100%',
        coordinateSystem: 'polar',
        // barWidth: 10,
        roundCap: true,
        z: 1,
      },
      // 仪表盘
      {
        type: 'gauge',
        startAngle: 180, // 起始角度，同极坐标
        endAngle: 0, // 终止角度，同极坐标
        min: 0, // 最小刻度
        max: getmax, // 最大刻度
        splitNumber: 30, // 被分割的数量
        center: ['50%', '70%'],
        radius: '170%',
        axisLine: {
          show: false,
        },
        splitLine: {
          show: true,
          length: 1,
          distance: 0,
          lineStyle: {
            color: '#4B5B76',
          },
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          distance: 20,
          fontSize: 10,
          color: 'rgba(255, 255, 255, 0.6)',
          // eslint-disable-next-line consistent-return
          formatter(value) {
            if (value === 0 || value === 10) {
              return `\n\n\n${value}`;
            }
          },
        },
        splitLabel: {
          show: false,
        },
        pointer: {
          show: false,
        },
        z: 4,
        detail: {
          color: '#FFF',
          fontSize: 20,
          fontFamily: 'HarmonyOS-Regular',
          offsetCenter: [0, 1],
          formatter(value) {
            if (value || value === 0) return value;
            return '-';
          },
        },
        title: {
          show: false,
        },
        data: [
          {
            value: getvalue(),
          },
        ],
      },
    ];
    return series;
  };

  const getOptions = () => ({
    angleAxis: {
      show: false,
      max: (getmax * 360) / 180, // -45度到225度，二者偏移值是270度除360度
      type: 'value',
      startAngle: 180, // 极坐标初始角度
      splitLine: {
        show: false,
      },
    },
    barMaxWidth: 8, // 圆环宽度
    radiusAxis: {
      show: false,
      type: 'category',
    },
    // 圆环位置和大小
    polar: {
      center: ['50%', '70%'],
      radius: '200%',
    },
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
