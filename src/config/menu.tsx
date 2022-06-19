import { getUuid } from '@/utils';
import { MenuItemProps as AntdMenuItemProps } from '@sinohealth/butterfly-ui-components/lib';

const menuConfig: MenuItemProps[] = [
  {
    label: '首页',
    key: 'index',
    path: 'index',
    children: [
      {
        label: '申请通知',
        path: '/message',
      }
    ],
  },
  {
    label: '患者管理',
    key: 'patient',
    children: [
      {
        label: '患者列表',
        path: '/patient/list',
        icon: <span className={'iconfont icon-contacts'} />,
      },
      {
        label: '患者咨询',
        path: '/patient/consult',
        icon: <span className={'iconfont icon-message'} />,
      },
      {
        label: '患者邀请',
        path: '/patient/invite',
        icon: <span className={'iconfont icon-apartment'} />,
      },
    ],
  },
  {
    label: '小程序管理',
    key: 'weapp',
    children: [
      {
        label: '平台栏目管理',
        path: '/weapp/column',
      },
      {
        label: '病种项目管理',
        path: '/weapp/project',
      },
    ],
  },
  {
    label: '配置',
    key: 'setting',
    children: [
      {
        label: '机构管理',
        path: '/setting/organList',
      },
      {
        label: '用户管理',
        path: '/setting/userList',
      },
    ],
  },
];

export class MenuItem {
  parent: MenuItem | null;

  key: string = '';

  children: MenuItem[];

  path: string = '';

  constructor(props: MenuItemProps) {
    Object.assign(this, props);
    this.parent = props.parent || null;
    this.key = props.key || props.path || getUuid();
    this.children = props.children
      ? props.children.map((config) => new MenuItem({ ...config, parent: this }))
      : [];
  }
}

export interface MenuItemProps extends AntdMenuItemProps {
  label: string;
  key?: string;
  path?: string;
  parent?: MenuItem;
  children?: MenuItemProps[];
}

export function mapMenuConfig(menu: MenuItem[], fn: any) {
  menu.forEach((item) => {
    fn(item);
    if (item.children) {
      mapMenuConfig(item.children, fn);
    }
  });
}

export function mapMenuParent(menuItem: MenuItem, fn: any) {
  if (menuItem.parent) {
    fn(menuItem.parent);
    mapMenuParent(menuItem.parent, fn);
  }
}

export function getMenuConfig() {
  return Promise.resolve(menuConfig.map((config) => new MenuItem(config)));
}
export default menuConfig;
