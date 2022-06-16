import React from 'react';
import { Cascader, Form, Input, Select } from '@sinohealth/butterfly-ui-components/lib';
// import { Select } from '@sinohealth/butterfly-formily-components';
import SimpleModal from '@/components/SimpleModal';
import location from '@/assets/public/location.json';

type OrganFormType = {
  visible: boolean;
  onCancel: () => {};
};
const UserForm = (props: any) => {
  const [form] = Form.useForm();
  return (
    <SimpleModal
      visible={props.visible}
      //   closable={false}
      h2="增加用户"
      cancelButtonProps={{ type: 'info' }}
      onOk={() => {
        // form.submit();
      }}
      width={560}
      onCancel={() => {
        props.onCancel();
      }}
    >
      <div>
        <Form labelAlign="right" labelCol={{ span: 4 }} colon={false}>
          <Form.Item
            label="用户姓名"
            name="username"
            rules={[{ required: true, message: '请填写用户姓名' }]}
          >
            <Input placeholder="请输入用户名称（必填）" />
          </Form.Item>
          <Form.Item
            label="登录手机号"
            name="phone"
            rules={[{ required: true, message: '请输入手机号码（必填）' }]}
          >
            <Input placeholder="请输入手机号码（必填）" />
          </Form.Item>
          <Form.Item
            label="登录密码"
            name="username"
            rules={[{ required: true, message: '请输入详细地址' }]}
          >
            <Input disabled placeholder="初始密码为 Abc123456，新建用户后通过短信下发" />
          </Form.Item>
          <Form.Item
            label="所属机构"
            name="username"
            rules={[{ required: true, message: '请选择所属机构（必选）' }]}
          >
            <Select placeholder="请选择所属机构（必选）" />
          </Form.Item>
          <Form.Item
            label="用户角色"
            name="username"
            rules={[{ required: true, message: '请选择角色（必选）' }]}
          >
            <Select placeholder="请选择角色（必选）" />
          </Form.Item>
          <Form.Item
            label="用户职称"
            name="username"
            rules={[{ required: true, message: '请选择用户职称（必选）' }]}
          >
            <Select placeholder="请选择用户职称（必选）" />
          </Form.Item>
          <Form.Item
            label="职称级别"
            name="username"
            rules={[{ required: true, message: '请选择职称级别（必选）' }]}
          >
            <Select placeholder="请选择职称级别（必选）" />
          </Form.Item>
          <Form.Item
            label="所在科室"
            name="username"
            rules={[{ required: true, message: '请输入所在科室（必填）' }]}
          >
            <Input placeholder="请输入所在科室（必填）" />
          </Form.Item>
          <Form.Item label="执业医院" name="username">
            <Input placeholder="请输入执业医院" />
          </Form.Item>
          <Form.Item label="机构描述" name="username">
            <Input.TextArea placeholder="请输入内容" />
          </Form.Item>
        </Form>
      </div>
    </SimpleModal>
  );
};

export default UserForm;
