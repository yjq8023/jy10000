import React from 'react';
import { Form, Input } from '@sinohealth/butterfly-ui-components/lib';
import SimpleModal from '@/components/SimpleModal';
import styles from './index.less';
import LabelSelect from '@/components/LabelSelect';
import { httpUpdateScale } from '@/services/project';

const { TextArea } = Input;

type ScaleModalProps = {
  visible?: boolean;
  title?: string;
  params?: any;
  onOk?: (val: any) => void;
  onCancel?: () => void;
};

/**
 * 量表库-添加量表
 * @returns
 */
const ScaleModal: React.FC<ScaleModalProps> = (props) => {
  const [form] = Form.useForm();
  const { visible, title, params, onOk, onCancel } = props;

  const handleAddScale = (formValues: any) => {
    httpUpdateScale({
      ...formValues,
    }).then(() => {
      onOk && onOk(formValues);
    });
  };
  return (
    <div className={styles['scale-modal']}>
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
          form.submit();
        }}
      >
        <Form
          name="basic"
          form={form}
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={handleAddScale}
          onFinishFailed={() => {}}
          autoComplete="off"
        >
          <Form.Item
            label="量表名称"
            name="title"
            rules={[{ required: true, message: '请输入量表名称' }]}
          >
            <Input placeholder="请输入项目名称" />
          </Form.Item>
          <Form.Item label="量表说明" name="description">
            <TextArea
              showCount
              maxLength={200}
              autoSize={{ minRows: 4, maxRows: 6 }}
              placeholder="请输入说明内容"
            />
          </Form.Item>
          <Form.Item label="标签" name="labelIds">
            <LabelSelect mode="multiple" placeholder="请选择标签" />
          </Form.Item>
        </Form>
      </SimpleModal>
    </div>
  );
};

export default ScaleModal;
