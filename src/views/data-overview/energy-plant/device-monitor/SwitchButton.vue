<!--
 * @Author: zhangk 13182353591@163.com
 * @Date: 2023-12-04 09:38:36
 * @LastEditors: zhangk 13182353591@163.com
 * @LastEditTime: 2024-01-03 14:13:29
 * @FilePath: \emp-admin-ui\src\views\data-overview\energy-plant\device-monitor\SwitchButton.vue
 * @Description: 空调设备和关键设备切换按钮组件
 * 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
-->
<template>
  <div class="switch-btn-container">
    <!-- 空调设备 -->
    <div
      :class="[deviceType === 0 ? 'kt-active' : 'kt-normal']"
      @click="setDeviceType(0)"
    >
      空调设备
    </div>
    <!-- 关键设备 -->
    <div
      :class="[deviceType === 1 ? 'gj-active' : 'gj-normal']"
      @click="setDeviceType(1)"
    >
      关键设备
    </div>
  </div>
</template>

<script setup>
  import { useStore } from '@/store';

  const deviceType = computed(() => useStore().deviceType);

  const setDeviceType = (type) => {
    useStore().setDeviceType(type);
  };
</script>

<style lang="less" scoped>
  .switch-btn-container {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 262px;
    height: 149px;

    .kt-active {
      width: 262px;
      height: 87px;
      padding-top: 39px;
      padding-left: 109px;
      color: #fff;
      font-weight: 400;
      font-size: 24px;
      font-family: YouSheBiaoTiHei, sans-serif;
      font-style: normal;
      line-height: normal;
      text-shadow: 0 3px 4px rgb(0 0 0 / 10%);
      cursor: pointer;

      .set-back('@/assets/imgs/energy-plant/device-active.png');
    }

    .kt-normal {
      width: 189px;
      height: 56px;
      padding-top: 12px;
      padding-left: 40px;
      color: rgb(255 255 255 / 50%);
      font-weight: 400;
      font-size: 24px;
      font-family: YouSheBiaoTiHei, sans-serif;
      font-style: normal;
      line-height: normal;
      cursor: pointer;

      .set-back('@/assets/imgs/energy-plant/device-normal.png');
    }

    .gj-active {
      width: 262px;
      height: 87px;
      padding-top: 39px;
      padding-left: 109px;
      color: #fff;
      font-weight: 400;
      font-size: 24px;
      font-family: YouSheBiaoTiHei, sans-serif;
      font-style: normal;
      line-height: normal;
      text-shadow: 0 3px 4px rgb(0 0 0 / 10%);
      cursor: pointer;

      .set-back('@/assets/imgs/energy-plant/device-active.png');
    }

    .gj-normal {
      width: 189px;
      height: 56px;
      padding-top: 12px;
      padding-left: 40px;
      color: rgb(255 255 255 / 50%);
      font-weight: 400;
      font-size: 24px;
      font-family: YouSheBiaoTiHei, sans-serif;
      font-style: normal;
      line-height: normal;
      cursor: pointer;

      .set-back('@/assets/imgs/energy-plant/device-normal.png');
    }
  }
</style>
