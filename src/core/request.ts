/* eslint no-undef: 0 */
import axios from 'axios';
import qs from 'qs';
import { message } from '@sinohealth/butterfly-ui-components/lib';
import { getToken } from '@/utils/cookies';
import { baseURL } from '@/config/base';

// 默认配置
axios.defaults.timeout = 15000;
axios.defaults.withCredentials = true;
// @ts-ignore
axios.defaults.headers['Content-Type'] = 'application/json';

// 普通请求实例
const request = axios.create({
  baseURL,
  maxRedirects: 0,
});

// form-data类型请求实例
const requestFd = axios.create({
  baseURL,
  method: 'post',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
  transformRequest: [
    (data) => {
      Object.keys(data).forEach((key) => {
        if (typeof data[key] === 'object') {
          // eslint-disable-next-line no-param-reassign
          data[key] = JSON.stringify(data[key]);
        }
      });
      return qs.stringify(data);
    },
  ],
});

request.interceptors.request.use((conf: any) => conf);
function beforeRequest(options: any) {
  const newOptions = { ...options };
  const token = getToken();
  if (token) {
    newOptions.headers.Authorization = token;
  }
  return newOptions;
}
function resolve(response: any) {
  const { data } = response;
  if (response.config.isFile) {
    return Promise.resolve(response);
  }
  if (data.success) {
    if (response.config.isReturnAllData) {
      return Promise.resolve(data);
    }
    return Promise.resolve(data.data);
  }
  message.error(`${data.errMessage || '服务器出错了，请稍后再试！'}`);
  return Promise.reject(data);
}
function reject(error: any) {
  let errorMessageText = error.errMessage;
  if (error.response) {
    if (error.response.status === 401) {
      message.error('登录状态已过期，请重新登录');
      window.location.href = '/login';
    }
    errorMessageText = error.response.data && error.response.data.errMessage;
  } else if (error.request) {
    errorMessageText = error.request;
  }
  message.error(`${errorMessageText || '服务器出错了，请稍后再试！'}`);
  return Promise.reject(error.response.data);
}
request.interceptors.request.use(beforeRequest);
request.interceptors.response.use(resolve, reject);
requestFd.interceptors.response.use(resolve, reject);

export { request, requestFd };
export default request;
