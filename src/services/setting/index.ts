import { request, requestFd } from '@/core/request';
import { getTokenParams } from '@/config/base';
import { setToken } from '@/utils/cookies';
import { UCenter } from '@/services/user/data';

const chainPrefix = '/chain';

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
  return request.post<any, any>('/user/pageUserInfo', params, { isReturnAllData: true });
};

export const userSave = (params: any) => {
  return request.post<any, any>('/user/save', params);
};

export const userEdit = (params: any) => {
  return request.post<any, any>('user/edit', params);
};

export const userDetail = (id: any) => {
  return request.post<any, any>(`user/detail/${id}`);
};

export const setUserStatus = (params: any) => {
  // @ts-ignore
  return request.post<any, any>('user/setUserStatus', params);
};
export const userDelete = (id: any) => {
  return request.post<any, any>(`user/delete/${id}`);
};
export default {};