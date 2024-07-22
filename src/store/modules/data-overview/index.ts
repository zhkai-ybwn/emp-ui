/*
 * @Author: zhangk 13182353591@163.com
 * @Date: 2023-02-21 14:22:08
 * @LastEditors: zhangk 13182353591@163.com
 * @LastEditTime: 2024-01-03 14:27:47
 * @FilePath: \emp-admin-ui\src\store\modules\data-overview\index.ts
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
// stores/counter.js
import { defineStore } from 'pinia';

const useStore = defineStore('tica', {
  state: () => ({
    // 全厂用电量趋势分析
    powerTrend: 'day',
    // 光伏直驱用电量统计排名TOP3
    pvTrend: 'day',
    // 全厂空调用电量趋势分析
    ariTrend: 'day',
    // 关键设备用电量排名Top5
    keyDevice: 'day',
    // 全场关键设备用电量趋势分析
    ydlTrend: 'day',
    // 当前区域空调运行用电量趋势分析
    areaAriTrend: 'day',
    // 设备用电量统计
    pvDevicePower: 'day',
    // 光伏发电系统能耗趋势分析
    pvPowerTrend: 'day',
    moduleNav: 0,
    deviceType: 0,
    // 区域：东区0.西区1
    region: 0,
    floor: 1,
  }),
  actions: {
    setPowerTrend(key: string) {
      this.powerTrend = key;
    },
    setPVTrend(key: string) {
      this.pvTrend = key;
    },
    setAirTrend(key: string) {
      this.ariTrend = key;
    },
    setKeyDevice(key: string) {
      this.keyDevice = key;
    },
    setYdlTrend(key: string) {
      this.ydlTrend = key;
    },
    setModuleNav(key: number) {
      this.moduleNav = key;
    },
    setDeviceType(key: number) {
      this.deviceType = key;
    },
    setAreaAriTrend(key: string) {
      this.areaAriTrend = key;
    },
    setPvDevicePower(key: string) {
      this.pvDevicePower = key;
    },
    setPvPowerTrend(key: string) {
      this.pvPowerTrend = key;
    },
    setRegion(key: number) {
      this.region = key;
    },
    setFloor(key: number) {
      this.floor = key;
    },
  },
});

export default useStore;
