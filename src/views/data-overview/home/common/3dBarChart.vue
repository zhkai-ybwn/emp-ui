<!--
 * @Author: zhangkai 2572429235@qq.com
 * @Date: 2023-09-21 15:58:33
 * @LastEditors: zhangk 13182353591@163.com
 * @LastEditTime: 2024-03-26 17:57:20
 * @FilePath: \emp-admin-ui\src\views\data-overview\home\common\3dBarChart.vue
 * @Description: 3D柱形图
-->
<template>
  <div
    ref="echartRef"
    :style="{
      width: `${props.config.width}px`,
      height: `${props.config.height}px`,
    }"
  >
  </div>
</template>

<script setup>
  import useEchart from '@/hooks/useEchart';
  import * as echarts from 'echarts';

  const props = defineProps({
    data: {
      type: Object,
      default: () => ({
        xData: [],
        yData: [],
      }),
    },
    config: {
      type: Object,
      default: () => ({
        width: 437,
        height: 180,
      }),
    },
  });

  const yDataC = computed(() => {
    return props.data.yData;
  });

  const offsetX = 8; // bar宽
  const offsetY = 3; // 倾斜角度
  // 绘制左侧面
  const CubeLeft = echarts.graphic.extendShape({
    shape: {
      x: 0,
      y: 0,
    },
    buildPath(ctx, shape) {
      // 会canvas的应该都能看得懂，shape是从custom传入的
      const { xAxisPoint } = shape;
      const c0 = [shape.x, shape.y];
      const c1 = [shape.x - offsetX, shape.y - offsetY];
      const c2 = [xAxisPoint[0] - offsetX, xAxisPoint[1] - offsetY];
      const c3 = [xAxisPoint[0], xAxisPoint[1]];
      ctx
        .moveTo(c0[0], c0[1])
        .lineTo(c1[0], c1[1])
        .lineTo(c2[0], c2[1])
        .lineTo(c3[0], c3[1])
        .closePath();
    },
  });
  // 绘制右侧面
  const CubeRight = echarts.graphic.extendShape({
    shape: {
      x: 0,
      y: 0,
    },
    buildPath(ctx, shape) {
      const { xAxisPoint } = shape;
      const c1 = [shape.x, shape.y];
      const c2 = [xAxisPoint[0], xAxisPoint[1]];
      const c3 = [xAxisPoint[0] + offsetX, xAxisPoint[1] - offsetY];
      const c4 = [shape.x + offsetX, shape.y - offsetY];
      ctx
        .moveTo(c1[0], c1[1])
        .lineTo(c2[0], c2[1])
        .lineTo(c3[0], c3[1])
        .lineTo(c4[0], c4[1])
        .closePath();
    },
  });
  // 绘制顶面
  const CubeTop = echarts.graphic.extendShape({
    shape: {
      x: 0,
      y: 0,
    },
    buildPath(ctx, shape) {
      const c1 = [shape.x, shape.y];
      const c2 = [shape.x + offsetX, shape.y - offsetY]; // 右点
      // const c3 = [shape.x, shape.y - offsetX];
      const c3 = [shape.x, shape.y - offsetY * 2];
      const c4 = [shape.x - offsetX, shape.y - offsetY];
      ctx
        .moveTo(c1[0], c1[1])
        .lineTo(c2[0], c2[1])
        .lineTo(c3[0], c3[1])
        .lineTo(c4[0], c4[1])
        .closePath();
    },
  });
  // 注册三个面图形
  echarts.graphic.registerShape('CubeLeft', CubeLeft);
  echarts.graphic.registerShape('CubeRight', CubeRight);
  echarts.graphic.registerShape('CubeTop', CubeTop);
  const colorArr1 = [
    ['rgba(24, 144, 255, 1)'],
    ['rgba(23, 133, 236, 1)', 'rgba(23, 133, 236, 0.26)'],
    ['rgba(24, 144, 255, 1)', 'rgba(24, 144, 255, 0.24)'],
  ];
  const colorArr2 = [
    ['rgba(255, 133, 46, 1)'],
    ['rgba(240, 124, 41, 1)', 'rgba(240, 124, 41, 0.2)'],
    ['rgba(255, 133, 46, 1)', 'rgba(255, 133, 46, 0.2)'],
  ];
  const colorArr3 = [
    ['rgba(1, 255, 194, 1)'],
    ['rgba(1, 228, 174, 1)', 'rgba(1, 228, 174, 0.2)'],
    ['rgba(1, 255, 194, 1)', 'rgba(1, 255, 194, 0.2)'],
  ];

  const getColors = (value) => {
    if (props.data.xData[value] === '综合楼') {
      return colorArr2;
    }
    if (props.data.xData[value] === '成品储运部') {
      return colorArr3;
    }
    return colorArr1;
  };

  const getOptions = () => ({
    tooltip: {
      show: false,
    },
    grid: {
      top: '20%',
      bottom: '0%',
      left: '8%',
      right: '0%',
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      data: props.data.xData,
      axisLine: {
        show: true,
        lineStyle: {
          width: 2,
          color: 'rgba(255, 255, 255, 0.15)',
          type: [2, 4],
        },
      },
      axisTick: {
        show: false,
      },
      axisLabel: {
        fontSize: 14,
        color: 'rgba(255, 255, 255, 0.8);',
        fontWeight: 400,
        interval: 0,
      },
    },
    yAxis: {
      type: 'value',
      // name: 'kWh',
      nameTextStyle: {
        color: 'rgba(255, 255, 255, 0.8)',
        fontFamily: 'HarmonyOS-Regular',
        fontSize: 10,
        padding: [-20, 0, 0, -36],
      },
      axisLine: {
        show: false,
        lineStyle: {
          width: 2,
          color: '#2B7BD6',
        },
      },
      splitLine: {
        show: false,
        lineStyle: {
          color: '#153D7D',
        },
      },
      axisTick: {
        show: false,
      },
      axisLabel: {
        show: true,
        fontSize: 14,
        color: 'rgba(255, 255, 255, 0.8)',
      },
    },
    series: [
      {
        type: 'custom',
        renderItem: (params, api) => {
          const location = api.coord([api.value(0), api.value(1)]);
          return {
            type: 'group',
            children: [
              {
                type: 'CubeLeft',
                shape: {
                  api,
                  xValue: api.value(0),
                  yValue: api.value(1),
                  x: location[0],
                  y: location[1],
                  xAxisPoint: api.coord([api.value(0), 0]),
                },
                style: {
                  fill: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    {
                      offset: 0,
                      color: getColors(api.value(0))[1][0],
                    },
                    {
                      offset: 1,
                      color: getColors(api.value(0))[1][1],
                    },
                  ]),
                },
              },
              {
                type: 'CubeRight',
                shape: {
                  api,
                  xValue: api.value(0),
                  yValue: api.value(1),
                  x: location[0],
                  y: location[1],
                  xAxisPoint: api.coord([api.value(0), 0]),
                },
                style: {
                  fill: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    {
                      offset: 0,
                      color: getColors(api.value(0))[2][0],
                    },
                    {
                      offset: 1,
                      color: getColors(api.value(0))[2][1],
                    },
                  ]),
                },
              },
              {
                type: 'CubeTop',
                shape: {
                  api,
                  xValue: api.value(0),
                  yValue: api.value(1),
                  x: location[0],
                  y: location[1],
                  xAxisPoint: api.coord([api.value(0), 0]),
                },
                style: {
                  fill: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    {
                      offset: 0,
                      color: getColors(api.value(0))[0][0],
                    },
                    {
                      offset: 1,
                      color: getColors(api.value(0))[0][0],
                    },
                  ]),
                },
              },
            ],
          };
        },
        data: props.data.yData,
      },
      {
        type: 'bar',
        label: {
          show: true,
          position: 'top',
          formatter: (e) => e.value,
          fontSize: 14,
          color: 'rgba(255, 255, 255, 0.8)',
          fontFamily: 'siyuan',
          fontWeight: 'bold',
          offset: [0, -15],
        },
        itemStyle: {
          color: 'transparent',
        },
        data: props.data.yData,
      },
    ],
  });
  const { echartRef, renderChart } = useEchart(getOptions, {
    isWatch: true,
    watchData: yDataC,
  });
  renderChart(true, true);
</script>
