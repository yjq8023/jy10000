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

  type UpdateStatusReq = {
    ids: string[];
    status: string;
  };
}
