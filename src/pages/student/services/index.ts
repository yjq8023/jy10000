import { request } from '@/common/request';
import { prefix } from '@/services';

export const getListData = (params: any) => {
  const url = `${prefix}/student/list`;
  return request.get(url, params);
};
export const addStudent = (params: any) => {
  const url = `${prefix}/student/add`;
  return request.post(url, params);
};
export const getDetail = (params: any) => {
  const url = `${prefix}/student/detail`;
  return request.post(url, params);
};
export default {
  getListData,
  addStudent,
  getDetail,
};
