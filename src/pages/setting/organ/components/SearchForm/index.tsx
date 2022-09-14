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
  tenantid?: any;
  onFinish?: (values: any) => void;
};

const SearchForm = (props: SearchFormProps = {}) => {
  const [formRef] = Form.useForm();

  useEffect(() => {
    if (props.tenantid) formRef?.resetFields();
  }, [props.tenantid]);

  return (
    <Form
      style={{ backgroundColor: 'white', padding: '24px 24px 0', borderRadius: 4, marginBottom: 8 }}
      name="organ"
      labelCol={{ xl: 7, xxl: 5 }}
      wrapperCol={{ xl: 18, xxl: 20 }}
      labelAlign="left"
      // colon={false}
      form={formRef}
      {...props}
    >
      <Row gutter={16}>
        <Col span={8}>
          <Form.Item name="name" label="组织名称">
            <Input placeholder="请输入组织名称" />
          </Form.Item>
        </Col>
        <Col span={16} style={{ textAlign: 'right' }}>
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
