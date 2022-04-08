import { getUuid } from '@/utils';

const menuConfig: MenuItemProps[] = [
  {
    label: '模版菜单',
    children: [
      {
        label: '模板页面',
        children: [
          {
            path: '/page1',
            label: '页面一',
          },
          {
            path: '/page2',
            label: '页面二',
          },
        ],
      },
    ],
  },
  {
    label: '处方流转',
    key: 'test',
    children: [
      {
        label: '处方管理',
        children: [
          {
            path: '/prescrip/order/list',
            label: '审方订单',
          },
        ],
      },
      {
        label: '系统分析',
        children: [
          {
            path: '/page11',
            label: '订单查询',
          },
          {
            path: '/page22',
            label: '经营状况',
          },
        ],
      },
    ],
  },
];

export class MenuItem {
  parent: MenuItem | null;

  key: string = '';

  children: MenuItem[];

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
