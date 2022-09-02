import { request } from '@/core/request';
import { getUuid } from '@/utils';

const prefix = '/backend';

/**
 * 获取项目管理计划
 * @param params
 * @returns
 */
export const getProjectPlanMap = (id: string) => {
  return request.get(`${prefix}/managerProject/findManagePlanBuProjectId/${id}`);
};

export const saveProjectPlanMap = (data: any) => {
  return request.post(`${prefix}/managerProject/saveManagePlan`, data);
};
// 获取前置信息
export const getBeforeInfoSchema = (projectId: string) => {
  const url = `${prefix}/managerProject/findProjectPreInfo/${projectId}`;
  return request.get(url);
};
// 保存管理计划前置信息
export const saveManagePlanPreInfo = (data: any) => {
  const url = `${prefix}/managerProject/saveManagePlanPreInfo`;
  return request.post(url, data);
};
// 获取前置信息
export const getAiIoComponents = (projectId: string) => {
  const url = `${prefix}/managerProject/findAiDecisionFlowsDefinitionInputByProjectId/${projectId}`;
  return request.get(url);
};
// 新增保存跟进记录表
export const saveFollowUpFormInfo = (data: any) => {
  const url = `${prefix}/managerProject/saveFollowUpFormInfo`;
  return request.post(url, data);
};
// 获取跟进记录表内容
export const getFollowUpFormInfo = (formId: string) => {
  const url = `${prefix}/managerProject/findManageProjectFormDetail/${formId}`;
  return request.get(url);
};

export default {
  getProjectPlanMap,
};
