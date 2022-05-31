import React from 'react';
import { ModalProps, Modal, Input, Form, message } from '@sinohealth/butterfly-ui-components/lib';
import { Link } from 'react-router-dom';
import style from './index.less';
import { validIsPasswordReg } from '@/utils/validate';
import { updateUserPassword } from '@/services/user';

const { Item } = Form;
interface PasswordModalProps extends ModalProps {}
function PasswordModal(props: PasswordModalProps) {
  const { visible, onOk, ...other } = props;
  const [form] = Form.useForm();
  const handleOk = async (e: any) => {
    form.submit();
  };
  const onFinish = (values: any) => {
    updateUserPassword({
      originPassword: values.password,
      newPassword: values.newPassword,
    }).then(() => {
      message.success('修改密码成功！');
      onOk && onOk(values);
    });
  };
  const extra = (
    <span>
      忘记旧密码？<Link to="./password">退出登录，短信验证</Link>
    </span>
  );
  return (
    <Modal
      className={style.passwordModal}
      title="修改密码"
      width={560}
      visible={visible}
      {...other}
      onOk={handleOk}
    >
      <Form form={form} onFinish={onFinish} labelCol={{ span: 5 }} wrapperCol={{ span: 16 }}>
        <Item
          label="旧密码"
          name="password"
          extra={extra}
          rules={[{ required: true, message: '请输入旧密码' }]}
        >
          <Input.Password placeholder="输入旧密码" />
        </Item>
        <Item
          label="新密码"
          name="newPassword"
          rules={[
            { required: true, message: '请输入密码' },
            {
              pattern: validIsPasswordReg,
              message: '密码最少包含字母，数字，符号的两种，长度6-20位',
            },
          ]}
        >
          <Input.Password placeholder="6-20位，含数字/字母/符号任意两种" />
        </Item>
        <Item
          label="确认密码"
          name="confirmPassword"
          dependencies={['newPassword']}
          rules={[
            { required: true, message: '请确认新密码' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('newPassword') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('两次密码不一致'));
              },
            }),
          ]}
        >
          <Input.Password placeholder="确认新密码" />
        </Item>
      </Form>
    </Modal>
  );
}

export default PasswordModal;
