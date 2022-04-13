/* eslint no-undef: 0 */
import axios from 'axios';
import qs from 'qs';
import { message } from '@sinohealth/butterfly-ui-components/lib';
import { getToken } from '@/utils/cookies';

// 默认配置
axios.defaults.timeout = 15000;
axios.defaults.withCredentials = true;
// @ts-ignore
axios.defaults.headers['Content-Type'] = 'application/json';
// axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded';
const { NODE_ENV } = process.env;
const baseURL = NODE_ENV === 'development' ? 'http://192.168.16.58:8805' : '/';
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
    function (data) {
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
  // eslint-disable-next-line no-param-reassign
  options.headers.Authorization = getToken();
  return options;
}
function resolve(response: any) {
  const { data } = response;
  if (data.code === 200) {
    return Promise.resolve(data.result);
  }
  message.error(`Server Error: ${data.message || '服务器出错了，请稍后再试！'}`);
  return Promise.reject(data);
}
function reject(error: any) {
  let errorMessageText = error.message;
  if (error.response) {
    errorMessageText = error.response.data && error.response.data.message;
  } else if (error.request) {
    errorMessageText = error.request;
  }
  message.error(`Server error: ${errorMessageText || '服务器出错了，请稍后再试！'}`);
  return Promise.reject(error);
}
request.interceptors.request.use(beforeRequest);
request.interceptors.response.use(resolve, reject);
requestFd.interceptors.response.use(resolve, reject);

export { request, requestFd };
export default request;
