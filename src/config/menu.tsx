import { getUuid } from '@/utils';
import { MenuItemProps as AntdMenuItemProps } from '@sinohealth/butterfly-ui-components/lib';
import { getMenuPermission } from '@/services/user';
import routerConfig from './router';
import { setLocalStorage } from '@/utils/cookies';
const { NODE_ENV } = process.env;
export const isDev = NODE_ENV === 'development';

const menuConfig: MenuItemProps[] = [
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
    label: '个人中心',
    key: 'personal',
    visible: false,
    children: [
      {
        label: '资料设置',
        path: '/personal/dataSettings',
      },
      {
        label: '修改密码',
        path: '/personal/changePassword',
      },
      {
        label: '登录记录',
        path: '/personal/loginRecord',
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
  visible?: boolean;
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
// 根据页面资源code从路由表配置提取页面菜单路径
const getPathFormRouterConfig = (code: string) => {
  const allRoute = routerConfig[0].children || [];
  const pagePath = allRoute.filter((item: any) => item.code === code)[0];
  return pagePath?.path;
};
// 转换后台配置的菜单数据为本地要求的菜单数据格式
const transformAsyncMenuConfig = (menus: any) => {
  return menus.map((item: any) => {
    const code = item.data?.resourceCode;
    const visible = item.data?.visible;
    return {
      label: item.name,
      path: code && getPathFormRouterConfig(code),
      visible: visible,
      children: item.children ? transformAsyncMenuConfig(item.children) : [],
    };
  });
};

// export function getMenuConfig() {
//   return Promise.resolve(menuConfig.map((config) => new MenuItem(config)));
// }

// 获取菜单配置数据
export function getMenuConfig() {
  if (isDev && false) return Promise.resolve(menuConfig.map((config) => new MenuItem(config)));
  return getMenuPermission().then((data: any) => {
    // 缓存
    setLocalStorage('permission', data.permission);
    const newMenuConfig = transformAsyncMenuConfig(data.menu);
    // 加一个判断，如果是开发环境用上面那一份，如果是生产环境，取接口返回的
    return newMenuConfig.map((config: any) => new MenuItem(config));
  });
}

export default menuConfig;
