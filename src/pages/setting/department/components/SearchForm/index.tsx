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
import styles from './index.less';

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
      className={styles.searchForm}
      name="organ"
      labelCol={{ xl: 7, xxl: 5 }}
      wrapperCol={{ xl: 18, xxl: 20 }}
      labelAlign="left"
      form={formRef}
      {...props}
    >
      <Row gutter={24}>
        <Col span={8}>
          <Form.Item name="name" label="部门名称">
            <Input placeholder="请输入部门名称" />
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
