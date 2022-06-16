import React from 'react';
import { Cascader, Form, Input } from '@sinohealth/butterfly-ui-components/lib';
import SimpleModal from '@/components/SimpleModal';
import location from '@/assets/public/location.json';

type OrganFormType = {
  visible: boolean;
  onCancel: () => {};
};
const OrganForm = (props: any) => {
  const [form] = Form.useForm();
  return (
    <SimpleModal
      visible={props.visible}
      //   closable={false}
      h2="增加机构"
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
            label="机构名称"
            name="username"
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
            name="username"
            rules={[{ required: true, message: '请输入详细地址' }]}
          >
            <Input placeholder="请输入详细地址（必填）" />
          </Form.Item>
          <Form.Item label="机构描述" name="username">
            <Input.TextArea placeholder="请输入内容" />
          </Form.Item>
        </Form>
      </div>
    </SimpleModal>
  );
};

export default OrganForm;
