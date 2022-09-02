/* eslint-disable no-restricted-globals */
import moment from 'moment';
import { baseURL } from '@/config/base';
import { getLocalStorage } from './cookies';

const { NODE_ENV } = process.env;
export const isDev = NODE_ENV === 'development';
/**
 * 生成随机的uuid
 */
export const getUuid = (): string =>
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
export function filterChildren(arr: any) {
  if (arr.length && arr.length <= 0) return [];
  return arr.map((item: any) => {
    const newItem = item;
    if (item.children && item.children.length <= 0) {
      delete newItem.children;
    } else {
      newItem.children = filterChildren(item.children);
    }
    return newItem;
  });
}

export function handleTreeData(treeData: any[], searchValue: string, parentIds: any[] = []) {
  if (!treeData || treeData.length === 0) {
    return { array: [], parentIds };
  }
  const array: any = [];
  for (let i = 0; i < treeData.length; i += 1) {
    if (
      handleTreeData(treeData[i].children, searchValue, parentIds).array.length > 0 ||
      treeData[i].name.includes(searchValue)
    ) {
      parentIds.push(treeData[i].value);
      array.push({
        ...treeData[i],
        children: handleTreeData(treeData[i].children, searchValue, parentIds).array,
      });
    }
  }
  return { array, parentIds };
}

export function resourceTreeData(
  treeData: any[],
  searchValue: string,
  searchCode: string,
  parentIds: any[] = [],
) {
  if (!treeData || treeData.length === 0) {
    return { array: [], parentIds };
  }

  const array: any = [];
  for (let i = 0; i < treeData.length; i += 1) {
    if (
      resourceTreeData(treeData[i].children, searchValue, searchCode, parentIds).array.length > 0 ||
      ((treeData[i].name.includes(searchValue) || !searchValue) &&
        (treeData[i].data?.code?.includes(searchCode) || !searchCode))
    ) {
      parentIds.push(treeData[i].id);
      array.push({
        ...treeData[i],
        children: resourceTreeData(treeData[i].children, searchValue, searchCode, parentIds).array,
      });
    }
  }
  return { array, parentIds };
}

export function searchTreeData(treeData: any[], searchValue: string): any {
  const newTreeData: any[] = [];
  for (let i = 0; i < treeData.length; i += 1) {
    if (treeData[i].name.includes(searchValue)) {
      newTreeData.push(treeData[i]);
    } else if (treeData[i].children && treeData[i].children.length > 0) {
      const children = searchTreeData(treeData[i].children, searchValue);
      if (children.length > 0) {
        newTreeData.push(treeData[i]);
      }
    }
  }
  return newTreeData;
  // return treeData.filter((item: any) => {
  //   const newItem = item;
  //   if (item.name.includes(searchValue)) {
  //     return true;
  //   }
  //   if (newItem.children && newItem.children.length > 0) {
  //     const children = searchTreeData(newItem.children, searchValue);
  //     if (children.length > 0) {
  //       return true;
  //     }
  //   }
  //   return false;
  // });
}
// 展开收起，获取节点
const getNode = (children: any, initial: any) => {
  const data: any = initial;
  children?.forEach((el: any) => {
    if (el.children && el.children.length !== 0) {
      data.push(el.id);
      if (el.children) getNode(el.children, data);
    }
  });
  return data;
};

export function getNodeShow(children: any | []) {
  const nodeData: any[] = getNode(children, []);
  return nodeData;
}

// 页面按钮权限
export function isPermission(key: string) {
  let is: boolean = false;
  if (isDev) {
    is = true;
  } else {
    const permission = getLocalStorage('permission') || [];
    if (permission?.indexOf(key) !== -1) {
      is = true;
    }
  }
  return is;
}

// 根据子节点id获取节点跟父节点id
export function getFatherNode(arr: any, resourceId: string) {
  let hasFound = false; // 表示是否有找到id值
  let result = null;
  // eslint-disable-next-line no-var
  const fn = function (data: any[]) {
    if (Array.isArray(data) && !hasFound) {
      // 判断是否是数组并且没有的情况下，
      data.forEach((item) => {
        if (item.id === resourceId) {
          result = item.path.split('@');
          hasFound = true;
        } else if (item.children) {
          fn(item.children);
        }
      });
    }
  };
  fn(arr);
  return result;
}

export function isEmpty(a: any) {
  if (a === '') return true; // 检验空字符串
  if (a === 'null') return true; // 检验字符串类型的null
  if (a === 'undefined') return true; // 检验字符串类型的 undefined
  if (!a && a !== 0 && a !== '') return true; // 检验 undefined 和 null
  // eslint-disable-next-line no-prototype-builtins
  if (JSON.stringify(a) === '[]') return true; // 检验空数组
  if (JSON.stringify(a) === '{}') return true; // 检验空对象
  return false;
}

export function getBirth(idCard: string) {
  let birthday = '';
  if (idCard != null && idCard !== '') {
    if (idCard.length === 15) {
      birthday = `19${idCard.slice(6, 12)}`;
    } else if (idCard.length === 18) {
      birthday = idCard.slice(6, 14);
    }
    birthday = birthday.replace(/(.{4})(.{2})/, '$1-$2-');
    // 通过正则表达式来指定输出格式为:1990-01-01
  }
  return birthday;
}

export function getSex(idCard: string) {
  let sexStr = '';
  if (parseInt(idCard.slice(-2, -1), 10) % 2 === 1) {
    sexStr = 'male';
  } else {
    sexStr = 'female';
  }
  return sexStr;
}
export default {
  getUuid,
  randomLenNum,
  getBase64,
};
