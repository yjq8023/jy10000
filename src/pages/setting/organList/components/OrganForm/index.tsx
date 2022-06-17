import React, { FC, useEffect, useState } from 'react';
import { Cascader, Form, Input, Spin } from '@sinohealth/butterfly-ui-components/lib';
import SimpleModal from '@/components/SimpleModal';
import location from '@/assets/public/location.json';
import { chainDetail, chainEdit, chainSave } from '@/services/setting';

type OrganFormType = {
  organId?: string | number;
  visible: boolean;
  onCancel?: (success?: boolean) => void;
};
const OrganForm: FC<OrganFormType> = (props) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [disableSubmit, setDisableSubmit] = useState(false);
  useEffect(() => {
    console.log(props.organId);
    if (props.organId) {
      setLoading(true);
      chainDetail(props.organId)
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
  }, [props.organId]);
  const onCancel = (success?: boolean) => {
    form.resetFields();
    if (props.onCancel) props.onCancel(success);
  };

  const finish = (values: any) => {
    const params = {
      ...values,
      province: values.location[0],
      city: values.location[1],
      area: values.location[2],
    };
    console.log(params);
    setLoading(true);
    if (props.organId) {
      params.id = props.organId;
      chainEdit(params)
        .then((res) => {
          console.log(res);
          onCancel(true);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      chainSave(params)
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
      h2="增加机构"
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
            label="机构名称"
            name="name"
            rules={[{ required: true, message: '请填写机构名称' }]}
          >
            <Input placeholder="请输入机构名称（必填）" />
          </Form.Item>
          <Form.Item
            label="所属地区"
            name="location"
            rules={[{ required: true, message: '所属地区' }]}
          >
            <Cascader
              fieldNames={{ label: 'name', value: 'code' }}
              options={location}
              placeholder="请选择所属地区（必填）"
            />
          </Form.Item>
          <Form.Item
            label=" "
            name="address"
            rules={[{ required: true, message: '请输入详细地址' }]}
          >
            <Input placeholder="请输入详细地址（必填）" />
          </Form.Item>
          <Form.Item label="机构描述" name="description">
            <Input.TextArea placeholder="请输入内容" />
          </Form.Item>
        </Form>
      </Spin>
    </SimpleModal>
  );
};

export default OrganForm;
