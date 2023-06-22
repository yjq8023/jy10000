import React from 'react';
import {
  Form,
  Space,
  Button,
  Input,
} from 'antd';

const SearchForm = (props: any = {}) => {
  return (
    <Form
      colon={false}
      {...props}
    >
      <Space size="large">
        <Form.Item name="name" label="名称">
          <Input placeholder="请输入字典名称" />
        </Form.Item>
        <Form.Item name="code" label="编码">
          <Input placeholder="请输入字典编码" />
        </Form.Item>
        <Space>
          <Button
            onClick={() => {
              props.form.resetFields();
              props.form.submit();
            }}
          >
            重置
          </Button>
          <Button type="primary" htmlType="submit">
            查询
          </Button>
        </Space>
      </Space>
    </Form>
  );
};

export default SearchForm;
