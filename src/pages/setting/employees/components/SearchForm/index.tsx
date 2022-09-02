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

type SearchFormProps = {
  onFinish?: (values: any) => void;
  organizedid?: any;
};

const SearchForm = (props: SearchFormProps = {}) => {
  const [formRef] = Form.useForm();

  useEffect(() => {
    if (props.organizedid) formRef?.resetFields();
  }, [props.organizedid]);

  return (
    <Form
      name="organ"
      wrapperCol={{ xl: 18, xxl: 20 }}
      labelAlign="left"
      colon={false}
      form={formRef}
      {...props}
    >
      <Row gutter={16}>
        <Col span={8}>
          <Form.Item name="account" label="账号">
            <Input placeholder="请输入账号" />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item name="name" label="姓名">
            <Input placeholder="请输入姓名" />
          </Form.Item>
        </Col>
        <Col span={8} style={{ textAlign: 'right' }}>
          <Button
            onClick={() => {
              formRef?.resetFields();
              formRef?.submit();
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
