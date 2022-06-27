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

/* 获取用户列表 */
export const getUserListByUser = (params: any) => {
  return request.post(`${prefix}/user/listByEntity`, params);
};

/* 获取当前用户下的项目列表 */
export const getProjectByUser = (params: any = {}) => {
  return request.post(`${prefix}/diseaseProject/getByChain`, params);
};

export const getPatientDetail = (id: string) => {
  return request.post(`${prefix}/patient/detail/${id}`);
};

type PatientProjectRes = {
  projectInfos: Patient.ProjectInfo[],
  hasHistory: boolean
}
/* 获取患者加入的管理项目 */
export const getPatientProject = (patientId: string) => {
  return request.post<any, PatientProjectRes>(`${prefix}/patient/managerProject`, { patientId });
};

/* 退出管理项目 */
export const quitProject = (id: string) => {
  return request.post(`${prefix}/patient/endManagerProject/${id}`);
};

/* 获取用药记录列表 */
export const getPatientDrugRecordList = (params: any) => {
  // @ts-ignore
  return request.post<any, CommonApi.CommonListRes<Patient.DrugRecord>>(`${prefix}/patient/pageUseMedicineLog`, params, { isReturnAllData: true });
};

// 保存用药记录
export const saveUseMedicineLog = (params: any) => {
  return request.post(`${prefix}/patient/saveUseMedicineLog`, params);
};

// 保存用药记录
export const editUseMedicineLog = (params: any) => {
  return request.post(`${prefix}/patient/editUseMedicineLog`, params);
};

export const deleteMechanism = (id: string) => {
  const url = `${prefix}/patient/deleteUseMedicineLog/${id}`;
  return request.post(url);
};

export const getPatientFileDetail = (params: any) => {
  const url = `${prefix}/patient/patientUploadDetail`;
  return request.post(url, params);
};

export const deletePatientFile = (id: string) => {
  const url = `${prefix}/patient/deleteUploadFile/${id}`;
  return request.post(url);
};

export const savePatientFile = (params: any) => {
  const url = `${prefix}/patient/saveUploadFile`;
  return request.post(url, params);
};

export default {
  getPatientList,
  savePatient,
  verifyIdCard,
  getUserListByUser,
  getPatientDetail,
  getPatientProject,
  quitProject,
  getPatientDrugRecordList,
  deleteMechanism,
  deletePatientFile,
};
