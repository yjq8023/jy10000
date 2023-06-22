import { request } from '@/common/request';
import { prefix } from '@/services';

export const getListData = (params: any) => {
  const url = `${prefix}/teacher/list`;
  return request.get(url, params);
};
export const addData = (params: any) => {
  const url = `${prefix}/teacher/add`;
  return request.post(url, params);
};
export const updateData = (params: any) => {
  const url = `${prefix}/teacher/update`;
  return request.post(url, params);
};
export const getDetail = (params: any) => {
  const url = `${prefix}/teacher/detail`;
  return request.post(url, params);
};

export default {
  getListData,
  addData,
  getDetail,
  updateData,
};
