import React from 'react';
import style from './index.less';

type LoginTypeTabsProps = {
  active: string;
  onChange: (active: string) => void;
};

function LoginTypeTabs(props: LoginTypeTabsProps) {
  const { active, onChange } = props;
  return (
    <div className={style.loginTypeTabs}>
      <span
        className={[style.tabItem, active === 'account' ? style.active : ''].join(' ')}
        onClick={() => onChange('account')}
      >
        账号密码登录
      </span>
      <span
        className={[style.tabItem, active === 'phoneNo' ? style.active : ''].join(' ')}
        onClick={() => onChange('phoneNo')}
      >
        手机短信登录
      </span>
    </div>
  );
}

export default LoginTypeTabs;
