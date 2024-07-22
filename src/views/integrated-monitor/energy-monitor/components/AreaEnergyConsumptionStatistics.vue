<!--
 * @Author: zhangk 13182353591@163.com
 * @Date: 2024-02-21 09:42:57
 * @LastEditors: zhangk 13182353591@163.com
 * @LastEditTime: 2024-03-27 09:21:47
 * @FilePath: \emp-admin-ui\src\views\integrated-monitor\energy-monitor\components\AreaEnergyConsumptionStatistics.vue
 * @Description: 区域能耗统计
 * 
 * Copyright (c) 2024 by ${git_name_email}, All Rights Reserved. 
-->
<template>
  <div class="ktxtjn-container">
    <ModuleBox :config="state.title">
      <div
        v-if="
          state.rankData &&
          Object.keys(state.rankData).length !== 0 &&
          !state.loading
        "
        class="area-section"
      >
        <div
          v-for="(item, index) in state.rankData"
          :key="index"
          class="area-item"
        >
          <img class="area-icon" :src="icon" />
          <div class="area-label">{{ index }}</div>
          <div class="area-value">{{
            item || item === 0 ? Number(item).toLocaleString() : '-'
          }}</div>
          <div class="area-unit">kWh</div>
        </div>
      </div>
      <a-spin
        v-if="state.loading"
        :loading="state.loading"
        style="
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 295px;
        "
        tip="加载中"
      ></a-spin>
      <div
        v-if="
          state.rankData &&
          Object.keys(state.rankData).length === 0 &&
          !state.loading
        "
        class="empty"
      >
        <div class="img"></div>
        <div class="text">&nbsp;暂无数据</div>
      </div>
    </ModuleBox>
    <div class="time">今日内</div>
  </div>
</template>

<script lang="ts" setup>
  import { areaEnergyRankTop5 } from '@/api/integrated-monitor/energy-monitor';
  import icon from '@/assets/imgs/integrated-monitor/area_statistics_icon.png';
  import ModuleBox from '../../common/ModuleBox.vue';

  const state = reactive({
    loading: false,
    title: {
      Width: '100%',
      titleHeight: '40px',
      text: '区域能耗统计',
      textEn: '',
      Height: '380px',
    },
    rankData: {},
  });

  const fetchData = async () => {
    try {
      state.loading = true;
      const { data } = await areaEnergyRankTop5();
      state.rankData = data;
    } catch (err) {
      state.rankData = {};
    } finally {
      state.loading = false;
    }
  };
  fetchData();
</script>

<style lang="less" scoped>
  .ktxtjn-container {
    .area-section {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      width: 90.34%;
      height: 294px;
      margin: 22.25px 0 0 5.86%;

      .area-item {
        display: flex;
        align-items: center;
        // justify-content: space-between;
        width: 100%;
        height: 46px;
        background: linear-gradient(
          90deg,
          rgb(53 100 191 / 14%) 0.004%,
          rgb(27 76 171 / 0%) 42.384%
        );
        border: 1px solid rgb(63 163 255 / 17.2%);
        box-shadow: 0 0 4px 0 rgb(109 176 255 / 8%) inset,
          0 0 25px 0 rgb(1 91 174 / 4%) inset;

        .area-icon {
          width: 36px;
          height: 36px;
        }

        .area-label {
          width: 30%;
          margin-left: 12px;
          color: #f2f6fa;
          font-weight: 400;
          font-size: 14px;
          font-family: HarmonyOS-Regular, sans-serif;
          font-style: normal;
          line-height: 28px;
        }

        .area-value {
          width: 40%;
          color: #fff;
          font-weight: 500;
          font-size: 18px;
          font-family: Barlow-Normal-Medium-Italic, sans-serif;
          font-style: normal;
          line-height: normal;
          text-align: right;
        }

        .area-unit {
          margin: 4px 0 0 4px;
          color: #c6d1db;
          font-weight: 400;
          font-size: 10px;
          font-family: Barlow-Normal-Medium-Italic, sans-serif;
          font-style: normal;
          line-height: 16.367px;
        }
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

    .empty {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 278px;
    }

    .img {
      width: 98px;
      height: 60px;
      .set-back('@/assets/imgs/energy-analysis/empty-image.png');
    }

    .text {
      color: #7787a2;
      font-weight: 400;
      font-size: 16px;
      font-family: HarmonyOS-Regular, sans-serif;
      font-style: normal;
      line-height: 24px; /* 150% */
    }
  }
</style>
