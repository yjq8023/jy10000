import { request } from '@/core/request';

const prefix = '';

/* 获取行政区划数据 */
export const getRegionList = () => {
  return request.get(`${prefix}/sys/region/code/list`);
};

export default {
  getRegionList,
};
