import axios from 'axios';

const BASE_URL = '/energyBase/dashboard/v1';

export interface ValueObj {
  ts: string;
  value: number;
}

export interface HoleFactEnergyConsumption {
  todayHoleFactEC: number;
  todayHoleFactECDOD: string;
  curMonHoleFactEC: number;
  curMonHoleFactECDOD: string;
  yearHoleFactEC: number;
  yearHoleFactECDOD: string;
}

export function holeFactEnergyConsumption() {
  return axios.get<HoleFactEnergyConsumption>(
    `${BASE_URL}/holeFactEnergyConsumption`
  );
}

export interface HoleFactEcInfo {
  comprehensiveBuildEC: number;
  comprehensiveBuildECQOQ: number;
  manufacturePlantEC: number;
  manufacturePlantECQOQ: number;
  productTransportationEC: number;
  smtProductionEC: number;
  testCenterEC: number;
  testCenterECQOQ: number;
  todayECInfo: ValueObj[];
  yesterdayECInfo: ValueObj[];
}

export function getHoleFactEcInfo() {
  return axios.get<HoleFactEcInfo>(`${BASE_URL}/getHoleFactEcInfo`);
}

export interface EaraECProp {
  canteenEC: number;
  compBuildingEC: number;
  displayAreaEC: number;
  manufacturePlantEC: number;
  smtProductionEC: number;
  testCenterEC: number;
}

export function earaECProp(dimension: string) {
  return axios.get<EaraECProp>(`${BASE_URL}/earaECProp?dimension=${dimension}`);
}

export interface PhotovoltaicInfo {
  backplaneTemperature: number;
  currentP: number;
  envHumidity: number;
  envTemperature: number;
  envWindSpeed: number;
  lastYearTotalElecGen: number;
  mainEngineConsumption: number;
  todayElecGen: number;
  totalCarbonEmissionReduction: number;
  totalElecGen: number;
  totalSavedCoal: number;
}

export function photovoltaicInfo() {
  return axios.get(`${BASE_URL}/photovoltaicInfo`);
}

export interface AirconditionEC {
  todayEC: number;
  todayECInfo: ValueObj[];
  yesterdayEC: number;
  yestodayECInfo: ValueObj[];
}

export function airconditionEC() {
  return axios.get<AirconditionEC>(`${BASE_URL}/airconditionEC`);
}

export interface ActuationDetailVoList {
  nodeId: string;
  deviceName: string;
  currentStatus: boolean;
  actuationPercent: number;
}

export function keyEquipmentAcRate() {
  return axios.get<ActuationDetailVoList[]>(`${BASE_URL}/keyEquipmentAcRate`);
}
