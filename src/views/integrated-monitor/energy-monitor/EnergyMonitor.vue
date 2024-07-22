<!--
 * @Author: zhangk 13182353591@163.com
 * @Date: 2024-01-29 09:23:00
 * @LastEditors: zhangk 13182353591@163.com
 * @LastEditTime: 2024-03-21 10:54:11
 * @FilePath: \emp-admin-ui\src\views\integrated-monitor\energy-monitor\EnergyMonitor.vue
 * @Description: 水电气监控页面
 * 
 * Copyright (c) 2024 by ${git_name_email}, All Rights Reserved. 
-->
<template>
  <div class="energy-monitor-bg">
    <Breadcrumb :items="['综合监控', '能源监控']" />
    <div class="energy-type-section">
      <div class="energy-type-label">能耗类型：</div>
      <div class="energy-type-select">
        <a-select
          v-model="state.energyType"
          style="width: 100px"
          :options="energyTypes"
          placeholder="能耗类型"
          popup-container=".energy-monitor-bg"
        ></a-select>
      </div>
    </div>
    <div class="content-section">
      <ZongYongNengQuShi class="zynqs"></ZongYongNengQuShi>
      <SheBeiNengHaoPaiMing class="sbnhpm"></SheBeiNengHaoPaiMing>
      <KongTiaoXiTongYongNengQuShi
        class="ktxtynqs"
      ></KongTiaoXiTongYongNengQuShi>
      <ZhuYaoXiTongYongNengTongJi class="zyxtyntj"></ZhuYaoXiTongYongNengTongJi>
      <AirConditionerEnergySavingStatus
        class="ktxtjn"
      ></AirConditionerEnergySavingStatus>
      <AreaEnergyConsumptionStatistics
        class="qynhtj"
      ></AreaEnergyConsumptionStatistics>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import type { SelectOptionData } from '@arco-design/web-vue/es/select/interface';
  import AirConditionerEnergySavingStatus from './components/AirConditionerEnergySavingStatus.vue';
  import AreaEnergyConsumptionStatistics from './components/AreaEnergyConsumptionStatistics.vue';
  import KongTiaoXiTongYongNengQuShi from './components/KongTiaoXiTongYongNengQuShi.vue';
  import ZhuYaoXiTongYongNengTongJi from './components/ZhuYaoXiTongYongNengTongJi.vue';
  import ZongYongNengQuShi from './components/ZongYongNengQuShi.vue';
  import SheBeiNengHaoPaiMing from './components/SheBeiNengHaoPaiMing.vue';

  const state = reactive({
    energyType: '0',
  });

  const energyTypes = ref<SelectOptionData[]>([
    {
      value: '0',
      label: '电',
    },
    // {
    //   value: '1',
    //   label: '水',
    // },
    // {
    //   value: '2',
    //   label: '燃气',
    // },
  ]);
</script>

<style lang="less" scoped>
  .energy-monitor-bg {
    position: relative;
    width: 100%;
    height: 100%;
    padding: 0 1.5%;
    overflow-y: auto;
    .set-back('@/assets/imgs/load-forecast/home-bg.png');

    .energy-type-section {
      position: absolute;
      top: 13px;
      right: 1.5%;
      display: flex;
      align-items: center;

      .energy-type-label {
        color: rgb(255 255 255 / 85%);
        font-weight: 400;
        font-size: 14px;
        font-family: HarmonyOS-Regular, sans-serif;
        font-style: normal;
        line-height: 22px;
      }
    }

    .content-section {
      .zynqs {
        position: absolute;
        top: 56px;
        width: 70.77%;
      }

      .sbnhpm {
        position: absolute;
        top: 56px;
        right: 24px;
        width: 25%;
      }

      .ktxtynqs {
        position: absolute;
        top: 462px;
        width: 47.85%;
      }

      .zyxtyntj {
        position: absolute;
        top: 462px;
        right: 24px;
        width: 47.85%;
      }

      .ktxtjn {
        position: absolute;
        top: 870px;
        width: 70.77%;
      }

      .qynhtj {
        position: absolute;
        top: 870px;
        right: 24px;
        width: 25%;
      }
    }
  }
</style>
