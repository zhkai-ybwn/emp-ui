<!--
 * @Author: zhangk 13182353591@163.com
 * @Date: 2023-10-30 11:02:14
 * @LastEditors: zhangk 13182353591@163.com
 * @LastEditTime: 2024-04-02 10:05:29
 * @FilePath: \emp-admin-ui\src\views\data-overview\energy-plant\plant-monitor\left\GuangFuYongDianTongJi.vue
 * @Description: 光伏直驱用电量统计排名TOP3组件
 * 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
-->
<template>
  <div class="factory-ac-power">
    <ModuleBox :title-config="state.titleConfig" :box-config="state.boxConfig">
      <div class="left-box">
        <div class="total-value-unit">
          {{
            String(state.totalPower).length > 7
              ? (state.totalPower / 1000).toFixed(1)
              : state.totalPower.toFixed(1)
          }}
          <span>{{ String(state.totalPower).length > 7 ? 'MWh' : 'kWh' }}</span>
        </div>
        <div class="total-label">光伏直驱总用电量</div>
      </div>
      <div class="right-box">
        <div class="icon"></div>
        <div class="chart-section">
          <div
            v-for="(item, index) in state.chartList"
            :key="index"
            class="chart-item"
          >
            <div class="chart-bg">
              <RingPercentage
                class="ring-chart"
                :data="item.prop * 100"
                :color="state.colors[index]"
              >
              </RingPercentage>
            </div>
            <div class="value-unit">
              {{
                String(item.value).length > 5
                  ? (item.value / 1000).toFixed(1)
                  : item.value.toFixed(1)
              }}
              <span>{{ String(item.value).length > 5 ? 'MWh' : 'kWh' }}</span>
            </div>
            <div class="sign-label">
              <div
                class="sign"
                :style="{ background: `${state.backColors[index]}` }"
              ></div>
              <div class="label">{{ item.name }}</div>
            </div>
          </div>
        </div>
      </div>
    </ModuleBox>
    <ButtonGroup
      :label-data="state.btnList"
      :btn-module-key="state.btnModuleKey"
      class="btn-group"
    ></ButtonGroup>
  </div>
</template>

<script setup>
  import useEchart from '@/hooks/useEchart';
  import { useStore } from '@/store';
  import { photovoltaicEcTop3 } from '@/api/data-overview/plant-monitor';
  import ModuleBox from '../../common/ModuleBox.vue';
  import ButtonGroup from '../../common/ButtonGroup.vue';
  import RingPercentage from '../../common/RingPercentage.vue';

  const state = reactive({
    titleConfig: {
      text: '光伏直驱用电量统计排名TOP3',
      width: 682,
      height: 40,
    },
    boxConfig: {
      width: 682,
      height: 228,
    },
    btnList: [
      {
        key: 'day',
        label: '今日',
      },
      {
        key: 'month',
        label: '本月',
      },
      {
        key: 'year',
        label: '全年',
      },
    ],
    btnModuleKey: 1,
    totalPower: 0,
    chartList: [],
    colors: [
      {
        type: 'linear',
        x: 0,
        y: 0,
        x2: 0,
        y2: 1,
        colorStops: [
          {
            offset: 0,
            color: '#35FFCF', // 0% 处的颜色
          },
          {
            offset: 1,
            color: '#308772', // 100% 处的颜色
          },
        ],
        global: false, // 缺省为 false
      },
      {
        type: 'linear',
        x: 0,
        y: 0,
        x2: 0,
        y2: 1,
        colorStops: [
          {
            offset: 0,
            color: '#328FFF', // 0% 处的颜色
          },
          {
            offset: 1,
            color: '#4A90E4', // 100% 处的颜色
          },
        ],
        global: false, // 缺省为 false
      },
      {
        type: 'linear',
        x: 0,
        y: 0,
        x2: 0,
        y2: 1,
        colorStops: [
          {
            offset: 0,
            color: '#FFAD32', // 0% 处的颜色
          },
          {
            offset: 1,
            color: '#947A54', // 100% 处的颜色
          },
        ],
        global: false, // 缺省为 false
      },
    ],
    backColors: [
      'linear-gradient(220deg, #35FFCF 9.98%, #308772 89.11%)',
      'linear-gradient(134deg, #328FFF 2.32%, #4A90E4 92.82%)',
      'linear-gradient(103deg, #FFAD32 5.88%, #947A54 91.68%)',
    ],
  });

  const { looping } = useEchart();
  const pvTrend = computed(() => useStore().pvTrend);

  const fetchData = async () => {
    try {
      const { data } = await photovoltaicEcTop3(pvTrend.value);
      state.totalPower = data.totalC;
      state.chartList = data.moduleEcVOS;
    } catch (err) {
      // you can report use errorHandler or other
    }
  };

  watch(pvTrend, (newValue, oldValue) => {
    if (newValue !== oldValue) fetchData();
  });

  looping(fetchData, 900 * 1000);
</script>

<style lang="less" scoped>
  .factory-ac-power {
    position: relative;

    .left-box {
      position: absolute;
      top: 36px;
      left: 23px;
      width: 223px;
      height: 150px;

      .set-back('@/assets/imgs/energy-plant/pv-icon-left.png');

      .total-value-unit {
        position: absolute;
        top: 49px;
        left: 97px;
        color: #fff;
        font-weight: 700;
        font-size: 26px;
        font-family: Barlow-Italic, sans-serif;
        font-style: italic;

        span {
          color: rgb(255 255 255 / 64%);
          font-size: 14px;
        }
      }

      .total-label {
        position: absolute;
        top: 83px;
        left: 97px;
        color: rgb(255 255 255 / 85%);
        font-weight: 400;
        font-size: 14px;
        font-family: Inter-Regular, sans-serif;
        font-style: normal;
        line-height: normal;
      }
    }

    .right-box {
      position: absolute;
      top: 36px;
      left: 266px;
      width: 392px;
      height: 150px;

      .icon {
        position: absolute;
        top: 125px;
        left: 0;
        width: 392px;
        height: 25px;

        .set-back('@/assets/imgs/energy-plant/pv-icon-right.png');
      }

      .chart-section {
        position: absolute;
        bottom: 15px;
        display: flex;
        justify-content: space-around;
        width: 392px;

        .chart-item {
          .chart-bg {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 74px;
            height: 74px;

            .set-back('@/assets/imgs/energy-plant/ring-chart-bg.png');
          }

          .value-unit {
            margin-top: 4px;
            color: #fff;
            font-weight: 400;
            font-size: 24px;
            font-family: PangMenZhengDaoBiaoTiTi, sans-serif;
            font-style: normal;

            span {
              color: rgb(255 255 255 / 65%);
              font-size: 14px;
              font-family: Inter-Regular, sans-serif;
            }
          }

          .sign-label {
            display: flex;
            align-items: center;
            margin-top: 4px;

            .sign {
              width: 6px;
              height: 6px;
              border: 1px solid rgb(255 255 255 / 20%);
            }

            .label {
              margin-left: 6px;
              color: #fff;
              font-weight: 350;
              font-size: 14px;
              font-family: SourceHanSansCN-Regular, sans-serif;
              font-style: normal;
            }
          }
        }
      }
    }

    .btn-group {
      position: absolute;
      top: 6px;
      right: 16px;
    }
  }
</style>
