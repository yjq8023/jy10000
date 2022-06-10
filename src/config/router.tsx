import React, { lazy } from 'react';
import Home from '../pages/home';
import Login from '../pages/user/login';
import { Navigate } from 'react-router-dom';

// 懒加载只能针对挂载在Home组件下的组件，因为Suspense组件放在Home中
const Index = lazy(() => import('../pages/index'));
const PatientList = lazy(() => import('../pages/patient/list'));
const PatientAdd = lazy(() => import('../pages/patient/add'));
const PatientDetail = lazy(() => import('../pages/patient/detail'));
const WeappColumn = lazy(() => import('../pages/weapp/column'));
const WeappProject = lazy(() => import('../pages/weapp/project'));

type routerConfigItem = {
  path: string;
  element?: React.ReactNode;
  hideInMenu?: boolean;
  children?: routerConfigItem[];
  meta?: any;
};
const routerConfig: routerConfigItem[] = [
  {
    path: '/',
    element: <Home />,
    children: [
      {
        path: '/',
        element: <Navigate to="/index" replace />,
      },
      {
        path: 'index',
        element: <Index />,
        hideInMenu: true,
      },
      {
        path: '/patient/list',
        element: <PatientList />,
      },
      {
        path: '/patient/add',
        element: <PatientAdd />,
      },
      {
        path: '/patient/detail',
        element: <PatientDetail />,
      },
      {
        path: '/weapp/column',
        element: <WeappColumn />,
      },
      {
        path: '/weapp/project',
        element: <WeappProject />,
      },
    ],
  },
  {
    path: '/login',
    element: <Login/>,
  },
  {
    path: '*',
    element: <div>404 page</div>,
  },
];

// todo: 与路由表结合生成面包屑地图数据
export const breadcrumbMap = {
  patient: {
    label: '患者管理',
    path: '/patient/list',
    list: {
      label: '患者列表',
      path: '/patient/list',
    },
    add: {
      label: '患者建档',
      path: '/patient/add',
    },
    detail: {
      label: '患者档案',
      path: '/patient/detail',
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
