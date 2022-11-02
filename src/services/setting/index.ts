import { request } from '@/core/request';

/**
 * 用户重置密码
 * @param id
 * @returns
 */
export const userResetPassword = (params: any) => {
  return request.post<any, any>('/uaa/user/resetPassword', params);
};
export default {};
