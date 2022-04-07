import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { LayoutPage } from '@sinohealth/butterfly-ui-components/lib';
import { useMenuConfig } from '@/hooks/index';

function Home() {
  const navigate = useNavigate();
  const [headerMenuList, sideMenuList] = useMenuConfig();
  const menuConfig = {
    sideMenu: {
      menuList: sideMenuList,
      defaultSelectedKeys: ['1-1'],
      onSelect(item: any) {
        navigate(item.key);
      },
    },
    headerMenu: {
      menuList: headerMenuList,
      defaultSelectedKeys: ['home'],
    },
  };
  const logo = (<div>中康患者管理平台</div>);
  const toolbar = (<div>用户信息</div>);
  return (
    <div>
      {/* @ts-ignore */}
      <LayoutPage menuConfig={menuConfig} collapsed={false} logo={logo} toolbar={toolbar}>
        <Outlet />
      </LayoutPage>
    </div>
  );
}

export default Home;
