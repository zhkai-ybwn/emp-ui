<!--
 * @Author: zhangk 13182353591@163.com
 * @Date: 2023-10-30 10:36:36
 * @LastEditors: zhangk 13182353591@163.com
 * @LastEditTime: 2024-04-02 10:02:19
 * @FilePath: \emp-admin-ui\src\views\data-overview\energy-plant\plant-monitor\left\QuYuYongDianZhanBi.vue
 * @Description: 区域用电占比统计组件
 * 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
-->
<template>
  <div class="disp-area-usage">
    <ModuleBox :title-config="state.titleConfig" :box-config="state.boxConfig">
      <div class="ring-bg1">
        <div class="ring-bg2"> </div>
      </div>
      <RingChart class="ring-chart" :data="state.dataList"></RingChart>
      <div class="info-card">
        <div class="value-unit">
          {{ state.dataList[state.currentItemIndex]?.per.toFixed(0) }}
          <span>%</span>
        </div>
        <div class="name">{{
          state.dataList[state.currentItemIndex]?.name
        }}</div>
      </div>
      <div class="info-list">
        <QuYuYongDianItem
          v-for="(item, index) in state.dataList"
          :key="index"
          :data-item="item"
          :color="state.colors[index]"
          :show-bg="state.currentItemIndex === index"
        ></QuYuYongDianItem>
      </div>
    </ModuleBox>
    <div class="time">今日内</div>
  </div>
</template>

<script setup>
  import useEchart from '@/hooks/useEchart';
  import { areaEcProp } from '@/api/data-overview/plant-monitor';
  import ModuleBox from '../../common/ModuleBox.vue';
  import RingChart from '../../common/RingChart.vue';
  import QuYuYongDianItem from './QuYuYongDianItem.vue';

  const { looping } = useEchart();

  const state = reactive({
    titleConfig: {
      text: '区域用电量占比统计',
      width: 361,
      height: 38,
    },
    boxConfig: {
      width: 361,
      height: 425,
    },
    dataList: [],
    labelUnit: [
      { label: '能源制造厂区', unit: 'kWh' },
      { label: '思茂特生产', unit: 'kWh' },
      { label: '成品储运部', unit: 'kWh' },
      { label: '测试中心', unit: 'kWh' },
      { label: '综合楼', unit: 'kWh' },
    ],
    colors: [
      'linear-gradient(103deg, #328FFF 5.75%, #4A90E4 91.56%)',
      'linear-gradient(120deg, #716FFF 11.66%, #4560BD 66.23%)',
      'linear-gradient(167deg, #9B76CB 10.54%, #7366BE 84.92%)',
      'linear-gradient(103deg, #FFAD32 6.18%, #947A54 92%)',
      'linear-gradient(81deg, rgba(18, 228, 216, 0.85) 8.02%, rgba(49, 255, 243, 0.40) 99.18%)',
    ],
    currentItemIndex: 0,
    intervalIndex: null,
  });

  const setData = (data) => {
    state.dataList = [];
    state.dataList.push({
      name: state.labelUnit[0].label,
      unit: state.labelUnit[0].unit,
      per: data.manufacturePlantECProp,
      value: data.manufacturePlantEC,
    });
    state.dataList.push({
      name: state.labelUnit[1].label,
      unit: state.labelUnit[1].unit,
      per: data.smtProductionECProp,
      value: data.smtProductionEC,
    });
    state.dataList.push({
      name: state.labelUnit[2].label,
      unit: state.labelUnit[2].unit,
      per: data.productTransportationECProp,
      value: data.productTransportationEC,
    });
    state.dataList.push({
      name: state.labelUnit[3].label,
      unit: state.labelUnit[3].unit,
      per: data.testCenterECProp,
      value: data.testCenterEC,
    });
    state.dataList.push({
      name: state.labelUnit[4].label,
      unit: state.labelUnit[4].unit,
      per: data.comprehensiveBuildECProp,
      value: data.comprehensiveBuildEC,
    });
    state.dataList.sort((a, b) => b.value - a.value);
  };

  const setIntervalIndex = () => {
    state.intervalIndex = setInterval(() => {
      if (state.currentItemIndex < state.dataList.length - 1) {
        // eslint-disable-next-line no-plusplus
        state.currentItemIndex++;
      } else {
        state.currentItemIndex = 0;
      }
    }, 5000);
  };

  onMounted(() => {
    setIntervalIndex();
  });

  onBeforeUnmount(() => {
    clearInterval(state.intervalIndex);
  });

  const fetchData = async () => {
    try {
      const { data } = await areaEcProp();
      setData(data);
    } catch (err) {
      // you can report use errorHandler or other
    }
  };
  looping(fetchData, 900 * 1000);
</script>

<style lang="less" scoped>
  .disp-area-usage {
    position: relative;

    .ring-bg1 {
      position: absolute;
      top: 18px;
      left: 92px;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 176px;
      height: 176px;

      .set-back('@/assets/imgs/energy-plant/ring_chart_bg1.png');

      .ring-bg2 {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100px;
        height: 100px;

        .set-back('@/assets/imgs/energy-plant/ring_chart_bg2.png');
      }
    }

    .ring-chart {
      position: absolute;
      top: 18px;
      left: 92px;
    }

    .info-card {
      position: absolute;
      top: 55px;
      left: 130px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 100px;
      height: 100px;

      .value-unit {
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

      .name {
        color: #fff;
        font-weight: 350;
        font-size: 14px;
        font-family: SourceHanSansCN-Normal, sans-serif;
        font-style: normal;
        line-height: normal;
        text-align: center;
      }
    }

    .info-list {
      position: absolute;
      top: 214px;
      left: 22px;
    }
  }

  .time {
    position: absolute;
    top: 10px;
    right: 16px;
    color: #97a3b7;
    font-size: 14px;
    font-family: SourceHanSansCN-Normal, sans-serif;
    line-height: 22px;
  }
</style>
