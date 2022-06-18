import React, { FC, useEffect, useState } from 'react';
import { Cascader, Form, Input, Select, Spin } from '@sinohealth/butterfly-ui-components/lib';
import SimpleModal from '@/components/SimpleModal';
import { chainDetail, chainEdit, chainSave, userDetail, userEdit, userSave } from '@/services/setting';

type UserFormType = {
  userId?: string | number;
  visible: boolean;
  onCancel?: (success?: boolean) => void;
};
const UserForm: FC<UserFormType> = (props) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [disableSubmit, setDisableSubmit] = useState(false);
  useEffect(() => {}, []);
  useEffect(() => {
    console.log(props.userId);
    if (props.userId) {
      setLoading(true);
      userDetail(props.userId)
        .then((res) => {
          setDisableSubmit(false);
          form.setFieldsValue({ ...res, location: [res.province, res.city, res.area] });
        })
        .catch(() => {
          console.log('错误');
          setDisableSubmit(true);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [props.userId]);
  const onCancel = (success?: boolean) => {
    form.resetFields();
    if (props.onCancel) props.onCancel(success);
  };

  const finish = (values: any) => {
    const params = {
      ...values,
    };
    console.log(params);
    setLoading(true);
    if (props.userId) {
      params.id = props.userId;
      userEdit(params)
        .then((res) => {
          console.log(res);
          onCancel(true);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      userSave(params)
        .then((res) => {
          console.log(res);
          onCancel(true);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };
  return (
    <SimpleModal
      visible={props.visible}
      //   closable={false}
      h2="增加用户"
      cancelButtonProps={{ type: 'info' }}
      onOk={() => {
        form.submit();
      }}
      width={560}
      loading={loading}
      okButtonProps={{ disabled: disableSubmit }}
      onCancel={() => {
        onCancel();
      }}
    >
      <Spin spinning={loading}>
        <Form labelAlign="right" form={form} labelCol={{ span: 4 }} onFinish={finish} colon={false}>
          <Form.Item
            label="用户姓名"
            name="name"
            rules={[{ required: true, message: '请填写用户姓名' }]}
          >
            <Input placeholder="请输入用户名称（必填）" />
          </Form.Item>
          <Form.Item
            label="登录手机号"
            name="phoneNumber"
            rules={[{ required: true, message: '请输入手机号码（必填）' }]}
          >
            <Input placeholder="请输入手机号码（必填）" maxLength={11} />
          </Form.Item>
          <Form.Item label="登录密码" name="password" required>
            <Input disabled placeholder="初始密码为 Abc123456，新建用户后通过短信下发" />
          </Form.Item>
          <Form.Item label="所属机构" name="chainId" initialValue={1}>
            <Select
              placeholder="请选择所属机构（必选）"
              options={[{ label: '红十字会', value: 1 }]}
            />
          </Form.Item>
          <Form.Item
            label="用户角色"
            name="role"
            initialValue={1}
            rules={[{ required: true, message: '请选择角色（必选）' }]}
          >
            <Select placeholder="请选择角色（必选）" options={[{ label: '测试角色', value: 1 }]} />
          </Form.Item>
          <Form.Item
            label="用户职称"
            name="title"
            initialValue={1}
            rules={[{ required: true, message: '请选择用户职称（必选）' }]}
          >
            <Select
              placeholder="请选择用户职称（必选）"
              options={[{ label: '测试职称', value: 1 }]}
            />
          </Form.Item>
          <Form.Item
            label="职称级别"
            name="titleLevel"
            initialValue={1}
            rules={[{ required: true, message: '请选择职称级别（必选）' }]}
          >
            <Select
              placeholder="请选择职称级别（必选）"
              options={[{ label: '测试职称级别', value: 1 }]}
            />
          </Form.Item>
          <Form.Item
            label="所在科室"
            name="department"
            rules={[{ required: true, message: '请输入所在科室（必填）' }]}
          >
            <Input placeholder="请输入所在科室（必填）" />
          </Form.Item>
          <Form.Item label="执业医院" name="hospitalName">
            <Input placeholder="请输入执业医院" />
          </Form.Item>
          <Form.Item label="机构描述" name="description">
            <Input.TextArea placeholder="请输入内容" />
          </Form.Item>
        </Form>
      </Spin>
    </SimpleModal>
  );
};
export default UserForm;
