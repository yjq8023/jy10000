import { clientPrefix } from '@/config/base';
import request from '@/core/request';

export const moduleList = (params: any) => {
  return request.post<any, any>(`${clientPrefix}/manage/module/list`, params);
};

export const labelList = (params: any) => {
  return request.post<any, any>('/sys/label/listEntity', params);
};
export const labelSave = (params: any) => {
  return request.post<any, any>('/sys/label/saveOrUpdate', params);
};
/**
 *获取科室列表
 * @param id
 * @returns
 */
export const tenantPage = (params: any) => {
  return request.get<any, any>(`${clientPrefix}/manage/tenant/option`);
};
export const tenantModulePage = (params: any) => {
  return request.post<any, any>(
    `${clientPrefix}/manage/tenant/module/page`,
    { ...params },
    // @ts-ignore
    { isReturnAllData: true },
  );
};

export const tenantModule = (id: any) => {
  return request.get<any, any>(`${clientPrefix}/manage/tenant/module/option/${id}`);
};

export const tenantAdd = (params: any) => {
  return request.post<any, any>(`${clientPrefix}/manage/tenant/`, params);
};
export const tenantEdit = (id: any, params: any) => {
  return request.put<any, any>(`${clientPrefix}/manage/tenant/${id}`, params);
};
export const tenantInfo = (id: any) => {
  return request.get<any, any>(`${clientPrefix}/manage/tenant/${id}`);
};
export const tenantStatus = (status: 'enabled' | 'disabled', id: string) => {
  return request.put<any, any>(`${clientPrefix}/manage/tenant/status/${status}/${id}`);
};
export const tenantDelete = (id: any) => {
  return request.delete<any, any>(`${clientPrefix}/manage/tenant/${id}`);
};
export const tenantModuleSave = (id: string, params: any) => {
  return request.put<any, any>(`${clientPrefix}/manage/tenant/module/${id}`, params);
};

export const organizePage = (params: any) => {
  return request.post<any, any>(
    `${clientPrefix}/manage/organize/page`,
    { ...params },
    // @ts-ignore
    { isReturnAllData: true },
  );
};

export const organizeTree = (tenantId: string) => {
  return request.get<any, any>(`${clientPrefix}/manage/organize/tree/${tenantId}`);
};
export const organizeTreeByOrganizeId = (organizeId: string) => {
  return request.get<any, any>(`${clientPrefix}/manage/organize/tenant/tree/${organizeId}`);
};
export const organizeStatus = (status: 'enabled' | 'disabled', id: string) => {
  return request.put<any, any>(`${clientPrefix}/manage/organize/status/${status}/${id}`);
};
export const organizeDelete = (id: any) => {
  return request.delete<any, any>(`${clientPrefix}/manage/organize/${id}`);
};
export const organizeDetail = (id: any) => {
  return request.get<any, any>(`${clientPrefix}/manage/organize/${id}`);
};
export const organizeEdit = (id: any, params: any) => {
  return request.put<any, any>(`${clientPrefix}/manage/organize/${id}`, params);
};
export const organizeAdd = (tenantId: any, params: any) => {
  return request.post<any, any>(`${clientPrefix}/manage/organize/${tenantId}`, params);
};
export const organizeSaveLabel = (id: any, params: any) => {
  return request.put<any, any>(`${clientPrefix}/manage/organize/label/${id}`, params);
};
/**
 * 查询组织树，以租户作为根节点
 * @returns
 */
export const treeWithTenant = () => {
  return request.get<any, any>(`${clientPrefix}/manage/organize/treeWithTenant`);
};

/**
 * 查询部门树
 * @returns
 */
export const departmentTree = (organizeId: any) => {
  return request.get<any, any>(`${clientPrefix}/manage/department/tree/${organizeId}`);
};
/**
 * 添加
 * @returns
 */
export const departmentAdd = (organizeId: any, params: any) => {
  return request.post<any, any>(`${clientPrefix}/manage/department/${organizeId}`, params);
};

export const departmentEdit = (id: any, params: any) => {
  return request.put<any, any>(`${clientPrefix}/manage/department/${id}`, params);
};

/**
 *  修改部门状态
 * @param status
 * @param id
 * @returns
 */
export const departmentStatus = (status: 'enabled' | 'disabled', id: string) => {
  return request.put<any, any>(`${clientPrefix}/manage/department/status/${status}/${id}`);
};

export const departmentDelete = (id: string) => {
  return request.delete<any, any>(`${clientPrefix}/manage/department/${id}`);
};

/**
 * 根据属性分页查询角色
 * @param id
 * @returns
 */
export const rolePage = (params: any) => {
  return request.post<any, any>(
    `${clientPrefix}/manage/role/page`,
    { ...params },
    // @ts-ignore
    { isReturnAllData: true },
  );
};
export const roleEmployeePage = (params: any) => {
  return request.post<any, any>(
    `${clientPrefix}/manage/role/employee/page`,
    { ...params },
    // @ts-ignore
    { isReturnAllData: true },
  );
};
export const roleDataAccessOption = () => {
  return request.get<any, any>(`${clientPrefix}/manage/role/dataAccess/option`);
};
export const roleResourceTree = (oid: string) => {
  return request.get<any, any>(`${clientPrefix}/manage/role/resource/option/${oid}`);
};
export const roleInfo = (id: any) => {
  return request.get<any, any>(`${clientPrefix}/manage/role/${id}`);
};
export const roleAdd = (oid: any, params: any) => {
  return request.post<any, any>(`${clientPrefix}/manage/role/${oid}`, params);
};
export const roleEdit = (id: any, params: any) => {
  return request.put<any, any>(`${clientPrefix}/manage/role/${id}`, params);
};

export const roleDataAccessInfo = (id: any) => {
  return request.get<any, any>(`${clientPrefix}/manage/role/dataAccess/${id}`);
};
export const roleDataAccessAdd = (id: any, params: any) => {
  return request.put<any, any>(`${clientPrefix}/manage/role/dataAccess/${id}`, params);
};
export const roleDataAccessEdit = (id: any, params: any) => {
  return request.put<any, any>(`${clientPrefix}/manage/role/dataAccess/${id}`, params);
};
// 角色资源授权
export const roleResourceInfo = (id: any) => {
  return request.get<any, any>(`${clientPrefix}/manage/role/resource/${id}`);
};
export const roleResourceAdd = (id: any, params: any) => {
  return request.put<any, any>(`${clientPrefix}/manage/role/resource/${id}`, params);
};
export const roleResourceEdit = (id: any, params: any) => {
  return request.put<any, any>(`${clientPrefix}/manage/role/resource/${id}`, params);
};

/**
 *  修改部门状态
 * @param status
 * @param id
 * @returns
 */
export const roleStatus = (status: 'enabled' | 'disabled', id: string) => {
  return request.put<any, any>(`${clientPrefix}/manage/role/status/${status}/${id}`);
};
export const roleDelete = (id: string) => {
  return request.delete<any, any>(`${clientPrefix}/manage/role/${id}`);
};

export const employeePage = (params: any) => {
  return request.post<any, any>(
    `${clientPrefix}/manage/employee/page`,
    { ...params },
    // @ts-ignore
    { isReturnAllData: true },
  );
};

/**
 * 根据属性查询可用的员工
 * @param params
 * @returns
 */
export const employeeList = (params: any) => {
  return request.post<any, any>(`${clientPrefix}/manage/employee/list`, params);
};
/**
 * 查询员工账号
 * @param params
 * @returns
 */
export const employeeAccount = (params: { phone: string; idCard: string }) => {
  return request.post<any, any>(`${clientPrefix}/manage/employee/account`, params);
};
export const employeeInfo = (id: string) => {
  return request.get<any, any>(`${clientPrefix}/manage/employee/${id}`);
};
export const employeeRole = (id: string) => {
  return request.get<any, any>(`${clientPrefix}/manage/employee/role/${id}`);
};
export const employeeRoleEdit = (id: string, params: any) => {
  return request.put<any, any>(`${clientPrefix}/manage/employee/role/${id}`, params);
};
export const employeeEdit = (id: string, params: any) => {
  return request.put<any, any>(`${clientPrefix}/manage/employee/${id}`, params);
};
export const employeeAdd = (id: any, params: any) => {
  return request.post<any, any>(`${clientPrefix}/manage/employee/${id}`, params);
};
export const employeeStatus = (status: 'enabled' | 'disabled', id: string) => {
  return request.put<any, any>(`${clientPrefix}/manage/employee/status/${status}/${id}`);
};
export const employeeReset = (employeeId: any, userId: any) => {
  return request.post<any, any>('/uaa/user/resetPassword', { employeeId, id: userId });
};
export const employeeDelete = (id: string) => {
  return request.delete<any, any>(`${clientPrefix}/manage/employee/${id}`);
};
export const employeeGetRole = (organizeId: string, onlyEnabled = true) => {
  return request.post<any, any>(`${clientPrefix}/manage/role/list`, { organizeId, onlyEnabled });
};
export default {};
