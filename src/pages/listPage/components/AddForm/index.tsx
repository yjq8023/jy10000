import React from 'react';
import {
  Form,
  Input,
} from '@sinohealth/butterfly-ui-components/lib';

const FormModalContent = (props: any) => {
  return (
    <Form {...props}>
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
          disabled={!props.formData?.id && props.formData?.parentId}
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
  );
};

export default FormModalContent;
