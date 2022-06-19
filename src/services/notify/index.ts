import { request, requestFd } from '@/core/request';
import { getTokenParams } from '@/config/base';

const chainPrefix = '/notify';

export const getPageNotify = (params: any) => {
  // @ts-ignore
  return request.post<any, any>('/notify/pageNotify', params, { isReturnAllData: true });
};

export const handleNotify = (params: any) => {
  return request.post<any, any>('/notify/handleNotify', params);
};

export default {};
