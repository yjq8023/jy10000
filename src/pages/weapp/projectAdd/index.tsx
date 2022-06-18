import React from 'react';
import { Form, Input, InputNumber, Row, Col, Select, Radio } from '@sinohealth/butterfly-ui-components/lib';
import CustomUpload from '@/components/Upload';

import style from './index.less';

const requiredRule = [{ required: true, message: '该字段为必填项。' }];
function ProjectAdd() {
  const sourceData = {
    sourceName: '健康管理服务',
    sourceId: '0',
  };
  return (
    <div className={style.addFormBox}>
      <Form labelCol={{ xl: 6 }}>
        <Row gutter={20}>
          <Col span={12}>
            <Form.Item label="所属栏目">
              <Input disabled value={sourceData.sourceName} />
            </Form.Item>
            <Form.Item name="diseaseId" label="项目病种" rules={requiredRule}>
              <Select />
            </Form.Item>
            <Form.Item name="name" label="项目名称" rules={requiredRule}>
              <Input />
            </Form.Item>
            <Form.Item label="关联AI决策流" rules={requiredRule}>
              <Input readOnly value="暂无" />
            </Form.Item>
            <Form.Item name="chainId" label="所属机构" rules={requiredRule}>
              <Select />
            </Form.Item>
            <Form.Item name="doctorId" label="团队医生" rules={requiredRule}>
              <Select />
            </Form.Item>
            <Form.Item name="caseManagerId" label="个案管理师" rules={requiredRule}>
              <Select />
            </Form.Item>
            <Form.Item name="descrition" label="项目简介">
              <Input.TextArea rows={4} />
            </Form.Item>
            <Form.Item name="needAudit" label="是否需要医生审核" rules={requiredRule}>
              <Radio.Group>
                <Radio value={1}>是</Radio>
                <Radio value={0}>否</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item name="openConsult" label="是否开启患者咨询" rules={requiredRule}>
              <Radio.Group>
                <Radio value={1}>是</Radio>
                <Radio value={0}>否</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item name="price" label="项目价格（元）" rules={requiredRule}>
              <InputNumber min={0} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="name" label="项目详情图" rules={requiredRule}>
              <CustomUpload />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
}

export default ProjectAdd;
