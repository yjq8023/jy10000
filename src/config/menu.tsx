import type { MenuProps } from 'antd';
const { NODE_ENV } = process.env;
export const isDev = NODE_ENV === 'development';

const menuConfig = [
  {
    label: '导师',
    key: 'supervisor',
  },
];

export default menuConfig;
