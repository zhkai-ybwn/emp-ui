<template>
  <div class="zyxt-container">
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
      <div
        v-if="
          state.dataList &&
          Object.keys(state.dataList).length !== 0 &&
          !state.loading
        "
        class="chart"
      >
        <NewEnergyUsageStatistics :data="state.dataList" class="left" />
        <div class="right">
          <div v-for="(item, index) in state.list" :key="index" class="item">
            <div class="block" :style="{ background: color[index] }"></div>
            <div class="title">{{ item.name }}</div>
            <div class="percent">
              {{ ((item.value / state.totalValue) * 100).toFixed(1) }}
              <span class="unit">%</span></div
            >
            <div class="line"></div>
            <div class="value">
              {{ item.value }}
              <span class="unit">kWh</span>
            </div>
          </div>
        </div>
      </div>
      <div
        v-if="
          (!state.dataList || Object.keys(state.dataList).length === 0) &&
          state.loading === false
        "
        class="empty"
      >
        <div class="img"></div>
        <div class="text">&nbsp;暂无数据</div>
      </div>
      <div class="time">今日内</div>
    </ModuleBox>
  </div>
</template>

<script lang="ts" setup>
  import { systemECTop5 } from '@/api/integrated-monitor/energy-monitor';
  import ModuleBox from '../../common/ModuleBox.vue';
  import NewEnergyUsageStatistics from '../../common/NewEnergyUsageStatistics.vue';

  const color = ['#266FE8', '#4787F0', '#699EF5', '#96BBF8', '#BBD3FB'];

  const state = reactive({
    loading: false,
    dataList: null,
    list: [] as { name: string; value: number }[],
    totalValue: 0,
    title: {
      Width: '100%',
      titleHeight: '40px',
      text: '系统用能占比统计',
      textEn: '',
      Height: '382px',
    },
  });
  const fetchData = async () => {
    try {
      state.loading = true;
      const res = await systemECTop5();
      if (res.code === 200) state.dataList = res.data;
      state.list = Object.keys(res.data).map((key) => {
        return { name: key, value: res.data[key] };
      });
      state.totalValue = state.list.reduce(
        (accumulator, current) => accumulator + current.value,
        0
      );
    } catch (err) {
      state.dataList = null;
    } finally {
      state.loading = false;
    }
  };
  fetchData();
</script>

<style lang="less" scoped>
  .chart {
    // margin: 0 auto;
    display: flex;
    // width: 95%;
    height: 340px;

    .left {
      flex: 1;
    }

    .right {
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
      width: 28.125rem;
      margin: 1.25rem 0;

      .item {
        display: flex;
        align-items: center;

        .block {
          width: 12px;
          height: 12px;
          margin-right: 9px;
          border: 2px solid rgb(255 255 255 / 20%);
        }

        .title {
          width: 9.375rem;
          color: #fff;
          font-weight: 400;
          font-size: 16px;
          font-family: HarmonyOS-Regular, sans-serif;
          line-height: 19px;
        }

        .line {
          width: 0;
          height: 12px;
          margin: 0 1.3125rem;
          border: 0.0625rem solid rgb(255 255 255/20%);
        }

        .percent,
        .value {
          color: #fff;
          font-weight: 500;
          font-size: 20px;
          font-family: Barlow-Medium, sans-serif;
          line-height: 23px;

          .unit {
            margin-left: 0.375rem;
            color: rgb(255 255 255/60%);
            font-weight: 400;
            font-size: 16px;
            font-family: HarmonyOS-Regular, sans-serif;
            line-height: 19px;
          }
        }
      }
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
