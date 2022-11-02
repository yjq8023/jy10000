import React, { lazy } from 'react';
import Home from '../pages/home';
import Login from '../pages/user/login';
import Password from '../pages/user/password';
import NoFind from '../pages/user/noFind';
import { Navigate } from 'react-router-dom';

// 懒加载只能针对挂载在Home组件下的组件，因为Suspense组件放在Home中
const DictList = lazy(() => import('../pages/dict/list'));

const ChangePassword = lazy(() => import('../pages/personal/changePassword'));
const DataSettings = lazy(() => import('../pages/personal/dataSettings'));
const LoginRecord = lazy(() => import('../pages/personal/loginRecord'));

export type routerConfigItem = {
  path: string;
  code?: string;
  element?: React.ReactNode;
  hideInMenu?: boolean;
  children?: routerConfigItem[];
  meta?: any;
};

export const baseRouterConfig = [
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/password',
    element: <Password />,
  },
  {
    path: '*',
    element: <NoFind />,
  }
]
const routerConfig: routerConfigItem[] = [
  {
    path: '/',
    element: <Home />,
    children: [
      {
        path: '/',
        element: <Navigate to="/weapp/disease" replace />,
      },
      {
        path: '/dict/list',
        element: <DictList />,
        code: 'DictListWe',
      },
      {
        path: '/personal/changePassword',
        element: <ChangePassword />,
        code: 'ChangePasswordWe',
      },
      {
        path: '/personal/dataSettings',
        element: <DataSettings />,
        code: 'DataSettingsWe',
      },
      {
        path: '/personal/loginRecord',
        element: <LoginRecord />,
        code: 'LoginRecordWe',
      },
    ],
  },
  ...baseRouterConfig
];

// todo: 与路由表结合生成面包屑地图数据
export const breadcrumbMap = {
  dict: {
    label: '字典管理',
    path: '/dict',
    list: {
      label: '字典列表',
      path: '/list',
    },
  },
  personal: {
    label: '个人中心',
    path: '/personal/dataSettings',
    dataSettings: {
      label: '资料设置',
      path: '/project/dataSettings',
    },
    loginRecord: {
      label: '登录记录',
      path: '/project/loginRecord',
    },
    changePassword: {
      label: '修改密码',
      path: '/project/changePassword',
    },
  },
};
function mapRouterConfig(config: routerConfigItem[], fn: any, parentPath = '') {
  config.forEach((item) => {
    fn && fn(item, parentPath);
    if (item.children) {
      const en = item.path.startsWith('/') || parentPath.endsWith('/') ? '' : '/';
      mapRouterConfig(item.children, fn, parentPath + en + item.path);
    }
  });
}
const hideInMenuPages: string[] = [];
mapRouterConfig(routerConfig, (router: routerConfigItem, parentPath: string) => {
  if (router.hideInMenu) {
    const en = router.path.startsWith('/') || parentPath.endsWith('/') ? '' : '/';
    hideInMenuPages.push(parentPath + en + router.path);
  }
});
export { hideInMenuPages };
export default routerConfig;
