import React, { lazy } from 'react';
import Home from '../pages/home';
import Login from '../pages/user/login';
import Password from '../pages/user/password';
import { Navigate } from 'react-router-dom';
import ProjectAdd from '@/pages/weapp/projectAdd';

// 懒加载只能针对挂载在Home组件下的组件，因为Suspense组件放在Home中
const WeappColumn = lazy(() => import('../pages/weapp/column'));
const WeappProject = lazy(() => import('../pages/weapp/project'));
const OrganList = lazy(() => import('../pages/setting/organList'));
const UserList = lazy(() => import('../pages/setting/userList'));
const Message = lazy(() => import('../pages/message'));
const FollowList = lazy(() => import('../pages/follow/list'));
const FollowCount = lazy(() => import('../pages/follow/count'));

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
        element: <Navigate to="/weapp/column" replace />,
      },
      {
        path: '/weapp/column',
        element: <WeappColumn />,
      },
      {
        path: '/weapp/project',
        element: <WeappProject />,
      },
      {
        path: '/setting/organList',
        element: <OrganList />,
      },
      {
        path: '/setting/userList',
        element: <UserList />,
      },
      {
        path: '/weapp/project/edit',
        element: <ProjectAdd />,
      },
      {
        path: '/weapp/project/add',
        element: <ProjectAdd />,
      },
      {
        path: '/follow/list',
        element: <FollowList />,
      },
      {
        path: '/follow/count',
        element: <FollowCount />,
      },
    ],
  },
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
    element: <div>404 page</div>,
  },
];

// todo: 与路由表结合生成面包屑地图数据
export const breadcrumbMap = {
  setting: {
    label: '配置',
    path: '/setting/organList',
    organList: {
      label: '机构管理',
      path: '/setting/organList',
    },
    userList: {
      label: '用户管理',
      path: '/setting/userList',
    },
  },
  weapp: {
    label: '小程序管理',
    path: '/weapp/column',
    column: {
      label: '病种管理',
      path: '/weapp/column',
    },
    project: {
      label: '项目管理',
      path: '/weapp/project',
      add: {
        label: '新增病种项目',
        path: '/weapp/project/add',
      },
      edit: {
        label: '编辑病种项目',
        path: '/weapp/project/edit',
      },
    },
  },
  follow: {
    label: '跟进管理',
    path: '/follow/list',
    list: {
      label: '跟进项目统计',
      path: '/follow/list',
    },
    count: {
      label: '项目跟进列表',
      path: '/follow/count',
      add: {
        label: '新增病种项目',
        path: '/weapp/project/add',
      },
      edit: {
        label: '编辑病种项目',
        path: '/weapp/project/edit',
      },
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
