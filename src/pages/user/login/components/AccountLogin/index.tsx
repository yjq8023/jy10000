import React, { useState, useEffect } from 'react';
import { Form, Input, Checkbox, Button } from '@sinohealth/butterfly-ui-components/lib';
import {
  UserOutlined,
  LockOutlined,
  KeyOutlined,
  CloseCircleOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import { useNavigate, Link } from 'react-router-dom';
import { randomLenNum } from '@/utils';
import { baseURL, loginRememberKey } from '@/config/base';
import { getToken, getUserLinkChain, switchChain } from '@/services/user';
import style from './index.less';
import { getLocalStorage, removeLocalStorage, setLocalStorage, setToken } from '@/utils/cookies';

const { Item, useForm } = Form;
function AccountLogin(props: { onSelectChain: () => void }) {
  const { onSelectChain } = props;
  const [form] = useForm();
  const navigate = useNavigate();
  const [rememberUser, setRememberUser] = useState(false);
  const [randomNum, setRandomNum] = useState(randomLenNum(4, true));
  const [errMessage, setErrMessage] = useState('');
  const [warMessage, setWarMessage] = useState('');

  useEffect(() => {
    const defaultFormValue = { agreement: true };
    form.setFieldsValue(defaultFormValue);
    const userData = getLocalStorage(loginRememberKey);
    if (userData) {
      setRememberUser(true);
      form.setFieldsValue(userData);
    }
  }, []);
  const onCheck = (key: string, e: any) => {
    const val = e.target.checked;
    if (key === 'rememberUser') setRememberUser(val);
  };
  const rememberUserFn = (isRemember: boolean, formData: any) => {
    if (isRemember) {
      const { username, password } = formData;
      setLocalStorage(loginRememberKey, { username, password });
    } else {
      removeLocalStorage(loginRememberKey);
    }
  };
  const handleLogin = async (formVal: { username: string; password: string; code: string }) => {
    const formData = {
      grantType: 'password',
      codeType: 'KAPTCHA',
      ...formVal,
      randomNum,
    };
    try {
      const token: any = await getToken(formData);
      setToken(token?.access_token);
      rememberUserFn(rememberUser, formData);
      const chain: any = await getUserLinkChain();
      if (Array.isArray(chain) && chain.length === 1) {
        const newToken: any = await switchChain(chain[0]);
        setToken(newToken?.access_token);
        navigate('/');
      }
      if (chain.length > 1) {
        onSelectChain();
      }
    } catch (error: any) {
      const message = error?.response?.data?.message;
      setErrMessage(message || '登录失败');
      resetRandom();
    }
  };
  const resetRandom = () => {
    setRandomNum(randomLenNum(4, true));
  };
  const codeImg = (
    <img
      className={style.codeImg}
      onClick={resetRandom}
      src={`${baseURL}api/kaptcha?randomNum=${randomNum}`}
      alt="验证码"
    />
  );
  const onFinish = (val: any) => {
    setErrMessage('');
    setWarMessage('');
    handleLogin(val);
  };
  const agreementValid = (rule: any, val: any) => {
    return val ? Promise.resolve() : Promise.reject();
  };
  const getErrorMessage = () => {
    const errors = form.getFieldsError();
    let errorMessage: string[] = [];
    errors.forEach((item) => {
      errorMessage = errorMessage.concat(item.errors);
    });
    setWarMessage(errorMessage.reverse().pop() || '');
    setErrMessage('');
  };
  return (
    <div className={style.accountLogin}>
      <Form form={form} onFinish={onFinish} onFinishFailed={getErrorMessage}>
        <div>
          <Item noStyle name="username" rules={[{ required: true, message: '请填写用户账号' }]}>
            <Input
              size="large"
              placeholder="输入登录账号"
              prefix={<UserOutlined />}
              onBlur={getErrorMessage}
            />
          </Item>
          <Item noStyle name="password" rules={[{ required: true, message: '请填写登录密码' }]}>
            <Input.Password
              size="large"
              placeholder="输入登录密码"
              prefix={<LockOutlined />}
              onBlur={getErrorMessage}
            />
          </Item>
          <Item noStyle name="code" rules={[{ required: true, message: '请填写验证码' }]}>
            <Input
              size="large"
              placeholder="输入验证码"
              prefix={<KeyOutlined />}
              suffix={codeImg}
              onBlur={getErrorMessage}
            />
          </Item>
        </div>
        <div className={style.errMessageBox}>
          {warMessage && (
            <div className={[style.message, style.warMessage].join(' ')}>
              <ExclamationCircleOutlined />
              {warMessage}
            </div>
          )}
          {errMessage && (
            <div className={[style.message, style.errMessage].join(' ')}>
              <CloseCircleOutlined />
              {errMessage}
            </div>
          )}
        </div>
        <div className={style.formItem}>
          <Checkbox checked={rememberUser} onChange={(e) => onCheck('rememberUser', e)}>
            记住账号密码
          </Checkbox>
          <Link className={style.passwordBtn} to="/password">
            忘记密码?
          </Link>
        </div>
        <div className={style.docItem}>
          <Item
            name="agreement"
            valuePropName="checked"
            rules={[{ validator: agreementValid, message: '请先阅读勾选服务条款与隐私协议' }]}
          >
            <Checkbox>
              登录即同意《中康处方流转平台》
              <a href="/user-agreement.html" target="_blank">
                服务条款
              </a>
              和
              <a href="/privact-agreement.html" target="_blank">
                隐私协议
              </a>
            </Checkbox>
          </Item>
        </div>
        <Button htmlType="submit" type="primary" block size="large">
          登录
        </Button>
      </Form>
    </div>
  );
}

export default AccountLogin;
