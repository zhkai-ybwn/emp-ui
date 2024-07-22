<!--
 * @Author: zhangk 13182353591@163.com
 * @Date: 2023-10-30 13:04:29
 * @LastEditors: zhangk 13182353591@163.com
 * @LastEditTime: 2024-02-27 13:16:03
 * @FilePath: \emp-admin-ui\src\views\data-overview\energy-plant\common\RingChart.vue
 * @Description: 环形图公共组件
 * 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
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

  const props = defineProps({
    data: {
      type: Array,
      default: () => [],
    },
    config: {
      type: Object,
      default: () => ({
        width: 176,
        height: 176,
      }),
    },
    color: {
      type: Array,
      default: () => [
        'rgba(40,113,202,1)',
        {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: 'rgba(113,111,255,1)', // 0% 处的颜色
            },
            {
              offset: 1,
              color: 'rgba(69,96,189,1) ', // 100% 处的颜色
            },
          ],
          global: false, // 缺省为 false
        },
        {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: 'rgba(155,118,203,1)', // 0% 处的颜色
            },
            {
              offset: 1,
              color: 'rgba(115,102,190,1)', // 100% 处的颜色
            },
          ],
          global: false, // 缺省为 false
        },
        {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: '	rgba(148,122,84, 0.92)', // 0% 处的颜色
            },
            {
              offset: 1,
              color: 'rgba(255,173,50, 1)', // 100% 处的颜色
            },
          ],
          global: false, // 缺省为 false
        },
        {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: 'rgba(49, 255, 243, 0.40)', // 0% 处的颜色
            },
            {
              offset: 1,
              color: 'rgba(18, 228, 216, 0.85)', // 100% 处的颜色
            },
          ],
          global: false, // 缺省为 false
        },
      ],
    },
  });

  const dataC = computed(() => props.data);
  // 使用 reduce 方法计算 value 的总和
  const totalValue = computed(() =>
    dataC.value.reduce((accumulator, item) => accumulator + item.value, 0)
  );

  const getSeries = () => {
    const obj = [];
    dataC.value.forEach((item, index) => {
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
            borderColor: props.color[index],
            shadowColor: 'rgba(255, 255, 255, 0.20)',
          },
        },
        {
          value: totalValue.value * 0.02,
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
    });
    return obj;
  };
  const getOptions = () => ({
    color: props.color,
    tooltip: {
      show: false,
    },
    series: [
      {
        name: '',
        type: 'pie',
        radius: ['120%', '140%'],
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
    ],
  });
  const { echartRef, renderChart } = useEchart(getOptions, {
    isWatch: true,
    watchData: dataC,
  });
  renderChart(true, true);
</script>
