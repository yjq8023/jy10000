import { request } from '@/core/request';

const prefix = '/backend';

/**
 * 文章分页查询
 * @param params
 * @returns
 */
export const httpGetContent = (params: ProjectType.ContentReq) => {
  // @ts-ignore
  return request.post(`${prefix}/content/page`, params, { isReturnAllData: true });
};

/**
 * 获取标签下拉框
 * @param params
 * @returns
 */
export const httpGetLabelList = (params: ProjectType.LabelListReq) => {
  // @ts-ignore
  return request.post('/sys/label/listEntity', params, { isReturnAllData: true });
};

export default {
  httpGetContent,
};
