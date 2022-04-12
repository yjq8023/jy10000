/* eslint no-undef: 0 */
import axios from 'axios';

// 默认配置
axios.defaults.timeout = 15000;
// @ts-ignore
axios.defaults.headers['Content-Type'] = 'application/json';

// 普通请求实例
const request = axios.create({
  baseURL: process.env.REACT_APP_ENV === 'http://192.168.16.58:8805' ? '' : '/',
  maxRedirects: 0,
});

request.interceptors.request.use((conf: any) => conf);

function resolve(data: any) {
  if (data.code === 200) {
    return data.result;
  }
  return Promise.reject(data);
}
function reject(error: any) {
  let { message } = error;
  if (error.response) {
    message = error.response.data;
  } else if (error.request) {
    message = error.request;
  }
  console.error(message);
}
request.interceptors.response.use(resolve, reject);

export { request };
export default request;
