<template>
  <div style="position: relative">
    <div ref="echartRef" class="chart-conatiner"> </div>
  </div>
</template>

<script setup>
  import useEchart from '@/hooks/useEchart';
  import * as echarts from 'echarts';
  import 'echarts-gl';

  const props = defineProps({
    dataList: {
      type: Array,
      default: () => [],
    },
  });
  const data = props.dataList;

  const colorList = [
    'rgba(7, 166, 255,  0.9)',
    'rgba(69, 244, 245,  0.9)',
    'rgba(255, 208, 118,  0.9)',
    'rgba(255, 255, 255,  0.9)',
    'rgba(109, 148, 198, 0.9)',
  ];

  // 生成扇形的曲面参数方程，用于 series-surface.parametricEquation
  function getParametricEquation(
    startRatio,
    endRatio,
    isSelected,
    isHovered,
    k,
    h
  ) {
    // 计算
    const midRatio = (startRatio + endRatio) / 2;

    const startRadian = startRatio * Math.PI * 2;
    const endRadian = endRatio * Math.PI * 2;
    const midRadian = midRatio * Math.PI * 2;

    // 如果只有一个扇形，则不实现选中效果。
    // if (startRatio === 0 && endRatio === 1) {
    //     isSelected = false;
    // }
    isSelected = false;
    // 通过扇形内径/外径的值，换算出辅助参数 k（默认值 1/3）
    k = typeof k !== 'undefined' ? k : 1 / 3;

    // 计算选中效果分别在 x 轴、y 轴方向上的位移（未选中，则位移均为 0）
    const offsetX = isSelected ? Math.sin(midRadian) * 0.1 : 0;
    const offsetY = isSelected ? Math.cos(midRadian) * 0.1 : 0;

    // 计算高亮效果的放大比例（未高亮，则比例为 1）
    const hoverRate = isHovered ? 1.05 : 1;

    // 返回曲面参数方程
    return {
      u: {
        min: -Math.PI,
        max: Math.PI * 3,
        step: Math.PI / 32,
      },

      v: {
        min: 0,
        max: Math.PI * 2,
        step: Math.PI / 20,
      },

      x(u, v) {
        if (u < startRadian) {
          return (
            (offsetX +
              Math.cos(startRadian) * (1 + Math.cos(v) * k) * hoverRate) *
            1
          );
        }
        if (u > endRadian) {
          return (
            (offsetX +
              Math.cos(endRadian) * (1 + Math.cos(v) * k) * hoverRate) *
            1
          );
        }
        return (offsetX + Math.cos(u) * (1 + Math.cos(v) * k) * hoverRate) * 1;
      },

      y(u, v) {
        if (u < startRadian) {
          return (
            (offsetY +
              Math.sin(startRadian) * (1 + Math.cos(v) * k) * hoverRate) *
            1
          );
        }
        if (u > endRadian) {
          return (
            (offsetY +
              Math.sin(endRadian) * (1 + Math.cos(v) * k) * hoverRate) *
            1
          );
        }
        return (offsetY + Math.sin(u) * (1 + Math.cos(v) * k) * hoverRate) * 1;
      },

      z(u, v) {
        if (u < -Math.PI * 0.5) {
          return Math.sin(u);
        }
        if (u > Math.PI * 2.5) {
          return Math.sin(u) * h * 0.1;
        }
        return Math.sin(v) > 0 ? 1 * h * 0.1 : -1;
      },
    };
  }

  // 生成模拟 3D 饼图的配置项
  function getPie3D(pieData, internalDiameterRatio) {
    const series = [];
    let sumValue = 0;
    let startValue = 0;
    let endValue = 0;
    const legendData = [];
    const k =
      typeof internalDiameterRatio !== 'undefined'
        ? (1 - internalDiameterRatio) / (1 + internalDiameterRatio)
        : 1 / 3;

    // 为每一个饼图数据，生成一个 series-surface 配置
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < pieData.length; i++) {
      sumValue += pieData[i].value;

      const seriesItem = {
        name:
          typeof pieData[i].name === 'undefined'
            ? `series${i}`
            : pieData[i].name,
        type: 'surface',
        parametric: true,
        wireframe: {
          show: false,
        },
        pieData: pieData[i],
        pieStatus: {
          selected: false,
          hovered: false,
          k: 1 / 10,
        },
      };

      if (typeof pieData[i].itemStyle !== 'undefined') {
        const itemStyle = {};

        // eslint-disable-next-line no-unused-expressions
        typeof pieData[i].itemStyle.color !== 'undefined'
          ? (itemStyle.color = pieData[i].itemStyle.color)
          : null;
        // eslint-disable-next-line no-unused-expressions
        typeof pieData[i].itemStyle.opacity !== 'undefined'
          ? (itemStyle.opacity = pieData[i].itemStyle.opacity)
          : null;

        seriesItem.itemStyle = itemStyle;
      }
      series.push(seriesItem);
    }

    // 使用上一次遍历时，计算出的数据和 sumValue，调用 getParametricEquation 函数，
    // 向每个 series-surface 传入不同的参数方程 series-surface.parametricEquation，也就是实现每一个扇形。
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < series.length; i++) {
      endValue = startValue + series[i].pieData.value;

      series[i].pieData.startRatio = startValue / sumValue;
      series[i].pieData.endRatio = endValue / sumValue;
      series[i].parametricEquation = getParametricEquation(
        series[i].pieData.startRatio,
        series[i].pieData.endRatio,
        false,
        false,
        k,
        series[i].pieData.value
      );

      startValue = endValue;

      legendData.push(series[i].name);
    }

    // // 补充一个透明的圆环，用于支撑高亮功能的近似实现。
    series.push({
      name: 'mouseoutSeries',
      type: 'surface',
      parametric: true,
      wireframe: {
        show: false,
      },
      itemStyle: {
        opacity: 0.1,
        color: '#E1E8EC',
      },
      parametricEquation: {
        u: {
          min: 0,
          max: Math.PI * 2,
          step: Math.PI / 20,
        },
        v: {
          min: 0,
          max: Math.PI,
          step: Math.PI / 20,
        },
        x(u, v) {
          return ((Math.sin(v) * Math.sin(u) + Math.sin(u)) / Math.PI) * 2;
        },
        y(u, v) {
          return ((Math.sin(v) * Math.cos(u) + Math.cos(u)) / Math.PI) * 2;
        },
        z(u, v) {
          return Math.cos(v) > 0 ? -2 : -2;
        },
      },
    });

    // // 补充一个透明的圆环，用于支撑高亮功能的近似实现。
    series.push({
      name: 'mouseoutSeries',
      type: 'surface',
      parametric: true,
      wireframe: {
        show: false,
      },
      itemStyle: {
        opacity: 0.1,
        color: 'rgba(101, 153, 164, 0.24)',
      },
      parametricEquation: {
        u: {
          min: 0,
          max: Math.PI * 2,
          step: Math.PI / 20,
        },
        v: {
          min: 0,
          max: Math.PI,
          step: Math.PI / 20,
        },
        x(u, v) {
          return ((Math.sin(v) * Math.sin(u) + Math.sin(u)) / Math.PI) * 1;
        },
        y(u, v) {
          return ((Math.sin(v) * Math.cos(u) + Math.cos(u)) / Math.PI) * 1;
        },
        z(u, v) {
          return Math.cos(v) > 0 ? -5 : -5;
        },
      },
    });
    // series.push({
    //   name: 'mouseoutSeries',
    //   type: 'surface',

    //   parametric: true,
    //   wireframe: {
    //     show: false,
    //   },
    //   itemStyle: {
    //     opacity: 0.1,
    //     color: '#E1E8EC',
    //   },
    //   parametricEquation: {
    //     u: {
    //       min: 0,
    //       max: Math.PI * 2,
    //       step: Math.PI / 20,
    //     },
    //     v: {
    //       min: 0,
    //       max: Math.PI,
    //       step: Math.PI / 20,
    //     },
    //     x(u, v) {
    //       return ((Math.sin(v) * Math.sin(u) + Math.sin(u)) / Math.PI) * 1.2;
    //     },
    //     y(u, v) {
    //       return ((Math.sin(v) * Math.cos(u) + Math.cos(u)) / Math.PI) * 1.2;
    //     },
    //     z(u, v) {
    //       return Math.cos(v) > 0 ? -7 : -7;
    //     },
    //   },
    // });

    // 准备待返回的配置项，把准备好的 legendData、series 传入。
    const option = {
      legend: {
        show: false,
      },
      xAxis3D: {},
      yAxis3D: {},
      zAxis3D: {},
      grid3D: {
        viewControl: {
          autoRotate: true, // 自动旋转
          rotateSensitivity: 0,
          zoomSensitivity: 0,
        },
        left: '0%',
        bottom: '0%',
        width: '100%',
        height: '100%',
        show: false,
        boxHeight: 130,
        boxWidth: 180,
        boxDepth: 180,
      },
      series,
    };
    return option;
  }

  const serData = data.map((dItem, index) => {
    return {
      ...dItem,
      value: Number(dItem.value),
      itemStyle: {
        color: colorList[index],
      },
    };
  });

  const getOptions = () => getPie3D(serData, 0.7);

  const { echartRef, renderChart } = useEchart(getOptions, {
    isWatch: true,
    watchData: data,
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
    height: 130px;
  }
</style>
