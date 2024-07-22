/* eslint-disable prettier/prettier */
import axios from 'axios';
import type { AxiosRequestConfig } from 'axios';

const BASE_URL = '/intelligentAlarm/health';

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

export interface DeviceAlarmReq {
  deviceId: number;
  pointTypes: string[];
  timeType: number;
}

export interface AlarmLevel {
  code: number;
  mes: string;
  value: number;
}

export interface PointDetailVoList {
  alarmLevel: AlarmLevel;
  alarmTitle: string;
}

export interface DeviceAlarmRes {
  deviceId: number;
  deviceName: string;
  pointDetailVoList: PointDetailVoList[];
  runningStatus: boolean;
}

export function getTotalDeviceDetail(req: DeviceAlarmReq) {
  return axios.post<DeviceAlarmRes[]>(`${BASE_URL}/getTotalDeviceDetail`, req, config);
}

export interface PointInfo {
  alarmLevel: string;
  deviceCode: string;
  deviceId: number;
  deviceName: string;
  pointDisplayName: string;
  pointId: string;
  pointValue: string;
  sort: number;
  unit: string;
}
export interface PointDetail {
  alarmingCount: number;
  todayAlarmCount: number;
  pointList: PointInfo[];
}

export function getTotalPointDetail(req: DeviceAlarmReq) {
  return axios.post<PointDetail>(
    `${BASE_URL}/getTotalPointDetail`,
    req,
    config
  );
}

export interface LatticeDataList {
  pointTime: string;
  pointValue: string;
}
export interface LatticeDiagramData {
  latticeDataList: LatticeDataList[];
  leftPointName: string;
  rightPointName: string;
  rightPointValue: string;
}

export function getLatticeDiagramData(req: DeviceAlarmReq) {
  return axios.post<LatticeDiagramData>(
    `${BASE_URL}/getLatticeDiagramData`,
    req,
    config
  );
}

export interface LineChartDataList {
  pointTime: string;
  leftPointValue: number;
  rightPointValue: number;
}
export interface LineChartData {
  lineChartDataList: LineChartDataList[];
  leftPointName: string;
  rightPointName: string;
}

export function getLineChartData(req: DeviceAlarmReq) {
  return axios.post<LineChartData>(`${BASE_URL}/getLineChartData`, req, config);
}

export interface Point {
  alarmLevel: string;
  deviceCode: string;
  deviceId: number;
  deviceName: string;
  pointDisplayName: string;
  pointId: string;
  pointValue: string;
  sort: number;
  unit: string;
}

export interface PartPointDetail {
  alarmingCount: number;
  pointList: Point[];
  runningStatus: boolean;
  todayAlarmCount: number;
  todayRate: string;
}

export function getPartPointDetail(req: DeviceAlarmReq) {
  return axios.post<PartPointDetail>(
    `${BASE_URL}/getPartPointDetail`,
    req,
    config
  );
}

export interface PointDataList {
  abscissaPointValue: string;
  ordinatePointValue: string;
}
export interface PointCorrespondence {
  abscissaPointName: string;
  ordinatePointName: string;
  pointDataList: PointDataList[];
}

export function getPointCorrespondence(req: DeviceAlarmReq) {
  return axios.post<PointCorrespondence>(
    `${BASE_URL}/getPointCorrespondence`,
    req,
    config
  );
}
