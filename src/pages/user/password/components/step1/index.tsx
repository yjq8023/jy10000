import React, { useState } from 'react';
import { Form, Button, Select } from '@sinohealth/butterfly-ui-components/lib';
import {
  ExclamationCircleOutlined,
  CloseCircleOutlined,
  ApartmentOutlined,
} from '@ant-design/icons';
import style from '@/pages/user/login/components/AccountLogin/index.less';
import { doLogin, getListOrganize, getToken } from '@/services/user';
import { setToken } from '@/utils/cookies';
import PhoneNoLoginForm from '@/pages/user/components/PhoneNoLoginForm';
import { scope } from '@/config/base';

const stateKey = 'password-code-key';
function Step1(props: { onNext: () => void }) {
  const [form] = Form.useForm();
  const [warMessage, setWarMessage] = useState('');
  const [errMessage, setErrMessage] = useState('');
  const [organOptions, setOrganOptions] = useState([]);

  const handleNext = () => {
    setErrMessage('');
    setWarMessage('');
    form.submit();
  };
  const onSubmit = async (val: any) => {
    const { phoneNumber, code, organizeId } = val;
    const formData = {
      channel: 'phone',
      phone: phoneNumber,
      captcha: code,
      organizeId,
      scope,
    };
    try {
      const token: any = await doLogin(formData);
      setToken(token);
      props.onNext && props.onNext();
    } catch (error: any) {
      const message = error?.response?.data?.message;
      setErrMessage(message || '登录失败');
    }
  };

  const getOrganizeLit = (e: any) => {
    const phone = e.target.value;
    if (phone.length === 11) {
      getListOrganize({ channel: 'phone', credentials: phone })
        .then((res: any) => {
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
        })
        .finally(() => {
          form.setFieldsValue({ organizeId: '' });
        });
    }
  };
  return (
    <div className={style.accountLogin}>
      <PhoneNoLoginForm
        form={form}
        onSubmit={onSubmit}
        setMessage={setWarMessage}
        stateKey={stateKey}
      />
      <div className={style.errMessageBox} style={{ marginBottom: '32px' }}>
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
      <Button type="primary" block size="large" onClick={handleNext}>
        下一步
      </Button>
    </div>
  );
}

export default Step1;
