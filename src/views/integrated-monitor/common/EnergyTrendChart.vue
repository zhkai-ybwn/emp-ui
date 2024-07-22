<template>
  <div ref="echartRef" class="chart-conatiner"> </div>
</template>

<script setup>
  import useEchart from '@/hooks/useEchart';
  import * as echarts from 'echarts';
  import moment from 'moment';

  const props = defineProps({
    data: {
      type: Object,
      default: () => ({}),
    },
    timeType: {
      type: Number,
      default: 1,
    },
  });
  const now = new Date();
  // const dataList1 = computed(() => props.data[0]);
  // const dataList2 = computed(() => props.data[1]);
  const dataList = computed(() => props.data);
  const getSeries = () => {
    // const list1 = [];
    // const list2 = [];
    // dataList.value.forEach((t) => {
    //   list1.push([
    //     moment(Number(t.pointTime)).format(),
    //     parseInt(t.leftPointValue, 10),
    //   ]);
    //   list2.push([
    //     moment(Number(t.pointTime)).format(),
    //     parseInt(t.rightPointValue, 10),
    //   ]);
    // });
    // const now = new Date();
    const startOfDay = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate()
    ); // 获取今天的起始时间（早上 0:00）
    const timestampArray = [];

    for (
      let time = startOfDay;
      time <= now;
      time.setMinutes(time.getMinutes() + 1)
    ) {
      timestampArray.push(time.getTime());
    }

    const getData1 = () => {
      if (!dataList.value.todayInfo) return [];
      return dataList.value.todayInfo.map((item) => [
        Number(item.ts),
        item.value,
      ]);
    };
    const getData2 = () => {
      if (!dataList.value.yesterdayInfo) return [];
      return dataList.value.yesterdayInfo.map((item) => [
        Number(+item.ts + 86400000),
        item.value,
      ]);
    };
    const series = [
      {
        type: 'line',
        name: '今日',
        smooth: true,
        symbolSize: 10,
        z: 11,
        // eslint-disable-next-line max-len
        symbol:
          'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAsCAYAAAAehFoBAAAAAXNSR0IArs4c6QAABCpJREFUWEfVmduOVFUQhr9C5BCJ4iESBxXxMNFoSLwQghdeYIzhWuMb+ADEB0AeQMM1PoGJ3psYbkwIAW+IgciZ0WEwCIyJZw5S5m9rTfY03b13rd0zhpV0OuleVevftf9V9a9aRo/h7muBx4BHgY3Aw8CDgH7XuAP8Gd+/Ar8Ai2am36uG1Vi5u0C+ADwE3AYE5hbwF/APcDf8rgHWAQ8Am2K+vq8CV8zs5+z6KcDu/iTwcoASyMUGuK5r6yEeAZ4IgwtmttDVuBNgd9frfi2ipej80XWBlnl6Q88AfwMnzExvaOJoBezu24DtwHXgRpvDyv8VbdFszsx+mORjImB3fzEicCG4Womnk5k2q/bFvJmdH2cxFnCAnQEEtmyiTiv3mCTQz8WGHAl6JOD/CWx5TmWU58eBvgdwcFYGq0GDcS9DoF8CLg5zehngyAa7NHEVONvGHNFDm/14M3sMA34zisBKZYM2kMP/K3tsMLNvyx9LgN19KzALnM56XeH5oue5UhWbgN8S0adYFKb1HCouM2b2jRwOADdK7rlprTJlP4ry92a2WAC/DtwMNVW7lvj/LrAXeDqcnAJOAp8Al2sdh+4YcNncXbtxDyDnUlrZIUn5EfBhi+FnAVyiKTuU5lQFjwiwFNgg52W9hP79IoRRF3NF+/3IRF3mN+f8t/ncXXJxQ2jUrJMDHSI77FOR3p9dKGhxS4DfCO5mJaNk4bGKhWXyHnA0aSvqbRRgbZafQpNmfBwEPsgYNObWRFknl20C/DZwpmLDfQ28Wgl4HpAEyAxtvFkBVir6LmMZc1Vk+gxJ1+zYcV8CrqXE8UaByEZKOf+dpNESJaQhdI7SMT0zalJa8f85sC+zWPQ9togSKstqdmQr0G7gy+SiZfrOilKtfsbmUjhUnnUqzo6aKB8CPs4uBGxRo2YapVlR7pre+pRmaYmzRfyoeOgMt5LiR5H9tIJ6ehnacArK4SIvVZ7VfamhRXm7KtVSbXJcIq4C8VV8sqW4yRo1G9eZ2YkCWF2XVyoVWwUd0yZSk6d1TLofjkjKDk8tOyLpeXvq4nTIEgaSv2fMbCAFho/50+ByAkvrVB3zN5nZEv9HNVKU1OcqKl/r6skJkpNqpBwb20gJaqi9OjiOVKa5JK6R0wVWGCa3qoqpuytJq7Gic15Nbu4DujQDF8xMtWHZmNRuLaBrhFEt4Ilg79l0w6tEpJ+NSGfVXBZ0ocGPoyJbnHW9MlCTWRcwfSrhpAdQNngcuNTryqDBaV3KSIauD1n4ezZ8Y+arKEiFqet0ciqXMs2F3F3nMN176M1cCyGT3ZTiqbSBrr50BTYouV0D0EqJUY6iKiqLqGukfoYirm+BF9fLQwicPnpD0twCqVtSzT1vZroZTY0qwA2qNK9uy7WtwDWvbnVT+lucanpf3f4LCKpLgoLQOEQAAAAASUVORK5CYII=',
        showSymbol: false,
        lineStyle: { color: '#00C2FF', width: 2 },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: 'rgba(0, 148, 255, 0.50)',
              },
              {
                offset: 1,
                color: 'rgba(0, 148, 255, 0.00)',
              },
            ],
            global: false,
          },
        },
        data: getData1(),
      },
      {
        type: 'line',
        name: '昨日',
        smooth: true,
        symbolSize: 10,
        z: 11,
        // eslint-disable-next-line max-len
        symbol:
          'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAsCAYAAAAehFoBAAAAAXNSR0IArs4c6QAABCpJREFUWEfVmduOVFUQhr9C5BCJ4iESBxXxMNFoSLwQghdeYIzhWuMb+ADEB0AeQMM1PoGJ3psYbkwIAW+IgciZ0WEwCIyJZw5S5m9rTfY03b13rd0zhpV0OuleVevftf9V9a9aRo/h7muBx4BHgY3Aw8CDgH7XuAP8Gd+/Ar8Ai2am36uG1Vi5u0C+ADwE3AYE5hbwF/APcDf8rgHWAQ8Am2K+vq8CV8zs5+z6KcDu/iTwcoASyMUGuK5r6yEeAZ4IgwtmttDVuBNgd9frfi2ipej80XWBlnl6Q88AfwMnzExvaOJoBezu24DtwHXgRpvDyv8VbdFszsx+mORjImB3fzEicCG4Womnk5k2q/bFvJmdH2cxFnCAnQEEtmyiTiv3mCTQz8WGHAl6JOD/CWx5TmWU58eBvgdwcFYGq0GDcS9DoF8CLg5zehngyAa7NHEVONvGHNFDm/14M3sMA34zisBKZYM2kMP/K3tsMLNvyx9LgN19KzALnM56XeH5oue5UhWbgN8S0adYFKb1HCouM2b2jRwOADdK7rlprTJlP4ry92a2WAC/DtwMNVW7lvj/LrAXeDqcnAJOAp8Al2sdh+4YcNncXbtxDyDnUlrZIUn5EfBhi+FnAVyiKTuU5lQFjwiwFNgg52W9hP79IoRRF3NF+/3IRF3mN+f8t/ncXXJxQ2jUrJMDHSI77FOR3p9dKGhxS4DfCO5mJaNk4bGKhWXyHnA0aSvqbRRgbZafQpNmfBwEPsgYNObWRFknl20C/DZwpmLDfQ28Wgl4HpAEyAxtvFkBVir6LmMZc1Vk+gxJ1+zYcV8CrqXE8UaByEZKOf+dpNESJaQhdI7SMT0zalJa8f85sC+zWPQ9togSKstqdmQr0G7gy+SiZfrOilKtfsbmUjhUnnUqzo6aKB8CPs4uBGxRo2YapVlR7pre+pRmaYmzRfyoeOgMt5LiR5H9tIJ6ehnacArK4SIvVZ7VfamhRXm7KtVSbXJcIq4C8VV8sqW4yRo1G9eZ2YkCWF2XVyoVWwUd0yZSk6d1TLofjkjKDk8tOyLpeXvq4nTIEgaSv2fMbCAFho/50+ByAkvrVB3zN5nZEv9HNVKU1OcqKl/r6skJkpNqpBwb20gJaqi9OjiOVKa5JK6R0wVWGCa3qoqpuytJq7Gic15Nbu4DujQDF8xMtWHZmNRuLaBrhFEt4Ilg79l0w6tEpJ+NSGfVXBZ0ocGPoyJbnHW9MlCTWRcwfSrhpAdQNngcuNTryqDBaV3KSIauD1n4ezZ8Y+arKEiFqet0ciqXMs2F3F3nMN176M1cCyGT3ZTiqbSBrr50BTYouV0D0EqJUY6iKiqLqGukfoYirm+BF9fLQwicPnpD0twCqVtSzT1vZroZTY0qwA2qNK9uy7WtwDWvbnVT+lucanpf3f4LCKpLgoLQOEQAAAAASUVORK5CYII=',
        showSymbol: false,
        lineStyle: { color: '#35FFCF', width: 2 },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: 'rgba(53, 255, 207, 0.50)',
              },
              {
                offset: 1,
                color: 'rgba(53, 255, 207, 0.00)',
              },
            ],
            global: false,
          },
        },
        data: getData2(),
      },
    ];
    return series;
  };
  const getOptions = () => ({
    grid: {
      top: '3%',
      bottom: '5%',
      left: '3%',
      right: '3%',
      containLabel: true,
    },
    tooltip: {
      backgroundColor: 'rgba(6, 12, 28, 0.50)',
      trigger: 'axis',
      axisPointer: {
        lineStyle: {
          color: 'rgba(255, 255, 255, 0.60)',
          type: [4, 4],
        },
        z: 1,
      },
      extraCssText: 'backdrop-filter: blur(2px);border:none',
      textStyle: {
        fontFamily: 'HarmonyOS-Regular, sans-serif',
        fontSize: 14,
      },
      formatter: (params) => {
        const time = moment(params[0].data[0]).format('YYYY-MM-DD HH:mm');
        let content = '';
        params.forEach((el) => {
          if (el.seriesName === '今日') {
            content += `<div><span style="display:inline-block;margin-right:4px;width:10px;height:10px;background: #00C2FF;"></span><span style="margin-right:76px;color:#E1E2E7;font-size: 14px;">${el.seriesName}</span><span style="font-size: 16px;">${el.data[1]}</span><span style="font-size: 10px;">kWh</span></div>`;
          } else {
            content += `<div><span style="display:inline-block;margin-right:4px;width:10px;height:10px;background: #35FFCF;"></span><span style="margin-right:76px;color:#E1E2E7;font-size: 14px;">${el.seriesName}</span><span style="font-size: 16px;">${el.data[1]}</span><span style="font-size: 10px;">kWh</span></div>`;
          }
        });
        const tip = `<div style="color:#A5A9B8;">${time}</div><div style="color:#E1E2E7;">${content}</div>`;
        return tip;
      },
    },
    xAxis: [
      {
        type: 'time',
        min: new Date(
          now.getFullYear(),
          now.getMonth(),
          now.getDate(),
          0,
          0,
          0
        ),
        max: new Date(
          now.getFullYear(),
          now.getMonth(),
          now.getDate(),
          23,
          59,
          59
        ),
        splitNumber: 11,
        axisLabel: {
          showMaxLabel: true,
          showMinLabel: true,
          color: '#C9CDD0',
          fontSize: 12,
          fontFamily: 'HarmonyOS-Regular, sans-serif',
          fontWeight: 400,
          formatter(value) {
            const time = moment(value);
            return time.format('HH:mm');
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
    ],
    legend: {
      show: false,
    },
    yAxis: [
      {
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
          fontFamily: 'PangMenZhengDaoBiaoTiTi',
          fontWeight: 400,
          formatter(value) {
            return Number(value).toFixed(2);
          },
        },
        splitLine: {
          lineStyle: {
            width: 1,
            color: 'rgba(87, 208, 235, 0.10)',
            type: 'dashed',
          },
        },
      },
    ],
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
