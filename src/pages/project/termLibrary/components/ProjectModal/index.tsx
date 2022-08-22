import React from 'react';
import { Form, Input } from '@sinohealth/butterfly-ui-components/lib';
import SimpleModal from '@/components/SimpleModal';
import styles from './index.less';
import LabelSelect from '@/pages/project/components/LabelSelect';

const { TextArea } = Input;

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
              onOk && onOk(insertParams);
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
              <LabelSelect search={false} placeholder="请选择决策流" />
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
