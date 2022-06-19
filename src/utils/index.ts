import moment from 'moment';
/**
 * 生成随机的uuid
 */
export const getUuid = () =>
  'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    // eslint-disable-next-line no-bitwise
    const r = (Math.random() * 16) | 0;
    // eslint-disable-next-line no-mixed-operators,no-bitwise
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });

/**
 * 生成随机len位数字
 * @param len 长度
 * @param date
 * @returns
 */
export const randomLenNum = (len: number, date?: boolean) => {
  let random = '';
  random = Math.ceil(Math.random() * 100000000000000)
    .toString()
    .substr(0, len || 4);
  if (date) random += Date.now();
  return random;
};

export function getBase64(img: any, callback: any) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

export function getUserInfoFromIdCard(IdCard: string) {
  const birthDay = moment(IdCard.substring(6, 14), 'YYYYMMDD');
  const sex = window.parseInt(IdCard.substr(16, 1)) % 2 === 1 ? 'MALE' : 'FEMALE';
  const age = moment().diff(birthDay, 'year');
  return {
    birthDay,
    sex,
    age,
  };
}

export function handelOptions(obj: any) {
  if (!obj) return [];
  const options = Object.keys(obj).map((key: any) => {
    return { label: obj[key].name, value: obj[key].code };
  });
  console.log(options);
  return options;
}

export default {
  getUuid,
  randomLenNum,
  getBase64,
};
