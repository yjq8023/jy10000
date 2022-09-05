declare namespace ProjectType {
  type ContentReq = {
    id?: string;
    tenantId?: string;
    organizeId?: string;
    title?: string;
    storageId?: string;
    category?: string;
    content?: string;
    summary?: string;
    keywords?: string;
    author?: string;
    cover?: string;
    channelList?: string[];
    wordCount?: string;
    weight?: string;
    readNum?: string;
    collectionNum?: string;
    status?: string;
    ids?: string[];
    labelIds?: string[];
    pageSize?: string;
    pageNo?: string;
    orderBy?: string;
    orderDirection?: string;
    groupBy?: string;
    needTotalCount?: boolean;
  };

  type ContentRes = {
    id: string;
    tenantId?: string;
    organizeId?: string;
    title?: string;
    storageId?: string;
    category?: string;
    content?: string;
    summary?: string;
    keywords?: string;
    author?: string;
    cover?: string;
    wordCount?: string;
    weight?: string;
    readNum?: string;
    collectionNum?: string;
    status?: string;
    createTime?: string;
    labelVoList: LabelVoList[];
  };

  type LabelVoList = {
    id?: string;
    tenantId?: string;
    categoryName?: string;
    name?: string;
    code?: string;
    sort?: string;
    status?: string;
    bindCountNum?: string;
    creater?: string;
    createTime?: string;
    updater?: string;
    updateTime?: string;
  };

  type LabelListReq = {
    id?: string;
    tenantId?: string;
    name?: string;
    code?: string;
    categoryName?: string;
    sort?: string;
    status?: string;
    extValues?: any;
  };

  type LabelListRes = {
    id: string;
    value: string;
    checked: boolean;
    children: LabelListRes[];
    canChoose: boolean;
  };

  type SaveOrUpdateReq = {
    id?: string;
    tenantId?: string;
    name?: string;
    code?: string;
    categoryName?: string;
    sort?: string;
    status?: string;
    extValues?: {};
  };

  type UpdateStatusReq = {
    ids: string[];
    status: string;
  };
  type ProjectReq = {
    projectName?: string;
    labelIds?: string[];
    pageSize?: string;
    pageNo?: string;
    orderBy?: string;
    orderDirection?: string;
    groupBy?: string;
    needTotalCount?: boolean;
  };

  type ProjectRes = {
    id?: string;
    name?: string;
    version?: string;
    decisionFlowsVersionName?: string;
    decisionFlowsLabels?: string;
    labelVoList: LabelVoList[];
    description?: string;
    status?: string;
    createTime?: string;
  };

  type LabelVoList = {
    id?: string;
    tenantId?: string;
    categoryName?: string;
    name?: string;
    code?: string;
    sort?: string;
    status?: string;
    bindCountNum?: string;
    creater?: string;
    createTime?: string;
    updater?: string;
    updateTime?: string;
  };

  type InsertReq = {
    id?: string;
    name?: string;
    version?: string;
    description?: string;
    labelIds?: string[];
    aiDecisionFlowDefinitionDto: FlowDefinitionDto;
  };

  type FlowDefinitionDto = {
    decisionFlowsVersionId?: string;
    decisionFlowsVersionName?: string;
    decisionFlowsId?: string;
    shareUrl?: string;
    labels?: string;
    publishTime?: string;
    status?: string;
  };

  type ServiceProjectReq = {
    name?: string;
    diseaseIds?: string[];
    pageSize?: string;
    pageNo?: string;
    orderBy?: string;
    orderDirection?: string;
    groupBy?: string;
    needTotalCount?: string;
  };

  type AiDecisionReq = {
    name?: string;
  };

  type AiDecisionRes = {
    decisionFlowsId?: string;
    decisionFlowsVersionId?: string;
    decisionFlowsVersionName?: string;
    publishTime?: string;
    shareUrl?: string;
    labels?: string[];
  };

  type ScalePageReq = {
    title?: string;
    labelIds?: string[];
    status?: string;
    pageSize?: string;
    pageNo?: string;
    orderBy?: string;
    orderDirection?: string;
    groupBy?: string;
    needTotalCount?: boolean;
  };

  type ScalePageRes = {
    id?: string;
    title?: string;
    scaleJson?: string;
    description?: string;
    labelVoList: LabelVoList[];
    status?: string;
    deleted?: boolean;
    creater?: string;
    createTime?: string;
    updater?: string;
    updateTime?: string;
  };

  type LabelVoList = {
    id?: string;
    tenantId?: string;
    categoryName?: string;
    name?: string;
    code?: string;
    sort?: string;
    status?: string;
    bindCountNum?: string;
    creater?: string;
    createTime?: string;
    updater?: string;
    updateTime?: string;
  };
}
