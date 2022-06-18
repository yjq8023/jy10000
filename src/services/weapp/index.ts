import { request } from '@/core/request';

const prefix = '';

/* 获取栏目列表 */
export const getColumnsList = (params: any) => {
  // @ts-ignore
  return request.post(`${prefix}/disease/pageDisease`, params, { isReturnAllData: true });
};

export const createColumn = (params: any) => {
  return request.post(`${prefix}/disease/save`, params);
};

export const editColumn = (params: any) => {
  return request.post(`${prefix}/disease/edit`, params);
};

export const getProjectList = (params: any) => {
  // @ts-ignore
  return request.post(`${prefix}/diseaseProject/pageDiseaseProject`, params, { isReturnAllData: true });
};

export default {
  getColumnsList,
  createColumn,
  editColumn,
};
