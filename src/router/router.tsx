import React, { lazy } from 'react';
import { Routes, Route } from 'react-router-dom';

const Home = lazy(() => import('../pages/Home'));
const Page1 = lazy(() => import('../pages/page1'));
const Page2 = lazy(() => import('../pages/page2'));
const Login = lazy(() => import('../pages/Login'));

type routerConfigProps = {
  path: string
  element: any
  children?: routerConfigProps[]
}
export const routerConfig = [
  {
    path: '/',
    element: <Home />,
    children: [
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

export const renderRoutes = (routerConfigData: routerConfigProps[]) => routerConfigData.map(({ children, ...routeProps }) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <Route {...routeProps}>
    {children && renderRoutes(children)}
  </Route>
));

export default (
  <Routes>
    { renderRoutes(routerConfig) }
  </Routes>
);
