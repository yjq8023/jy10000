import React, { useState } from 'react';
import { Form, Input, FormInstance, Select } from '@sinohealth/butterfly-ui-components/lib';
import { UserOutlined, ApartmentOutlined } from '@ant-design/icons';
import PhoneCodeInput from '@/components/PhoneCodeInput';
import { validIsMobile } from '@/utils/validate';

const { Item } = Form;
function PhoneNoLoginForm(props: {
  form: FormInstance;
  stateKey: string;
  onSubmit: (val: any) => void;
  setMessage: (str: any) => void;
  onPhoneNumberChange?: (e: any) => void;
  OrganSelect?: any;
}) {
  const { form, setMessage, onSubmit, stateKey = 'zk-p-w-t' } = props;
  const [phoneNo, setPhoneNo] = useState('');
  const validPhoneNo = (rule: any, value: any) => {
    return validIsMobile(value) ? Promise.resolve() : Promise.reject();
  };
  const onFinish = (val: any) => {
    onSubmit && onSubmit(val);
  };
  const getErrorMessage = () => {
    const errors = form.getFieldsError();
    let errorMessage: string[] = [];
    errors.forEach((item) => {
      errorMessage = errorMessage.concat(item.errors);
    });
    setMessage(errorMessage.reverse().pop() || '');
  };
  const onFieldsChange = (e: any) => {
    if (e[0]?.name[0] === 'phoneNumber') {
      setPhoneNo(e[0].value);
    }
  };
  return (
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
            onChange={(e: any) => {
              if (props.onPhoneNumberChange) {
                props.onPhoneNumberChange(e);
              }
            }}
          />
        </Item>
        {props.OrganSelect}
        <Item noStyle name="code" rules={[{ required: true, message: '请填写短信验证码' }]}>
          <PhoneCodeInput
            stateKey={stateKey}
            intervals={60}
            phoneNumber={phoneNo}
            onBlur={getErrorMessage}
          />
        </Item>
      </div>
    </Form>
  );
}

export default PhoneNoLoginForm;
