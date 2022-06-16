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
  return request.post<any, CommonApi.CommonListRes<Patient.Item>>(`${prefix}/pageDisease`, {
    entity: params,
  });
};

export default {
  getColumnsList,
};
