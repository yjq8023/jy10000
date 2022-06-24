import React, { useState, useEffect } from 'react';
import { Form, Input, InputNumber, Row, Col, Radio, Button, message } from '@sinohealth/butterfly-ui-components/lib';
import { useSearchParams, useNavigate } from 'react-router-dom';

import style from './index.less';
import ProjectSelect from '@/components/ProjectSelect';
import UserSelect from '@/components/UserSelect';
import MechanismCascader from '@/components/MechanismCascader';
import ImageList from '@/pages/weapp/projectAdd/Components/ImageList';
import { createProject, editProject, getProjectDetail } from '@/services/weapp';

const requiredRule = [{ required: true, message: '该字段为必填项。' }];
const numberToFixed2 = [{ pattern: /^\d+(\.\d{1,2})?$/, message: '仅保留2位小数点' }];
function ProjectAdd() {
  const [params] = useSearchParams();
  const [chainId, setChainId] = useState();
  const sourceId: any = params.get('parentId');
  const id: any = params.get('id');
  const navigate = useNavigate();
  const [form] = Form.useForm();
  useEffect(() => {
    if (sourceId) {
      form.setFieldsValue({ sourceId });
    }
    if (id) {
      getProjectDetail(id).then((res: any) => {
        form.setFieldsValue(res);
        setChainId(res.chainId);
      });
    }
  }, []);
  const handleSubmit = () => {
    form.submit();
  };
  const onSubmit = (formValues: any) => {
    const api = id ? editProject : createProject;
    api({
      ...formValues,
      id,
    })
      .then((res) => {
        message.success('保存成功！');
        onCancel();
      });
  };
  const onCancel = () => {
    navigate(-1);
  };
  const onFieldsChange = (field: any) => {
    if (field[0].name.indexOf('chainId') > -1) {
      setChainId(field[0].value);
      form.setFieldsValue({
        doctorId: '',
        caseManagerId: '',
      });
    }
  };
  return (
    <div className={['actionPage', style.addFormBox].join(' ')}>
      <Form form={form} labelCol={{ xl: 6 }} onFinish={onSubmit} onFieldsChange={onFieldsChange}>
        <Row gutter={20}>
          <Col span={12}>
            <Form.Item name="sourceId" label="所属栏目">
              <ProjectSelect parentId="0" placeholder="请选择" />
            </Form.Item>
            <Form.Item name="diseaseId" label="项目病种" rules={requiredRule}>
              <ProjectSelect parentId={sourceId} placeholder="请选择" />
            </Form.Item>
            <Form.Item name="name" label="项目名称" rules={requiredRule}>
              <Input placeholder="请输入" />
            </Form.Item>
            <Form.Item label="关联AI决策流">
              <Input readOnly value="暂无" />
            </Form.Item>
            <Form.Item name="chainId" label="所属机构" rules={requiredRule}>
              <MechanismCascader placeholder="请选择" />
            </Form.Item>
            <Form.Item name="doctorId" label="团队医生" rules={requiredRule}>
              <UserSelect params={{ position: 'doctor', chainId }} placeholder="请选择" />
            </Form.Item>
            <Form.Item name="caseManagerId" label="个案管理师" rules={requiredRule}>
              <UserSelect params={{ position: 'caseManager', chainId }} placeholder="请选择" />
            </Form.Item>
            <Form.Item name="description" label="项目简介" rules={requiredRule}>
              <Input.TextArea rows={4} placeholder="请输入" />
            </Form.Item>
            <Form.Item name="needAudit" label="是否需要医生审核" rules={requiredRule}>
              <Radio.Group>
                <Radio value="1">是</Radio>
                <Radio value="0">否</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item name="openConsult" label="是否开启患者咨询" rules={requiredRule}>
              <Radio.Group>
                <Radio value="1">是</Radio>
                <Radio value="0">否</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item name="price" label="项目价格（元）" rules={[...requiredRule, ...numberToFixed2]}>
              <InputNumber min={0} placeholder="请输入" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="picList" label="项目详情图" required rules={requiredRule}>
              <ImageList />
            </Form.Item>
          </Col>
        </Row>
      </Form>
      <div className="actionBar">
        <Button onClick={onCancel}>取消</Button>
        &nbsp;
        &nbsp;
        <Button type="primary" onClick={handleSubmit}>保存</Button>
      </div>
    </div>
  );
}

export default ProjectAdd;
