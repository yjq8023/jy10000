import { request, requestFd } from '@/core/request';
import { getTokenParams } from '@/config/base';
import { setToken } from '@/utils/cookies';
import { UCenter } from '@/services/user/data';

const pharmacyPrefix = '/chain';

/**
 * 获取个人信息
 * @param params
 * @returns
 */
export const getPageChain = (params: any) => {
  return request.post<any, any>(`${pharmacyPrefix}/pageChain`, params);
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

export default {};
