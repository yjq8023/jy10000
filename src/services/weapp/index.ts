import { request } from '@/core/request';

const prefix = '/hospital ';

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

export const deleteColumn = (id: string) => {
  const url = `${prefix}/disease/delete/${id}`;
  return request.post(url);
};

export const setColumnStatus = (params: any) => {
  return request.post(`${prefix}/disease/setDiseaseStatus`, params);
};

export const getProjectList = (params: any) => {
  // @ts-ignore
  return request.post(`${prefix}/diseaseProject/pageDiseaseProject`, params, { isReturnAllData: true });
};

export const setProjectStatus = (params: any) => {
  return request.post(`${prefix}/diseaseProject/setDiseaseProjectStatus`, params);
};

export const createProject = (params: any) => {
  return request.post(`${prefix}/diseaseProject/save`, params);
};

export const editProject = (params: any) => {
  return request.post(`${prefix}/diseaseProject/edit`, params);
};

export const deleteProject = (id: string) => {
  const url = `${prefix}/diseaseProject/delete/${id}`;
  return request.post(url);
};

export const getProjectDetail = (id: string) => {
  const url = `${prefix}/diseaseProject/detail/${id}`;
  return request.post(url);
};

export default {
  getColumnsList,
  createColumn,
  editColumn,
  setProjectStatus,
  createProject,
  editProject,
};
