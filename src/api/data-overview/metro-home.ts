import axios from 'axios';

const BASE_URL = '/empScreen/metro';

// 查询空调系统分项近7日用电趋势
export function getAcSystemItemEnergy() {
  return axios.post(`${BASE_URL}/getAcSystemItemEnergy`);
}

// 查询空调近7日用电
export function getAcSystemTerminalEnergy() {
  return axios.post(`${BASE_URL}/getAcSystemTerminalEnergy`);
}

// 查询空气质量
export function getAirQuality() {
  return axios.post(`${BASE_URL}/getAirQuality`);
}

// 查询水系统累计制冷量
export function getChillerRoomCapacity() {
  return axios.post(`${BASE_URL}/getChillerRoomCapacity`);
}

// 查询用电总览
export function getEnergyOverviewVO(dimension: string) {
  return axios.post(`${BASE_URL}/getEnergyOverviewVO?dimension=${dimension}`);
}

// 查询节能数据
export function getSavingEnergy() {
  return axios.post(`${BASE_URL}/getSavingEnergy`);
}

// 查询累计能效值
export function getTotalCOP() {
  return axios.post(`${BASE_URL}/getTotalCOP`);
}

// 查询室外气象监测
export function getWeatherMonitor() {
  return axios.post(`${BASE_URL}/getWeatherMonitor`);
}

// 查询机房设备健康度
export function listDeviceHealthDegree() {
  return axios.post(`${BASE_URL}/listDeviceHealthDegree`);
}
