<!--
 * @Author: zhangk 13182353591@163.com
 * @Date: 2024-01-30 09:21:06
 * @LastEditors: zhangk 13182353591@163.com
 * @LastEditTime: 2024-04-09 10:28:35
 * @FilePath: \emp-admin-ui\src\views\energy-analysis\consumption-panel\components\NengHaoZhanBi.vue
 * @Description: 能耗占比组件
 * 
 * Copyright (c) 2024 by ${git_name_email}, All Rights Reserved. 
-->
<template>
  <div class="nhzb-container">
    <ModuleBox :config="state.title">
      <div v-if="!state.loading && state.dataList" class="ring-chart">
        <SemicircularRingChart :data="state.dataList" class="ring" />
        <div class="legend">
          <div
            v-for="(item, index) in state.dataList.values"
            :key="index"
            class="item"
          >
            <div class="block" :style="{ background: colorList[index] }"></div>
            <div class="text">{{ item.name }}</div>
          </div>
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
          height: 278px;
        "
        tip="加载中"
      ></a-spin>
      <div v-if="!state.dataList && !state.loading" class="empty">
        <div class="img"></div>
        <div class="text">&nbsp;暂无数据</div>
      </div>
    </ModuleBox>
  </div>
</template>

<script lang="ts" setup>
  import {
    ECproportion,
    ConParams,
  } from '@/api/energy-analysis/consumption-panel';
  import bus from '@/utils/bus';
  import ModuleBox from '../../common/ModuleBox.vue';
  import SemicircularRingChart from '../../common/SemicircularRingChart.vue';

  const colorList = [
    '#A3C5FF',
    '#BBD3FB',
    '#96BBF8',
    '#699EF5',
    '#4787F0',
    '#266FE8',
    '#0052D9',
    '#0744DA',
    '#103CAA',
    '#033381',
    '#0D2F66',
  ];

  interface Value {
    name: string;
    value: number;
  }

  interface Data {
    totalValue: number;
    values: Value[];
  }

  const state = reactive({
    loading: false,
    dataList: null as Data | null,
    title: {
      Width: '100%',
      titleHeight: '40px',
      text: '能耗占比',
      textEn: 'Energy consumption proportion',
      Height: '318px',
    },
  });

  const fetchData = async (params: ConParams) => {
    try {
      state.loading = true;
      const { data } = await ECproportion(params);
      state.dataList = data as any;
    } catch (err) {
      state.dataList = null;
    } finally {
      state.loading = false;
    }
  };

  bus.on('search-consumption', (params: any) => {
    fetchData(params);
  });
</script>

<style lang="less" scoped>
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

  .ring-chart {
    display: flex;
    width: 100%;
    height: 278px;

    .ring {
      width: 70%;
    }

    .legend {
      display: flex;
      flex-direction: column;
      justify-content: center;
      width: 30%;

      .item {
        display: flex;
        align-items: center;
        margin-bottom: 8px;

        .block {
          width: 21px;
          height: 10px;
        }

        .text {
          margin-left: 3px;
          color: rgb(255 255 255 / 85%);
          font-weight: 400;
          font-size: 14px;
          font-family: HarmonyOS-Regular, sans-serif;
          font-style: normal;
          line-height: 16px;
          text-align: left;
          text-transform: none;
        }
      }
    }
  }
</style>
