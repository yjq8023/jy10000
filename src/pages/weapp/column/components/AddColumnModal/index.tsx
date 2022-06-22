import React, { useEffect } from 'react';
import { Modal, ModalProps, Form, Input, InputNumber } from '@sinohealth/butterfly-ui-components/lib';
import CustomUpload from '@/components/Upload';
import { createColumn, editColumn } from '@/services/weapp';

interface AddColumnModalProps extends ModalProps {
  data?: any
}
function AddColumnModal(props: AddColumnModalProps) {
  const { data, onOk, onCancel } = props;
  const [form] = Form.useForm();
  const isEdit = data && data.id;
  useEffect(() => {
    if (isEdit) {
      form.setFieldsValue({
        ...data,
        pic: [data.pic],
      });
    }
  }, []);
  const handleOk = (e: any) => {
    form.submit();
  };
  const handleSubmit = (formValues: any) => {
    console.log(formValues);
    const saveColumn = isEdit ? editColumn : createColumn;
    saveColumn({
      ...data,
      ...formValues,
      pic: formValues.pic && formValues.pic[0],
    })
      .then(() => {
        onOk && onOk(formValues);
      });
  };
  return (
    <Modal title={`${isEdit ? '编辑' : '新建'}栏目病种`} visible={true} onOk={handleOk} onCancel={onCancel}>
      <Form form={form} labelCol={{ xl: 4 }} onFinish={handleSubmit}>
        <Form.Item label="所属栏目">
          <Input value={data.sourceName} placeholder="所属栏目" readOnly />
        </Form.Item>
        <Form.Item label="病种名称" name="name" rules={[{ required: true, message: '该字段为必填字段' }]}>
          <Input placeholder="请输入病种名称（最多10个字）" maxLength={10} />
        </Form.Item>
        <Form.Item label="排序权重" name="sort">
          <InputNumber placeholder="请输入排序权重（最多5位数）" min={1} max={99999} style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item label="病种图标" name="pic">
          <CustomUpload maxCount={1} />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default AddColumnModal;
