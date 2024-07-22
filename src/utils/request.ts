import axios from 'axios';
import type { AxiosRequestConfig, AxiosResponse } from 'axios';
import { useUserStore } from '@/store';
import { getToken, clearTimer } from '@/utils/auth';
import modalErrorWrapper from '@/utils/modal-error-wrapper';
import messageErrorWrapper from '@/utils/message-error-wrapper';

// default config
if (import.meta.env.VITE_API_BASE_URL) {
  axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;
  axios.defaults.timeout = 60000; // 1 分钟
}

export interface HttpResponse<T = unknown> {
  success: boolean; // 是否成功
  code: number; // 状态码
  message: string; // 状态信息
  data: T; // 返回数据
  timestamp: string; // 时间戳
}

// request interceptors
axios.interceptors.request.use(
  // @ts-ignore
  (config: AxiosRequestConfig) => {
    const token = getToken();

    // config.headers = {};
    if (!config.headers) config.headers = {};
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    const searchParams = new URLSearchParams(window.location.search);
    const tenantId = searchParams.get('TENANT_ID');
    if (tenantId) {
      localStorage.setItem('TENANT_ID', `${tenantId}`);
    }
    if (!config.headers.TENANT_ID)
      config.headers.TENANT_ID = localStorage.getItem('TENANT_ID') as string;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// response interceptors
axios.interceptors.response.use(
  (response: AxiosResponse<HttpResponse>) => {
    // 二进制数据则直接返回
    if (
      response.request.responseType === 'blob' ||
      response.request.responseType === 'arraybuffer'
    ) {
      return response;
    }

    const res: any = response.data;
    if (res.success || response.status === 200) {
      if (res.code === 200 || res.status === '1') {
        return res;
      }
    }
    if ([401].includes(res.code) && response.config.url !== '/auth/user/info') {
      clearTimer();
      modalErrorWrapper({
        title: '确认退出',
        content: res.message,
        maskClosable: false,
        escToClose: false,
        okText: '重新登录',
        async onOk() {
          const userStore = useUserStore();
          userStore.logoutCallBack();

          const newUrl = `${window.location.origin}${
            window.location.pathname
          }?TENANT_ID=${localStorage.getItem('TENANT_ID')}`;
          window.location.href = newUrl;

          // window.location.reload();
        },
      });
    } else {
      messageErrorWrapper({
        content: res.message || '网络错误',
        duration: 5 * 1000,
      });
    }
    return Promise.reject(new Error(res.message || '网络错误'));
  },
  (error) => {
    messageErrorWrapper({
      content: error.message || '网络错误',
      duration: 5 * 1000,
    });
    return Promise.reject(error);
  }
);
