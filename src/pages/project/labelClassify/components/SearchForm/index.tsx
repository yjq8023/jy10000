import React, { useState } from 'react';
import { Form, Row, Col, Button, Input } from '@sinohealth/butterfly-ui-components/lib';
import style from './index.less';

const SearchForm = (props: any = {}) => {
  return (
    <div className={style.addFormBox}>
      <Form
        className={style.searchForm}
        labelCol={{ xl: 0, xxl: 0 }}
        wrapperCol={{ xl: 0, xxl: 0 }}
        labelAlign="left"
        colon={false}
        {...props}
      >
        <Row gutter={[20, 0]}>
          <Col span={6}>
            <Form.Item name="categoryName">
              <Input placeholder="请输入标签分类名称" />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item name="name">
              <Input placeholder="请输入标签名称" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Button
              onClick={() => {
                props.form.resetFields();
                props.form.submit();
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
    </div>
  );
};

export default SearchForm;
