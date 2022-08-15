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
import { clientPrefix, scope } from '@/config/base';
import { insertDict } from '@/services/system';

type DictFormType = {
  dictData?: any;
  visible: boolean;
  onCancel?: (success?: boolean, parentId?: string | number) => void;
};
const DictForm: FC<DictFormType> = (props) => {
  const dict = useDict();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [departmentOptions, setDpartmentOptions] = useState<any[]>([]);
  const [isDoctor, setIsDoctor] = useState(false);
  const [dictId, setUserId] = useState('');
  const [disableSubmit, setDisableSubmit] = useState(false);
  useEffect(() => {
    console.log(props.dictData);
    if (props.dictData) {
      form.setFieldsValue({ ...props.dictData });
    }
  }, [props.dictData]);
  const onCancel = (success?: boolean, parentId = undefined) => {
    form.resetFields();
    if (props.onCancel) props.onCancel(success, parentId);
  };

  const finish = (values: any) => {
    const params = {
      ...values,
      scopeCode: scope,
    };
    console.log(params);
    setLoading(true);
    if (props.dictData?.id) params.id = props.dictData.id;
    if (props.dictData?.parentId) params.parentId = props.dictData.parentId;
    insertDict(params)
      .then((res) => {
        console.log(res);
        if (!props.dictData?.id && props.dictData?.parentId) {
          onCancel(true, props.dictData?.parentId);
        } else onCancel(true);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <SimpleModal
      visible={props.visible}
      title={props.dictData ? '编辑/添加子字典' : '增加字典'}
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
            label="字典名称"
            name="name"
            rules={[{ required: true, message: '请填写字典名称' }]}
          >
            <Input placeholder="请输入字典名称（必填）" />
          </Form.Item>
          <Form.Item
            label="字典类型"
            name="type"
            rules={[{ required: true, message: '请输入字典类型码（必填）' }]}
          >
            <Input
              disabled={!props.dictData?.id && props.dictData?.parentId}
              placeholder="请输入字典类型码（必填）"
            />
          </Form.Item>
          <Form.Item
            label="字典编码"
            name="code"
            rules={[{ required: true, message: '请输入字典编码（必填）' }]}
          >
            <Input placeholder="字典编码" />
          </Form.Item>
          <Form.Item label="排序" name="sort" initialValue={0} required>
            <Input placeholder="排序" />
          </Form.Item>
          <Form.Item label="字典描述" name="description">
            <Input.TextArea placeholder="请输入内容" />
          </Form.Item>
        </Form>
      </Spin>
    </SimpleModal>
  );
};
export default DictForm;
