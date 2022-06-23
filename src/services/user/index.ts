import axios, { AxiosRequestConfig } from 'axios';
import { request, requestFd } from '@/core/request';
import { getTokenParams } from '@/config/base';
import { setToken } from '@/utils/cookies';
import { UCenter } from '@/services/user/data';

const prefix = '/api/oauth';
const pharmacyPrefix = '/api/pharmacy';

export const getToken = (params: any) => {
  const path = `${prefix}/token`;
  return requestFd.post(path, { ...params, ...getTokenParams });
};

export const getUserLinkChain = () => request.get(`${pharmacyPrefix}/userCenter/listUserLinkChain`);

export const sendPhoneCode = (phoneNo: string) => request.get(`/api/mobile/${phoneNo}`);

export const switchChain = (params: any) => request.post(`${prefix}/switchChain`, params);
/**
 * 通过验证码修改个人密码
 * @param params
 * @returns
 */
export const resetPassword = (params: any) => {
  return request.post(`${pharmacyPrefix}/userCenter/resetPassword`, params);
};
/**
 * 获取个人信息
 * @param params
 * @returns
 */
export const getUserInfo = (params: any) => {
  return request.post<UCenter.UserInfo, any>(`${pharmacyPrefix}/userCenter/getUserInfo`, params);
};

/**
 * 修改个人密码
 * @param params
 * @returns
 */
export const updateUserPassword = (params: UCenter.UpdatePasswordReq) =>
  request.post(`${pharmacyPrefix}/userCenter/updateUserPassword`, params);

/**
 * 修改个人资料
 * @param params
 * @returns
 */
export const updateUserInfo = (params: UCenter.UpdateUserInfoReq) => {
  return request.post(`${pharmacyPrefix}/userCenter/updateUserInfo`, params);
};

/**
 * 修改个人资料
 * @param params
 * @returns
 */
export const getUserResourceByScope = () => {
  return request.get<UCenter.UserResourceByScopeResponse, any>(
    '/api/rbac/menu/getUserResourceByScope/zmn-rx-oms-server?version=v1',
  );
};

export const doLogin = (params: any, config: AxiosRequestConfig = {}) => {
  // return axios.post(`${loginHost}/sso/doLogin`, params, config);
  return requestFd.post('/uaa/sso/doLogin', params, config);
};

export const getListOrganize = (params: any, config: AxiosRequestConfig = {}) => {
  return requestFd.post('/chain/listOrganize', params);
};

export default {
  getToken,
  getUserLinkChain,
  switchChain,
};
