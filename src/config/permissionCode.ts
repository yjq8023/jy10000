// 该配置主要用于页面内按钮权限判断，key为按钮，值对应权限资源管理的资源code
export const permissionCodes: any = {
  // 资源管理
  resourceSearchBtn: 'per:res:q', // 查询按钮
  resourceAddBtn: 'per:res:c', // 添加按钮
  resourceEditBtn: 'per:res:u', // 编辑按钮
  resourceDeleteBtn: 'per:res:d', // 删除按钮
  resourceUpdateStatusBtn: 'per:res:status:u', // 修改状态按钮
};

export default permissionCodes;
