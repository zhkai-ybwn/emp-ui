import axios from 'axios';
import qs from 'query-string';

const BASE_URL = '/emp-admin/system/device/info';

export interface devicePoint {
  id?: number;
  tenantId?: number;
  deviceInfoId?: number;
  pointId?: string;
  pointName?: string;
  pointGroupId?: string;
  pointGroupName?: string;
  description?: string;
  unit?: string;
  pointType?: string;
}

export interface PointList {
  id?: number;
  createBy?: string;
  createUserString?: string;
  createTime?: string;
  lastModifyBy?: string;
  lastModifyTime?: string;
  tenantId?: number;
  pointId?: string;
  pointName?: string;
}

export interface deviceParam {
  paramName: string;
  paramValue: string;
}
export interface DataRecord {
  id?: number;
  createBy?: string;
  createTime?: string;
  lastModifyBy?: string;
  lastModifyTime?: string;
  tenantId?: string;
  deviceInfoName?: string;
  deviceTypeId?: number;
  deviceInfoCode?: string;
  parentId?: number;
  parentName?: string;
  systemCode?: string;
  systemName?: string;
  deviceInfoStatus?: number;
  telephone?: string;
  deviceTypeName?: string;
  description?: string;
  deviceInstall: {
    deviceInfoId?: number;
    areaInfoId?: number;
    areaInfoName?: string;
    installTime?: string;
  };
  deviceParamList?: deviceParam[];
  devicePointBindInfoList?: devicePoint[];
}

export interface ListParam {
  deviceInfoName?: string;
  deviceInfoStatus?: number;
  deviceTypeId?: number;
  systemCode?: string;
  areaInfoId?: number;
  page?: number;
  size?: number;
  sort?: Array<string>;
}

export interface ListRes {
  records: DataRecord[];
  total: number;
}

export function list(params: ListParam) {
  return axios.get<ListRes>(`${BASE_URL}`, {
    params,
    paramsSerializer: (obj) => {
      return qs.stringify(obj);
    },
  });
}

export function get(id: number) {
  return axios.get<DataRecord>(`${BASE_URL}/${id}`);
}

export function add(req: DataRecord) {
  return axios.post(BASE_URL, req);
}

export function update(req: DataRecord, id: number) {
  return axios.put(`${BASE_URL}/${id}`, req);
}

export function del(ids: number | Array<number>) {
  return axios.delete(`${BASE_URL}/${ids}`);
}

export function dict(params: any) {
  return axios.get(`/emp-admin/system/dict/list`, {
    params,
    paramsSerializer: (obj) => {
      return qs.stringify(obj);
    },
  });
}

export function point(params: any) {
  return axios.get<PointList[]>(`/emp-admin/system/point/list`, {
    params,
    paramsSerializer: (obj) => {
      return qs.stringify(obj);
    },
  });
}

export function pointGroup(params: any) {
  return axios.get(`/emp-admin/system/point/group/list`, {
    params,
    paramsSerializer: (obj) => {
      return qs.stringify(obj);
    },
  });
}

export function deviceList(params: any) {
  return axios.get(`/emp-admin/system/device/info/list`, {
    params,
    paramsSerializer: (obj) => {
      return qs.stringify(obj);
    },
  });
}
