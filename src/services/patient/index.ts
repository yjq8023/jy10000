import { request } from '@/core/request';

const prefix = '/hospital';

type getPatientListParams = {
  number: string;
  patientName: string;
  phone: string;
  sex: string;
  startAge: string;
  endAge: string;
  projectId: string;
  caseManagerId: string;
  wxBindStatus: string;
}
/* 获取患者列表 */
export const getPatientList = (params: getPatientListParams) => {
  // @ts-ignore
  return request.post<any, CommonApi.CommonListRes<Patient.Item>>(`${prefix}/patient/pagePatient`, params, { isReturnAllData: true });
};

type searchPatientProps = {
  idCard: string;
  name: string;
  phone: string;
}
/* 根据基本信息查询患者 */
export const searchPatient = (params: searchPatientProps) => {
  return request.post(`${prefix}/patient/searchPatient`, params);
};

// 保存患者
export const savePatient = (params: any) => {
  return request.post(`${prefix}/patient/save`, params);
};

// 校验患者身份证
export const verifyIdCard = (params: any) => {
  return request.post(`${prefix}/patient/verifyIdCard`, params);
};

export default {
  getPatientList,
  savePatient,
  verifyIdCard,
};
