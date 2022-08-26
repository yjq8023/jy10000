import { request } from '@/core/request';
import { getUuid } from '@/utils';

const prefix = '/backend';

/**
 * 获取项目管理计划
 * @param params
 * @returns
 */
export const getProjectPlanMap = (params: any) => {
  // return request.post(`${prefix}/content/page`, params);
  const roleMaps = [
    {
      id: getUuid(),
      aiDecisionFlowsNodeId: getUuid(), // ai节点标识
      name: '测试项目', // 项目名称
      projectId: getUuid(), // 项目标识
      roadMapSteps: [
        {
          id: getUuid(),
          aiDecisionFlowsNodeId: getUuid(),
          durationTimes: 10,
          durationTimeUnit: 'DAY',
          loop: false,
          triggerNumber: 2,
          triggerTimeUnit: 'YEAR',
          followUpItems: {
            id: getUuid(),
            aiDecisionFlowsNodeId: getUuid(),
            itemName: '测试根据量表', // 名称
            itemCategory: 'form', // 类型
          },
        },
      ],
    },
  ];
  return Promise.resolve(roleMaps);
};

export default {
  getProjectPlanMap,
};
