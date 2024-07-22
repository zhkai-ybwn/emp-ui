import axios from 'axios';

const BASE_URL = '/integrateMonitor';

export interface ValueObj {
  ts: string;
  value: number;
}

export interface AirConditionSysECSaving {
  savingInfo: ValueObj[];
  electricitySaving: number;
  reducedStandardCoal: number;
  reduceCO2Emissions: number;
  reduceSO2Emissions: number;
}

export function airConditionSysECSaving() {
  return axios.post<AirConditionSysECSaving>(
    `${BASE_URL}/energyMonitor/v1/airConditionSysECSaving`
  );
}

export function areaEnergyRankTop5() {
  return axios.post(`${BASE_URL}/energyMonitor/v1/areaEnergyRankTop5`);
}

// 设备能耗排名
export function deviceEnergyRankTop5() {
  return axios.post(`${BASE_URL}/energyMonitor/v1/deviceEnergyRankTop5`);
}

// 今日用能趋势
export function holeFactoryEnergyInfo() {
  return axios.post(`${BASE_URL}/energyMonitor/v1/holeFactoryEnergyInfo`);
}

// 系统用能前五
export function systemECTop5() {
  return axios.post(`${BASE_URL}/energyMonitor/v1/systemECTop5`);
}

// 空调系统用能趋势
export function airConditionSystemEnergyInfo() {
  return axios.post(
    `${BASE_URL}/energyMonitor/v1/airConditionSystemEnergyInfo`
  );
}
