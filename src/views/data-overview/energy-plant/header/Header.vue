<!--
 * @Author: zhkai 2572429235@qq.com
 * @Date: 2023-10-23 10:00:35
 * @LastEditors: zhangk 13182353591@163.com
 * @LastEditTime: 2024-04-09 10:23:00
 * @FilePath: \emp-admin-ui\src\views\data-overview\energy-plant\header\Header.vue
 * @Description: 头部组件
 * 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
-->
<template>
  <div class="header-container">
    <div class="logo-title">
      <div class="logo"></div>
      <div class="title">{{ state.title }}</div>
    </div>
    <!-- 模块导航 -->
    <div class="module-nav">
      <div
        v-for="(item, index) in state.moduleNav"
        :key="index"
        :class="[
          'module-nav-item',
          index === moduleNavIndex ? 'module-nav-item-active' : '',
        ]"
        @click="setModuleNavIndex(index)"
      >
        {{ item }}
      </div>
    </div>
    <div class="wea-sep-date">
      <WeatherInfo></WeatherInfo>
      <div class="separator"></div>
      <DateTime></DateTime>
    </div>
  </div>
</template>

<script setup>
  import { useStore } from '@/store';
  import DateTime from '../common/DateTime.vue';
  import WeatherInfo from '../common/WeatherInfo.vue';

  const state = reactive({
    title: window.ENERGYMONITOR.title,
    moduleNav: ['全厂能源监控', '设备态势监控', '光伏直驱发电'],
  });

  const moduleNavIndex = computed(() => useStore().moduleNav);

  const setModuleNavIndex = (index) => {
    useStore().setModuleNav(index);
  };
</script>

<style lang="less" scoped>
  .header-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 1920px;
    height: 88px;

    .set-back('@/assets/imgs/energy-plant/header-bg.png');

    .logo-title {
      display: flex;
      align-items: center;

      .logo {
        width: 120px;
        height: 31px;
        margin-left: 55px;

        .set-back(
          '@/assets/imgs/energy-plant/energy-monitor-logo.png'
        );
      }

      .title {
        margin-left: 16px;
        color: #fff;
        font-weight: 400;
        font-size: 40px;
        font-family: YouSheBiaoTiHei, sans-serif;
        font-style: normal;
        line-height: normal;
        letter-spacing: 4px;
        text-shadow: 0 3px 1px rgb(0 0 0 / 25%);
      }
    }

    .module-nav {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 792px;
      height: 80px;
      margin-top: -4px;

      .module-nav-item {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 267px;
        color: #fff;
        font-weight: 400;
        font-size: 24px;
        font-family: YouSheBiaoTiHei, sans-serif;
        font-style: normal;
        line-height: normal;
        cursor: pointer;
      }

      .module-nav-item-active {
        width: 264px;
        height: 80px;

        .set-back('@/assets/imgs/energy-plant/module_nav_active.png');
      }
    }

    .wea-sep-date {
      display: flex;
      align-items: center;

      .separator {
        width: 1px;
        height: 28px;
        margin-left: 20px;
        background: rgb(255 255 255 / 20%);
      }
    }
  }
</style>
