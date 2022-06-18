const { NODE_ENV } = process.env;
export const baseURL = NODE_ENV === 'development' ? 'http://192.168.123.49:11111/' : '/';
export const socketURL =
  NODE_ENV === 'development'
    ? 'ws://dev.sdc.sinohealth.cn:30200/webSocket'
    : `ws://${window.location.hostname}:30200/webSocket`;
export const getTokenParams = {
  clientId: 'healthplus-oms',
  clientSecret: 'healthplus-oms',
  scope: 'zmn-rx-oms-server',
};
export const loginRememberKey = 'zk-r-u'; // 记住密码时保存数据的key
export default {
  baseURL,
  getTokenParams,
};
