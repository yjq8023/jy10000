import React, { useState } from 'react';
import { Form, Button } from '@sinohealth/butterfly-ui-components/lib';
import { ExclamationCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import style from '@/pages/user/login/components/AccountLogin/index.less';
import { getToken } from '@/services/user';
import { setToken } from '@/utils/cookies';
import PhoneNoLoginForm from '@/pages/user/components/PhoneNoLoginForm';

const stateKey = 'password-code-key';
function Step1(props: { onNext: () => void }) {
  const [form] = Form.useForm();
  const [warMessage, setWarMessage] = useState('');
  const [errMessage, setErrMessage] = useState('');

  const handleNext = () => {
    setErrMessage('');
    setWarMessage('');
    form.submit();
  };
  const onSubmit = async (val: any) => {
    const { phoneNumber, code } = val;
    const formData = {
      grantType: 'phone',
      phoneNumber,
      code,
    };
    try {
      const token: any = await getToken(formData);
      setToken(token?.access_token);
      props.onNext && props.onNext();
    } catch (error: any) {
      const message = error?.response?.data?.message;
      setErrMessage(message || '登录失败');
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
