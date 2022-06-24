import React, { useEffect } from 'react';
import { Modal, ModalProps, Form, Input, InputNumber, Select, DatePicker, Row, Col } from '@sinohealth/butterfly-ui-components/lib';
import CustomUpload from '@/components/Upload';
import { createColumn, editColumn } from '@/services/weapp';
import SimpleModal from '@/components/SimpleModal';
import style from './index.less';

interface AddDrugRecordModalProps extends ModalProps {
  data?: any
}
function AddDrugRecordModal(props: AddDrugRecordModalProps) {
  const { data, onOk, onCancel } = props;
  const [form] = Form.useForm();
  const isEdit = data && data.id;
  useEffect(() => {
    if (isEdit) {
      form.setFieldsValue({
        ...data,
        pic: data.pic ? [data.pic] : [],
      });
    }
  }, []);
  const handleOk = (e: any) => {
    form.submit();
  };
  const handleSubmit = (formValues: any) => {
    const saveColumn = isEdit ? editColumn : createColumn;
    saveColumn({
      ...data,
      ...formValues,
      pic: formValues.pic && typeof formValues.pic[0] === 'string' ? formValues.pic[0] : '',
    })
      .then(() => {
        onOk && onOk(formValues);
      });
  };
  return (
    <SimpleModal className={style.addModal} width={560} title={`${isEdit ? '编辑' : '新建'}用药记录`} visible={true} onOk={handleOk} onCancel={onCancel}>
      <Form form={form} onFinish={handleSubmit}>
        <Form.Item label="管理项目">
          <Select placeholder="请选择管理项目" />
        </Form.Item>
        <Form.Item label="药品名称" name="name">
          <Input placeholder="请输入药品名称" />
        </Form.Item>
        <Form.Item label="服用方法" name="name">
          <Select placeholder="请选择服用方法" />
        </Form.Item>
        <Row gutter={10}>
          <Col span={16}>
            <Form.Item label="服用次数" name="name">
              <InputNumber placeholder="请输入服用次数" style={{ width: '100%' }} />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="name" noStyle>
              <Select placeholder="请选择" style={{ width: '100%' }} />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={10}>
          <Col span={16}>
            <Form.Item label="单次用量" name="name">
              <InputNumber placeholder="请输入单次用量" style={{ width: '100%' }} />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="name" noStyle>
              <Select placeholder="请选择" style={{ width: '100%' }} />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item label="药品规格" name="name">
          <Input placeholder="请输入药品规格" />
        </Form.Item>
        <Form.Item label="起止时间" name="name">
          <DatePicker.RangePicker style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item label="备注" name="name">
          <Input.TextArea placeholder="请输入备注" />
        </Form.Item>
      </Form>
    </SimpleModal>
  );
}

export default AddDrugRecordModal;
