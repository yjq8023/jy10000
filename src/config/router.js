import React, { lazy } from 'react';
import Home from '../pages/Home';
import Login from '../pages/Login';
// const Home = lazy(() => import('../pages/Home'));

// 懒加载只能针对挂载在Home组件下的组件，因为Suspense组件放在Home中
const Page1 = lazy(() => import('../pages/page1'));
const Page2 = lazy(() => import('../pages/page2'));

const routerConfig = [
  {
    path: '/',
    element: <Home />,
    children: [
      {
        path: '/prescrip',
        children: [
          {
            path: 'order/list',
            element: <Page1 />,
          },
          {
            path: 'order/detail',
            element: <Page2 />,
          },
        ],
      },
      {
        path: '/page1',
        element: <Page1 />,
      },
      {
        path: '/page2',
        element: <Page2 />,
      },
    ],
  },
  {
    path: 'Login',
    element: <Login />,
  },
];

export default routerConfig;
