import axios, { AxiosRequestConfig } from 'axios';
import { request, requestFd } from '@/core/request';

export const httpGetSystemDict = () => {
  return axios.get('https://api.zmnyun.cn/sys/dict/list', {
    headers: {
      scope: 'scope-common',
    },
  });
};

export default {};
