import axios from 'axios';
import qs from 'query-string';

const BASE_URL = '/emp-admin/system/dict';

export interface DataRecord {
  id?: number;
  tenantId?: number;
  category?: string;
  categoryName?: string;
  dictValue?: string;
  dictCode?: string;
  description?: string;
  bdefault?: boolean;
  createBy?: string;
  createTime?: string;
  lastModifyBy?: string;
  lastModifyTime?: string;
}

export interface ListParam {
  description?: string;
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
