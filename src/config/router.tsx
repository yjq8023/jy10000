import React, { lazy } from 'react';
import Home from '../pages/home';
import { Navigate } from 'react-router-dom';
import NoFind from "@/pages/user/noFind";
import Login from "@/pages/user/Login";

// 懒加载只能针对挂载在Home组件下的组件，因为Suspense组件放在Home中
const SupervisorList = lazy(() => import('../pages/supervisor/list'));
const SupervisorEdit = lazy(() => import('../pages/supervisor/edit'));
const SupervisorDetail = lazy(() => import('../pages/supervisor/detail'));

const StudentList = lazy(() => import('../pages/student/list'));
const StudentEdit = lazy(() => import('../pages/student/edit'));
const StudentDetail = lazy(() => import('../pages/student/detail'));

const SchoolClassList = lazy(() => import('../pages/schoolClass/list'));
const SchoolClassEdit = lazy(() => import('../pages/schoolClass/edit'));
const ClassSchedulePreview = lazy(() => import('../pages/schoolClass/classSchedulePreview'));

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
  },
  {
    path: '/login',
    element: <Login />,
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
      {
        path: '/supervisor/detail',
        element: <SupervisorDetail />
      },
      {
        path: '/student',
        element: <StudentList />
      },
      {
        path: '/student/edit',
        element: <StudentEdit />
      },
      {
        path: '/student/detail',
        element: <StudentDetail />
      },
      {
        path: '/school-class',
        element: <SchoolClassList />
      },
      {
        path: '/school-class/edit',
        element: <SchoolClassEdit />
      },
      {
        path: '/school-class/schedule',
        element: <ClassSchedulePreview />
      }
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
      path: '/supervisor/edit',
    },
    detail: {
      label: '导师详情',
      path: '/supervisor/detail',
    }
  },
  student: {
    label: '学生列表',
    path: '/student',
    edit: {
      label: '编辑学生',
      path: '/student/edit',
    },
    detail: {
      label: '学生详情',
      path: '/student/detail',
    }
  },
  'school-class': {
    label: '课程列表',
    path: '/school-class',
    edit: {
      label: '编辑课程',
      path: '/school-class/edit',
    },
    detail: {
      label: '课程详情',
      path: '/school-class/detail',
    },
    schedule: {
      label: '课程总览表',
      path: '/school-class/detail',
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
