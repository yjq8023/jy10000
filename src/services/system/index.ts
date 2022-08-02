import axios, { AxiosRequestConfig } from 'axios';
import { request, requestFd } from '@/core/request';
import { clientPrefix } from '@/config/base';

export const httpGetSystemDict = () => {
  return axios.get('https://api.zmnyun.cn/sys/dict/list', {
    headers: {
      scope: 'scope-common',
    },
  });
};

/**
 *获取科室列表
 * @param params
 * @returns
 */
export const getDictPage = (params: any) => {
  // @ts-ignore
  return request.post<any, any>('/sys/dict/page', { ...params }, { isReturnAllData: true });
};

/**
 *新建字典
 * @param id
 * @returns
 */
export const insertDict = (params: any) => {
  return request.post<any, any>('/sys/dict/insert', { ...params });
};

/**
 *删除字典
 * @param id
 * @returns
 */
export const deleteDict = (id: any) => {
  return request.get<any, any>(`/sys/dict/delete/${id}`);
};

export default {};
