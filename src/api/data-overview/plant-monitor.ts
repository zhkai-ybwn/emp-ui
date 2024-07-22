import axios from 'axios';

const BASE_URL = '/energyBase/energyMonitor/v1';

export interface ValueObj {
  ts: string;
  value: number;
}

export interface HoleFactEnergyConsumption {
  costSavings: number;
  curMonHoleFactEC: number;
  curMonHoleFactECQOQ: string;
  curMonHoleFactECYOY: string;
  curYearHoleFactEC: number;
  curYearHoleFactECYOY: string;
  lastMonHoleFactEC: number;
  lastYearCurMonHoleFactEC: number;
  lastYearHoleFactEC: number;
  lastYearTodayHoleFactEC: number;
  photovoltaicPowerGenYOY: string;
  todayHoleFactEC: number;
  todayHoleFactECQOQ: string;
  todayHoleFactECYOY: string;
  totalCarbonEmissionReduction: number;
  yesterdayHoleFactEC: number;
}

export function holeFactEnergyConsumption() {
  return axios.post<HoleFactEnergyConsumption>(
    `${BASE_URL}/holeFactEnergyConsumption`
  );
}

export interface HoleFactECInfo {
  currentCycle: ValueObj[];
  previousCycle: ValueObj[];
}

export function holeFactECInfo(dimension: string) {
  return axios.get<HoleFactECInfo>(
    `${BASE_URL}/holeFactECInfo?dimension=${dimension}`
  );
}

export interface AreaEcProp {
  comprehensiveBuildEC: number;
  comprehensiveBuildECProp: number;
  manufacturePlantEC: number;
  manufacturePlantECProp: number;
  productTransportationEC: number;
  productTransportationECProp: number;
  smtProductionEC: number;
  smtProductionECProp: number;
  testCenterEC: number;
  testCenterECProp: number;
}

export function areaEcProp() {
  return axios.post<AreaEcProp>(`${BASE_URL}/areaEcProp`);
}

export interface moduleEcVOS {
  name: string;
  prop: number;
  value: number;
}

export interface PhotovoltaicEcTop3 {
  moduleEcVOS: moduleEcVOS;
  totalC: number;
}

export function photovoltaicEcTop3(dimension: string) {
  return axios.get<PhotovoltaicEcTop3>(
    `${BASE_URL}/photovoltaicEcTop3?dimension=${dimension}`
  );
}

export interface AirconditionEcInfo {
  todayEC: number;
  todayECInfo: ValueObj[];
  yesterdayEC: number;
  yestodayECInfo: ValueObj[];
}

export function airconditionEcInfo(dimension: string) {
  return axios.get<AirconditionEcInfo>(
    `${BASE_URL}/airconditionEcInfo?dimension=${dimension}`
  );
}

export interface AdmOrgECinfo {
  ec: number;
  orgName: string;
}

export function getAdmOrgECinfo() {
  return axios.get<AdmOrgECinfo[]>(`${BASE_URL}/getAdmOrgECinfo`);
}

export interface EcRanking {
  alias: string;
  description?: null;
  name?: null;
  nodeId?: null;
  nodeName?: null;
  path?: null;
  sensorKey?: null;
  sensorName?: null;
  sensorType?: null;
  tag?: null;
  ts?: null;
}

export interface KeyEquipmentEC {
  todayTotalEC: number;
  yesterdayTotalEC: number;
  ecranking: EcRanking[];
}

export function keyEquipmentEC() {
  return axios.post<KeyEquipmentEC>(`${BASE_URL}/keyEquipmentEC`);
}
