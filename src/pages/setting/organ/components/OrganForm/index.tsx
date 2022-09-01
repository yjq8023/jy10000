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
import {
  listDepartment,
  userDetail,
  userEdit,
  userResetPassword,
  userSave,
} from '@/services/setting';
import { useDict } from '@/hooks/useDict';
import { handelOptions } from '@/utils';
import MechanismCascader from '@/components/MechanismCascader';
import ConfirmModel from '@/components/Confirm';
import { clientPrefix } from '@/config/base';

type OrganFormType = {
  userId?: string | number;
  visible: boolean;
  onCancel?: (success?: boolean) => void;
};
const OrganForm: FC<OrganFormType> = (props) => {
  const dict = useDict();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [departmentOptions, setDpartmentOptions] = useState<any[]>([]);
  const [isDoctor, setIsDoctor] = useState(false);
  const [userId, setUserId] = useState('');
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
          setUserId(res.userId);
          if (res.role === 'doctor') {
            setIsDoctor(true);
          }
          getListDepartment(res.chainId);
        })
        .catch(() => {
          console.log('错误');
          setDisableSubmit(true);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setDpartmentOptions([]);
    }
  }, [props.userId]);
  const onCancel = (success?: boolean) => {
    form.resetFields();
    setIsDoctor(false);
    if (props.onCancel) props.onCancel(success);
  };

  const getListDepartment = (id: string) => {
    listDepartment(id).then((res) => {
      console.log(res);
      setDpartmentOptions(res);
      const currDepartmentId = form.getFieldValue('departmentId');
      const isHave = res.some((item: any) => item.id === currDepartmentId);
      if (!isHave) {
        form.setFieldsValue({ departmentId: '' });
      }
    });
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
        userResetPassword({ id: userId }).then((res) => {
          message.success('密码重置成功');
        });
      },
    });
  };
  return (
    <SimpleModal
      visible={props.visible}
      //   closable={false}
      h2={props.userId ? '编辑部门' : '增加部门'}
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
            label="部门名称"
            name="name"
            rules={[{ required: true, message: '请填写部门名称' }]}
          >
            <Input placeholder="请输入部门名称（必填）" />
          </Form.Item>
          <Form.Item
            label="排序"
            name="phoneNumber"
            rules={[{ required: true, message: '请输入手机号码（必填）' }]}
          >
            <Input disabled={!!props.userId} placeholder="请输入手机号码（必填）" maxLength={11} />
          </Form.Item>
          <Form.Item
            label="关联科室"
            name="role"
            rules={[{ required: true, message: '请选择角色（必选）' }]}
          >
            <Select
              placeholder="请选择角色（必选）"
              onChange={(value) => {
                if (value === 'doctor') setIsDoctor(true);
                else setIsDoctor(false);
              }}
              options={handelOptions(
                clientPrefix.includes('backend') ? dict?.position : dict?.hospitalPosition,
              )}
            />
          </Form.Item>
          {isDoctor && (
            <Form.Item label="执业医院" name="hospitalName">
              <Input placeholder="请输入执业医院" />
            </Form.Item>
          )}
          <Form.Item label="部门描述" name="description">
            <Input.TextArea placeholder="请输入内容" />
          </Form.Item>
        </Form>
      </Spin>
    </SimpleModal>
  );
};
export default OrganForm;
