import React, { lazy } from 'react';
import Home from '../pages/home';
import { Navigate } from 'react-router-dom';
import NoFind from "@/pages/user/noFind";

// 懒加载只能针对挂载在Home组件下的组件，因为Suspense组件放在Home中
const SupervisorList = lazy(() => import('../pages/supervisor/list'));
const SupervisorEdit = lazy(() => import('../pages/supervisor/edit'));

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
        element: <Navigate to="/supervisor" replace />,
      },
      {
        path: '/supervisor',
        element: <SupervisorList />,
      },
      {
        path: '/supervisor/edit',
        element: <SupervisorEdit />,
      },
    ],
  },
  ...baseRouterConfig
];

// todo: 与路由表结合生成面包屑地图数据
export const breadcrumbMap = {
  supervisor: {
    label: '导师列表',
    path: '/supervisor',
    edit: {
      label: '编辑导师',
      path: '/edit',
    }
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
