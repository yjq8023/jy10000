import { getUuid } from '@/utils';
import { MenuItemProps as AntdMenuItemProps } from '@sinohealth/butterfly-ui-components/lib';

const menuConfig: MenuItemProps[] = [
  {
    label: '小程序管理',
    key: 'weapp',
    children: [
      {
        label: '病种管理',
        path: '/weapp/column',
      },
      {
        label: '项目管理',
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
      {
        label: '表单编辑',
        path: '/formily/editor',
      },
      {
        label: '管理路径编辑',
        path: '/planMapEditor',
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
