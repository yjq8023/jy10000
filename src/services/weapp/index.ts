import { request } from '@/core/request';

const prefix = '/backend';

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
  return request.post(`${prefix}/diseaseProject/pageDiseaseProject`, params, {
    // @ts-ignore
    isReturnAllData: true,
  });
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

/* 获取所有用户列表 */
export const getUserList = (params: any) => {
  return request.post(`${prefix}/user/listByEntity`, params);
};

/* 获取所有机构列表 */
export const getMechanismList = (params: any) => {
  return request.post(`${prefix}/chain/listByEntity`, params);
};

/**
 * 分页查询轮播图
 * @param params
 * @returns
 */
export const httpSlideShow = (params: any) => {
  // @ts-ignore
  return request.post(`${prefix}/slideShow/page`, params, { isReturnAllData: true });
};

/**
 * 置顶轮播图
 * @param params
 * @returns
 */
export const httpSlideTopWeight = (id: string) => {
  // @ts-ignore
  return request.get(`${prefix}/slideShow/topWeight/${id}`, {}, { isReturnAllData: true });
};

/**
 * 新增轮播图
 * @param params
 * @returns
 */
export const httpSlideInsert = (params: any) => {
  // @ts-ignore
  return request.post(`${prefix}/slideShow/insert`, params, { isReturnAllData: true });
};

/**
 * 删除轮播图信息
 * @param params
 * @returns
 */
export const httpSlideDelete = (id: string) => {
  // @ts-ignore
  return request.get(`${prefix}/slideShow/delete/${id}`, {}, { isReturnAllData: true });
};

/**
 * 批量更新轮播图状态
 * @param params
 * @returns
 */
export const httpSlideUpdateStatus = (params: any) => {
  // @ts-ignore
  return request.post(`${prefix}/slideShow/updateStatus`, params, { isReturnAllData: true });
};

/**
 * 根据类型获取应用下拉框
 * @param params
 * @returns
 */
export const httpSlideListByType = (params: any) => {
  // @ts-ignore
  return request.post(`${prefix}/application/listByType`, params, { isReturnAllData: true });
};

export default {
  getColumnsList,
  createColumn,
  editColumn,
  setProjectStatus,
  createProject,
  editProject,
  getUserList,
  getMechanismList,
  httpSlideShow,
  httpSlideTopWeight,
  httpSlideInsert,
  httpSlideDelete,
  httpSlideUpdateStatus,
};
