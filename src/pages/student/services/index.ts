import { request } from '@/common/request';
import { prefix } from '@/services';

export const getListData = (params: any) => {
  const url = `${prefix}/student/list`;
  return request.get(url, params);
};
export default {
  getListData,
};
