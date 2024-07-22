<!--
 * @Author: zhangk 13182353591@163.com
 * @Date: 2023-10-30 13:04:29
 * @LastEditors: zhangk 13182353591@163.com
 * @LastEditTime: 2024-03-18 17:01:50
 * @FilePath: \emp-admin-ui\src\views\data-overview\energy-plant\common\RateTrend.vue
 * @Description: 折线图
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
    const data = [];
    if (!dataC.value) return null;
    dataC.value.forEach((item) => {
      data.push([moment(Number(item.ts)).format('MM-DD'), item.v]);
    });
    return data;
  };

  const getOptions = () => ({
    color: '#00C2FF',
    tooltip: {
      backgroundColor: 'rgba(10, 20, 45, 0.55)',
      borderColor: 'rgba(255, 255, 255, 0.7)',
      trigger: 'axis',
      axisPointer: {
        lineStyle: {
          color: '#fff',
          type: 'solid',
        },
        z: 1,
      },
      extraCssText: 'backdrop-filter: blur(4px);',
      textStyle: {
        color: 'rgba(255, 255, 255, 0.90)',
      },
      formatter: (params) => {
        let tip = '';
        const time = moment(params[0].data[0]).format('MM-DD');
        const marker = `<br/><span style="display:inline-block;
                  margin-right:4px;width:10px;
                  height:10px;
                  background: #00C2FF;"></span>`;
        const content = `${props.config.tooltipText}：${params[0].data[1]}%`;
        tip = time + marker + content;
        return tip;
      },
    },
    grid: {
      top: '18%',
      bottom: '0%',
      left: '3%',
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
          const time = moment(value);
          return time.format('MM-DD');
        },
      },
      axisTick: { show: false },
      boundaryGap: false,
      axisLine: {
        lineStyle: {
          width: 1,
          color: 'transparent',
        },
      },
      splitLine: {
        show: true,
        lineStyle: {
          width: 1,
          color: 'rgba(255, 255, 255, 0.2)',
          type: 'dashed',
        },
      },
      splitArea: {
        show: true,
        areaStyle: {
          color: ['rgba(250,250,250,0.0)', 'rgba(250,250,250,0.05)'],
          shadowOffsetX: 100,
        },
      },
    },
    yAxis: {
      name: '单位：%',
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
          color: 'rgba(255, 255, 255, 0.2)',
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
        areaStyle: {
          color: new echarts.graphic.LinearGradient(
            0,
            0,
            0,
            1,
            [
              {
                offset: 0,
                color: 'rgba(0, 148, 255, 0.5)',
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
        data: getData(),
      },
    ],
  });
  const { echartRef, renderChart } = useEchart(getOptions, {
    isWatch: true,
    watchData: dataC,
  });
  renderChart(true, true);
</script>
