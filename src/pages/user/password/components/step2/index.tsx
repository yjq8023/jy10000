import React, { useState } from 'react';
import { Form, Input, Button } from '@sinohealth/butterfly-ui-components/lib';
import { LockOutlined, CloseCircleOutlined } from '@ant-design/icons';

import style from '@/pages/user/login/components/AccountLogin/index.less';
import { isNull, validIsPasswordReg } from '@/utils/validate';
import { resetPassword } from '@/services/user';
import { userResetPassword } from '@/services/setting';

const { Item, useForm } = Form;
function Step2(props: { onNext: () => void }) {
  const [form] = useForm();
  const [errMessage, setErrMessage] = useState('');

  const handleNext = async (val: any) => {
    const { password } = val;
    setErrMessage('');
    userResetPassword({
      password,
    }).then(() => {
      props.onNext && props.onNext();
    });
  };
  const getErrorMessage = () => {
    const errors = form.getFieldsError();
    let errorMessage: string[] = [];
    errors.forEach((item) => {
      errorMessage = errorMessage.concat(item.errors);
    });
    console.log(errors);
    setErrMessage(errorMessage.reverse().pop() || '');
  };
  return (
    <div className={style.accountLogin}>
      <Form form={form} onFinish={handleNext} onFinishFailed={getErrorMessage}>
        <Item
          noStyle
          name="password"
          rules={[
            { required: true, message: '请输入新密码' },
            {
              pattern: validIsPasswordReg,
              message: '密码最少包含字母，数字，符号的两种，长度6-20位',
            },
          ]}
        >
          <Input.Password
            size="large"
            placeholder="6-20位，含数字/字母/符号任意两种"
            prefix={<LockOutlined />}
            onBlur={getErrorMessage}
          />
        </Item>
        <Item
          noStyle
          name="password2"
          dependencies={['password']}
          rules={[
            { required: true, message: '请确认新密码' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('两次密码不一致'));
              },
            }),
          ]}
        >
          <Input.Password
            size="large"
            placeholder="再次确认新密码"
            prefix={<LockOutlined />}
            onBlur={getErrorMessage}
          />
        </Item>
        <div className={style.errMessageBox} style={{ marginBottom: '32px' }}>
          {errMessage && (
            <div className={[style.message, style.warMessage].join(' ')}>
              <CloseCircleOutlined />
              {errMessage}
            </div>
          )}
        </div>
        <Button type="primary" htmlType="submit" block size="large">
          确定
        </Button>
      </Form>
    </div>
  );
}

export default Step2;
