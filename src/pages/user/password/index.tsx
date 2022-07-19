import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Steps } from '@sinohealth/butterfly-ui-components/lib';
import Step1 from './components/step1';
import Step2 from './components/step2';
import Step3 from './components/step3';
import style from '@/pages/user/login/index.less';
import indexStyle from './index.less';
import { removeToken } from '@/utils/cookies';

const { Step } = Steps;
function Password() {
  const navigate = useNavigate();
  useEffect(() => {
    removeToken();
  }, []);
  const [step, setStep] = useState(0);
  const onNext = () => {
    setStep(step + 1);
  };
  return (
    <section className={[style.loginPage, indexStyle.password].join(' ')}>
      <div className={style.loginBody}>
        <div className={[indexStyle.left, style.left].join(' ')}>
          <div className={[style.logo, indexStyle.logo].join(' ')} />
          <div className={style.bb}>
            <a style={{ color: '#87ddce' }} href="https://beian.miit.gov.cn/">
              粤ICP备2022073478号-1
            </a>{' '}
            Copyright 2008 - 2022 Sinohealth, All Rights Reserved <br />
          </div>
        </div>
        <div className={style.right}>
          <div className={indexStyle.title}>重置密码</div>
          <Steps progressDot current={step} size="small">
            <Step title="验证手机号" />
            <Step title="设置新密码" />
            <Step title="重置密码成功" />
          </Steps>
          <div>
            {step === 0 && <Step1 onNext={onNext} />}
            {step === 1 && <Step2 onNext={onNext} />}
            {step === 2 && <Step3 />}
            <div className={indexStyle.footer}>
              <a onClick={() => navigate('/login')}>账号密码登录</a>|
              <a onClick={() => navigate('/login?type=phoneNo')}>手机短信登录</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Password;
