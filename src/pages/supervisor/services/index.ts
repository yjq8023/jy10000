import { request } from '@/common/request';
import { prefix } from '@/services';

const mockData = [
  {
    code: '',
    name: '',
    sex: '',
    phone: '',
    status: '',
    school: '', // 学校
    classroom: '', // 教室
    discipline: '', // 科目
  },
];

export const getListData = (params: any) => {
  const url = `${prefix}/teacher/list`;
  return request.get(url, params);
};
export default {
  getListData,
};
