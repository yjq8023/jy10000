/*
 * @Description: 个人中心管理模块 类型
 * @Author: kaifengLi
 * @Date: 2021-11-02 15:58:37
 * @LastEditTime: 2021-11-15 16:01:40
 * @LastEditors: kaifengLi
 */
/**
 * 通用接口模块类型
 */
declare namespace CommonApi {
  type CommonListRes<T> = {
    pageNo: number;
    pageSize: number;
    totalPage: number;
    totalCount: number;
    data: T[];
  }
  type CommonListError = {
    message: string;
    errorCode: string;
  }
}
