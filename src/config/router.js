import React, { lazy } from 'react';

const Home = lazy(() => import('../pages/Home'));
const Page1 = lazy(() => import('../pages/page1'));
const Page2 = lazy(() => import('../pages/page2'));
const Login = lazy(() => import('../pages/Login'));

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
