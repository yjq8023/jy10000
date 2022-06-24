import React, { useState, useImperativeHandle } from 'react';
import { ModalProps, Form, Radio, Input } from '@sinohealth/butterfly-ui-components/lib';
import SimpleModal from '@/components/SimpleModal';
import style from './index.less';

interface AddColumnModalProps extends ModalProps {
  data?: any
}
const requiredRule = [{ required: true, message: '该字段为必填项。' }];
function QuitProjectModal(props: AddColumnModalProps, ref: any) {
  const { data, onOk, onCancel } = props;
  const [visible, setVisible] = useState(false);
  useImperativeHandle(ref, () => {
    return {
      openModal,
    };
  });
  const openModal = (config: any) => {
    console.log(config);
    setVisible(true);
  };
  const modalProps = {
    title: '结束管理',
    width: 700,
    visible,
    onCancel() {
      setVisible(false);
    },
  };
  return (
    <SimpleModal {...modalProps} className={style.quitModal}>
      <div>
        <Form
          colon={false}
        >
          <Form.Item name="type" label="结束原因" rules={requiredRule}>
            <Radio.Group>
              <Radio value={1}>联系不上</Radio>
              <Radio value={2}>死亡</Radio>
              <Radio value={3}>其他</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item name="description" label="备注" rules={requiredRule}>
            <Input.TextArea rows={4} placeholder="请输入结束原因描述/备注" />
          </Form.Item>
        </Form>
      </div>
    </SimpleModal>
  );
}

export default React.forwardRef(QuitProjectModal);
