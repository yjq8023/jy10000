import React, { useState, useEffect } from 'react';
import { Form, Input, InputNumber, Row, Col, Select, Radio, Button, message } from '@sinohealth/butterfly-ui-components/lib';
import { useSearchParams, useNavigate } from 'react-router-dom';
import CustomUpload from '@/components/Upload';

import style from './index.less';
import ProjectSelect from '@/components/ProjectSelect';
import UserSelect from '@/components/UserSelect';
import MechanismCascader from '@/components/MechanismCascader';
import ImageList from '@/pages/weapp/projectAdd/Components/ImageList';
import { createProject, getProjectDetail } from '@/services/weapp';

const requiredRule = [{ required: true, message: '该字段为必填项。' }];
function ProjectAdd() {
  const [params] = useSearchParams();
  const [chainId, setChainId] = useState();
  const sourceId: any = params.get('parentId');
  const id: any = params.get('id');
  const navigate = useNavigate();
  const [form] = Form.useForm();
  useEffect(() => {
    if (sourceId) {
      form.setFieldsValue({ sourceId, chainId: 1 });
    }
    if (id) {
      getProjectDetail(id).then((res) => {
        form.setFieldsValue(res);
      });
    }
  }, []);
  const handleSubmit = () => {
    form.submit();
  };
  const onSubmit = (formValues: any) => {
    console.log(formValues);
    createProject(formValues)
      .then((res) => {
        console.log(res);
        message.success('保存成功！');
        onCancel();
      });
  };
  const onCancel = () => {
    navigate(-1);
  };
  return (
    <div className={['actionPage', style.addFormBox].join(' ')}>
      <Form form={form} labelCol={{ xl: 6 }} onFinish={onSubmit}>
        <Row gutter={20}>
          <Col span={12}>
            <Form.Item name="sourceId" label="所属栏目">
              <ProjectSelect parentId="0" placeholder="请选择" />
            </Form.Item>
            <Form.Item name="diseaseId" label="项目病种" rules={requiredRule}>
              <ProjectSelect parentId={sourceId} />
            </Form.Item>
            <Form.Item name="name" label="项目名称" rules={requiredRule}>
              <Input />
            </Form.Item>
            <Form.Item label="关联AI决策流">
              <Input readOnly value="暂无" />
            </Form.Item>
            <Form.Item name="chainId" label="所属机构" rules={requiredRule}>
              <MechanismCascader />
            </Form.Item>
            <Form.Item name="doctorId" label="团队医生" rules={requiredRule}>
              <UserSelect params={{ position: 'doctor', chainId }} />
            </Form.Item>
            <Form.Item name="caseManagerId" label="个案管理师" rules={requiredRule}>
              <UserSelect params={{ position: 'caseManager', chainId }} />
            </Form.Item>
            <Form.Item name="descrition" label="项目简介">
              <Input.TextArea rows={4} />
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
            <Form.Item name="price" label="项目价格（元）" rules={requiredRule}>
              <InputNumber min={0} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="picList" label="项目详情图" rules={requiredRule}>
              <CustomUpload />
            </Form.Item>
            <Row>
              <Col offset={6} span={18}>
                <div>
                  <div>* 最多可上传 10 张图片</div>
                  <div>* 支持 jpg/png 格式，单张图片不超过500KB</div>
                  <div>* 图片规格：宽度 750px，长度不限</div>
                </div>
              </Col>
            </Row>
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
