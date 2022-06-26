import React, { useEffect } from 'react';
import { Modal, ModalProps, Form, Input, InputNumber, Select, DatePicker, Row, Col } from '@sinohealth/butterfly-ui-components/lib';
import moment from 'moment';
import { useSearchParams } from 'react-router-dom';
import { createColumn, editColumn } from '@/services/weapp';
import SimpleModal from '@/components/SimpleModal';
import { useDict } from '@/hooks/useDict';
import style from './index.less';
import ColumnProjectSelect from '@/components/ColumnProjectSelect';
import { editUseMedicineLog, saveUseMedicineLog } from '@/services/patient';

interface AddDrugRecordModalProps extends ModalProps {
  data?: any
}

const requiredRule = [{ required: true, message: '该字段为必填项。' }];
function AddDrugRecordModal(props: AddDrugRecordModalProps) {
  const { data, onOk, onCancel } = props;
  const [form] = Form.useForm();
  const dict = useDict();
  const [searchParams] = useSearchParams();
  const patientId = searchParams.get('id');
  const isEdit = data && data.id;
  useEffect(() => {
    if (isEdit) {
      form.setFieldsValue({
        ...data,
        useTime: [moment(data.startUseTime), moment(data.endUseTime)],
      });
    }
  }, []);
  const handleOk = (e: any) => {
    form.submit();
  };
  const handleSubmit = (formValues: any) => {
    const api = isEdit ? editUseMedicineLog : saveUseMedicineLog;
    api({
      ...data,
      ...formValues,
      startUseTime: formValues.useTime[0].format('YYYY-MM-DD HH:mm:ss'),
      endUseTime: formValues.useTime[1].format('YYYY-MM-DD HH:mm:ss'),
      patientId,
    })
      .then(() => {
        onOk && onOk(formValues);
      });
  };
  const getOptions = (key: string) => {
    if (dict && dict[key]) {
      return dict[key].map((item: any) => ({ label: item.name, value: item.code }));
    }
    return [];
  };
  return (
    <SimpleModal className={style.addModal} width={560} title={`${isEdit ? '编辑' : '新建'}用药记录`} visible={true} onOk={handleOk} onCancel={onCancel}>
      <Form form={form} onFinish={handleSubmit}>
        <Form.Item label="管理项目" name="projectId" rules={requiredRule}>
          <ColumnProjectSelect params={{ patientId }} placeholder="请选择管理项目" />
        </Form.Item>
        <Form.Item label="药品名称" name="medicineName" rules={requiredRule}>
          <Input placeholder="请输入药品名称" />
        </Form.Item>
        <Form.Item label="服用方法" name="useWay" rules={requiredRule}>
          <Select placeholder="请选择服用方法" options={getOptions('drugUsage')} />
        </Form.Item>
        <Row gutter={10}>
          <Col span={16}>
            <Form.Item label="服用次数" name="useNum" rules={requiredRule}>
              <InputNumber placeholder="请输入服用次数" style={{ width: '100%' }} />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="useNumUnit" rules={requiredRule}>
              <Select placeholder="服用单位" style={{ width: '100%' }} options={getOptions('useNumUnit')} />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={10}>
          <Col span={16}>
            <Form.Item label="单次用量" name="singleDosage" rules={requiredRule}>
              <InputNumber placeholder="请输入单次用量" style={{ width: '100%' }} />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="singleDosageUnit" rules={requiredRule}>
              <Select placeholder="用量单位" style={{ width: '100%' }} options={getOptions('singleDosageUnit')} />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item label="药品规格" name="spec">
          <Input placeholder="请输入药品规格" />
        </Form.Item>
        <Form.Item label="起止时间" name="useTime" rules={requiredRule}>
          <DatePicker.RangePicker style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item label="备注" name="remark">
          <Input.TextArea placeholder="请输入备注" />
        </Form.Item>
      </Form>
    </SimpleModal>
  );
}

export default AddDrugRecordModal;
