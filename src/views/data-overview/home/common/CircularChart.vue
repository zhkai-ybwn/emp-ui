<!--
 * @Author: zhangkai 2572429235@qq.com
 * @Date: 2023-09-22 08:41:13
 * @LastEditors: zhangk 13182353591@163.com
 * @LastEditTime: 2024-03-19 10:39:18
 * @FilePath: \emp-admin-ui\src\views\data-overview\home\common\CircularChart.vue
 * @Description: 环形图
-->
<template>
  <div class="chart-box">
    <div
      ref="echartRef"
      class="circular-progress-container"
      :style="{ width: `${config.width}px`, height: `${config.height}px` }"
    >
    </div>
    <div class="text-box">
      <div class="text">{{ data.text }}</div>
      <div class="sign-value-unit">
        <div class="hb">环比</div>
        <svg
          v-if="+data.value === 0"
          xmlns="http://www.w3.org/2000/svg"
          width="10"
          height="4"
          viewBox="0 0 10 4"
          fill="none"
          style="margin-left: 4px"
        >
          <path d="M0 2.40723H10" stroke="#4FD164" stroke-width="3" />
        </svg>
        <div
          v-if="+data.value !== 0"
          :class="['sign', data.increaseOrDecrease ? 'red' : 'green']"
        ></div>
        <div class="value-unit">
          <div :class="+data.value !== 0 ? 'value' : 'value-text'">{{
            +data.value !== 0
              ? data.value.toLocaleString('zh', { minimumFractionDigits: 1 })
              : '持平'
          }}</div>
          <div v-if="+data.value !== 0" class="unit">%</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import useEchart from '@/hooks/useEchart';

  const props = defineProps({
    data: {
      type: Object,
      default: () => ({
        value: 0,
        increaseOrDecrease: true,
        text: '',
      }),
    },
    config: {
      type: Object,
      default: () => ({
        width: 100,
        height: 100,
        color: ['rgba(24, 144, 255, 1)', 'rgba(24, 144, 255, 1)'],
      }),
    },
  });

  const dataC = computed(() => props.data.value);
  const getOptions = () => ({
    angleAxis: {
      max: 100,
      // 隐藏刻度线
      show: false,
      startAngle: 90,
    },
    radiusAxis: {
      type: 'category',
      show: true,
      axisLabel: {
        show: false,
      },
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
    },
    polar: {
      radius: '190%', // 图形大小
    },
    series: [
      {
        type: 'bar',
        data: [props.data.value],
        showBackground: true,
        roundCap: true,
        backgroundStyle: {
          color: 'rgba(58, 61, 67, 1)',
        },
        coordinateSystem: 'polar',
        barWidth: 4,
        itemStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: props.config.color[0],
              },
              {
                offset: 1,
                color: props.config.color[1],
              },
            ],
            global: false,
          },
        },
      },
    ],
  });
  const { echartRef, renderChart } = useEchart(getOptions, {
    isWatch: true,
    watchData: dataC,
  });
  renderChart(true, true);
</script>

<style lang="less" scoped>
  .chart-box {
    position: relative;

    .text-box {
      position: absolute;
      top: 22px;

      .text {
        width: 108px;
        color: rgb(255 255 255 / 80%);
        font-weight: 400;
        font-size: 14px;
        font-family: HarmonyOS-Regular, sans-serif;
        font-style: normal;
        line-height: 36px;
        text-align: center;
      }

      .sign-value-unit {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 108px;

        .hb {
          color: rgb(255 255 255 / 90%);
          font-weight: 400;
          font-size: 10px;
          font-family: HarmonyOS-Regular, sans-serif;
          font-style: normal;
          line-height: 16px;

          /* 160% */
          text-transform: capitalize;
        }

        .sign {
          width: 11px;
          height: 16px;
          margin-left: 3px;
        }

        .red {
          .set-back('@/assets/imgs/home/red-arrow.png');
        }

        .green {
          .set-back('@/assets/imgs/home/green-arrow.png');
        }

        .value-unit {
          display: flex;
          margin-left: 3px;

          .value {
            color: rgb(255 255 255 / 90%);
            font-weight: 500;
            font-size: 16px;
            font-family: HarmonyOS-Regular, sans-serif;
            font-style: normal;
            line-height: 20px;

            /* 125% */
          }

          .value-text {
            color: rgb(255 255 255 / 90%);
            font-weight: 400;
            font-size: 14px;
            font-family: HarmonyOS-Regular, sans-serif;
            font-style: normal;
            line-height: 20px; /* 142.857% */
          }

          .unit {
            margin-top: 3px;
            color: rgb(255 255 255 / 90%);
            font-weight: 400;
            font-size: 10px;
            font-family: HarmonyOS-Regular, sans-serif;
            font-style: normal;
            line-height: 16px;

            /* 160% */
            text-transform: capitalize;
          }
        }
      }
    }
  }
</style>
