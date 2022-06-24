import React, { useEffect, useState, Suspense } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { Avatar, Dropdown, LayoutPage, Modal, Spin } from '@sinohealth/butterfly-ui-components/lib';
import {
  UserOutlined,
  LogoutOutlined,
  LockOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import { useRecoilState } from 'recoil';
import { useMenuConfig } from '@/hooks';
import { hideInMenuPages } from '@/config/router';
import PageHeader from '@/components/PageHeader';

import style from './index.less';
import MessagePage from '@/components/messagePage';
import { userInfoAtom } from '@/store/atom';
import PasswordModal from '../user/password-modal';
import UserInfoModal from '../user/userinfo-modal';
import SwitchChainModal from '@/components/SwitchChainModal';
import { getUserInfo } from '@/services/user';

function Home(props: any) {
  const [collapsed, setCollapsed] = useState(true);
  const [menuConfig, setMenuConfig] = useState<any>({});
  const navigate = useNavigate();
  const location = useLocation();
  const [headerMenuList, sideMenuList, defaultSelected] = useMenuConfig();
  const [userInfo, setUserInfo] = useRecoilState(userInfoAtom);

  const [passwordModalVisible, setPasswordModalVisible] = useState<any>(false);
  const [userInfoModalVisible, setUserInfoModalVisible] = useState<any>(false);
  const [switchChainModalVisible, setSwitchChainModalVisible] = useState<any>(false);

  useEffect(() => {
    getUserInfo({}).then((data) => {
      console.log(data);
      if (data) {
        setUserInfo(data);
      }
    });
  }, []);

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
  const onLogout = () => {
    Modal.confirm({
      title: '确认退出当前账号？',
      icon: <ExclamationCircleOutlined />,
      content: '退出将跳转到登录页，需重新登录才可访问系统',
      okText: '确认',
      cancelText: '取消',
      onOk() {
        navigate('/login');
      },
    });
  };
  const onClosePasswordModal = () => {
    setPasswordModalVisible(false);
  };
  const onCloseUserInfoModal = () => {
    setUserInfoModalVisible(false);
  };
  const onSelectedChain = () => {
    navigate('/');
    setSwitchChainModalVisible(false);
  };
  const logo = <div>中康全病程管理服务平台</div>;
  const menu = (
    <ul className={style.menu}>
      <li onClick={() => setUserInfoModalVisible(true)}>
        <span className="iconfont icon-user" /> 修改资料
      </li>
      <li onClick={() => setPasswordModalVisible(true)}>
        <LockOutlined /> 修改密码
      </li>
      {/* <li onClick={() => setSwitchChainModalVisible(true)}>
        <span className="iconfont icon-change-chain" /> 切换机构
      </li> */}
      <li onClick={onLogout}>
        <span className="iconfont icon-out" /> 退出登录
      </li>
    </ul>
  );
  const toolbar = (
    <div className={style.headerToolbar}>
      <MessagePage
        unreas={0}
        // unreas={unrea}
        ifOpMsgCount={() => {
          // setUnrea(Math.random()); // 刷新红点数
          // setVisible(!visible);
        }}
      />
      <Dropdown overlay={menu} placement="bottomRight">
        <div className={style.userInfo}>
          <Avatar src={userInfo?.avatar} />
          {userInfo && userInfo?.name}
        </div>
      </Dropdown>
    </div>
  );
  const loading = (
    <div style={{ display: 'flex', height: 'calc(100vh - 360px)' }}>
      <Spin size="large" style={{ margin: 'auto' }} />
    </div>
  );
  return (
    <div>
      <LayoutPage menuConfig={menuConfig} collapsed={collapsed} logo={logo} toolbar={toolbar}>
        <Suspense fallback={loading}>
          <div className={style.homeBody} style={{ padding: collapsed ? '0' : '8px' }}>
            <PageHeader />
            <div className={style.homeBodyContent}>
              <Outlet />
            </div>
          </div>
        </Suspense>
      </LayoutPage>
      {passwordModalVisible && (
        <PasswordModal visible={true} onCancel={onClosePasswordModal} onOk={onClosePasswordModal} />
      )}
      {userInfoModalVisible && (
        <UserInfoModal visible={true} onCancel={onCloseUserInfoModal} onOk={onCloseUserInfoModal} />
      )}
      {switchChainModalVisible && (
        <SwitchChainModal
          visible={true}
          // chainId={data?.chainId || '1'}
          chainId="1"
          onOk={onSelectedChain}
          onCancel={() => setSwitchChainModalVisible(false)}
          cancelBtnText="返回"
        />
      )}
      {/* 消息抽屉 */}
      {/* <MsgDrawer
        visible={visible}
        refreshUnrea={() => {
          setUnrea(Math.random()); // 刷新红点数
        }}
        ifOpMsgCount={() => {
          setVisible(!visible);
        }}
      /> */}
    </div>
  );
}

export default Home;
