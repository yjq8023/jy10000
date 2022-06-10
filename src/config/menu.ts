import { getUuid } from '@/utils';

const menuConfig: MenuItemProps[] = [
  {
    label: '首页',
    key: 'index',
    path: 'index',
  },
  {
    label: '患者管理',
    key: 'patient',
    children: [
      {
        label: '患者列表',
        path: '/patient/list',
      },
      {
        label: '患者咨询',
        path: '/patient/consult',
      },
      {
        label: '患者邀请',
        path: '/patient/invite',
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

export type MenuItemProps = {
  label: string;
  key?: string;
  path?: string;
  parent?: MenuItem;
  children?: MenuItemProps[];
};

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
