import axios from 'axios';

const BASE_URL = '/analysisWeb/EfficiencyCalendar';

export interface calendarRes {
  date: string;
  cool: string | null;
  electricity: string | null;
  nowDay: boolean;
  cop: string | null;
}

// 按月查询能效日历
export function queryCalendar(date: string) {
  return axios.get<calendarRes[]>(`${BASE_URL}/queryCalendar?date=${date}`);
}

// 查询COP数据
export function queryCOP(date: string) {
  return axios.get(`${BASE_URL}/queryCOP?date=${date}`);
}

// 查询分项能耗
export function querySubEnergy(date: string) {
  return axios.get(`${BASE_URL}/querySubEnergy?date=${date}`);
}
