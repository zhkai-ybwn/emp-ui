import axios from 'axios';
import qs from 'query-string';
import { ListParam as DeptParam } from '@/api/system/dept';
import { ListParam as MenuParam } from '@/api/system/menu';
import { ListParam as RoleParam } from '@/api/system/role';
import { ListParam as OptionParam } from '@/api/system/config';
import { TreeNodeData } from '@arco-design/web-vue';
import { LabelValueState } from '@/store/modules/dict/types';

const BASE_URL = '/emp-admin/common';

export interface ListDeptTreeParams {
  name?: string;
  status?: number;
  sort?: string[];
}

export function listDeptTree(params: ListDeptTreeParams) {
  return axios.get<TreeNodeData[]>(`${BASE_URL}/tree/dept`, {
    params,
    paramsSerializer: (obj) => {
      return qs.stringify(obj);
    },
  });
}

export interface ListMenuTreeParams {
  sort?: string[];
  type?: number[];
}

export function listMenuTree(params: ListMenuTreeParams) {
  return axios.get<TreeNodeData[]>(`${BASE_URL}/tree/menu`, {
    params,
    paramsSerializer: (obj) => {
      return qs.stringify(obj);
    },
  });
}

export function listRoleDict(params: RoleParam) {
  return axios.get<LabelValueState[]>(`${BASE_URL}/dict/role`, {
    params,
    paramsSerializer: (obj) => {
      return qs.stringify(obj);
    },
  });
}

export function listDict(code: string) {
  return axios.get<LabelValueState[]>(`${BASE_URL}/dict/${code}`);
}

export function listOption(params: OptionParam) {
  return axios.get<LabelValueState[]>(`${BASE_URL}/option`, {
    params,
    paramsSerializer: (obj) => {
      return qs.stringify(obj);
    },
  });
}

export function upload(data: FormData) {
  return axios.post(`${BASE_URL}/file`, data);
}
