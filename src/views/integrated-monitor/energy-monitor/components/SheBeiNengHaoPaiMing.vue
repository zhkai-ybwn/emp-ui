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
      <RankingChart
        v-if="!state.loading && Object.keys(state.dataList).length !== 0"
        :data="state.dataList"
      />
      <div
        v-if="
          Object.keys(state.dataList).length === 0 && state.loading === false
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
  import { deviceEnergyRankTop5 } from '@/api/integrated-monitor/energy-monitor';
  import ModuleBox from '../../common/ModuleBox.vue';
  import RankingChart from '../../common/RankingChart.vue';

  const state = reactive({
    loading: false,
    dataList: {},
    title: {
      Width: '100%',
      titleHeight: '40px',
      text: '设备能耗排名',
      textEn: '',
      Height: '382px',
    },
  });

  const fetchData = async () => {
    try {
      state.loading = true;
      const { data } = await deviceEnergyRankTop5();
      state.dataList = data;
    } catch (err) {
      state.dataList = {};
    } finally {
      state.loading = false;
    }
  };
  fetchData();
</script>

<style scoped lang="less">
  .time {
    position: absolute;
    top: 10px;
    right: 16px;
    color: #97a3b7;
    font-size: 14px;
    font-family: SourceHanSansCN-Normal, sans-serif;
    line-height: 22px;
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
</style>
