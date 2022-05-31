import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import LoginTypeTabs from './components/LoginTypeTabs';
import AccountLogin from './components/AccountLogin';
import style from './index.less';
import PhoneNoLogin from './components/PhoneNoLogin';
import { removeToken } from '@/utils/cookies';

function Login() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const [loginType, setLoginType] = useState(params.get('type') || 'account');
  const [chainModalVisible, setChainModalVisible] = useState(false);

  useEffect(() => {
    removeToken();
  }, []);
  const onSelectLoginType = (type: string) => {
    setLoginType(type);
  };
  const onSelectChain = () => {
    setChainModalVisible(true);
  };
  const onSelectedChain = () => {
    navigate('/');
  };
  return (
    <section className={style.loginPage}>
      <div className={style.loginBody}>
        <div className={style.left}>
          <div className={style.logo} />
          <div className={style.bb}>
            粤公网安备 44010602001253号 Copyright 2008 - 2022 Sinohealth, All Rights Reserved
            {' '}
            <br />
            粤ICP备 17031174
          </div>
        </div>
        <div className={style.right}>
          <LoginTypeTabs active={loginType} onChange={onSelectLoginType} />
          {loginType === 'account' ? (
            <AccountLogin onSelectChain={onSelectChain} />
          ) : (
            <PhoneNoLogin onSelectChain={onSelectChain} />
          )}
        </div>
      </div>
    </section>
  );
}

export default Login;
