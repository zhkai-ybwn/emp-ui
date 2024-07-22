<template>
  <div style="position: relative">
    <div ref="echartRef" class="chart-conatiner"> </div>
  </div>
</template>

<script setup>
  import useEchart from '@/hooks/useEchart';
  import * as echarts from 'echarts';

  const props = defineProps({
    data: {
      type: Object,
      default: () => ({
        coolingTowerEc: '0',
        chillingTowerEcRatio: '0 %',
        waterChillingEc: '0 kWh',
        waterChillingEcRatio: '0 %',
        coolingWaterPumpEc: '0 kWh',
        coolingWaterPumpEcRatio: '0 %',
        chilledWaterPumpEc: '0 kWh',
        chilledWaterPumpEcRatio: '0 %',
      }),
    },
  });
  const dataList = computed(() => props.data);

  // 默认颜色表
  const defaultColorList = [
    {
      start: '#7EC1FF',
      end: '#1A84E9',
    },
    {
      start: '#D3FFBE',
      end: '#6ABE43',
    },
    {
      start: '#FFF06A',
      end: '#FFC327',
    },
    {
      start: '#7EFFF0',
      end: '#41B9B9',
    },
  ];
  // 复制代码
  const getData = () => {
    const chartData = [
      {
        value: parseFloat(dataList.value.waterChillingEc),
        percent: parseFloat(dataList.value.waterChillingEcRatio) / 100,
        name: '冷水机组',
        itemStyle: {
          color: defaultColorList[0]
            ? {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 1,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: defaultColorList[0].start, // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: defaultColorList[0].end, // 100% 处的颜色
                  },
                ],
                global: false, // 缺省为 false
              }
            : '',
        },
      },
      {
        value: parseFloat(dataList.value.chilledWaterPumpEc),
        percent: parseFloat(dataList.value.chilledWaterPumpEcRatio) / 100,
        name: '冷水泵',
        itemStyle: {
          color: defaultColorList[1]
            ? {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 1,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: defaultColorList[1].start, // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: defaultColorList[1].end, // 100% 处的颜色
                  },
                ],
                global: false, // 缺省为 false
              }
            : '',
        },
      },
      {
        value: parseFloat(dataList.value.coolingWaterPumpEc),
        percent: parseFloat(dataList.value.coolingWaterPumpEcRatio) / 100,
        name: '冷却水泵',
        itemStyle: {
          color: defaultColorList[2]
            ? {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 1,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: defaultColorList[2].start, // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: defaultColorList[2].end, // 100% 处的颜色
                  },
                ],
                global: false, // 缺省为 false
              }
            : '',
        },
      },
      {
        value: parseFloat(dataList.value.coolingTowerEc),
        percent: parseFloat(dataList.value.chillingTowerEcRatio) / 100,
        name: '冷却塔',
        itemStyle: {
          color: defaultColorList[3]
            ? {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 1,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: defaultColorList[3].start, // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: defaultColorList[3].end, // 100% 处的颜色
                  },
                ],
                global: false, // 缺省为 false
              }
            : '',
        },
      },
    ];
    return chartData;
  };

  const getSeries = () => {
    const sum = getData().reduce((per, cur) => per + cur.value, 0);
    const gap = (1 * sum) / 100;
    const pieData1 = [];
    const gapData = {
      name: '',
      value: gap === 0 ? 1 : gap,
      itemStyle: {
        color: gap === 0 ? '#4B5B76' : 'transparent',
      },
      labelLine: {
        show: false,
      },
    };

    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < getData().length; i++) {
      // 第一圈数据
      if (getData()[i].value !== 0)
        pieData1.push({
          ...getData()[i],
        });
      if (getData()[i].value !== sum && getData()[i].value !== 0)
        pieData1.push(gapData);
    }

    if (pieData1.length === 0) {
      pieData1.push(gapData);
    }
    const series = [
      {
        name: '',
        type: 'pie',
        roundCap: true,
        radius: ['70%', '82%'],
        center: 'center',
        data: pieData1,
        itemStyle: {
          normal: {
            label: {
              show: false,
              position: 'outside',
              color: 'rgba(255, 255, 255, 0.85)',
              fontSize: 16,
              align: 'left',
              formatter(params) {
                if (params.name === '') {
                  return '';
                }
                const name = `{a|${params.name}}  {b|${params.percent}}`;
                const value = `\n{c|${params.value}}{d|kWh}`;
                const res = name + value;
                return res;
              },
              rich: {
                a: {
                  color: 'rgba(255,255,255,0.85)',
                  fontFamily: ' HarmonyOS-Regular',
                  fontSize: 16,
                  marginBottom: 10,
                },
                b: {
                  fontSize: 16,
                  fontWeight: 700,
                },
                c: {
                  fontSize: 16,
                  fontWeight: 400,
                  align: 'left',
                  lineHeight: 25,
                  verticalAlign: 'bottom',
                },
                d: {
                  fontSize: 12,
                  fontWeight: 400,
                  align: 'left',
                  lineHeight: 25,
                  verticalAlign: 'bottom',
                },
              },
            },
            labelLine: {
              length: 50,
              // length2: 30,
              symbol: 'square',
              lineStyle: {
                color: 'rgba(255, 255, 255, 0.7)',
              },
            },
          },
        },
      },
      {
        type: 'pie',
        radius: ['57%', '59%'],
        center: 'center',
        animation: false,
        hoverAnimation: false,
        data: [
          {
            value: 50,
            itemStyle: {
              borderRadius: '4px',
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 1,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: 'rgba(92, 109, 156, 1)', // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: 'rgba(92, 109, 156, 0)', // 100% 处的颜色
                  },
                ],
                global: false, // 缺省为 false
              },
            },
          },
          {
            value: 10,
            itemStyle: {
              color: 'transparent',
            },
          },
          {
            value: 50,
            itemStyle: {
              borderRadius: '4px',
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 1,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: 'rgba(92, 109, 156, 1)', // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: 'rgba(92, 109, 156, 0)', // 100% 处的颜色
                  },
                ],
                global: false, // 缺省为 false
              },
            },
          },
          {
            value: 10,
            itemStyle: {
              color: 'transparent',
            },
          },
          {
            value: 50,
            itemStyle: {
              borderRadius: '4px',
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 1,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: 'rgba(92, 109, 156, 1)', // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: 'rgba(92, 109, 156, 0)', // 100% 处的颜色
                  },
                ],
                global: false, // 缺省为 false
              },
            },
          },
          {
            value: 10,
            itemStyle: {
              color: 'transparent',
            },
          },
        ],
        label: {
          show: false,
        },
        itemStyle: {
          normal: {
            color: '#3BC5EF',
          },
        },
      },
      {
        name: '',
        type: 'pie',
        startAngle: 90,
        radius: '48%',
        animation: false,
        hoverAnimation: false,
        center: 'center',
        itemStyle: {
          normal: {
            labelLine: {
              show: false,
            },
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: 'rgba(83, 119, 245, 0)', // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: 'rgba(14, 40, 79, 0.6)', // 100% 处的颜色
                },
              ],
              global: false, // 缺省为 false
            },
            shadowBlur: 60,
          },
        },
        data: [
          {
            value: 100,
          },
        ],
      },
    ];
    return series;
  };

  const getOptions = () => ({
    grid: {
      top: '0%',
      bottom: '0%',
      left: '0%',
      right: '0%',
      containLabel: true,
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
    margin: 0 auto;
  }
</style>
