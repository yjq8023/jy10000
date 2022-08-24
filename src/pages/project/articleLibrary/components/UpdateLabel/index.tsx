import React, { useEffect, useState } from 'react';
import { Form, Input, Select } from '@sinohealth/butterfly-ui-components/lib';
import SimpleModal from '@/components/SimpleModal';
import styles from './index.less';
import LabelSelect from '@/pages/project/components/LabelSelect';
import { httpProjecAiDecision } from '@/services/project';
import AiLabelSelect from '@/pages/project/components/AiLabelSelect';

type UpdateLabelProps = {
  visible?: boolean;
  params?: any;
  onOk?: (val: any) => void;
  onCancel?: () => void;
};

/**
 * 文章库-更新标签
 * @returns
 */
const UpdateLabel: React.FC<UpdateLabelProps> = (props) => {
  const [form] = Form.useForm();
  const { visible, params, onOk, onCancel } = props;
  const [labelMapSour, setLabelMapSour] = useState([]);

  useEffect(() => {
    if (!Object.keys(params).length) return;
    const ids = params.labelVoList.map((el: any) => el.id);
    form.setFieldsValue({
      labelIds: ids,
    });
    setLabelMapSour(ids);
  }, [params]);

  return (
    <div className={styles['update-label']}>
      <SimpleModal
        visible={visible}
        title="编辑标签"
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
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 20 }}
          initialValues={{ remember: true }}
          onFinish={() => {}}
          onFinishFailed={() => {}}
          autoComplete="off"
        >
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
        </Form>
      </SimpleModal>
    </div>
  );
};

export default UpdateLabel;
