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
      type: Array,
      default: () => [],
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
      start: '#7EC1FF',
      end: '#1A84E9',
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

  const pieData = () => {
    const chartData = [];
    if (dataList.value) {
      dataList.value.forEach((el, index) =>
        chartData.push({
          value: el.subE,
          percent: el.subProp,
          name: el.subName,
          itemStyle: {
            color: defaultColorList[index]
              ? {
                  type: 'linear',
                  x: 0,
                  y: 0,
                  x2: 1,
                  y2: 1,
                  colorStops: [
                    {
                      offset: 0,
                      color: defaultColorList[index].start, // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: defaultColorList[index].end, // 100% 处的颜色
                    },
                  ],
                  global: false, // 缺省为 false
                }
              : '',
          },
          labelLine: {
            length: 30,
            length2: 20,
            symbol: 'square',
            lineStyle: {
              color: 'rgba(255, 255, 255, 0.7)',
            },
          },
        })
      );
    }
    const sum = chartData.reduce((per, cur) => per + Number(cur.value), 0);
    const gap = (1 * sum) / 100;
    const pieData1 = [];
    const gapData = {
      name: '',
      value: gap,
      itemStyle: {
        color: 'transparent',
      },
      labelLine: {
        show: false,
        lineStyle: {
          color: 'transparent',
        },
      },
      emphasis: {
        show: false,
      },
    };
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < chartData.length; i++) {
      // 第一圈数据
      pieData1.push({
        ...chartData[i],
      });
      pieData1.push(gapData);
    }
    if (pieData1.length < 1) {
      pieData1.push({
        value: 10,
        itemStyle: {
          color: '#4B5B76',
        },
        label: {
          show: false,
        },
      });
    }
    return pieData1;
  };

  const getSeries = () => {
    const series = [
      {
        name: '',
        type: 'pie',
        roundCap: true,
        // radius: ['55%', '68%'],
        radius: [75, 90],
        center: 'center',
        data: pieData(),
        itemStyle: {
          normal: {
            label: {
              show: true,
              position: 'outside',
              color: 'rgba(255, 255, 255, 0.85)',
              fontSize: 16,
              align: 'left',
              overflow: 'none',
              formatter(params) {
                if (params.name === '') {
                  return '';
                }
                const name = `{a|${params.name}}  {b|${params.percent}%}`;
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
          },
        },
        emphasis: {
          labelLine: {
            show: false,
          },
        },
      },
      {
        type: 'pie',
        // radius: ['45%', '47%'],
        radius: [60, 62],
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
        // radius: '38%',
        radius: 50,
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
      top: '10%',
      bottom: '10%',
      left: '10%',
      right: '10%',
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
