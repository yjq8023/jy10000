import Mock from 'mockjs';

const prefix = '/mockPrefix';

Mock.setup({
  timeout: '500-1000',
});
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
const title = '@ctitle(5, 8)';
const sentence = '@csentence(20,100)';
const img = '@image';
Mock.mock(`${prefix}/teacher/list`, 'get', {
  success: true,
  'data|5-10': [
    {
      serial_num: '@id',
      cn_name: title,
      sex: '@integer',
      status: '@integer',
      phone: '@integer(11)',
      university: title,
      class_room: title,
      tech_subject: title,
    },
  ],
});

export default Mock;
