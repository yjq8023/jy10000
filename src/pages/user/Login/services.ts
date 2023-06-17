import { request } from '@/common/request';
import { prefix } from '@/services';

export const login = (params: any) => {
  const url = `${prefix}/login`;
  return request.post(url, params);
};
export default {
  login,
};
