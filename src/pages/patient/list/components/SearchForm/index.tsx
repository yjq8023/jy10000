import React, { useState } from 'react';
import { Form, Row, Col, Button, Input, Select, Checkbox, Tabs } from '@sinohealth/butterfly-ui-components/lib';
import { DownSquareOutlined, UpSquareOutlined } from '@ant-design/icons';
import style from '../../index.less';

const { Option } = Select;
const weappOptions = [
  { label: '已绑定', value: '1' },
  { label: '未绑定', value: '0' },
];

const span = 8;
const gutter: any = [60, 24];
const SearchForm = (props: any = {}) => {
  const onReset = () => {
    props.form.resetFields();
    props.form.submit();
  };
  const operations = (
    <div>
      <Button onClick={() => onReset()}>
        重置
      </Button>
      &nbsp;
      &nbsp;
      <Button type="primary" htmlType="submit">
        查询
      </Button>
    </div>
  );
  return (
    <Form
      style={{ marginTop: '-20px' }}
      labelCol={{ xl: 7 }}
      wrapperCol={{ xl: 17 }}
      labelAlign="left"
      colon={false}
      {...props}
    >
      <Tabs tabBarExtraContent={operations}>
        <Tabs.TabPane tab="按患者检索" key="1">
          <Row gutter={gutter}>
            <Col span={span}>
              <Form.Item name="number" label="档案号">
                <Input placeholder="请输入档案号" />
              </Form.Item>
            </Col>
            <Col span={span}>
              <Form.Item name="patientName" label="患者姓名">
                <Input placeholder="请输入患者姓名" />
              </Form.Item>
            </Col>
            <Col span={span}>
              <Form.Item name="phone" label="患者手机">
                <Input placeholder="请输入患者手机号码" />
              </Form.Item>
            </Col>
            <Col span={span}>
              <Form.Item name="sex" label="患者性别">
                <Select placeholder="请选择患者性别">
                  <Option value="man">男</Option>
                  <Option value="female">女</Option>
                  <Option value="">全部</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={span}>
              <Row>
                <Col span={12}>
                  <Form.Item name="startAge" label="年龄范围" labelCol={{ xl: 14 }}>
                    <Input style={{ width: '100px' }} placeholder="开始年龄" />
                    {/* <span style={{ width: '40px', textAlign: 'center', display: 'inline-block' }}>--</span> */}
                  </Form.Item>
                </Col>
                <Col span={4}>
                  <div style={{ textAlign: 'right' }}>--</div>
                </Col>
                <Col span={8}>
                  <Form.Item name="endAge" label="患者年龄" noStyle>
                    <Input style={{ width: '100px', float: 'right' }} placeholder="结束年龄" />
                  </Form.Item>
                </Col>
              </Row>
            </Col>
            <Col span={span}>
              <Form.Item name="wxBindStatus" label="微信">
                <Checkbox.Group options={weappOptions} />
              </Form.Item>
            </Col>
          </Row>
        </Tabs.TabPane>
        <Tabs.TabPane tab="按项目检索" key="2">
          <Row gutter={[60, 24]}>
            <Col span={span}>
              <Form.Item name="projectId" label="管理项目">
                <Select>
                  <Option value="jack">Jack</Option>
                  <Option value="lucy">Lucy</Option>
                  <Option value="disabled" disabled>
                    Disabled
                  </Option>
                  <Option value="Yiminghe">yiminghe</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={span}>
              <Form.Item name="caseManagerId" label="个案管理师">
                <Select>
                  <Option value="jack">Jack</Option>
                  <Option value="lucy">Lucy</Option>
                  <Option value="disabled" disabled>
                    Disabled
                  </Option>
                  <Option value="Yiminghe">yiminghe</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </Tabs.TabPane>
      </Tabs>
    </Form>
  );
};

export default SearchForm;
