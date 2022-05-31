import React, { lazy } from 'react';
import Home from '../pages/home';
// const Home = lazy(() => import('../pages/Home'));

// 懒加载只能针对挂载在Home组件下的组件，因为Suspense组件放在Home中
const Index = lazy(() => import('../pages/index'));
const PatientList = lazy(() => import('../pages/patient/patientList'));

type routerConfigItem = {
  path: string;
  element?: React.ReactNode;
  hideInMenu?: boolean;
  children?: routerConfigItem[];
};
const routerConfig: routerConfigItem[] = [
  {
    path: '/',
    element: <Home />,
    children: [
      {
        path: 'index',
        element: <Index />,
        hideInMenu: true,
      },
      {
        path: '/patient/list',
        element: <PatientList />,
      },
    ],
  },
  {
    path: '*',
    element: <div>404 page</div>,
  },
];
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
