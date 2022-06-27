import React, { useState, useEffect } from 'react';
import { Form, Input, Checkbox, Button, Select } from '@sinohealth/butterfly-ui-components/lib';
import {
  UserOutlined,
  LockOutlined,
  KeyOutlined,
  CloseCircleOutlined,
  ExclamationCircleOutlined,
  ApartmentOutlined,
} from '@ant-design/icons';
import qs from 'qs';
import { useNavigate, Link } from 'react-router-dom';
import { randomLenNum } from '@/utils';
import { baseURL, loginRememberKey, scope } from '@/config/base';
import { doLogin, getListOrganize, getToken, getUserLinkChain, switchChain } from '@/services/user';
import style from './index.less';
import { getLocalStorage, removeLocalStorage, setLocalStorage, setToken } from '@/utils/cookies';

const { Item, useForm } = Form;
function AccountLogin(props: { onSelectChain: () => void }) {
  const { onSelectChain } = props;
  const [form] = useForm();
  const navigate = useNavigate();
  const [organOptions, setOrganOptions] = useState([]);
  const [rememberUser, setRememberUser] = useState(false);
  const [randomNum, setRandomNum] = useState(randomLenNum(4, true));
  const [errMessage, setErrMessage] = useState('');
  const [warMessage, setWarMessage] = useState('');

  useEffect(() => {
    const defaultFormValue = { agreement: true };
    form.setFieldsValue(defaultFormValue);
    const userData = getLocalStorage(loginRememberKey);
    console.log(userData);
    if (userData) {
      setRememberUser(true);
      form.setFieldsValue(userData);
      getOrganizeLit();
    }
  }, []);
  const onCheck = (key: string, e: any) => {
    const val = e.target.checked;
    if (key === 'rememberUser') setRememberUser(val);
  };
  const rememberUserFn = (isRemember: boolean, formData: any) => {
    if (isRemember) {
      const { account, pwd } = formData;
      setLocalStorage(loginRememberKey, { account, pwd });
    } else {
      removeLocalStorage(loginRememberKey);
    }
  };
  const handleLogin = async (formVal: { username: string; password: string; code: string }) => {
    const formData = {
      channel: 'account',
      captchaType: 'image',
      ...formVal,
      seq: randomNum,
      // organizeId: '1',
      scope,
    };
    try {
      const token: any = await doLogin(formData);
      setToken(token);
      rememberUserFn(rememberUser, formData);
      navigate('/');
      // TODO 是否需要请求机构
      // const chain: any = await getUserLinkChain();
      // if (Array.isArray(chain) && chain.length === 1) {
      //   const newToken: any = await switchChain(chain[0]);
      //   setToken(newToken?.access_token);
      //   navigate('/');
      // }
      // if (chain.length > 1) {
      //   onSelectChain();
      // }
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
      src={`${baseURL}uaa/captcha?seq=${randomNum}`}
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

  const getOrganizeLit = (e?: any) => {
    const phone = e?.target.value || form.getFieldValue('account');
    if (phone && phone.length === 11) {
      getListOrganize({ loginChannel: 'account', credentials: phone })
        .then((res: any) => {
          if (res.length === 1) {
            form.setFieldsValue({ organizeId: res[0].id });
          } else {
            form.setFieldsValue({ organizeId: '' });
          }
          if (res.length > 0) {
            setOrganOptions(
              res.map((item: any) => {
                return { label: item.name, value: item.id };
              }),
            );
          }
        })
        .catch(() => {
          setOrganOptions([]);
          setErrMessage('当前账号不可用');
          setWarMessage('');
          form.setFieldsValue({ organizeId: '' });
        });
    }
  };
  return (
    <div className={style.accountLogin}>
      <Form form={form} onFinish={onFinish} onFinishFailed={getErrorMessage}>
        <div>
          <Item noStyle name="account" rules={[{ required: true, message: '请填写用户账号' }]}>
            <Input
              size="large"
              placeholder="输入登录账号"
              maxLength={11}
              prefix={<UserOutlined />}
              onBlur={getErrorMessage}
              onChange={getOrganizeLit}
            />
          </Item>
          <div className={style.organizeSelectBox}>
            <ApartmentOutlined />
            <Item noStyle name="organizeId" rules={[{ required: true, message: '请选择机构' }]}>
              <Select
                className={style.organizeSelect}
                options={organOptions}
                size="large"
                placeholder="选择机构"
              />
            </Item>
          </div>
          <Item noStyle name="pwd" rules={[{ required: true, message: '请填写登录密码' }]}>
            <Input.Password
              size="large"
              placeholder="输入登录密码"
              prefix={<LockOutlined />}
              onBlur={getErrorMessage}
            />
          </Item>
          <Item noStyle name="captcha" rules={[{ required: true, message: '请填写验证码' }]}>
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
              同意《中康全病程管理服务平台》
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
