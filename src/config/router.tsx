import React, { lazy } from 'react';
import Home from '../pages/home';
import Login from '../pages/user/login';
import Password from '../pages/user/password';
import { Navigate } from 'react-router-dom';
import ProjectAdd from '@/pages/weapp/projectAdd';
import LabelClassify from '@/pages/project/labelClassify';
import LabelLibrary from '@/pages/project/labelLibrary';
import TermLibrary from '@/pages/project/termLibrary';
import ArticleLibrary from '@/pages/project/articleLibrary';
import ScaleLibrary from '@/pages/project/scaleLibrary';
import ArticleInsert from '@/pages/project/articleLibrary/articleInsert';

// 懒加载只能针对挂载在Home组件下的组件，因为Suspense组件放在Home中
const WeappColumn = lazy(() => import('../pages/weapp/column'));
const WeappProject = lazy(() => import('../pages/weapp/project'));
const Disease = lazy(() => import('../pages/weapp/disease'));
const OrganList = lazy(() => import('../pages/setting/organList'));
const UserList = lazy(() => import('../pages/setting/userList'));
const Message = lazy(() => import('../pages/message'));
const FollowList = lazy(() => import('../pages/follow/list'));
const FollowCount = lazy(() => import('../pages/follow/count'));
const FormilyEditor = lazy(() => import('../pages/formily/editor'));
const PlanMapEditor = lazy(() => import('../pages/planMapEditor'));
const DictList = lazy(() => import('../pages/dict/list'));

const CustomerOrganList = lazy(() => import('../pages/setting/organ'));
const CustomerOrganDetail = lazy(() => import('../pages/setting/organ/detail'));
const DepartmentList = lazy(() => import('../pages/setting/department'));
const CustomerRoleList = lazy(() => import('../pages/setting/role'));
const CustomerEmployeesList = lazy(() => import('../pages/setting/employees'));

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
        path: '/weapp/disease',
        element: <Disease />,
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
      {
        path: '/dict/list',
        element: <DictList />,
      },
      // 项目管理
      {
        path: '/project/term/library',
        element: <TermLibrary />,
      },
      {
        path: 'project/term/library/editor',
        element: <PlanMapEditor />,
        hideInMenu: true,
      },
      {
        path: 'project/term/library/planDetail',
        element: <PlanMapEditor disabled={true} />,
        hideInMenu: true,
      },
      // 资料库管理
      {
        path: '/project/database/article',
        element: <ArticleLibrary />,
      },
      {
        path: '/project/database/insert',
        element: <ArticleInsert />,
      },
      {
        path: '/project/database/scale',
        element: <ScaleLibrary />,
      },
      // 标签管理
      {
        path: '/project/tag/library',
        element: <LabelLibrary />,
      },
      {
        path: '/project/tag/classify',
        element: <LabelClassify />,
      },
      {
        path: '/project/label/classify',
        element: <LabelClassify />,
      },
      {
        path: 'project/formily/editor',
        element: <FormilyEditor />,
        hideInMenu: true,
      },
      {
        path: '/setting/organ',
        element: <CustomerOrganList />,
      },
      {
        path: '/setting/organ/detail',
        element: <CustomerOrganDetail />,
      },
      {
        path: '/setting/department',
        element: <DepartmentList />,
      },
      {
        path: '/setting/role',
        element: <CustomerRoleList />,
      },
      {
        path: '/setting/employees',
        element: <CustomerEmployeesList />,
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
    organ: {
      label: '组织管理',
      path: '/customer/organ',
      detail: {
        label: '组织详情',
        path: '/customer/organ/detail',
      },
    },
    department: {
      label: '部门管理',
      path: '/customer/department',
    },
    role: {
      label: '角色管理',
      path: '/customer/role',
    },
    employees: {
      label: '员工管理',
      path: '/customer/employees',
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
      label: '服务项目管理',
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
    disease: {
      label: '轮播图管理',
      path: '/weapp/disease',
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
  project: {
    label: '项目管理',
    path: '/project/term/library',
    term: {
      label: '项目库管理',
      path: '/project/term/library',
      library: {
        label: '项目库',
        path: '/project/term/library',
      },
    },
    database: {
      label: '资料库管理',
      path: '/project/database/article',
      article: {
        label: '文章库',
        path: '/project/database/article',
      },
      scale: {
        label: '量表库',
        path: '/project/database/scale',
      },
    },
    tag: {
      label: '标签管理',
      path: '/project/tag/library',
      library: {
        label: '标签库',
        path: '/project/tag/library',
      },
      classify: {
        label: '标签分类',
        path: '/project/tag/classify',
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
