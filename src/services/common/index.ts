import { request } from '@/core/request';

const prefix = '';

/* 获取行政区划数据 */
export const getRegionList = () => {
  return request.get(`${prefix}/sys/region/code/list`);
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
  return request.get('/sys/dict/list', {
    headers: {
      scope: 'scope-common',
    },
  });
};

export default {
  getRegionList,
};
