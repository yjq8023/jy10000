/*
 * @Description: 个人中心管理模块 类型
 * @Author: kaifengLi
 * @Date: 2021-11-02 15:58:37
 * @LastEditTime: 2021-11-15 16:01:40
 * @LastEditors: kaifengLi
 */
/**
 * 个人中心管理模块 类型
 */
declare namespace Patient {
  type Item = {
    id: number; // 患者ID
    number?: string; // 患者档案号
    idCard?: string; // 身份证
    history?: string; // 既往史
    name?: string; // 患者名称
    age?: number; // 患者年龄
    phone?: string; // 患者手机号码
    mainDisease?: string; // 主要诊断
    diseaseProjectName?: string; // 管理项目
    caseManager?: string; // 个案管理师
    wxBindStatus?: '1' | '0'; // 微信是否绑定1：绑定0：无
    sex?: string; // 性别
    pic?: string; // 头像
  }
  type ProjectInfo = {
    projectId: string; // 项目ID
    projectName: string; // 项目名称
    status?: '0' | '1'; // 项目前置信息是否已填写 0未填写 1已填写
    formData?: any; // 项目前置信息已填表单值
    schema?: any; // 项目前置信息表单
  }
  type DrugRecord = {
    id: string;
    createTime: string;
    projectName: string;
    medicineName: string;
    useWay: string;
    useNum: string;
    singleDosage: string;
    singleDosageUnit: string;
    spec: string;
    startUseTime: string;
    endUseTime: string;
    remark: string;
  }
}
