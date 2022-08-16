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

/**
 * 新增或编辑文章信息
 * @param params
 * @returns
 */
export const httpContentUpdate = (params: ProjectType.ContentReq) => {
  // @ts-ignore
  return request.post(`${prefix}/content/save/or/update`, params, { isReturnAllData: true });
};

/**
 * 更新文章状态
 * @param params
 * @returns
 */
export const httpContentUpdateStatus = (params: ProjectType.UpdateStatusReq) => {
  // @ts-ignore
  return request.post(`${prefix}/content/updateStatus`, params, { isReturnAllData: true });
};

/**
 * 删除文章
 * @param params
 * @returns
 */
export const httpContentDelete = (id: string) => {
  // @ts-ignore
  return request.get(`${prefix}/content/delete/${id}`, {}, { isReturnAllData: true });
};

export default {
  httpGetContent,
};
