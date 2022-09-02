import React, { useEffect, useState } from 'react';
import {
  Form,
  Row,
  Col,
  Button,
  Input,
  Select,
  Checkbox,
  Slider,
} from '@sinohealth/butterfly-ui-components/lib';
import { DownSquareOutlined, UpSquareOutlined } from '@ant-design/icons';
import style from '../../index.less';

const { Option } = Select;
const weappOptions = [
  { label: '已绑定', value: '1' },
  { label: '未绑定', value: '0' },
];

const SearchForm = (props: any = {}) => {
  const [form] = Form.useForm();
  useEffect(() => {
    if (props.organizedid) form?.resetFields();
  }, [props.organizedid]);
  return (
    <Form
      labelCol={{ xl: 6, xxl: 4 }}
      wrapperCol={{ xl: 18, xxl: 20 }}
      labelAlign="left"
      colon={false}
      form={form}
      {...props}
    >
      <Row gutter={16}>
        <Col span={8}>
          <Form.Item name="name" label="角色名称">
            <Input placeholder="请输入角色名称" />
          </Form.Item>
        </Col>
        <Col span={16} style={{ textAlign: 'right' }}>
          <Button
            onClick={() => {
              form.resetFields();
              form.submit();
            }}
          >
            重置
          </Button>
          &nbsp; &nbsp;
          <Button type="primary" htmlType="submit">
            查询
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default SearchForm;