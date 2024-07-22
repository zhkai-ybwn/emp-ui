import axios from 'axios';
import type { AxiosRequestConfig } from 'axios';

const BASE_URL = '/integrateMonitor/ventilatingSystem';

const config = {
  headers: {
    // eslint-disable-next-line prettier/prettier
    TENANT_ID: '1001',
  },
} as AxiosRequestConfig;

// 查询A系统点位
export function getASystemData() {
  return axios.post(`${BASE_URL}/getASystemData`, {}, config);
}

// 查询B系统点位
export function getBSystemData() {
  return axios.post(`${BASE_URL}/getBSystemData`, {}, config);
}

// 查询大系统点位
export function getLargeSystemData() {
  return axios.post(`${BASE_URL}/getLargeSystemData`, {}, config);
}

// 站台
export function getPlatformData() {
  return axios.post(`${BASE_URL}/getPlatformData`, {}, config);
}

// 站厅
export function getStationHallData() {
  return axios.post(`${BASE_URL}/getStationHallData`, {}, config);
}
