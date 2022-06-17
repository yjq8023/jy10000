import { request } from '@/core/request';

const prefix = '/sys';

/* 获取行政区划数据 */
export const getRegionList = () => {
  return request.get(`${prefix}/region/code/list`);
};

export default {
  getRegionList,
};
