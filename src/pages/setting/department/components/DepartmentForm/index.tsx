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
import ConfirmModel from '@/components/Confirm';
import { clientPrefix } from '@/config/base';
import CustomUpload from '@/components/Upload';
import { departmentAdd, departmentEdit } from '@/services/customer';

type DepartmentFormType = {
  userId?: string | number;
  organizeId?: string | number;
  visible: boolean;
  onCancel?: (success?: boolean) => void;
  data?: any;
};
const DepartmentForm: FC<DepartmentFormType> = (props) => {
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
    if (props.data) {
      console.log(props.data);
      form.setFieldsValue(props.data);
    }
  }, [props.data]);
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
    if (props.data.id) {
      departmentEdit(props.data.id, params)
        .then((res) => {
          onCancel(true);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      departmentAdd(props.organizeId, params)
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
          <Form.Item hidden label="父节点id" name="parentId">
            <Input />
          </Form.Item>
          <Form.Item
            label="部门名称"
            name="name"
            rules={[{ required: true, message: '请填写部门名称' }]}
          >
            <Input placeholder="请输入部门名称（必填）" />
          </Form.Item>
          <Form.Item
            label="排序"
            name="sort"
            rules={[
              { required: true, message: '填写排序' },
              { pattern: /^[0-9]\d{0,4}$/, message: '最多输入5位数字' },
            ]}
          >
            <Input
              disabled={!!props.userId}
              placeholder="最多输入5位数字，数字越大，排序越靠前"
              maxLength={5}
              type="number"
            />
          </Form.Item>
          <Form.Item label="部门描述" name="description">
            <Input.TextArea placeholder="请输入内容" />
          </Form.Item>
        </Form>
      </Spin>
    </SimpleModal>
  );
};
export default DepartmentForm;
