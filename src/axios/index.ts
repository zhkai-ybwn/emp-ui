import axios, { AxiosResponse } from 'axios';
import { getToken } from '@/utils/auth';

const token = getToken();
const headers = {
  Authorization: `Bearer ${token}`,
};
interface ApiResponse<T = any> {
  message?: any;
  code: number;
  data?: T;
}

const axiosAPI = {
  // get请求
  get<T = any>(url: string, param?: any): Promise<ApiResponse<T>> {
    return new Promise((resolve) => {
      axios({
        method: 'get',
        url,
        params: param,
        headers,
      }).then((res: AxiosResponse) => {
        return resolve(res);
      });
    });
  },
  // post请求
  post<T = any>(url: string, param?: any): Promise<ApiResponse<T>> {
    return new Promise((resolve) => {
      axios({
        method: 'post',
        url,
        data: param,
        headers,
      }).then((res: AxiosResponse) => {
        return resolve(res);
      });
    });
  },
};

export default axiosAPI;
