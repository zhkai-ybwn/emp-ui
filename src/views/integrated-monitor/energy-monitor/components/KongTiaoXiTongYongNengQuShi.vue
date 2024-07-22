<template>
  <div class="ktxt-container">
    <ModuleBox :config="state.title">
      <a-spin
        v-if="state.loading"
        :loading="state.loading"
        style="
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 340px;
        "
        tip="加载中"
      ></a-spin>
      <div v-if="isShow() && !state.loading" class="unit">
        <div class="left">单位：kWh</div>
        <div class="right">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="10"
            viewBox="0 0 14 6"
            fill="none"
          >
            <circle
              cx="6.83826"
              cy="3"
              r="2"
              stroke="#00C2FF"
              stroke-width="2"
            />
            <path
              d="M1 3H4"
              stroke="#00C2FF"
              stroke-width="2"
              stroke-linecap="round"
            />
            <path
              d="M10.0001 3H13.0001"
              stroke="#00C2FF"
              stroke-width="2"
              stroke-linecap="round"
            />
          </svg>
          <span style="margin-right: 20px; margin-left: 5px">今日</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="10"
            viewBox="0 0 14 6"
            fill="none"
          >
            <circle
              cx="6.83826"
              cy="3"
              r="2"
              stroke="#35FFCF"
              stroke-width="2"
            />
            <path
              d="M1 3H4"
              stroke="#35FFCF"
              stroke-width="2"
              stroke-linecap="round"
            />
            <path
              d="M10.0001 3H13.0001"
              stroke="#35FFCF"
              stroke-width="2"
              stroke-linecap="round"
            />
          </svg>
          <span style="margin-left: 5px">昨日</span>
        </div>
      </div>
      <EnergyTrendChart
        v-if="isShow() && state.dataList"
        class="chart"
        :data="state.dataList"
      />
      <div v-if="!isShow() && state.loading === false" class="empty">
        <div class="img"></div>
        <div class="text">&nbsp;暂无数据</div>
      </div>
    </ModuleBox>
  </div>
</template>

<script lang="ts" setup>
  import { airConditionSystemEnergyInfo } from '@/api/integrated-monitor/energy-monitor';
  import ModuleBox from '../../common/ModuleBox.vue';
  import EnergyTrendChart from '../../common/EnergyTrendChart.vue';

  const state = reactive({
    loading: false,
    dataList: null as any,
    title: {
      Width: '100%',
      titleHeight: '40px',
      text: '空调系统用能趋势',
      textEn: '',
      Height: '382px',
    },
  });

  const fetchData = async () => {
    try {
      state.loading = true;
      const { data } = await airConditionSystemEnergyInfo();
      if (data !== null) {
        state.dataList = data;
      } else {
        state.dataList = {};
      }
    } catch (err) {
      state.dataList = {};
    } finally {
      state.loading = false;
    }
  };
  fetchData();

  const isShow = () => {
    if (!state.dataList) {
      return false;
    }
    if (
      ((state.dataList.todayInfo && state.dataList.todayInfo.length === 0) ||
        !state.dataList.todayInfo) &&
      ((state.dataList.yesterdayInfo &&
        state.dataList.yesterdayInfo.length === 0) ||
        !state.dataList.yesterdayInfo)
    ) {
      return false;
    }
    return true;
  };
</script>

<style scoped lang="less">
  .unit {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 15%;
    padding: 0 3%;

    .left {
      color: #fff;
      font-weight: 400;
      font-size: 12px;
      font-family: HarmonyOS-Regular, sans-serif;
      font-style: normal;
      line-height: 20px; /* 166.667% */
    }

    .right {
      color: #fff;
      font-weight: 350;
      font-size: 14px;
      font-family: 'Source Han Sans CN', sans-serif;
      font-style: normal;
      line-height: normal;
      letter-spacing: 0.7px;
      vertical-align: middle;
    }
  }

  .empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 340px;
  }

  .img {
    width: 98px;
    height: 60px;
    background-image: url('@/assets/imgs/energy-analysis/empty-image.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
  }

  .text {
    color: #7787a2;
    font-weight: 400;
    font-size: 16px;
    font-family: HarmonyOS-Regular, sans-serif;
    font-style: normal;
    line-height: 24px; /* 150% */
  }

  .chart {
    height: 75%;
  }
</style>
