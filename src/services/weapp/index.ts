import { request } from '@/core/request';

const prefix = '/disease';

/* 获取栏目列表 */
export const getColumnsList = (params: any) => {
  // @ts-ignore
  return request.post(`${prefix}/pageDisease`, params, { isReturnAllData: true });
};

export const createColumn = (params: any) => {
  return request.post(`${prefix}/save`, params);
};

export const editColumn = (params: any) => {
  return request.post(`${prefix}/edit`, params);
};

export default {
  getColumnsList,
  createColumn,
  editColumn,
};
