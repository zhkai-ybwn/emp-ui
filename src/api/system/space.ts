import axios from 'axios';
import qs from 'query-string';

const BASE_URL = '/emp-admin/system/area';

export interface DataRecord {
  id?: number;
  parentId?: number;
  areaInfoName?: string;
  serialNo?: number;
  tenantId?: number;
  areaInfoCode?: string;
  idSeq?: string;
  areaInfoNameSeq?: string;
  telephone?: string;
  level?: number;
  acreage?: number;
  areaInfoStatus?: number;
  deleteStatus?: number;
  description?: string;
  createUser?: string;
  createBy?: string;
  createUserString?: string;
  createTime?: string;
  disabled?: boolean;
  lastModifyBy?: string;
  lastModifyTime?: string;
  children?: Array<DataRecord>;
}

export interface ListParam {
  areaInfoName?: string;
  areaInfoStatus?: number;
  sort?: Array<string>;
}

export function list(params: ListParam) {
  return axios.get(`${BASE_URL}/tree`, {
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
