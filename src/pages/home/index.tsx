import React, { useEffect, useState, Suspense } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { LayoutPage } from '@sinohealth/butterfly-ui-components/lib';
import { useMenuConfig } from '@/hooks';
import { hideInMenuPages } from '@/config/router';
import PageHeader from '@/components/PageHeader';

function Home(props: any) {
  const [collapsed, setCollapsed] = useState(true);
  const [menuConfig, setMenuConfig] = useState<any>({});
  const navigate = useNavigate();
  const location = useLocation();
  const [headerMenuList, sideMenuList, defaultSelected] = useMenuConfig();
  // 拼装菜单数据，配置内容跟Menu组件保持一致，增加了menuList数据渲染
  useEffect(() => {
    const collapsedNow = hideInMenuPages.indexOf(location.pathname) > -1;
    setCollapsed(collapsedNow);
    const sideMenuConfig = {
      key: Date.now(),
      menuList: sideMenuList,
      defaultSelectedKeys: defaultSelected.sideMenuSelectedKeys,
      defaultOpenKeys: defaultSelected.defaultOpenKeys,
      onSelect(item: any) {
        navigate(item.key);
      },
    };
    setMenuConfig({
      sideMenu: collapsedNow ? { menuList: [] } : sideMenuConfig,
      headerMenu: {
        key: Date.now(),
        menuList: headerMenuList,
        defaultSelectedKeys: defaultSelected.headerMenuSelectedKeys,
      },
    });
  }, [headerMenuList, sideMenuList, defaultSelected, location]);
  const logo = <div>中康全病程管理服务平台</div>;
  const toolbar = <div>用户信息</div>;
  const loading = <div style={{ position: 'absolute' }}>Loading ...</div>;
  return (
    <div>
      <LayoutPage menuConfig={menuConfig} collapsed={collapsed} logo={logo} toolbar={toolbar}>
        <Suspense fallback={loading}>
          <PageHeader />
          <Outlet />
        </Suspense>
      </LayoutPage>
    </div>
  );
}

export default Home;
