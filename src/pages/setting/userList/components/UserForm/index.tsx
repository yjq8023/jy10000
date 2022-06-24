import React, { FC, useEffect, useState } from 'react';
import {
  Button,
  Cascader,
  Form,
  Input,
  message,
  Select,
  Spin,
} from '@sinohealth/butterfly-ui-components/lib';
import SimpleModal from '@/components/SimpleModal';
import { userDetail, userEdit, userResetPassword, userSave } from '@/services/setting';
import { useDict } from '@/hooks/useDict';
import { handelOptions } from '@/utils';
import MechanismCascader from '@/components/MechanismCascader';
import ConfirmModel from '@/components/Confirm';

type UserFormType = {
  userId?: string | number;
  visible: boolean;
  onCancel?: (success?: boolean) => void;
};
const UserForm: FC<UserFormType> = (props) => {
  const dict = useDict();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [isDoctor, setIsDoctor] = useState(false);
  const [disableSubmit, setDisableSubmit] = useState(false);
  useEffect(() => {
    console.log(dict);
  }, []);
  useEffect(() => {
    console.log(props.userId);
    if (props.userId) {
      setLoading(true);
      userDetail(props.userId)
        .then((res) => {
          setDisableSubmit(false);
          form.setFieldsValue({ ...res });
          if (res.role === 'doctor') {
            setIsDoctor(true);
          }
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
    setIsDoctor(false);
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

  const resetPassword = () => {
    ConfirmModel({
      fun: 'warning',
      title: '是否将该账号现有密码清除，设置为初始密码Abc123456?',
      centered: true,
      onOk: async () => {
        userResetPassword({ id: props.userId }).then((res) => {
          message.success('密码重置成功');
        });
      },
    });
  };
  return (
    <SimpleModal
      visible={props.visible}
      //   closable={false}
      h2={props.userId ? '编辑用户' : '增加用户'}
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
            {props.userId ? (
              <div
                style={{
                  backgroundColor: '#46A0C0',
                  color: '#fff',
                  padding: '4px 11px',
                  borderRadius: 4,
                  cursor: 'pointer',
                }}
                onClick={resetPassword}
              >
                重置密码
              </div>
            ) : (
              <Input disabled placeholder="初始密码为 Abc123456，新建用户后通过短信下发" />
            )}
          </Form.Item>
          <Form.Item label="所属机构" name="chainId" initialValue="1">
            {/* <Select
              placeholder="请选择所属机构（必选）"
              options={[{ label: '红十字会', value: '1' }]}
            /> */}
            <MechanismCascader />
          </Form.Item>
          <Form.Item
            label="用户角色"
            name="role"
            rules={[{ required: true, message: '请选择角色（必选）' }]}
          >
            <Select
              placeholder="请选择角色（必选）"
              onChange={(value) => {
                if (value === 'doctor') setIsDoctor(true);
                else setIsDoctor(false);
              }}
              options={handelOptions(dict?.position)}
            />
          </Form.Item>
          {isDoctor && (
            <>
              <Form.Item
                label="用户职称"
                name="title"
                rules={[{ required: true, message: '请选择用户职称（必选）' }]}
              >
                <Select
                  placeholder="请选择用户职称（必选）"
                  options={handelOptions(dict?.doctorTitle)}
                />
              </Form.Item>
              <Form.Item
                label="职称级别"
                name="titleLevel"
                rules={[{ required: true, message: '请选择职称级别（必选）' }]}
              >
                <Select
                  placeholder="请选择职称级别（必选）"
                  options={handelOptions(dict?.technicalJobCategory)}
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
            </>
          )}
          <Form.Item label="机构描述" name="description">
            <Input.TextArea placeholder="请输入内容" />
          </Form.Item>
        </Form>
      </Spin>
    </SimpleModal>
  );
};
export default UserForm;
