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

export default {
  getProjectPlanMap,
};
