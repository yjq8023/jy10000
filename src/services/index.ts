import request from '@/common/request';

export const prefix = '';

export const getCityList = () => {
  const url = `${prefix}/city/list`;
  return request.get(url);
};
export default { prefix };
