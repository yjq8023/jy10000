import React, { useEffect, useState, Suspense } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { LayoutPage } from '@sinohealth/butterfly-ui-components/lib';
import { useMenuConfig } from '@/hooks';
import { hideInMenuPages } from '@/config/router';

function Home() {
  const [key, setKey] = useState(Date.now());
  const [isLoaded, setIsLoaded] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [menuConfig, setMenuConfig] = useState<any>({});
  const navigate = useNavigate();
  const location = useLocation();
  const [headerMenuList, sideMenuList, defaultSelected] = useMenuConfig();
  // 拼装菜单数据，配置内容跟Menu组件保持一致，增加了menuList数据渲染
  useEffect(() => {
    const collapsedNow = hideInMenuPages.indexOf(location.pathname) > -1;
    setCollapsed(collapsedNow);
    setMenuConfig({
      sideMenu: collapsedNow
        ? { menuList: [] }
        : {
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
  }, [headerMenuList, sideMenuList, defaultSelected, location]);
  // 每次刷新默认选中数据，重新渲染layoutPage组件。否则默认数据不会生效
  useEffect(() => {
    setKey(Date.now());
  }, [defaultSelected]);
  const logo = <div>中康患者管理平台</div>;
  const toolbar = <div>用户信息</div>;
  const loading = <div style={{ position: 'absolute' }}>Loading ...</div>;
  // @ts-ignore
  return (
    <div>
      {isLoaded && (
        <LayoutPage
          key={key}
          menuConfig={menuConfig}
          collapsed={collapsed}
          logo={logo}
          toolbar={toolbar}
        >
          <Suspense fallback={loading}>
            <Outlet />
          </Suspense>
        </LayoutPage>
      )}
    </div>
  );
}

export default Home;
