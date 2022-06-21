import { request } from '@/core/request';

const prefix = '';

/* 获取行政区划数据 */
export const getRegionList = (code?: string | number) => {
  return request.get(`${prefix}/sys/region/code/list?code=${code}`);
};

/* 获取所有用户列表 */
export const getUserList = (params: any) => {
  return request.post(`${prefix}/user/listByEntity`, params);
};

/* 获取所有机构列表 */
export const getMechanismList = (params: any) => {
  return request.post(`${prefix}/chain/listByEntity`, params);
};

export const getSystemDict = () => {
  // @ts-ignore
  return request.get('/sys/dict/list', { isReturnAllData: true });
};

export default {
  getRegionList,
};
