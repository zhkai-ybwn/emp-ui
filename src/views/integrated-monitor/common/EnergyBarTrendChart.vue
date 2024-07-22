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
      if (!dataList.value.today) return [];
      return dataList.value.today.map((item) => [Number(item.ts), item.value]);
    };
    const getData2 = () => {
      if (!dataList.value.yesterday) return [];
      return dataList.value.yesterday.map((item) => [
        Number(+item.ts + 86400000),
        item.value,
      ]);
    };
    const series = [
      {
        type: 'bar',
        barWidth: 5,
        name: '今日',
        z: 11,
        // eslint-disable-next-line max-len
        showSymbol: false,
        itemStyle: {
          color: '#266FE8',
        },
        data: getData1(),
      },
      {
        type: 'bar',
        barGap: '-100%',
        barWidth: 5,
        name: '昨日',
        z: 11,
        showSymbol: false,
        itemStyle: {
          color: 'rgba(38, 111, 232, 0.20)',
        },
        data: getData2(),
      },
    ];
    return series;
  };
  const getOptions = () => ({
    grid: {
      top: '2%',
      bottom: '5%',
      left: '2%',
      right: '2%',
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
        z: 15,
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
            content += `<div><span style="display:inline-block;margin-right:4px;width:10px;height:10px;background:#266FE8;"></span><span style="margin-right:76px;color:#E1E2E7;font-size: 14px;">${el.seriesName}</span><span style="font-size: 16px;">${el.data[1]}</span><span style="font-size: 10px;">kWh</span></div>`;
          } else {
            content += `<div><span style="display:inline-block;margin-right:4px;width:10px;height:10px;background: rgba(38, 111, 232, 0.20);"></span><span style="margin-right:76px;color:#E1E2E7;font-size: 14px;">${el.seriesName}</span><span style="font-size: 16px;">${el.data[1]}</span><span style="font-size: 10px;">kWh</span></div>`;
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
        // max: new Date(
        //   now.getFullYear(),
        //   now.getMonth(),
        //   now.getDate(),
        //   23,
        //   59,
        //   0
        // ),

        splitNumber: 11,
        axisLabel: {
          //   showMaxLabel: true,
          //   showMinLabel: true,
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
            return Number(value).toFixed(2); // 设置 Y 轴标签保留两位小数
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
