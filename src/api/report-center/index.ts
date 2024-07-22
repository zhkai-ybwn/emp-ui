/*
 * @Author: zhangk 13182353591@163.com
 * @Date: 2024-02-29 15:18:09
 * @LastEditors: zhangk 13182353591@163.com
 * @LastEditTime: 2024-03-12 09:57:05
 * @FilePath: \emp-admin-ui\src\api\report-center\index.ts
 * @Description: 报表中心接口
 *
 * Copyright (c) 2024 by ${git_name_email}, All Rights Reserved.
 */
import axios from 'axios';
import qs from 'query-string';

const BASE_URL = '/empReport';

export interface AreaInfo {
  areaInfoId: number;
  parentId: number;
  areaInfoName: string;
  serialNo: number;
  areaInfoCode: string;
  children: AreaInfo[];
}

export function listAreaTrees() {
  return axios.post<AreaInfo[]>(`${BASE_URL}/report/listAreaTrees`);
}

export interface DeviceInfo {
  deviceTypeId: number;
  parentId: number;
  deviceTypeName: string;
  deviceTypeCode: string;
  name: string;
  uniqueCode: string;
  level: number;
  children: DeviceInfo[];
}
export interface listReports {
  endTime?: string;
  fromType?: string;
  pageNum?: number;
  pageSize?: number;
  reportName?: string;
  reportType?: string;
  startTime?: string;
}

export function listDeviceTrees() {
  return axios.post<DeviceInfo[]>(`${BASE_URL}/report/listDeviceTrees`);
}

export interface EnergyReq {
  areaInfoId: number;
  classificationCode: string;
  endTime: string;
  page: number;
  pageNum: number;
  pageSize: number;
  size: number;
  sort?: [];
  startTime: string;
}

export interface Record {
  [key: string]: number | string; // 内部对象的键为字符串，值可以是数字或字符串
  report_time: string; // report_time 属性是字符串类型
}

export interface EnergyRes {
  records: Record[];
  total: number;
  size: number;
  current: number;
}

// export interface uploadRes {
//   reportType: string | number;
//   reportFile: File;
// }

export function listAreaEnergyPages(req: EnergyReq) {
  return axios.post<EnergyRes>(`${BASE_URL}/report/listAreaEnergyPages`, req);
}

export function listDeviceEnergyPages(req: EnergyReq) {
  return axios.post<EnergyRes>(`${BASE_URL}/report/listDeviceEnergyPages`, req);
}

// 上传报表
export function uploadReportFile(x: any, y: any) {
  return axios.post(`${BASE_URL}/report/uploadReportFile?reportType=${x}`, y);
}

// 分页查询报告管理
export function listReports(req: listReports) {
  return axios.post(`${BASE_URL}/report/listReports`, req);
}

// 下载报表
export function downloadReportFiles(req: Array<string | number>) {
  // const queryParams = qs.stringify({ ids: req.join(',') });
  const queryParams = req.join(',');
  return axios.post(
    `${BASE_URL}/report/downloadReportFiles?ids=${queryParams}`,
    null,
    {
      responseType: 'blob',
    }
  );
}

// 删除报表
export function deleteReportFiles(req: Array<string | number>) {
  const queryParams = qs.stringify({ ids: req });
  return axios.post(`${BASE_URL}/report/deleteReportFiles?${queryParams}`);
}
