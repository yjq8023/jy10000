import type { MenuProps } from 'antd';
const { NODE_ENV } = process.env;
export const isDev = NODE_ENV === 'development';

const menuConfig = [
  {
    label: '导师',
    key: 'supervisor',
  },
  {
    label: '学生',
    key: 'student',
  },
  {
    label: '课程',
    key: 'school-class',
  },
  {
    label: '跟进',
    key: 'follow-up',
    type: 'group',
    children: [
      {
        label: '跟进列表',
        key: 'follow-up/list'
      },
      {
        label: '投诉与建议',
        key: 'follow-up/complain'
      }
    ]
  },
  {
    label: '设置',
    key: 'setting',
    type: 'group',
    children: [
      {
        label: '校区设置',
        key: 'setting/school'
      },
      {
        label: '权限',
        key: 'setting/auth'
      }
    ]
  },
];

export default menuConfig;
