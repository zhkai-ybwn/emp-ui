<!--
 * @Author: zhangkai 2572429235@qq.com
 * @Date: 2023-09-19 13:00:48
 * @LastEditors: zhangk 13182353591@163.com
 * @LastEditTime: 2024-01-08 08:50:19
 * @FilePath: \emp-admin-ui\src\views\load-forecast\common\LineChart.vue
 * @Description: 双折线图组件
-->
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
      default: () => ({
        actualData: [],
        forecastData: [],
      }),
    },
  });
  const actualData = computed(() => props.data.actualData);
  const forecastData = computed(() => props.data.forecastData);
  const getSeries = () => {
    const series = [];
    const actualArr = [];
    actualData.value.forEach((t) => {
      // index === 0
      //     ? actualArr.push([moment(Number(t.ts)).add(1, 'seconds').format(), t.v])
      //     : actualArr.push([moment(Number(t.ts)).format(), t.v])
      actualArr.push([moment(Number(t.ts)).format(), t.v]);
    });
    const forecastArr = [];
    forecastData.value.forEach((t) => {
      // index === 0
      //     ? forecastArr.push([moment(Number(t.ts)).add(1, 'seconds')
      //     .format(), t.v])
      //     : forecastArr.push([moment(Number(t.ts)).format(), t.v])
      forecastArr.push([moment(Number(t.ts)).format(), t.v]);
    });
    const actualSeries = {
      name: '实际负荷',
      type: 'line',
      smooth: true,
      symbolSize: 20,
      // eslint-disable-next-line max-len
      symbol:
        'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAASxSURBVHgBvVXbTltHFF17Zs45YGKwIYRACaGRqlAIJeolSvtCovYXnE9oPgPzA33MQz8B96XqQx8TV5VaRWmaqsG950agCY6xjcHYPmdmusfHYBdIm6cMGs0cPHutfd/AKy1L+6e1+/dXW+L/HjjApSXQPkk2C/62okvWIXwJMR0H6ECWs7BL2fbvolCARQYorsbvF68AhRvx/9xaycC0ZZbJxIRk9/HkIXgHQHNzoGIO4jHfp5ngoYScCiDeHoOkCoQZAz1LQviPQWkP9NlXoHoByGSylM87nOWXWMDaZ65BPEhDfHQBolYC+RMQKoKoanZnCQgSrPlJoK8BGymYlg/zvAZ7JoApp2FmV2GXl/lNxwrVq70DT38CcaoJ0SxBigRbWIbYMVA+WxKdYKkQ1ivDNgWMVNDCwDC4XrsPXBqGZXcyFP91VO8SMF/R+XwDdGkCco3BgyTU9ODewMJ5+V7gqTO+MpPGGDIkNstV3P3yrrq/swudDNnXwxwXRinOwsTgcSyo1z2ffg4VsPbPSvBOjsG78AZG5qdb10iKoYhdxBEk0pakJCMkDJGp3P7T5u6sB6XQIhxIIPJb0OMb0HHAe9I0k4vvDwPINFtQqUPOn2ux00SqEVqvGVmv1QSfUHvuu2WVjjD8/jm69tYgBlCD3C2DyuyB5W7CxKDtfM4Ba6x9/waEZG0zH0TvGINUK7Qy0iSnTqkPL86o6xdnvOtvjssrYUQqcnYAqcvn8e5JCzFahTw9AlqZ6yZPm4D4c3YWNMZZk5wCOe1H07jIMhQZyHPjcnEkRZcEIXA7NSgWzo7Ly4481EL0eeGU9iAbCVAtCbrh6sX2ELiV75zNXZBiZCFwSmsrLHt6MEkzOLTSQ7RgO7niK5oMfdBAf0/aU5ymBwSjXK2P3IVzXQXMzyElQVb8RzMhiYOKxQ6wVYqvt/I4aB0dcWqX/fwIrCukRot3w66zO1hJa7eq9qfD4NWa+dU1IvfGGLHZ8GNZPOKEGe0SHwTZVaC71+qwiRpMqOmJJC4mTscnz/X3lZq9Zyyabr+o6NsP13VeCdKK32zWzY+pBLST3QXXgetRhwutwJFPl2H2+EG6H/q73/wfPl6IZj1h006LxxtRXht803Yb6+JxFfvSaCJR+eJb9XMyYjkHPgE7vnrIAuKAuI74+wYstxkTbcE8/QP1Ow9UjqNd9pSNGLC7PRsGPkVCifLtX3QuFUKrPS6waRguMht7JSbodtNsVtSLQFgEtZhluwL8/QKtwl/i3uRpuz3gy2TgmT7FeaUNre007erNe97XhSdqmwSicgm6uAdTnIMZZZyrV+Ms6ummcavm4SK4pwg2V5X5LDe4svtYkSBWhrueTdYAPQSzzW0BrDmGeFeZgK1fhJsN3K6ONLsOixsu7YYFRCwgTvTB9J1AVDWxO5sa6E8ATzdgahomGIRdnITJV2FuMfhNHlTUo3ZPllPbbbmVWItZJuAzmphA2NhBeLYfreE6wvApWobPoQGE8zOInCJssV7Mwiwh7gq965iRGT/aH+7unlmByHFmZDjTcrn2iIQ7ub0cZIsbsTFad1weS3CUkC2m9rjoih6R+jfoa13/AAh+OlaEZiSEAAAAAElFTkSuQmCC',
      showSymbol: false,
      lineStyle: { color: 'rgba(255, 255, 255, 0.80)', width: 2 },
      data: actualArr,
      z: 11,
    };
    const forecastSeries = {
      name: '预测负荷',
      type: 'line',
      showSymbol: false,
      smooth: true,
      symbolSize: 20,
      // eslint-disable-next-line max-len
      symbol:
        'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAaCAYAAACtv5zzAAAAAXNSR0IArs4c6QAABJhJREFUSEu1lktoXFUYx3/nnPuYmcykzQyp1VqwLdWaaUFUrA0VpyCIm64cVy5s3bkSXztxdKlSF4IgWERwIcSFulBclAai1YAFXwmllVZo09qGTGpmMnNf5xy582gmzVS60At3cQ+X/+875/89juB/fsTt6duB/4SFwe9UIV0b/twC0BOoIaoTiPI8dm4OsVhGjM9hqcLUPLbW06y9gaWjtBE0BGBFrYa4IQiyuYRgN7TriHuAq0Us5+DaXkzhCnZ8ApsG0QHWsIOgmwBWVKvITqQTyJF55BLIzSMI1yDDdjdOP4tttLEBmBKYVTCLYCpgurtZ28kAwApqiArI7BIqvwNZiHEci1z2UGMGGXuIJjAWYZebGDJoAjSj6OYFTLuE7kBqwvQdWQdIo6eMYhQVxjh5gxMYMj+FPNw27LVQAqQDV33J74/kOe1qwswWksWL6AwkzKGnpjD9Y1oDWCsqb6LuAaeexU3FL0DpjxbPAHdIkKJnpRVYAwbD4naXz3ZBHYgWUwAk0zX0RkDNyio4ATiZDK7W5GZaPC8FW5TsiCspuh6k4jp9LTqFPJjj+KiihUd0/gzJ6bvQfbNv7KBataq5FSdfwmUUb7bO5Co84Uucgof/9mEOPrCdHVIgT53nzOtfM7sSEGpIspIT+yXfZ0YIg1XiqTk0U0J3ErdrRjd7mo/huG08X5OZbnFUSbYpiXPsMAcru9k3WEo/XuDMC59zMoHEGK5UcnwUKoL4EtH+EnHf6BsAqsjnyrirbXxnlMy3Aa95Ft+VOKde4qincAcBQUJ48Bgfx5BEEDyZ4d3rMW2KhPkZkr7RayZXraqUcccz+EiyJ1Z4xYOMp1AzL3Ik4+APAiJNPPkexyNDoiE6pHjHK9JaqBNNzxHTy6R1HiyWcbcV8aKA3PQKRyTc6UicD57m0KM72DMIOHmO317+gu96R7RQcfjEg1axSPh+nXiDybWalbNF3GIdv+GS/SVksgWPK4va5JN56yn2T+5ij7GYny9y4dUvmVkJiVKTR2D6gOGH1YRW3Cb6ppQCusW2dkS9NA1b+P5mMq2IwmzMs0JSSiFpqiIQ0oCWGKOxqbiFpQM+n6JpNCC4BtF8Wg8bAFjx0Ic4E+fwgjw+MdkFy/hZwWErKKaFpnp1oG230AQs7RF8dbdicRkCD4LLl4m7dXDzDrCiUkFRwXHa+IUsvu/gt1bIzSv2NST3aigZiXEt13OWs/fF/LrZpVUPCY0iTLKE053oh1VyrxbSXvR3E1dofD+LG3u4ToKbSVDG6R6pTLCBg5aWJGeJVgxRvEC0aRdxGZLaQMve0K4rNVTaTbWP4zp4cYIrPJRMUJ7bBSgXy3V000G3VolzI0QqJMn/tZb/Q7ppf8nKSg15aQl1f4hqg6tGUJ5EJr12rZawvsZohZajJKn4sFa9PosGkzzNqDnE+TFkIUIVPGTDQcb57g7cJrawBdP4E9Pw0KeXMd3C2jg2/2XodwdQH7RzGdHcisiXOvOZ7Bh25zJmqoztZ8ywsX8bt4q1C8A6gY6Rwwf94H+3ARgWVwq99VXlPwAMgw5f+wceHxQ5mUJHwAAAAABJRU5ErkJggg==',
      lineStyle: { color: '#0079FF', width: 2 },
      areaStyle: {
        color: new echarts.graphic.LinearGradient(
          0,
          0,
          0,
          1,
          [
            {
              offset: 0,
              color: 'rgba(85,137,255, 0.3)',
            },
            {
              offset: 1,
              color: 'rgba(24, 144, 255, 0)',
            },
          ],
          false
        ),
        shadowColor: 'rgba(0, 0, 0, 0.1)',
        shadowBlur: 10,
      },
      connectNulls: true,
      data: forecastArr,
      z: 11,
    };
    series.push(actualSeries);
    series.push(forecastSeries);
    return series;
  };
  const getOptions = () => ({
    grid: {
      top: '5%',
      bottom: '5%',
      left: '0%',
      right: '0%',
      containLabel: true,
    },
    // 提示框组件
    tooltip: {
      backgroundColor: 'rgba(6, 12, 28, 0.30)',
      borderColor: 'rgba(6, 12, 28, 0.30)',
      trigger: 'axis',
      axisPointer: {
        lineStyle: {
          color: '#57617B',
        },
        z: 1,
      },
      extraCssText: 'backdrop-filter: blur(4px);',
      textStyle: {
        color: 'rgba(255, 255, 255, 0.90)',
        fontFamily: 'HarmonyOS-Medium',
      },
      formatter: (params) => {
        let tip = '';
        const timeFormat = 'YYYY-MM-DD HH:mm';

        if (params && params.length > 0) {
          const date = moment(new Date(params[0].value[0])).format(timeFormat);
          const timeStr = `<span style="color: rgba(255, 255, 255, 0.6)">${date}</span>`;
          tip += `${timeStr}<br/>${params[0].name}`;

          // eslint-disable-next-line no-plusplus
          for (let i = 0; i < params.length; i++) {
            const marker =
              params[i].seriesName === '实际负荷'
                ? `<span style="display:inline-block;margin-right:4px;width:10px;height:10px;background: rgba(255, 255, 255, 0.8);"></span>`
                : `<span style="display:inline-block;margin-right:4px;width:10px;height:10px;background: linear-gradient(180deg, #1890FF 0%, rgba(24,144,255,0.2) 100%);"></span>`;
            const spaceSign =
              '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';
            const name = `<span style="font-size: 16px;">${params[i].seriesName}</span>`;
            const value = `<span style="font-size: 16px;">${params[i].value[1]}</span>`;
            const unit = '<span style="font-size: 10px;">&nbsp;kW</span><br />';
            tip += `${marker}${name}${spaceSign}${value}${unit}`;
          }
        }
        return tip;
      },
    },
    xAxis: [
      {
        type: 'time', // x轴为 时间轴
        splitLine: {
          show: true,
          lineStyle: {
            width: 1,
            color: 'rgba(255, 255, 255, 0.15)',
            type: 'dotted',
          },
        },
        axisLabel: {
          color: 'rgba(255,255,255,0.8)',
          fontSize: 14,
          fontFamily: 'PangMenZhengDaoBiaoTiTi',
          fontWeight: 400,
          formatter: (value) =>
            `${
              forecastData.value.length <= 25
                ? moment(value).format('HH:mm')
                : moment(value).format('MM-DD')
            }`,
        },
        axisTick: { show: false },
        boundaryGap: ['10%', '10%'],
        axisLine: {
          lineStyle: {
            width: 3,
            color: '#8A9194',
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
          color: 'rgba(255,255,255,0.8)',
          fontSize: 14,
          fontFamily: 'PangMenZhengDaoBiaoTiTi',
          fontWeight: 400,
        },
        splitLine: {
          lineStyle: {
            width: 1,
            color: 'rgba(255, 255, 255, 0.15)',
            type: 'dotted',
          },
        },
      },
    ],
    series: getSeries(),
  });
  const { echartRef, renderChart } = useEchart(getOptions, {
    isWatch: true,
    watchData: forecastData,
  });
  renderChart(true, true);
  const handleResize = () => {
    const chart = echarts.getInstanceByDom(echartRef.value);
    if (chart) {
      chart.resize();
    }
  };

  onMounted(() => {
    window.addEventListener('resize', handleResize);
  });

  onUnmounted(() => {
    window.removeEventListener('resize', handleResize);
  });
</script>

<style lang="less" scoped>
  .chart-conatiner {
    width: 100%;
    height: 100%;
  }
</style>
