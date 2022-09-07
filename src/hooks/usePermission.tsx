import { useState, useEffect } from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import { request } from '@/core/request';
import localRouterConfig, { routerConfigItem } from '@/config/router';
import localMenuConfig, { MenuItem } from '@/config/menu';
import { getUuid } from '@/utils';
import permissionCodes from '@/config/permissionCode';
import { getToken } from '@/utils/cookies';
import { isDev } from '@/config/base';

type permissionMenuItem = {
  id: string;
  name: string;
  parentId: string;
  data: {
    icon: any;
    resourceCode: string; // 资源编码
    visible: boolean;
  };
};
const storageKey = 'permission';
// 请求账户权限数据
let localPermissionData: any;
const getPermissionData = () => {
  return new Promise((res, rej) => {
    if (localPermissionData) {
      res(localPermissionData);
    } else {
      request.get('/uaa/user/permission').then((data) => {
        localPermissionData = data;
        res(data);
      });
    }
  });
};
// 根据页面资源code从路由表配置提取页面菜单路径
const getPathFormRouterConfig = (code: string) => {
  const allRoute = localRouterConfig[0].children || [];
  const pagePath = allRoute.filter((item: any) => item.code === code)[0];
  return pagePath?.path;
};
// 转换后台配置的菜单数据为本地要求的菜单数据格式
const transformAsyncMenuConfig = (menus: any) => {
  return menus.map((item: any) => {
    const code = item.data?.resourceCode || item.id; // 存在多层级菜单情况，没有resourceCode会报错
    const visible = item.data?.visible;
    const children = item.children ? transformAsyncMenuConfig(item.children) : [];
    return {
      label: `${item.name}`,
      key: code
        ? getPathFormRouterConfig(code)
        : children[0]?.path.split('/')[1] || children[0]?.path.split('/')[0],
      path: code && getPathFormRouterConfig(code),
      visible,
      children,
    };
  });
};
// 根据权限配置过滤路由表
const filterRouterConfig = (config: any[], permission: string[]) => {
  const newConfig: any = [];
  config.forEach((item) => {
    if (item.code && permission.indexOf(item.code) === -1) {
      return;
    }
    const newItem = { ...item };
    if (item.children) {
      newItem.children = filterRouterConfig(item.children, permission);
    }
    // todo: 默认路由可能与权限路由表不匹配，考虑是否要根据权限路由表生成默认路由
    newConfig.push(newItem);
  });
  return newConfig;
};
// 资源权限数据
const transFormPermission = (permissionData: string[], val: boolean = false) => {
  const codeKeys = Object.keys(permissionCodes);
  const res: any = {};
  codeKeys.forEach((key) => {
    res[key] = val || permissionData.indexOf(permissionCodes[key]) > -1;
  });
  return res;
};
// 获取经过权限判断后的路由、菜单、按钮权限等配置数据
export const usePermission = () => {
  const [loaded, setLoaded] = useState(false); // 是否加载完成权限数据
  const [routerConfig, setRouterConfig] = useState<routerConfigItem[]>([]); // 路由表
  const [menuConfig, setMenuConfig] = useState<MenuItem[]>([]); // 菜单配 置
  const [permission, setPermission] = useState<any>([]); // 资源权限
  const location = useLocation();
  const [permissionData, setPermissionData] = useState<{
    menu: permissionMenuItem[];
    permission: string[];
  }>();
  useEffect(() => {
    fetchPermissionData();
  }, [location]);
  useEffect(() => {
    fetchPermissionData();
  }, []);
  const fetchPermissionData = () => {
    // 开发时或者未登录时，直接取本地数据
    // if (!getToken() || isDev) {
    //   setMenuConfig(localMenuConfig.map((config: any) => new MenuItem(config)));
    //   setRouterConfig(localRouterConfig);
    //   setPermission(transFormPermission([], true));
    //   setLoaded(true);
    //   return;
    // }
    // 登录后或者页面进入时，判断没有获取过权限数据则获取
    if (getToken() && !permissionData) {
      setLoaded(false);
      localPermissionData = '';
      getPermissionData().then((data: any) => {
        setPermissionData(data);
      });
    }
  };
  // 当权限配置更新时
  useEffect(() => {
    console.log(permissionData);
    if (permissionData) {
      // 生成路由表
      setRouterConfig(filterRouterConfig(localRouterConfig, permissionData.permission));
      // 生成菜单数据
      setMenuConfig(
        transformAsyncMenuConfig(permissionData.menu).map((config: any) => new MenuItem(config)),
      );
      // 生成权限数据
      setPermission(transFormPermission(permissionData.permission));
      setTimeout(() => {
        setLoaded(true);
      }, 100);
    }
  }, [permissionData]);
  return { routerConfig, menuConfig, permission, loaded };
};

export default usePermission;
