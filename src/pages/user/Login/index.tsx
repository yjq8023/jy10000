import React from 'react';
import { Form, Input, Button } from 'antd';
import Services from './services';
import styles from './index.less';

const FormItem = Form.Item;
const Login = () => {
  const handleLogin = (formData: any) => {
    Services.login(formData)
      .then((res) => {
        console.log(res);
      });
  };
  const defaultValue = {
    user_name: 'admin',
    password: '123456',
  };
  return (
    <div className={styles.login}>
      <div className={styles.content}>
        <Form onFinish={handleLogin} initialValues={defaultValue} labelCol={{ flex: '60px' }}>
          <FormItem label="用户名" name="user_name">
            <Input />
          </FormItem>
          <FormItem label="密码" name="password">
            <Input />
          </FormItem>
          <Button htmlType="submit" type="primary">登录</Button>
        </Form>
      </div>
    </div>
  );
};

export default Login;
