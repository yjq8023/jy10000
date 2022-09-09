import { useState, useEffect } from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import { request } from '@/core/request';
import localRouterConfig, { routerConfigItem } from '@/config/router';
import localMenuConfig, { MenuItem } from '@/config/menu';
import permissionCodes from '@/config/permissionCode';
import { isDev } from '@/config/base';
import { getToken } from '@/utils/cookies';

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

// 请求账户权限数据
const localPermissionData: any = {};
const getPermissionData = () => {
  const token = getToken();
  return new Promise((res, rej) => {
    if (token && localPermissionData[token]) {
      res(localPermissionData[token]);
    } else {
      // @ts-ignore
      request.get('/uaa/user/permission', { noAuthentication: true, isReturnAllData: true })
        .then((response) => {
          const { data } = response;
          if (token) {
            localPermissionData[token] = data;
          }
          res(data);
        })
        .catch((e) => {
          rej(e);
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
    const code = item.data?.resourceCode || item.id; // 存在多层级菜单情况，没有resourceCode会报错s
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
    newConfig.push(newItem);
  });
  return newConfig;
};
// 动态生成路由表后，默认路由需要同步修改
const changeDefaultRoute = (routerConfig: any[]) => {
  return routerConfig.map((i, index: number) => {
    const item = { ...i };
    if (item.path === '/' && !item.children) {
      return {
        path: '/',
        element: <Navigate to={routerConfig[index + 1].path} replace />,
      };
    }
    if (item.children) {
      item.children = changeDefaultRoute(item.children);
    }
    return item;
  });
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
  // useEffect(() => {
  //   fetchPermissionData();
  // }, [location]);
  useEffect(() => {
    fetchPermissionData();
  }, []);
  const fetchPermissionData = () => {
    setLoaded(false);
    // 开发时不控制权限，直接取本地数据
    if (isDev) {
      setLocalMenuConfig();
      return;
    }
    // 获取权限数据
    getPermissionData()
      .then((data: any) => {
        setPermissionData(data);
      })
      .catch((error: any) => {
        // 未登录时，为了正常的路由显示，还是需要把本地的路由配置生效
        if (error.response.status === 401) {
          setLocalMenuConfig();
        }
      })
      .finally(() => {
        setLoaded(true);
      });
  };
  const setLocalMenuConfig = () => {
    setMenuConfig(localMenuConfig.map((config: any) => new MenuItem(config)));
    setRouterConfig(localRouterConfig);
    setPermission(transFormPermission([], true));
    setLoaded(true);
  };

  // 当权限配置更新时
  useEffect(() => {
    if (permissionData) {
      // 生成路由表
      let newRouterConfig = filterRouterConfig(localRouterConfig, permissionData.permission);
      newRouterConfig = changeDefaultRoute(newRouterConfig);
      setRouterConfig(newRouterConfig);
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
