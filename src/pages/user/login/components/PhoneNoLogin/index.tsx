import React, { useState, useEffect } from 'react';
import { Form, Input, Checkbox, Button } from '@sinohealth/butterfly-ui-components/lib';
import { useNavigate } from 'react-router-dom';
import { UserOutlined, CloseCircleOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import PhoneCodeInput from '@/components/PhoneCodeInput';
import { setToken } from '@/utils/cookies';
import { getToken, getUserLinkChain, switchChain } from '@/services/user';
import { validIsMobile } from '@/utils/validate';

import style from '../AccountLogin/index.less';
import indexStyle from './index.less';

const { Item, useForm } = Form;
const sendCodeTimeKey = 'zk-c-s-c';
const sendCodeTimeOut = 60;
function PhoneNoLogin(props: { onSelectChain: () => void }) {
  const { onSelectChain } = props;
  const navigate = useNavigate();
  const [form] = useForm();
  const [phoneNo, setPhoneNo] = useState('');
  const [errMessage, setErrMessage] = useState('');
  const [warMessage, setWarMessage] = useState('');
  useEffect(() => {
    form.setFieldsValue({
      agreement: true,
    });
  }, []);
  const handleLogin = async (formVal: any) => {
    const formData = {
      grantType: 'phone',
      phoneNumber: formVal.phoneNumber,
      code: formVal.code,
    };
    try {
      const token: any = await getToken(formData);
      setToken(token?.access_token);
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
    }
  };
  const validPhoneNo = (rule: any, value: any) => {
    return validIsMobile(value) ? Promise.resolve() : Promise.reject();
  };
  const onFinish = (val: any) => {
    setErrMessage('');
    setWarMessage('');
    getErrorMessage();
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
  const onFieldsChange = (e: any) => {
    if (e[0]?.name[0] === 'phoneNumber') {
      setPhoneNo(e[0].value);
    }
  };
  return (
    <div className={style.accountLogin}>
      <Form
        form={form}
        onFinish={onFinish}
        onFinishFailed={getErrorMessage}
        onFieldsChange={onFieldsChange}
      >
        <div>
          <Item
            noStyle
            name="phoneNumber"
            rules={[
              { required: true, message: '请填写登录手机号码' },
              { validator: validPhoneNo, message: '请输入正确的手机号码' },
            ]}
          >
            <Input
              size="large"
              placeholder="输入登录手机号码"
              prefix={<UserOutlined />}
              onBlur={getErrorMessage}
            />
          </Item>
          <Item noStyle name="code" rules={[{ required: true, message: '请填写短信验证码' }]}>
            <PhoneCodeInput
              stateKey={sendCodeTimeKey}
              intervals={sendCodeTimeOut}
              phoneNumber={phoneNo}
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
        <div className={indexStyle.formItem}>
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

export default PhoneNoLogin;