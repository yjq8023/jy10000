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
];

export default menuConfig;
