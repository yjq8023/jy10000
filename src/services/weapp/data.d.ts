/*
 * @Description: 个人中心管理模块 类型
 * @Author: kaifengLi
 * @Date: 2021-11-02 15:58:37
 * @LastEditTime: 2021-11-15 16:01:40
 * @LastEditors: kaifengLi
 */

import { getUserResourceByScope } from '@/services/user/index';

/**
 * 个人中心管理模块 类型
 */
declare namespace UCenter {
  // 登录
  type TokenReq = {
    username?: string;
    password?: string;
    phoneNumber?: string;
    clientId?: string;
    clientSecret?: string;
    grantType?: string;
    code?: string;
    codeType?: string;
    randomNum?: string;
    appId?: string;
    openId?: string;
    scope?: string;
    keepAliveDays?: number;
  };

  // Token授权
  type Authorize = {
    accessToken: string;
    authorizeScope: string;
    authorizeClientId: string;
  };

  // 刷新Token
  type Refresh = {
    access_token: string;
  };

  type UserInfo = {
    chainId: string;
    chainName: string;
    description: string;
    photo: string;
    photoUrl: string;
    realname: string;
    username: string;
  };
  // 校验Token
  type Verify = {
    access_token: string;
  };

  // 获取账号信息
  type AccountInfo = {
    access_token: string;
  };

  type Logout = {
    access_token: string;
  };

  // 修改个人资料
  type UpdateUserInfoReq = {
    realname?: string;
    description?: string;
    photo?: string;
  };

  // 修改个人密码
  type UpdatePasswordReq = {
    uniqueName?: string; // 唯一用户名
    originPassword?: string; // 原密码
    newPassword?: string; // 新密码
  };

  // 重置密码
  type ResetPassword = {
    password?: string; // 新密码
  };

  // 切换机构
  type SwitchChain = {
    chainId: string;
    chainName: string;
  };

  type ChainRes = {
    chainId: string;
    chainName: string;
  };

  // 分页查询登录记录-请求
  type RecordReq = {
    search?: string; // 通用检索条件字符串
    offset?: string; // 分页索引下标
    pageNo?: number; // 当前页码
    pageSize?: number; // 分页尺寸
    entity: {
      loginDate?: string; // 登录日期
    };
    orders?: {
      property?: string; // 查询属性
      direction?: string; // 正序或倒序
    };
  };

  // 分页查询登录记录-响应
  type RecordRes = {
    userId?: number; // 用户id
    chainId?: number; // 机构id
    timestamp?: string; // 登录域
    ip?: string; // 登录id
    scope?: string; // 登录系统域
  };

  type Entity = {
    username?: number; // 登录账号
    scopeCode?: number; // 登录系统域
    loginTime?: string; // 登录域时间
    ip?: string; // 登录id
    address?: string; // 地址
  };

  type UserResourceByScopeResponse = {
    menuTree: MenuTree;
    permissions: [];
  };

  type MenuTree = MenuTreeItem[];

  type MenuTreeItem = {
    name: string;
    path: string;
    hidden: boolean;
    children: MenuTreeItem[];
  };

  type carouselItem = {
    createTime: string;
    fileUrl: string;
    id: string;
    name: string;
    sort: number;
    status: string;
    updateTime: string;
  };

  type carouseList = {
    pageNo: number;
    total: string;
    records: carouselItem[];
  };

  type ListByType = {
    children?: [];
    id?: string;
    value?: string;
  };

  type InsertReq = {
    id?: string;
    tenantId?: string;
    bizCode?: string;
    appCode?: string;
    storageId: string;
    title: string;
    bindType?: string;
    bindLink?: string;
    params?: string;
    effectTime?: string;
    failureTime?: string;
    weight?: string;
  };
}
