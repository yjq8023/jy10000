import type { MenuProps } from 'antd';
import { TeamOutlined, UserAddOutlined, SettingOutlined, LoginOutlined, CalendarOutlined } from '@ant-design/icons'
const { NODE_ENV } = process.env;
export const isDev = NODE_ENV === 'development';

const menuConfig = [
  {
    label: '导师',
    key: 'supervisor',
    icon: <UserAddOutlined />
  },
  {
    label: '学生',
    key: 'student',
    icon: <TeamOutlined />
  },
  {
    label: '课程',
    key: 'school-class',
    icon: <CalendarOutlined />
    // type: 'group',
    // children: [
    //   {
    //     label: '课程列表',
    //     key: 'school-class'
    //   },
    //   {
    //     label: '课程总览表',
    //     key: 'school-class/schedule'
    //   }
    // ]
  },
  {
    label: '跟进',
    key: 'follow-up/list',
    icon: <LoginOutlined />
    // type: 'group',
    // children: [
    //   {
    //     label: '跟进列表',
    //     key: 'follow-up/list'
    //   },
    //   {
    //     label: '投诉与建议',
    //     key: 'follow-up/complain'
    //   }
    // ]
  },
  {
    label: '设置todo',
    key: 'setting',
    icon: <SettingOutlined />
    // type: 'group',
    // children: [
    //   {
    //     label: '校区设置',
    //     key: 'setting/school'
    //   },
    //   {
    //     label: '权限',
    //     key: 'setting/auth'
    //   }
    // ]
  },
];

export default menuConfig;
