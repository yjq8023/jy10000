/* eslint-disable no-restricted-globals */
import moment from 'moment';
import { baseURL } from '@/config/base';
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
  return options;
}

export function handleDicToObj(dictArr: any) {
  const newDictObj: any = {};
  Object.keys(dictArr).forEach((key) => {
    newDictObj[key] = {};
    dictArr[key].forEach((item: any) => {
      newDictObj[key][item.code] = item.name;
    });
  });
  return newDictObj;
}

export function previewFile(fileId: string) {
  return `${baseURL}cs/file/preview/${fileId}`;
}

export function downloadFile(oldUrl: string, fileName?: string) {
  // const image = new Image();
  // image.setAttribute('crossOrigin', 'anonymous');
  // image.src = oldUrl;
  // image.onload = () => {
  //   const canvas = document.createElement('canvas');
  //   canvas.width = image.width;
  //   canvas.height = image.height;
  //   const ctx = canvas.getContext('2d');
  //   // @ts-ignore
  //   ctx.drawImage(image, 0, 0, image.width, image.height);
  //   const url = canvas.toDataURL('image/png');
  // };
  const url = oldUrl;
  const link = document.createElement('a');
  link.style.display = 'none';
  if (fileName) {
    const fileNameArr = url.split('/');
    link.setAttribute('download', fileName || fileNameArr[fileNameArr.length - 1]);
    link.setAttribute('target', '_blank');
  }
  link.href = url;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/**
 * 格式化金额
 * @param num 金额
 * @param accuracy 小数点数
 * @param type 类型
 * @param complement
 * @returns
 */
export const toFixed = (
  num?: string | number,
  accuracy: number = 2,
  type = 'round',
  complement = true,
) => {
  if (num === '' || num === null) {
    return '';
  }
  const numTem = isNaN(Number(num)) ? 0 : Number(num);
  let decimal = isNaN(Number(accuracy)) ? 0 : Math.ceil(Number(accuracy));

  if (decimal < 0) {
    decimal = 0;
  }
  let numRes;

  if (type === 'ceil') {
    numRes = Math.ceil(numTem * 10 ** decimal) / 100 ** decimal;
  } else if (type === 'floor') {
    numRes = Math.floor(numTem * 10 ** decimal) / 100 ** decimal;
  } else {
    numRes = Math.round(numTem * 10 ** decimal) / 100 ** decimal;
  }

  if (complement && decimal !== 0) {
    const numArr = numRes.toString().split('.');
    numArr[1] = numArr[1] ? numArr[1].padEnd(decimal, '0') : ''.padEnd(decimal, '0');
    return numArr.join('.');
  }

  return numRes.toString();
};

export default {
  getUuid,
  randomLenNum,
  getBase64,
};
