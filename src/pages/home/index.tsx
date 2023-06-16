import React, { useEffect, useState, Suspense } from 'react';
import { Outlet, useNavigate, useLocation, Link } from 'react-router-dom';
import { Avatar, Dropdown, Modal, Spin, Layout, Menu } from 'antd';
import { useMenuConfig } from '@/common/hooks';
import PageHeader from '@/components/PageHeader';

import style from './index.less';

const { Header, Content, Footer, Sider } = Layout;
function Home() {
  const [menuItems] = useMenuConfig();
  const loading = (
    <div style={{ display: 'flex', height: 'calc(100vh - 360px)' }}>
      <Spin size="large" style={{ margin: 'auto' }} />
    </div>
  );
  return (
    <div>
      <Layout className={style.layout}>
        <Sider>
          <div className={style.logo}>教育平台</div>
          <Menu theme="light" items={menuItems} />
        </Sider>
        <Content>
          <Suspense fallback={loading}>
            <div className={`${style.homeBody}`}>
              <PageHeader />
              <div className={style.homeBodyContent}>
                <Outlet />
              </div>
            </div>
          </Suspense>
        </Content>
      </Layout>
    </div>
  );
}

export default Home;
