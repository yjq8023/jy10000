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
      {
        label: '轮播图管理',
        path: '/weapp/disease',
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
  {
    label: '字典管理',
    key: 'dict',
    children: [
      {
        label: '字典管理列表',
        path: '/dict/list',
        icon: <span className="iconfont icon-project"></span>,
      },
    ],
  },
  {
    label: '项目管理',
    key: 'project',
    children: [
      {
        label: '项目库管理',
        children: [
          {
            label: '项目库',
            path: '/project/term/library',
          },
        ],
      },
      {
        label: '资料库管理',
        children: [
          {
            label: '文章库',
            path: '/project/database/article',
          },
          {
            label: '量表库',
            path: '/project/database/scale',
          },
        ],
      },
      {
        label: '标签管理',
        children: [
          {
            label: '标签库',
            path: '/project/tag/library',
          },
          {
            label: '标签分类',
            path: '/project/tag/classify',
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
