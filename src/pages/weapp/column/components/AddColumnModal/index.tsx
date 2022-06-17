import React from 'react';
import { Modal, ModalProps, Form, Input } from '@sinohealth/butterfly-ui-components/lib';
import CustomUpload from '@/components/Upload';

interface AddColumnModalProps extends ModalProps {
  data?: any
}
function AddColumnModal(props: AddColumnModalProps) {
  const { data, onOk, onCancel } = props;
  const isEdit = data && data.id;
  return (
    <Modal title={`&${isEdit ? '编辑' : '新建'}栏目病种`} visible={true} onOk={onOk} onCancel={onCancel}>
      <Form>
        <Form.Item label="所属栏目">
          <Input placeholder="所属栏目" readOnly />
        </Form.Item>
        <Form.Item label="病种名称">
          <Input placeholder="请输入病种名称（最多10个字）" />
        </Form.Item>
        <Form.Item label="排序权重">
          <Input placeholder="请输入排序权重（最多5位数）" />
        </Form.Item>
        <Form.Item label="病种图标">
          <CustomUpload />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default AddColumnModal;
