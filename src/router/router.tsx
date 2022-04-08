import React from 'react';
import { Routes, Route } from 'react-router-dom';
import routerConfig from '@/config/router';

type routerConfigProps = {
  path: string;
  element: any;
  children?: routerConfigProps[];
};

export const renderRoutes = (routerConfigData: any[]) =>
  routerConfigData.map(({ children, ...routeProps }) => (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <Route {...routeProps} key={routeProps.path}>
      {children && renderRoutes(children)}
    </Route>
  ));
const a = 1;
export default <Routes>{renderRoutes(routerConfig)}</Routes>;
