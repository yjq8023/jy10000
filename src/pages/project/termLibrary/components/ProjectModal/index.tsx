import React, { useEffect, useState } from 'react';
import { Form, Input, Select } from '@sinohealth/butterfly-ui-components/lib';
import SimpleModal from '@/components/SimpleModal';
import styles from './index.less';
import LabelSelect from '@/pages/project/components/LabelSelect';
import { httpProjecAiDecision } from '@/services/project';

const { TextArea } = Input;
const { Option } = Select;

type ProjectModalProps = {
  visible?: boolean;
  ai?: boolean;
  title?: string;
  params?: any;
  onOk?: (val: any) => void;
  onCancel?: () => void;
};

/**
 * 项目库-弹窗
 * @returns
 */
const ProjectModal: React.FC<ProjectModalProps> = (props: any) => {
  const [form] = Form.useForm();
  const { visible, title, ai, params, onOk, onCancel } = props;
  const [aiDecisionParams, setAiDecisionParams] = useState({ name: '' });
  const [aiDecision, setAiDecision] = useState<ProjectType.AiDecisionRes[]>([]);
  const [labelMapSour, setLabelMapSour] = useState([]);

  const handleSearch = (newValue: string) => {
    setAiDecisionParams({ name: newValue });
  };

  const httpProjecAiDecisionReq = async () => {
    const res = await httpProjecAiDecision(aiDecisionParams);
    console.log(res);
    setAiDecision(res.data);
  };

  useEffect(() => {
    if (!ai && !aiDecisionParams.name) return;
    httpProjecAiDecisionReq();
  }, [ai, aiDecisionParams]);

  useEffect(() => {
    if (!Object.keys(params).length) return;
    form.setFieldsValue(params);
    setLabelMapSour(params.labelVoList.map((el: any) => el.id));
  }, [params]);

  return (
    <div className={styles['project-modal']}>
      <SimpleModal
        visible={visible}
        title={title}
        okText="保 存"
        cancelButtonProps={{ type: 'info' }}
        onCancel={() => {
          form.resetFields();
          onCancel && onCancel();
        }}
        onOk={() => {
          form
            .validateFields()
            .then(() => {
              const insertParams = form.getFieldsValue() as any;
              let D = {};
              if (typeof insertParams.aiDecisionFlowDefinitionDto === 'string') {
                D = aiDecision.filter(
                  (el) => el.decisionFlowsVersionId === insertParams.aiDecisionFlowDefinitionDto,
                )[0];
              }
              onOk && onOk({ ...insertParams, aiDecisionFlowDefinitionDto: D });
            })
            .catch(() => {});
        }}
      >
        <Form
          name="basic"
          form={form}
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={() => {}}
          onFinishFailed={() => {}}
          autoComplete="off"
        >
          <Form.Item
            label="项目名称"
            name="name"
            rules={[{ required: true, message: '请输入项目名称' }]}
          >
            <Input placeholder="请输入项目名称" />
          </Form.Item>
          {ai ? (
            <Form.Item
              label="关联AI开放平台决策流"
              className={styles['decision-flow']}
              name="aiDecisionFlowDefinitionDto"
            >
              <Select
                showSearch
                placeholder="请选择决策流"
                defaultActiveFirstOption={false}
                showArrow={false}
                filterOption={false}
                onSearch={handleSearch}
                notFoundContent={null}
                // onChange={(v) =>
                //   form.setFieldsValue({
                //     aiDecisionFlowDefinitionDto: v,
                //   })
                // }
              >
                {aiDecision.map((el) => (
                  <Option key={el.decisionFlowsVersionId}>{el.decisionFlowsVersionName}</Option>
                ))}
              </Select>
            </Form.Item>
          ) : null}
          <Form.Item
            label="版本号"
            name="version"
            rules={[{ required: true, message: '请输入版本号' }]}
          >
            <Input placeholder="请输入版本号" />
          </Form.Item>
          <Form.Item label="标签" name="labelIds">
            <LabelSelect
              search={false}
              mapSour={labelMapSour}
              placeholder="请选择标签"
              onSelect={(v) =>
                form.setFieldsValue({
                  labelIds: v,
                })
              }
            />
          </Form.Item>
          <Form.Item label="描述" name="description">
            <TextArea
              showCount
              maxLength={100}
              autoSize={{ minRows: 4, maxRows: 6 }}
              placeholder="请输入描述内容"
            />
          </Form.Item>
        </Form>
      </SimpleModal>
    </div>
  );
};

export default ProjectModal;
