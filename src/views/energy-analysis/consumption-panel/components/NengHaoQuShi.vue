<!--
 * @Author: zhangk 13182353591@163.com
 * @Date: 2024-01-30 09:10:23
 * @LastEditors: zhangk 13182353591@163.com
 * @LastEditTime: 2024-03-21 08:58:52
 * @FilePath: \emp-admin-ui\src\views\energy-analysis\consumption-panel\components\NengHaoQuShi.vue
 * @Description: 能耗趋势组件
 * 
 * Copyright (c) 2024 by ${git_name_email}, All Rights Reserved. 
-->
<template>
  <div class="nhqs-container">
    <ModuleBox :config="state.title">
      <div v-if="shouldDisplayChart()" class="chart-unit"> 单位：kWh </div>
      <RateTrend
        v-if="shouldDisplayChart()"
        class="chart"
        :data="state.dataList"
        :config="state.config"
      ></RateTrend>
      <a-spin
        v-if="state.loading"
        :loading="state.loading"
        tip="加载中"
        style="
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 300px;
        "
      ></a-spin>
      <div v-if="showNoDataMessage()" class="empty">
        <div class="img"></div>
        <div class="text">&nbsp;暂无数据</div>
      </div>
    </ModuleBox>
  </div>
</template>

<script lang="ts" setup>
  import {
    ECTends,
    Values,
    ConParams,
  } from '@/api/energy-analysis/consumption-panel';
  import bus from '@/utils/bus';
  import ModuleBox from '../../common/ModuleBox.vue';
  import RateTrend from '../../common/RateTrend.vue';

  const state = reactive({
    title: {
      Width: '100%',
      titleHeight: '40px',
      text: '能耗趋势',
      textEn: 'Energy consumption trend',
      Height: '410px',
    },
    dataList: [] as Values[],
    config: {
      width: '100%',
      height: '320px',
    },
    loading: false,
  });

  const fetchData = async (params: ConParams) => {
    try {
      state.loading = true;
      const { data } = await ECTends(params);
      state.dataList = data.values;
    } catch (err) {
      state.dataList = [];
    } finally {
      state.loading = false;
    }
  };

  const shouldDisplayChart = () => {
    return !state.loading && state.dataList && state.dataList.length !== 0;
  };

  const showNoDataMessage = () => {
    return state.dataList && state.dataList.length === 0 && !state.loading;
  };

  bus.on('search-consumption', (params: any) => {
    fetchData(params);
  });
</script>

<style lang="less" scoped>
  .nhqs-container {
    position: relative;

    .chart-unit {
      margin: 24px 0 0 20px;
      color: #fff;
      font-weight: 400;
      font-size: 14px;
      font-family: HarmonyOS-Regular, sans-serif;
      font-style: normal;
      line-height: 20px;
    }

    .chart {
      padding: 17px 20px 19px;
    }

    .empty {
      position: absolute;
      top: 40px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 410px;

      .img {
        width: 97px;
        height: 60px;
        .set-back('@/assets/imgs/energy-analysis/consumption/empty-image.png');
      }

      .text {
        color: #7787a2;
        font-weight: 400;
        font-size: 16px;
        font-family: HarmonyOS-Regular, sans-serif;
        font-style: normal;
        line-height: 24px;
        text-align: center;
      }
    }
  }
</style>
