import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { LayoutPage } from '@sinohealth/butterfly-ui-components/lib';
import { useMenuConfig } from '@/hooks/index';

function Home() {
  const [key, setKey] = useState(Date.now());
  const [isLoaded, setIsLoaded] = useState(false);
  const [menuConfig, setMenuConfig] = useState({});
  const navigate = useNavigate();
  const [headerMenuList, sideMenuList, defaultSelected] = useMenuConfig();
  useEffect(() => {
    setMenuConfig({
      sideMenu: {
        menuList: sideMenuList,
        defaultSelectedKeys: defaultSelected.sideMenuSelectedKeys,
        defaultOpenKeys: defaultSelected.defaultOpenKeys,
        onSelect(item: any) {
          navigate(item.key);
        },
      },
      headerMenu: {
        menuList: headerMenuList,
        defaultSelectedKeys: defaultSelected.headerMenuSelectedKeys,
      },
    });
    setIsLoaded(true);
  }, [headerMenuList, sideMenuList, defaultSelected]);
  useEffect(() => {
    setKey(Date.now());
  }, [defaultSelected]);
  const logo = (<div>中康患者管理平台</div>);
  const toolbar = (<div>用户信息</div>);
  return (
    <div>
      {/* @ts-ignore */}
      {isLoaded && (<LayoutPage key={key} menuConfig={menuConfig} collapsed={false} logo={logo} toolbar={toolbar}><Outlet /></LayoutPage>)}
    </div>
  );
}

export default Home;
