import { request, requestFd } from '@/core/request';
import { getTokenParams } from '@/config/base';

const notifyPrefix = '/hospital';

export const getPageNotify = (params: any) => {
  return request.post<any, any>(`${notifyPrefix}/notify/pageNotify`, params, {
    // @ts-ignore
    isReturnAllData: true,
  });
};

export const handleNotify = (params: any) => {
  return request.post<any, any>(`${notifyPrefix}/notify/handleNotify`, params);
};

export default {};
