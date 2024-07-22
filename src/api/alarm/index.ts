import axios from 'axios';
import type { AxiosRequestConfig } from 'axios';

const BASE_URL = '/intelligentAlarm';

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

export interface AlarmLevel {
  code: number;
  mes: string;
  value: number;
}

export interface RealAlarm {
  alarmContent: string;
  alarmInfoId: number;
  alarmLevel: AlarmLevel;
  areaName: string;
  dealAdvice: string;
  deviceName: string;
  firstTime: string;
  recoverTime: string;
}

export interface RealAlarms {
  current: number;
  records: RealAlarm[];
  size: number;
  total: number;
}

export interface Param {
  alarmClass?: object;
  alarmLevel?: object;
  areaCode?: string;
  content?: string;
  startTime?: string;
  endTime?: string;
  pageNum?: number;
  pageSize?: number;
}

export function listRealAlarms(req: Param) {
  return axios.post<RealAlarms>(
    `${BASE_URL}/alarm/listRealAlarms`,
    req,
    config
  );
}

export interface AreaInfo {
  id: number;
  areaInfoCode: string;
  areaInfoName: string;
  parentId: number;
  hasChild: boolean;
}

export function listAreaInfos(req: object) {
  return axios.post<AreaInfo[]>(`${BASE_URL}/area/listAreaInfos`, req, config);
}

export function dealAlarm(req: object) {
  return axios.post(`${BASE_URL}/alarm/dealAlarm`, req, config);
}

export interface AlarmDetailSimpleVO {
  alarmCount: number;
  alarmLevel: AlarmLevel;
  alarmTxt: string;
  areaName: string;
  dealTime: string;
  deviceName: string;
  firstTime: string;
  indicatorName: string;
  lastTime: string;
  recoverTime: string;
}

export interface Records {
  alarmContent: string;
  alarmTime: string;
  indicatorValue: string;
}

export interface PageResult {
  current: number;
  records: Records[];
  size: number;
  total: number;
}

export interface RealAlarmDetail {
  alarmDetailSimpleVO: AlarmDetailSimpleVO;
  pageResult: PageResult;
}

export function getRealAlarmDetail(req: object) {
  return axios.post<RealAlarmDetail>(
    `${BASE_URL}/alarm/getRealAlarmDetail`,
    req,
    config
  );
}

export function getHisAlarmDetail(req: object) {
  return axios.post<RealAlarmDetail>(
    `${BASE_URL}/alarm/getHisAlarmDetail`,
    req,
    config
  );
}

export function listHisAlarms(req: Param) {
  return axios.post<RealAlarms>(`${BASE_URL}/alarm/listHisAlarms`, req, config);
}
