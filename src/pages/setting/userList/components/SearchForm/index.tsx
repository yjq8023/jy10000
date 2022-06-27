import React, { useState } from 'react';
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
  return (
    <Form
      labelCol={{ xl: 6, xxl: 4 }}
      wrapperCol={{ xl: 18, xxl: 20 }}
      labelAlign="left"
      colon={false}
      {...props}
    >
      <Row gutter={[120, 24]}>
        <Col span={8}>
          <Form.Item name="phoneNumber" label="用户账号">
            <Input placeholder="请输入用户账号" />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item name="name" label="用户名称">
            <Input placeholder="请输入用户名称" />
          </Form.Item>
        </Col>
        <Col span={8} style={{ textAlign: 'right' }}>
          <Button
            onClick={() => {
              props.form.resetFields();
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
