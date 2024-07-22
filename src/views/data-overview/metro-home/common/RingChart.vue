<template>
  <div ref="echartRef" class="chart-conatiner"> </div>
</template>

<script setup>
  import useEchart from '@/hooks/useEchart';
  import * as echarts from 'echarts';

  const props = defineProps({
    data: {
      type: String,
      default: () => '',
    },
    name: {
      type: String,
      default: () => '',
    },
  });

  const dataList = computed(() => props.data);

  const getvalue = () => {
    return dataList.value;
  };

  const getmax = 10;
  const colorList = ['#0fffff', '#86fdd4', '#0fff50'];

  function interpolateColor(percent, endRGB = { r: 134, g: 253, b: 212 }) {
    // 将起始颜色和终点颜色转换为RGB格式
    const startRGB = { r: 0, g: 255, b: 255 };

    // 计算中间颜色的RGB值
    const r = Math.round(startRGB.r + (endRGB.r - startRGB.r) * percent);
    const g = Math.round(startRGB.g + (endRGB.g - startRGB.g) * percent);
    const b = Math.round(startRGB.b + (endRGB.b - startRGB.b) * percent);

    // 将RGB值转换为十六进制颜色并返回
    return `rgb(${r}, ${g},${b})`;
  }

  const getColor = () => {
    if (getvalue() <= 5) {
      return {
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
            color: interpolateColor(getvalue() / 5),
          },
        ],
      };
    }
    return {
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
          offset: 5 / getvalue(),
          color: colorList[1],
        },
        {
          offset: 1,
          // color: colorList[1],
          color: interpolateColor((getvalue() - 5) / 5, {
            r: 0,
            g: 255,
            b: 102,
          }),
        },
      ],
    };
  };

  const getSeries = () => {
    const series = [
      {
        type: 'bar',
        data: [
          {
            // 上层圆环，显示数据
            value: getvalue(),
            itemStyle: {
              color: getColor(),
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
        splitNumber: 50, // 被分割的数量
        center: ['50%', '80%'],
        radius: '138%',
        axisLine: {
          show: false,
        },
        pointer: {
          icon: 'circle', // 箭头图标
          length: '177%',
          width: 8,
          height: 8,
          offsetCenter: ['0%', '0%'],
          itemStyle: {
            color: 'rgba(74, 234, 174, 1)', // 箭头颜色
            shadowColor: 'rgba(74, 234, 174, 1)',
            shadowBlur: 10,
          },
        },
        splitLine: {
          show: true,
          length: 1,
          distance: 0,
          lineStyle: {
            color: 'rgba(1, 255, 255, 0.5)',
          },
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          show: false,
        },
        splitLabel: {
          show: false,
        },
        z: 4,
        detail: {
          show: false,
          // fontFamily: 'HarmonyOS-Regular',
          // offsetCenter: [0, '-20%'],
          // formatter(value) {
          //   return `{a|${value}}\n{b|${props.name}}`;
          // },
          // rich: {
          //   a: {
          //     color: '#FFF',
          //     fontSize: 20,
          //     lineHeight: 20,
          //     fontFamily: 'Barlow-SemiBold',
          //   },
          //   b: {
          //     color: '#FFF',
          //     fontSize: 12,
          //     lineHeight: 14,
          //     fontFamily: 'HarmonyOS-Regular',
          //   },
          // },
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

      {
        type: 'pie',
        radius: [0, '75%'],
        center: ['50%', '80%'],
        roseType: 'radius',
        silent: true,
        startAngle: 180,
        legendHoverLink: false,
        itemStyle: {
          borderRadius: 0,
        },
        label: {
          show: false,
        },
        emphasis: {
          label: {
            show: false,
          },
        },
        color: ['rgba(77, 129, 160, 0.18)', 'transparent'],
        data: [10, 10],
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
    barMaxWidth: 13, // 圆环宽度
    radiusAxis: {
      show: false,
      type: 'category',
    },
    // 圆环位置和大小
    polar: {
      center: ['50%', '80%'],
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
