<!--
 * @Author: zhangk 13182353591@163.com
 * @Date: 2024-02-22 09:08:51
 * @LastEditors: zhangk 13182353591@163.com
 * @LastEditTime: 2024-03-26 17:13:18
 * @FilePath: \emp-admin-ui\src\views\integrated-monitor\common\LineChart.vue
 * @Description: 单折线图
 * 
 * Copyright (c) 2024 by ${git_name_email}, All Rights Reserved. 
-->
<template>
  <div
    ref="echartRef"
    :style="{
      width: props.config.width,
      height: props.config.height,
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
    return dataC.value.map((item) => [Number(item.ts), item.value]);
  };

  const getOptions = () => ({
    color: '#49E3E7',
    tooltip: {
      backgroundColor: 'rgba(6, 12, 28, 0.50)',
      borderColor: 'transparent',
      trigger: 'axis',
      axisPointer: {
        lineStyle: {
          color: 'rgba(255, 255, 255, 0.60)',
          type: 'dashed',
        },
        z: 1,
      },
      extraCssText: 'backdrop-filter: blur(2px);border-radius: 2px;',
      textStyle: {
        color: 'rgba(255, 255, 255, 0.90)',
      },
      formatter: (params) => {
        let tip = '';
        const time = `<div style="color:#A5A9B8;font-size: 14px;font-family: HarmonyOS-Regular, sans-serif;">截止到今日&nbsp;&nbsp;${moment(
          params[0].data[0]
        ).format('HH:mm')}</div>`;
        const content = `<div style="color:rgba(255, 255, 255, 0.90);font-size: 14px;font-family: HarmonyOS-Regular, sans-serif;">累计节能&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${params[0].data[1]}kWh</div>`;
        tip = time + content;
        return tip;
      },
    },
    grid: {
      top: '4%',
      bottom: '0%',
      left: '0%',
      right: '4%',
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      axisLabel: {
        color: 'rgba(255,255,255,0.85)',
        fontSize: 14,
        fontFamily: 'HarmonyOS-Regular',
        fontWeight: 400,
        formatter(value) {
          return moment.unix(value / 1000).format('HH:mm');
        },
      },
      axisTick: { show: false },
      boundaryGap: false,
      axisLine: {
        lineStyle: {
          width: 1.5,
          color: '#8A9194',
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
    },
    yAxis: {
      name: '',
      nameTextStyle: {
        color: 'rgba(255, 255, 255, 0.84)',
        fontFamily: 'SourceHanSansCN-Normal, sans-serif',
        fontSize: 14,
        padding: [0, 0, 0, 10],
      },
      type: 'value',
      axisTick: {
        show: false,
      },
      axisLine: {
        show: false,
      },
      axisLabel: {
        color: 'rgba(255,255,255,0.85)',
        fontSize: 14,
        fontFamily: 'SourceHanSansCN-Normal, sans-serif',
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
        // eslint-disable-next-line max-len
        symbol:
          'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAsCAYAAAAehFoBAAAAAXNSR0IArs4c6QAABCpJREFUWEfVmduOVFUQhr9C5BCJ4iESBxXxMNFoSLwQghdeYIzhWuMb+ADEB0AeQMM1PoGJ3psYbkwIAW+IgciZ0WEwCIyJZw5S5m9rTfY03b13rd0zhpV0OuleVevftf9V9a9aRo/h7muBx4BHgY3Aw8CDgH7XuAP8Gd+/Ar8Ai2am36uG1Vi5u0C+ADwE3AYE5hbwF/APcDf8rgHWAQ8Am2K+vq8CV8zs5+z6KcDu/iTwcoASyMUGuK5r6yEeAZ4IgwtmttDVuBNgd9frfi2ipej80XWBlnl6Q88AfwMnzExvaOJoBezu24DtwHXgRpvDyv8VbdFszsx+mORjImB3fzEicCG4Womnk5k2q/bFvJmdH2cxFnCAnQEEtmyiTiv3mCTQz8WGHAl6JOD/CWx5TmWU58eBvgdwcFYGq0GDcS9DoF8CLg5zehngyAa7NHEVONvGHNFDm/14M3sMA34zisBKZYM2kMP/K3tsMLNvyx9LgN19KzALnM56XeH5oue5UhWbgN8S0adYFKb1HCouM2b2jRwOADdK7rlprTJlP4ry92a2WAC/DtwMNVW7lvj/LrAXeDqcnAJOAp8Al2sdh+4YcNncXbtxDyDnUlrZIUn5EfBhi+FnAVyiKTuU5lQFjwiwFNgg52W9hP79IoRRF3NF+/3IRF3mN+f8t/ncXXJxQ2jUrJMDHSI77FOR3p9dKGhxS4DfCO5mJaNk4bGKhWXyHnA0aSvqbRRgbZafQpNmfBwEPsgYNObWRFknl20C/DZwpmLDfQ28Wgl4HpAEyAxtvFkBVir6LmMZc1Vk+gxJ1+zYcV8CrqXE8UaByEZKOf+dpNESJaQhdI7SMT0zalJa8f85sC+zWPQ9togSKstqdmQr0G7gy+SiZfrOilKtfsbmUjhUnnUqzo6aKB8CPs4uBGxRo2YapVlR7pre+pRmaYmzRfyoeOgMt5LiR5H9tIJ6ehnacArK4SIvVZ7VfamhRXm7KtVSbXJcIq4C8VV8sqW4yRo1G9eZ2YkCWF2XVyoVWwUd0yZSk6d1TLofjkjKDk8tOyLpeXvq4nTIEgaSv2fMbCAFho/50+ByAkvrVB3zN5nZEv9HNVKU1OcqKl/r6skJkpNqpBwb20gJaqi9OjiOVKa5JK6R0wVWGCa3qoqpuytJq7Gic15Nbu4DujQDF8xMtWHZmNRuLaBrhFEt4Ilg79l0w6tEpJ+NSGfVXBZ0ocGPoyJbnHW9MlCTWRcwfSrhpAdQNngcuNTryqDBaV3KSIauD1n4ezZ8Y+arKEiFqet0ciqXMs2F3F3nMN176M1cCyGT3ZTiqbSBrr50BTYouV0D0EqJUY6iKiqLqGukfoYirm+BF9fLQwicPnpD0twCqVtSzT1vZroZTY0qwA2qNK9uy7WtwDWvbnVT+lucanpf3f4LCKpLgoLQOEQAAAAASUVORK5CYII=',
        symbolSize: 14,
        symbolKeepAspect: true,
        smooth: true,
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
                color: 'rgba(144, 215, 255, 0.00)',
              },
              {
                offset: 1,
                color: 'rgba(53, 233, 226, 0.30)',
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
