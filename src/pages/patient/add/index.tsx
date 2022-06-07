import React from 'react';
import { Card, Form, Row, Col, Button, Input, Select } from '@sinohealth/butterfly-ui-components/lib';
import style from './index.less';

const { Option } = Select;
function PatientAdd() {
  return (
    <div className={style.addPage}>
      <Card title="基本信息" className={style.body}>
        <Form
          labelCol={{ xl: 6, xxl: 5 }}
          wrapperCol={{ xl: 18, xxl: 18 }}
          labelAlign="left"
          colon={false}
        >
          <Row gutter={100}>
            <Col span={8}>
              <Form.Item name="name" label="姓名">
                <Input placeholder="请输入姓名" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="name" label="性别">
                <Select placeholder="请选择性别">
                  <Option value="jack">男</Option>
                  <Option value="lucy">女</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="name" label="出生年月">
                <Select placeholder="请选择性别">
                  <Option value="jack">男</Option>
                  <Option value="lucy">女</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="name" label="手机号码">
                <Select placeholder="请选择性别">
                  <Option value="jack">男</Option>
                  <Option value="lucy">女</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="name" label="身份证号">
                <Select placeholder="请选择性别">
                  <Option value="jack">男</Option>
                  <Option value="lucy">女</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="name" label="主要诊断">
                <Select placeholder="请选择性别">
                  <Option value="jack">男</Option>
                  <Option value="lucy">女</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="name" label="过敏史">
                <Select placeholder="请选择性别">
                  <Option value="jack">男</Option>
                  <Option value="lucy">女</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="name" label="既往史">
                <Select placeholder="请选择性别">
                  <Option value="jack">男</Option>
                  <Option value="lucy">女</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="name" label="家属姓名">
                <Select placeholder="请选择性别">
                  <Option value="jack">男</Option>
                  <Option value="lucy">女</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="name" label="与患者关系">
                <Select placeholder="请选择性别">
                  <Option value="jack">男</Option>
                  <Option value="lucy">女</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="name" label="家属联系电话">
                <Select placeholder="请选择性别">
                  <Option value="jack">男</Option>
                  <Option value="lucy">女</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Card>
      <div className={style.actionBar}>
        <Button>取消</Button>
        &nbsp;
        &nbsp;
        <Button type="primary">保存</Button>
      </div>
    </div>
  );
}

export default PatientAdd;
