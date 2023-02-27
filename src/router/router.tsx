import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Spin } from '@sinohealth/butterfly-ui-components/lib';
import { usePermission } from '@/common/hooks';

type routerConfigProps = {
  path: string;
  element: any;
  children?: routerConfigProps[];
};

const renderRoute = (routerConfigData: any[]) =>
  routerConfigData.map(({ children, ...routeProps }) => (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <Route {...routeProps} key={routeProps.path}>
      {children && renderRoute(children)}
    </Route>
  ));

export const RenderRoutes = () => {
  const { routerConfig, loaded } = usePermission();
  if (!loaded) {
    return (
      <div style={{ display: 'flex', height: '100vh' }}>
        <Spin size="large" style={{ margin: 'auto' }} />
      </div>
    );
  }
  return <Routes>{renderRoute(routerConfig)}</Routes>;
};

export default RenderRoutes;
