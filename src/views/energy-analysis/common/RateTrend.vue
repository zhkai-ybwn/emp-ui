<!--
 * @Author: zhangk 13182353591@163.com
 * @Date: 2023-10-30 13:04:29
 * @LastEditors: zhangk 13182353591@163.com
 * @LastEditTime: 2024-04-01 08:55:12
 * @FilePath: \emp-admin-ui\src\views\energy-analysis\common\RateTrend.vue
 * @Description: 带最大值，最小值，平均值的折线图
 * 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
-->
<template>
  <div
    ref="echartRef"
    :style="{
      width: `${props.config.width}`,
      height: `${props.config.height}`,
    }"
  >
  </div>
</template>

<script setup>
  import useEchart from '@/hooks/useEchart';
  import moment from 'moment';
  import * as echarts from 'echarts';

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
  });

  const dataC = computed(() => props.data);

  const getData = () => {
    if (!dataC.value) return [];
    return dataC.value.map((item) => [
      moment(Number(item.ts)).format('YYYY-MM-DD HH:mm'),
      item.v,
    ]);
  };

  const getOptions = () => ({
    color: '#00C2FF',
    tooltip: {
      backgroundColor: 'rgba(6, 12, 28, 0.5)',
      borderColor: 'rgba(255, 255, 255, 0)',
      trigger: 'axis',
      axisPointer: {
        lineStyle: {
          color: 'rgba(255, 255, 255, 0.60)',
          type: 'dashed',
        },
        z: 1,
      },
      extraCssText: 'backdrop-filter: blur(1px);',
      textStyle: {
        fontFamily: 'HarmonyOS-Regular, sans-serif',
        fontSize: 14,
      },
      formatter: (params) => {
        const time = moment(params[0].data[0]).format('YYYY-MM-DD HH:mm');
        const content = `能耗值：${params[0].data[1]}kWh`;
        const tip = `<div style="color:#A5A9B8;">${time}</div><div style="color:rgba(255, 255, 255, 0.90);">${content}</div>`;
        return tip;
      },
    },
    grid: {
      top: '9%',
      bottom: '0%',
      left: '2%',
      right: '4%',
      containLabel: true,
    },
    xAxis: {
      type: 'time',
      axisLabel: {
        hideOverlap: true,
        color: '#C9CDD0',
        fontSize: 12,
        fontFamily: 'HarmonyOS-Regular, sans-serif',
        fontWeight: 400,
        formatter(value) {
          const time = moment(value);
          return time.format('MM-DD HH:mm');
        },
      },
      axisTick: { show: false },
      boundaryGap: false,
      axisLine: {
        lineStyle: {
          width: 2,
          color: '#8A9194',
          type: 'solid',
        },
      },
      splitLine: {
        show: true,
        lineStyle: {
          width: 1,
          color: 'rgba(87, 208, 235, 0.10)',
          type: 'dashed',
        },
      },
      splitArea: {
        show: false,
      },
    },
    yAxis: {
      name: '',
      type: 'value',
      axisTick: {
        show: false,
      },
      axisLine: {
        show: false,
      },
      axisLabel: {
        color: '#C9CDD0',
        fontSize: 12,
        fontFamily: 'HarmonyOS-Regular, sans-serif',
        fontWeight: 400,
        minWidth: 600,
      },
      splitLine: {
        show: true,
        lineStyle: {
          width: 1,
          color: 'rgba(87, 208, 235, 0.10)',
          type: 'dashed',
        },
      },
    },
    series: [
      {
        name: '',
        type: 'line',
        symbolSize: 15,
        z: 11,
        // eslint-disable-next-line max-len
        symbol:
          'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAsCAYAAAAehFoBAAAAAXNSR0IArs4c6QAABCpJREFUWEfVmduOVFUQhr9C5BCJ4iESBxXxMNFoSLwQghdeYIzhWuMb+ADEB0AeQMM1PoGJ3psYbkwIAW+IgciZ0WEwCIyJZw5S5m9rTfY03b13rd0zhpV0OuleVevftf9V9a9aRo/h7muBx4BHgY3Aw8CDgH7XuAP8Gd+/Ar8Ai2am36uG1Vi5u0C+ADwE3AYE5hbwF/APcDf8rgHWAQ8Am2K+vq8CV8zs5+z6KcDu/iTwcoASyMUGuK5r6yEeAZ4IgwtmttDVuBNgd9frfi2ipej80XWBlnl6Q88AfwMnzExvaOJoBezu24DtwHXgRpvDyv8VbdFszsx+mORjImB3fzEicCG4Womnk5k2q/bFvJmdH2cxFnCAnQEEtmyiTiv3mCTQz8WGHAl6JOD/CWx5TmWU58eBvgdwcFYGq0GDcS9DoF8CLg5zehngyAa7NHEVONvGHNFDm/14M3sMA34zisBKZYM2kMP/K3tsMLNvyx9LgN19KzALnM56XeH5oue5UhWbgN8S0adYFKb1HCouM2b2jRwOADdK7rlprTJlP4ry92a2WAC/DtwMNVW7lvj/LrAXeDqcnAJOAp8Al2sdh+4YcNncXbtxDyDnUlrZIUn5EfBhi+FnAVyiKTuU5lQFjwiwFNgg52W9hP79IoRRF3NF+/3IRF3mN+f8t/ncXXJxQ2jUrJMDHSI77FOR3p9dKGhxS4DfCO5mJaNk4bGKhWXyHnA0aSvqbRRgbZafQpNmfBwEPsgYNObWRFknl20C/DZwpmLDfQ28Wgl4HpAEyAxtvFkBVir6LmMZc1Vk+gxJ1+zYcV8CrqXE8UaByEZKOf+dpNESJaQhdI7SMT0zalJa8f85sC+zWPQ9togSKstqdmQr0G7gy+SiZfrOilKtfsbmUjhUnnUqzo6aKB8CPs4uBGxRo2YapVlR7pre+pRmaYmzRfyoeOgMt5LiR5H9tIJ6ehnacArK4SIvVZ7VfamhRXm7KtVSbXJcIq4C8VV8sqW4yRo1G9eZ2YkCWF2XVyoVWwUd0yZSk6d1TLofjkjKDk8tOyLpeXvq4nTIEgaSv2fMbCAFho/50+ByAkvrVB3zN5nZEv9HNVKU1OcqKl/r6skJkpNqpBwb20gJaqi9OjiOVKa5JK6R0wVWGCa3qoqpuytJq7Gic15Nbu4DujQDF8xMtWHZmNRuLaBrhFEt4Ilg79l0w6tEpJ+NSGfVXBZ0ocGPoyJbnHW9MlCTWRcwfSrhpAdQNngcuNTryqDBaV3KSIauD1n4ezZ8Y+arKEiFqet0ciqXMs2F3F3nMN176M1cCyGT3ZTiqbSBrr50BTYouV0D0EqJUY6iKiqLqGukfoYirm+BF9fLQwicPnpD0twCqVtSzT1vZroZTY0qwA2qNK9uy7WtwDWvbnVT+lucanpf3f4LCKpLgoLQOEQAAAAASUVORK5CYII=',
        showSymbol: false,
        areaStyle: {
          color: new echarts.graphic.LinearGradient(
            0,
            0,
            0,
            1,
            [
              {
                offset: 0,
                color: 'rgba(0, 148, 255, 0.3)',
              },
              {
                offset: 1,
                color: 'rgba(0, 148, 255, 0)',
              },
            ],
            false
          ),
          shadowColor: 'rgba(0, 0, 0, 0.1)',
          shadowBlur: 10,
        },
        itemStyle: {
          label: {
            show: false,
          },
        },
        lineStyle: {
          color: '#90D7FF',
        },
        markLine: {
          data: [
            {
              type: 'max',
              name: '最大值',
              label: {
                show: true,
                position: 'insideEndTop',
                formatter: (params) => {
                  return params.value > 0 ? `最大值：${params.value}` : '';
                },
                color: 'rgba(255, 255, 255, 0.85)',
                fontFamily: 'HarmonyOS-Regular, sans-serif',
                fontSize: 12,
                fontWeight: 400,
                lineHeight: 20,
              },
            },
            {
              type: 'average',
              name: '平均值',
              label: {
                show: true,
                position: 'insideEndTop',
                formatter: (params) => {
                  return params.value > 0 ? `平均值：${params.value}` : '';
                },
                color: 'rgba(255, 255, 255, 0.85)',
                fontFamily: 'HarmonyOS-Regular, sans-serif',
                fontSize: 12,
                fontWeight: 400,
                lineHeight: 20,
              },
            },
            {
              type: 'min',
              name: '最小值',
              label: {
                show: true,
                position: 'insideEndTop',
                formatter: (params) => {
                  return params.value > 0 ? `最小值：${params.value}` : '';
                },
                color: 'rgba(255, 255, 255, 0.85)',
                fontFamily: 'HarmonyOS-Regular, sans-serif',
                fontSize: 12,
                fontWeight: 400,
                lineHeight: 20,
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
        data: getData(),
      },
    ],
  });
  const { echartRef, renderChart } = useEchart(getOptions, {
    isWatch: true,
    watchData: dataC,
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
