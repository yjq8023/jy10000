import { request } from '@/core/request';

const prefix = '/disease';

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
/* 获取栏目列表 */
export const getColumnsList = (params: getPatientListParams) => {
  return request.post(`${prefix}/pageDisease`, params);
};

export const createColumn = (params: any) => {
  return request.post(`${prefix}/save`, params);
};

export const editColumn = (params: any) => {
  return request.post(`${prefix}/edit`, params);
};

export default {
  getColumnsList,
  createColumn,
  editColumn,
};
