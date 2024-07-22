import axios from 'axios';

const BASE_URL_AIR = '/energyBase/airConEquipment/v1';

export interface ValueObj {
  ts: string;
  value: number;
}

export interface OverView {
  airconditionRunningNumQOQ: string;
  inDoorOffNum: number;
  inDoorRunningNum: number;
  inDoorUnitNum: number;
  openRate: number;
  todayAirconditionRunningNum: number;
  totalEquNum: number;
  vrvNum: number;
  vrvOffNum: number;
  vrvRunningNum: number;
  yesterdayAirconditionRunningNum: number;
}

export function overView() {
  return axios.post<OverView>(`${BASE_URL_AIR}/overView`);
}

export interface OffOnDetails {
  offNum: number;
  openRate: number;
  runningNum: number;
}

export interface StatusStatistics {
  comBuildTotal: OffOnDetails[];
  curBuilding: OffOnDetails[];
  currentLayer: OffOnDetails[];
}

export interface Location {
  location: string;
}

export function statusStatistics(params: Location) {
  return axios.post<StatusStatistics>(
    `${BASE_URL_AIR}/statusStatistics`,
    params
  );
}

export interface OnOffDetails {
  onNum: number;
  offNum: number;
  on_OffDetails: object;
  outdoorOnNum: object;
}

export function onOffDetails(params: Location) {
  return axios.post<OnOffDetails>(`${BASE_URL_AIR}/on_OffDetails`, params);
}

export interface CompBuildingECInfo {
  currentCycleECInfo: ValueObj[];
  previousCycleECInfo: ValueObj[];
}

export function compBuildingECInfo(params: Location) {
  return axios.post<CompBuildingECInfo>(
    `${BASE_URL_AIR}/compBuildingECInfo`,
    params
  );
}

export interface Last7DaysOpenRate {
  reteInfo: ValueObj[];
}

export function last7DaysOpenRate(params: Location) {
  return axios.post<Last7DaysOpenRate>(
    `${BASE_URL_AIR}/last7DaysOpenRate`,
    params
  );
}

export interface CompBuildingECStatistics {
  eastEC: number;
  eastECProp: number;
  totalEC: number;
  westEC: number;
  westECProp: number;
}

export function compBuildingECStatistics() {
  return axios.post<CompBuildingECStatistics>(
    `${BASE_URL_AIR}/compBuildingECStatistics`
  );
}

const BASE_URL_KEY = '/energyBase/keyequipment/v1';

export interface EquOverview {
  actRate: number;
  actRateQOQ: string;
  eqNum: number;
  offNum: number;
  runningNum: number;
  todayEQEC: number;
  todayEQECQOQ: string;
  todayEQECYOY: string;
  yearEQEC: number;
  yearEQECYOY: string;
  yesterdayActRate: number;
}

export function equOverview() {
  return axios.post<EquOverview>(`${BASE_URL_KEY}/equOverview`);
}

export interface KeyEquStatusMonitor {
  actRate: number;
  currentP: number;
  eqName: string;
  status: boolean;
}

export function keyEquStatusMonitor() {
  return axios.post<KeyEquStatusMonitor[]>(
    `${BASE_URL_KEY}/keyEquStatusMonitor`
  );
}

export interface Dimension {
  dimension: string;
}

export interface KeyEquipmentEcInfo {
  currentCycleECInfo: ValueObj[];
  previousCycleECInfo: ValueObj[];
}

export function keyEquipmentEcInfo(params: Dimension) {
  return axios.post<KeyEquipmentEcInfo>(
    `${BASE_URL_KEY}/keyEquipmentEcInfo`,
    params
  );
}

export function keyEquECTop5(params: Dimension) {
  return axios.post(`${BASE_URL_KEY}/keyEquECTop5`, params);
}

export function keyEquipmentAcRateHist(params: Dimension) {
  return axios.post(`${BASE_URL_KEY}/keyEquipmentAcRateHist`, params);
}

export interface NodeId {
  nodeId: string;
}

export interface LkeyEquInfo {
  coDepth: number;
  currentP: number;
  currentStatus: boolean;
  runTime: number;
  so2Depth: number;
  todayEC: number;
}

export function keyEquInfo(params: NodeId) {
  return axios.post(`${BASE_URL_KEY}/keyEquInfo`, params);
}
