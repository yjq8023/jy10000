import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button } from 'antd';
import Services from './services';
import styles from './index.less';
import { setToken } from '@/utils/cookies';

const FormItem = Form.Item;
const Login = () => {
  const navigate = useNavigate();
  const handleLogin = (formData: any) => {
    Services.login(formData)
      .then((res: any) => {
        console.log(res);
        const { token } = res;
        setToken(token);
        navigate('/');
      });
  };
  const defaultValue = {
    username: 'admin',
    password: '123456',
  };
  return (
    <div className={styles.login}>
      <div className={styles.content}>
        <Form onFinish={handleLogin} initialValues={defaultValue} labelCol={{ flex: '60px' }}>
          <FormItem label="用户名" name="username">
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
