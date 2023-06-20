import Mock from 'mockjs';
import { localDict } from './localDict';

export const mockPrefix = '/mockPrefix';

Mock.setup({
  timeout: '500-1000',
});

const mapKeys = (dicts: any) => {
  const res: any = {};
  const keys = Object.keys(dicts);
  keys.forEach((key) => {
    res[key] = Object.keys(dicts[key]);
  });
  return res;
};
const getRandomEnums = (dictKey: string) => {
  const dictEnumKeys = mapKeys(localDict);
  const enums: any = dictEnumKeys[dictKey];
  console.log(Mock.Random.integer(0, enums.length - 1));
  return enums[Mock.Random.integer(0, enums.length - 1)];
};

/*
@boolean：生成一个随机的布尔值。
@integer：生成一个随机的整数。
@float：生成一个随机的浮点数。
@date：生成一个随机的日期。
@image：生成一个随机的图片URL
@sentence：生成一个随机的句子。
@paragraph：生成一个随机的段落。
@email：生成一个随机的邮箱地址。
@url：生成一个随机的URL地址。
* */
const name = '@ctitle(2, 3)';
const title = '@ctitle(5, 8)';
const sentence = '@csentence(20,100)';
const img = '@image';
const sex = () => getRandomEnums('sex'); // 性别
const teacherStatus = () => getRandomEnums('studentStatus'); // 学生状态
const studentStatus = () => getRandomEnums('studentStatus'); // 学生状态
const school = () => getRandomEnums('school'); // 学校
const schoolClass = () => getRandomEnums('schoolClass'); // 教室
const schoolSubject = () => getRandomEnums('schoolSubject'); // 科目

const successResult = {
  code: 0,
};

const teacherDetail = {
  serial_num: '@id',
  cn_name: name,
  sex,
  status: teacherStatus,
  phone: '@integer(11)',
  branch: school,
  class_room: schoolClass,
  tech_subject: schoolSubject,
  avatar: '@img',
};
Mock.mock(`${mockPrefix}/teacher/list`, 'get', {
  ...successResult,
  'data|0-10': [
    teacherDetail,
  ],
});
Mock.mock(`${mockPrefix}/teacher/detail`, 'post', {
  ...successResult,
  'data|0-10': teacherDetail,
});

const studentDetail = {
  serial_num: '@id',
  name,
  sex,
  status: studentStatus,
  phone: '@integer(11)',
  contact_name: name,
  contact_phone: '@integer(11)',
  contact_email: '@integer(11).com',
  nationality: name,
  city: name,
  address: title,
  school: title,
  majors: title,
  avatar: img,
};
Mock.mock(`${mockPrefix}/student/list`, 'get', {
  ...successResult,
  'data|5-10': [
    studentDetail,
  ],
});
Mock.mock(`${mockPrefix}/student/add`, 'post', {
  ...successResult,
});
Mock.mock(`${mockPrefix}/student/detail`, 'get', {
  ...successResult,
  data: studentDetail,
});
export default Mock;
