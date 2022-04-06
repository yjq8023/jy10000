import React from 'react';
import { Outlet } from 'react-router-dom';
import { Layout } from '@sinohealth/butterfly-ui-components/lib';

function Home() {
  const menuData = [
    {
      label: '一级菜单',
      key: '1',
      icon: '',
      children: [
        {
          label: '二级菜单',
          key: '1-1',
          children: [],
        },
      ],
    },
    {
      label: '一级菜单2',
      key: '2',
      icon: '',
      children: [
        {
          label: '二级菜单2',
          key: '2-1',
          children: [],
        },
      ],
    },
  ];
  const menuData2 = [
    {
      label: '首页', key: 'home', icon: '', children: [],
    },
    {
      label: '首页2', key: 'home2', icon: '', children: [],
    },
  ];
  const menuConfig = {
    sideMenu: menuData,
    headerMenu: menuData2,
    sideMenuSelectedKeys: ['1-1'],
    headerMenuSelectedKeys: [menuData2[0].key],
  };
  const logo = (<div>中康患者管理平台</div>);
  const toolbar = (<div>用户信息</div>);
  return (
    <div>
      {/* @ts-ignore */}
      <Layout menuConfig={menuConfig} collapsed={false} logo={logo} toolbar={toolbar}>
        <Outlet />
      </Layout>
    </div>
  );
}

export default Home;
