<!--
 * @Author: zhangk 13182353591@163.com
 * @Date: 2023-10-27 09:10:52
 * @LastEditors: zhangk 13182353591@163.com
 * @LastEditTime: 2024-04-09 10:19:36
 * @FilePath: \emp-admin-ui\src\views\data-overview\energy-plant\common\TrendChart.vue
 * @Description: 双折线图，趋势
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
  import blue from '@/assets/imgs/smart/health/blue.png';
  import green from '@/assets/imgs/smart/health/green.png';

  const props = defineProps({
    data: {
      type: Object,
      default: () => ({
        currentData: [],
        pastData: [],
      }),
    },
    config: {
      type: Object,
      default: () => ({}),
    },
    label: {
      type: Array,
      default: () => [],
    },
    currentIndex: {
      type: Number,
      default: 0,
    },
  });
  const currentData = computed(() => props.data.currentData);
  const pastData = computed(() => props.data.pastData);
  const getXaxisType = computed(() => {
    const types = {
      0: 'time',
      1: 'category',
      2: 'time',
    };
    return types[props.currentIndex];
  });
  const getXLabel = (value) => {
    if (props.currentIndex === 1) return `${value}号`;
    const formatOptions = {
      0: 'HH:mm',
      1: 'DD',
      2: 'MM月',
    };
    const format = formatOptions[props.currentIndex];
    return moment(value).format(format);
  };
  const seriesLabel = ['今日用电量', '本月用电量', '今年用电量'];
  const pastSeriesLabel = ['昨日用电量', '上月用电量', '去年用电量'];
  const format = ['', 'DD', 'YYYY-MM'];
  const getSeries = () => {
    const series = [];
    const currentDataArr = [];
    currentData.value.forEach((t) => {
      currentDataArr.push([
        moment(Number(t.ts)).format(format[props.currentIndex]),
        t.v.toFixed(2),
      ]);
    });
    const pastDataArr = [];
    const timeIncrements = {
      0: 'days',
      1: 'months',
      2: 'years',
    };
    pastData.value.forEach((t) => {
      if (props.currentIndex !== 1) {
        const increment = timeIncrements[props.currentIndex];
        const formattedDate = moment(Number(t.ts))
          .add(1, increment)
          .format(format[props.currentIndex]);
        pastDataArr.push([formattedDate, t.v.toFixed(2)]);
      } else {
        const formattedDate = moment(Number(t.ts)).format(
          format[props.currentIndex]
        );
        pastDataArr.push([formattedDate, t.v.toFixed(2)]);
      }
    });
    const currentSeries = {
      name: props.label[0],
      type: 'line',
      smooth: props.config.smooth1,
      symbolSize: 22,
      z: 11,
      // eslint-disable-next-line max-len
      symbol: `image://${blue}`,
      showSymbol: currentDataArr.length < 2,
      lineStyle: props.config.lineStyle[0],
      areaStyle: props.config.areaStyle[0],
      data: currentDataArr,
    };
    const pastSeries = {
      name: props.label[1],
      type: 'line',
      showSymbol: pastDataArr.length < 2,
      smooth: props.config.smooth1,
      symbolSize: 22,
      z: 11,
      // eslint-disable-next-line max-len
      symbol: `image://${green}`,
      connectNulls: true,
      lineStyle: props.config.lineStyle[1],
      areaStyle: props.config.areaStyle[1],
      data: pastDataArr,
    };
    series.push(currentSeries);
    series.push(pastSeries);
    return series;
  };

  const getMax = () => {
    if (props.currentIndex === 2) {
      return moment().endOf('year').format('YYYY-MM');
    }
    if (props.currentIndex === 1) {
      return moment()
        .startOf('month')
        .add(1, 'months')
        .subtract(1, 'days')
        .format('YYYY-MM-DD HH:mm:ss');
    }
    return undefined;
  };
  const getMin = () => {
    if (props.currentIndex === 2) {
      return moment().startOf('year').format();
    }
    if (props.currentIndex === 1) {
      return moment().startOf('month').format('DD');
    }
    return undefined;
  };
  const getOptions = () => ({
    grid: props.config.grid,
    // 提示框组件
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
        if (params != null && params.length > 0) {
          const date = new Date(params[0].value[0]);
          let timeStr = '';
          if (props.currentIndex === 0) {
            timeStr = `<span style="color: #fff">${moment(date).format(
              'HH:mm'
            )}</span>`;
          } else if (props.currentIndex === 1) {
            // timeStr = `<span style="color: #fff">${moment(date).format(
            //   'DD'
            // )}号</span>`;
            timeStr = `<span style="color: #fff">${params[0].value[0]}号</span>`;
          } else {
            timeStr = `<span style="color: #fff">${moment(date).format(
              'MM'
            )}月</span>`;
          }
          tip += `${timeStr}<br/>`;
          // eslint-disable-next-line no-plusplus
          // for (let i = 0; i < params.length; i++) {
          const marker1 = `<span style="display:inline-block;
                    margin-right:4px;width:10px;
                    height:10px;
                    background: ${props.config.tooltipColors[0]};"></span>`;
          const marker2 = `<span style="display:inline-block;margin-right:4px;
                    width:10px;height:10px;
                    background: ${props.config.tooltipColors[1]};"></span>`;
          const spaceSign =
            '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';
          const unit = '<span style="font-size: 10px;">&nbsp;kWh</span>';
          const tip1 = params.find(
            (el) => el.seriesName === seriesLabel[props.currentIndex]
          );
          const tip2 = params.find(
            (el) => el.seriesName === pastSeriesLabel[props.currentIndex]
          );
          tip += `${
            marker1 +
            seriesLabel[props.currentIndex] +
            spaceSign +
            (tip1 ? tip1.value[1] + unit : '--')
          }<br/>`;
          tip +=
            marker2 +
            pastSeriesLabel[props.currentIndex] +
            spaceSign +
            (tip2 ? tip2.value[1] + unit : '--');
        }
        return tip;
      },
    },
    xAxis: [
      {
        type: getXaxisType.value, // x轴为 时间轴
        max: getMax(),
        min: getMin(),
        axisLabel: {
          color: 'rgba(255,255,255,0.85)',
          fontSize: 14,
          fontFamily: 'HarmonyOS-Regular',
          fontWeight: 400,
          formatter: (value) => getXLabel(value),
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
        data: [
          '01',
          '02',
          '03',
          '04',
          '05',
          '06',
          '07',
          '08',
          '09',
          '10',
          '11',
          '12',
          '13',
          '14',
          '15',
          '16',
          '17',
          '18',
          '19',
          '20',
          '21',
          '22',
          '23',
          '24',
          '25',
          '26',
          '27',
          '28',
          '29',
          '30',
          '31',
        ],
      },
    ],
    legend: {
      show: true,
      top: 0,
      right: 0,
      itemGap: 40,
      itemWidth: 19,
      itemHeight: 8,
      data: [
        { icon: props.config.legendInfo[0], name: props.label[0] },
        { icon: props.config.legendInfo[1], name: props.label[1] },
      ],
      textStyle: {
        color: '#FFF',
        fontFamily: 'SourceHanSansCN-Normal, sans-serif',
        fontSize: 14,
        fontWeight: 400,
      },
    },
    yAxis: [
      {
        name: '单位：kWh',
        nameTextStyle: {
          color: 'rgba(255, 255, 255, 0.84)',
          fontFamily: 'SourceHanSansCN-Normal, sans-serif',
          fontSize: 14,
          padding: props.config.nameTextStylePadding || [0, 0, 0, 10],
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
    ],

    series: getSeries(),
  });
  const { echartRef, renderChart } = useEchart(getOptions, {
    isWatch: true,
    watchData: currentData,
  });
  renderChart(true, true);
</script>
