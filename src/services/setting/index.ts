import { request, requestFd } from '@/core/request';
import { clientPrefix, getTokenParams } from '@/config/base';
import { setToken } from '@/utils/cookies';
import { UCenter } from '@/services/user/data';

const chainPrefix = '/backend/chain';
const userPrefix = '/backend/user';
/**
 * 获取机构信息
 * @param params
 * @returns
 */
export const getPageChain = (params: any) => {
  // @ts-ignore
  return request.post<any, any>(`${chainPrefix}/pageChain`, params, { isReturnAllData: true });
};

/**
 * 添加机构
 * @param params
 * @returns
 */
export const chainSave = (params: any) => {
  // @ts-ignore
  return request.post<any, any>(`${chainPrefix}/save`, params, { isReturnAllData: true });
};

export const chainEdit = (params: any) => {
  // @ts-ignore
  return request.post<any, any>(`${chainPrefix}/edit`, params, { isReturnAllData: true });
};

/**
 *  设置机构状态
 * @param params
 * @returns
 */
export const setChainStatus = (params: any) => {
  // @ts-ignore
  return request.post<any, any>(`${chainPrefix}/setChainStatus`, params, { isReturnAllData: true });
};

/**
 * 删除机构
 * @param params
 * @returns
 */
export const chainDelete = (id: any) => {
  // @ts-ignore
  return request.post<any, any>(`${chainPrefix}/delete/${id}`);
};

export const chainDetail = (id: any) => {
  // @ts-ignore
  return request.post<any, any>(`${chainPrefix}/detail/${id}`);
};

/**
 * 获取机构信息
 * @param params
 * @returns
 */
export const getPageUserInfo = (params: any) => {
  // @ts-ignore
  return request.post<any, any>(`${userPrefix}/pageUserInfo`, params, { isReturnAllData: true });
};

export const userSave = (params: any) => {
  return request.post<any, any>(`${userPrefix}/save`, params);
};

export const userEdit = (params: any) => {
  return request.post<any, any>(`${userPrefix}/edit`, params);
};

export const userDetail = (id: any) => {
  return request.post<any, any>(`${userPrefix}/detail/${id}`);
};

export const setUserStatus = (params: any) => {
  // @ts-ignore
  return request.post<any, any>(`${userPrefix}/setUserStatus`, params);
};
export const userDelete = (id: any) => {
  return request.post<any, any>(`${userPrefix}/delete/${id}`);
};

/**
 *获取科室列表
 * @param id
 * @returns
 */
export const listDepartment = (id: any) => {
  return request.post<any, any>(`${clientPrefix}/chain/listDepartment`, { chainId: id });
};

/**
 * 用户重置密码
 * @param id
 * @returns
 */
export const userResetPassword = (params: any) => {
  return request.post<any, any>('/uaa/user/resetPassword', params);
};
export default {};
