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
 * 新增/编辑标签信息
 * @param params
 * @returns
 */
export const httpSaveOrUpdateList = (params: ProjectType.SaveOrUpdateReq) => {
  // @ts-ignore
  return request.post('/sys/label/saveOrUpdate', params, { isReturnAllData: true });
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

/**
 * 分页查询项目库
 * @param params
 * @returns
 */
export const httpProjectList = (params: ProjectType.ProjectReq) => {
  // @ts-ignore
  return request.post(`${prefix}/managerProject/page`, params, { isReturnAllData: true });
};

/**
 * 更新管理项目状态
 * @param params
 * @returns
 */
export const httpProjectUpdateStatus = (params: ProjectType.UpdateStatusReq) => {
  // @ts-ignore
  return request.post(`${prefix}/managerProject/updateStatus`, params, { isReturnAllData: true });
};

/**
 * 新增/编辑管理项目
 * @param params
 * @returns
 */
export const httpProjectInsert = (params: ProjectType.InsertReq) => {
  // @ts-ignore
  return request.post(`${prefix}/managerProject/insert`, params, { isReturnAllData: true });
};

/**
 * 删除管理项目
 * @param params
 * @returns
 */
export const httpProjectDelete = (id?: string) => {
  // @ts-ignore
  return request.get(`${prefix}/managerProject/delete/${id}`, {}, { isReturnAllData: true });
};

/**
 * 分页查询ai决策流信息
 * @param params
 * @returns
 */
export const httpProjecAiDecision = (params: ProjectType.AiDecisionReq) => {
  return request.post(`${prefix}/managerProject/pageAiDecisionFlowsVersion`, params, {
    // @ts-ignore
    isReturnAllData: true,
  });
};

// ------------ 服务项目信息集合 --------------

/**
 * 分页查询服务项目信息
 * @param params
 * @returns
 */
export const httpServiceProject = (params: ProjectType.ServiceProjectReq) => {
  // @ts-ignore
  return request.post(`${prefix}/serviceProject/page`, params, { isReturnAllData: true });
};

/**
 * 分页查询量表信息
 * @param params
 * @returns
 */
export const httpScalePage = (params: any) => {
  // @ts-ignore
  return request.post(`${prefix}/scale/page`, params, { isReturnAllData: true });
};
/**
 * 根据标题查询量表信息, 用于路径编辑器关联量表
 * @param params
 * @returns
 */
export const httpScaleByTitle = (params: any) => {
  return request.post(`${prefix}/scale/findByTitle`, params);
};
/**
 * 新增编辑量表信息
 * @param params
 * @returns
 */
export const httpUpdateScale = (params: any) => {
  return request.post(`${prefix}/scale/insert/or/update`, params);
};
/**
 * 获取量表详情信息
 * @param params
 * @returns
 */
export const httpScaleDetail = (id: string) => {
  return request.get(`${prefix}/scale/detail/${id}`);
};
/**
 * 获取量表详情信息
 * @param params
 * @returns
 */
export const httpDeleteScale = (id: string) => {
  return request.get(`${prefix}/scale/delete/${id}`);
};

export default {
  httpGetContent,
};
