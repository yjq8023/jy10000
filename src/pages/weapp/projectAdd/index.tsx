import React, { useState, useEffect } from 'react';
import {
  Form,
  Input,
  InputNumber,
  Row,
  Col,
  Radio,
  Button,
  message,
  Select,
  Space,
} from '@sinohealth/butterfly-ui-components/lib';
import { useSearchParams, useNavigate } from 'react-router-dom';

import style from './index.less';
import ProjectSelect from '@/components/ProjectSelect';
import UserSelect from '@/components/UserSelect';
import MechanismCascader from '@/components/MechanismCascader';
import ImageList from '@/pages/weapp/projectAdd/Components/ImageList';
import { createProject, editProject, getByChain, getProjectDetail } from '@/services/weapp';
import ProjectSpecify from './Components/ProjectSpecify';

const { Option } = Select;

const requiredRule = [{ required: true, message: '该字段为必填项。' }];
const numberToFixed2 = [{ pattern: /^\d+(\.\d{1,2})?$/, message: '仅保留2位小数点' }];
function ProjectAdd() {
  const [params] = useSearchParams();
  const [organizeId, setOrganizeId] = useState();
  const [projectDetail, setProjectDetail] = useState<any>({});
  const [chainParams, setChainParams] = useState({});
  const [chainSource, setChainSource] = useState<any>([]);
  const categoryId: any = params.get('parentId');
  const id: any = params.get('id');
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const httpGetByChain = async () => {
    const res: any = await getByChain(chainParams);
    console.log(res);
    setChainSource(res);
  };

  const handleSubmit = () => {
    form
      .validateFields()
      .then(() => {
        const specList = form.getFieldValue('specList');
        if (!specList.length) {
          message.error('项目规格还未创建');
          return;
        }
        form.submit();
      })
      .catch(() => {});
  };

  const onSubmit = (formValues: any) => {
    console.log(formValues);
    const api = id ? editProject : createProject;
    api({
      ...formValues,
      id,
    }).then((res) => {
      message.success('保存成功！');
      onCancel();
    });
  };

  const onCancel = () => {
    navigate(-1);
  };

  const onFieldsChange = (field: any) => {
    if (field[0].name.indexOf('organizeId') > -1) {
      setOrganizeId(field[0].value);
      form.setFieldsValue({
        doctorId: '',
        caseManagerId: '',
      });
    }
  };

  useEffect(() => {
    if (categoryId) {
      form.setFieldsValue({ categoryId });
    }
    if (id) {
      getProjectDetail(id).then((res: any) => {
        form.setFieldsValue(res);
        setProjectDetail(res);
        setOrganizeId(res.chainId);
      });
    }
  }, []);

  useEffect(() => {
    httpGetByChain();
  }, [chainParams]);

  return (
    <div className={['actionPage', style.addFormBox].join(' ')}>
      <Form form={form} labelCol={{ span: 7 }} onFinish={onSubmit} onFieldsChange={onFieldsChange}>
        <Row gutter={20}>
          <Col span={12}>
            <h4 className={style['specify-title']}>基本信息</h4>
            <Form.Item name="categoryId" label="所属栏目">
              <ProjectSelect parentId="0" placeholder="请选择" />
            </Form.Item>
            <Form.Item name="diseaseId" label="项目病种" rules={requiredRule}>
              <ProjectSelect parentId={categoryId} disable={!!id} placeholder="请选择" />
            </Form.Item>
            <Form.Item name="serviceProjectName" label="项目名称" rules={requiredRule}>
              <Input placeholder="请输入" />
            </Form.Item>
            <Form.Item name="manageProjectId" label="关联管理项目" rules={requiredRule}>
              {/* <Input readOnly value="暂无" /> */}
              <Select
                showSearch
                placeholder="请先选择机构"
                defaultActiveFirstOption={false}
                showArrow={false}
                filterOption={false}
                notFoundContent={null}
                onSearch={(v) => {
                  setChainParams({ name: v });
                }}
              >
                {chainSource?.map((el: any) => (
                  <Option key={el.id}>{el.value}</Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item name="organizeId" label="所属机构" rules={requiredRule}>
              <MechanismCascader placeholder="请选择" />
            </Form.Item>
            <Form.Item name="doctorId" label="团队医生" rules={requiredRule}>
              <UserSelect params={{ position: 'doctor', organizeId }} placeholder="请选择" />
            </Form.Item>
            <Form.Item name="caseManagerId" label="个案管理师" rules={requiredRule}>
              <UserSelect params={{ position: 'caseManager', organizeId }} placeholder="请选择" />
            </Form.Item>
            <Form.Item name="description" label="项目简介" rules={requiredRule}>
              <Input.TextArea rows={4} placeholder="请输入" />
            </Form.Item>
            <Form.Item name="needCaseManager" label="是否需要个案管理师审核" rules={requiredRule}>
              <Radio.Group>
                <Radio value={true}>是</Radio>
                <Radio value={false}>否</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item name="needDoctor" label="是否需要医生审核" rules={requiredRule}>
              <Radio.Group>
                <Radio value={true}>是</Radio>
                <Radio value={false}>否</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item name="openConsult" label="是否开启患者咨询" rules={requiredRule}>
              <Radio.Group>
                <Radio value={true}>是</Radio>
                <Radio value={false}>否</Radio>
              </Radio.Group>
            </Form.Item>
            {/* <Form.Item
              name="price"
              label="项目价格（元）"
              rules={[...requiredRule, ...numberToFixed2]}
            >
              <InputNumber min={0} placeholder="请输入" />
            </Form.Item> */}
          </Col>
          <Col span={12}>
            <h4 className={style['specify-title']}>项目详情页</h4>
            <Form.Item
              labelCol={{ span: 5 }}
              name="mediaFiles"
              label="项目详情图"
              required
              rules={requiredRule}
            >
              <ImageList />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={20}>
          <Col span={12}>
            <Form.Item name="specList" label="">
              <ProjectSpecify
                source={projectDetail.specVoList}
                onSpecify={(v) => form.setFieldsValue({ specList: v })}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
      <div className="actionBar">
        <Space>
          <Button type="info" onClick={onCancel}>
            取消
          </Button>

          <Button type="primary" onClick={handleSubmit}>
            保存
          </Button>
        </Space>
      </div>
    </div>
  );
}

export default ProjectAdd;
