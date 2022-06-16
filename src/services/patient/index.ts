import { AxiosPromise } from 'axios';
import { request } from '@/core/request';

const prefix = '/patient';

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
  return request.post<any, CommonApi.CommonListRes<Patient.Item>>(`${prefix}/pagePatient`, {
    entity: params,
  });
};

export const savePatient = (params: any) => {
  return request.post<any, CommonApi.CommonListRes<Patient.Item>>(`${prefix}/save`, params);
};

export default {
  getPatientList,
  savePatient,
};
