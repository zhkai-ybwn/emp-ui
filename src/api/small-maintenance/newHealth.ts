import axios from 'axios';
import type { AxiosRequestConfig } from 'axios';

const BASE_URL = '/intelligentAlarm/chillerRoom';

let config = {};

const tenantId = localStorage.getItem('TENANT_ID');

if (tenantId === '1002') {
  config = {
    headers: {
      // eslint-disable-next-line prettier/prettier
    'TENANT_ID': '1001',
    },
  } as AxiosRequestConfig;
}

// 查询冷水机房设备
export function getChillerRoomDeviceDetail() {
  return axios.post(`${BASE_URL}/getChillerRoomDeviceDetail`, {}, config);
}

export interface LineReq {
  pointIds: string[];
}
// 运行折线图
export function getDynamicLineChartData(req: LineReq) {
  return axios.post(`${BASE_URL}/getDynamicLineChartData`, req, config);
}

// COP总览
export function getEnergyOverview() {
  return axios.post(`${BASE_URL}/getEnergyOverview`, {}, config);
}

// 电能占比
export function getEnergyRatio() {
  return axios.post(`${BASE_URL}/getEnergyRatio`, {}, config);
}

// 节能数据
export function getEnergySavingData() {
  return axios.post(`${BASE_URL}/getEnergySavingData`, {}, config);
}

// 环境参数
export function getEnvironmentalParam() {
  return axios.post(`${BASE_URL}/getEnvironmentalParam`, {}, config);
}

// 系统数据
export function getSystemData() {
  return axios.post(`${BASE_URL}/getSystemData`, {}, config);
}

// 管道点位
export function getWaterPipePointDetail() {
  return axios.post(`${BASE_URL}/getWaterPipePointDetail`, {}, config);
}

// 能效趋势
export function getCOPLineChartData(req: LineReq) {
  return axios.post(`${BASE_URL}/getCOPLineChartData`, req, config);
}
