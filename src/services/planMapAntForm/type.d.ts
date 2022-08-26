declare namespace ProjectPlanMap {
  type roadMaps = roadMapItem[]; // 管理路径集合
  // 单条管理路径
  type roadMapItem = {
    id: string;
    aiDecisionFlowsNodeId: string;// ai节点标识
    name: string; // 项目名称
    projectId: string; // 项目标识
    roadMapSteps: roadMapStepItem[]; // 路径内容
    path?: string;
    offset?: number;
  }

  type roadMapStepItem = {
    id: string;
    aiDecisionFlowsNodeId: string; // ai节点标识
    durationTimeUnit: string; // 持续周期单位
    durationTimes: number; // 持续周期数值
    followUpItems: followUpItems[]; // 持续周期数值
    loop: boolean; // 是否循环
    triggerNumber: number; // 周期数值
    triggerTimeUnit: string; // 周期单位
    path?: string;
    isHasChildren?: boolean;
  }

  type followUpItems = {
    id: string; // ai节点标识
    aiDecisionFlowsNodeId?: string; // ai节点标识
    bizId?: string; // 表单id
    exclusive?: string; // 不包含标签
    follower?: string; // 推送人员
    include?: string; // 包含标签
    inputFieldId?: string; // 管理io标识
    itemCategory: string; // 类型
    itemName: string; // 名称
    pushNum?: string; // 推送次数
    remark?: string; // 备注
  }
}
