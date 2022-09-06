import React, { useState, useEffect } from 'react';
import { Form, Modal, ModalProps, Input, Select } from '@sinohealth/butterfly-ui-components/lib';
import style from './index.less';
import { handelOptions } from '@/utils';
import { getLabelTypeSaveOrUpdate, getLabelListEntity } from '@/services/project';

type ApplicationAddProps = {
  modalVisible?: boolean;
  organData?: any;
  handleOk: (value: boolean) => void;
  onCancel?: (success?: boolean) => void;
} & ModalProps;
const { Option } = Select;

const ApplicationAdd: React.FC<ApplicationAddProps> = (props) => {
  const { modalVisible, handleOk, organData, onCancel } = props;
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [typeOptions, setTypeOptions] = useState<any>([]);
  const [record, setRecord] = useState(''); // 用来记录输入的选项

  const onFinish = (values: any) => {
    const params = {
      ...values,
    };
    if (organData.id) {
      params.id = organData.id;
    }
    setLoading(true);
    getLabelTypeSaveOrUpdate(params)
      .then((res) => {
        onCancelFun(true);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const onCancelFun = (success?: boolean) => {
    form.resetFields();
    if (onCancel) onCancel(success);
  };
  const LabelListEntity = async () => {
    const res: any = await getLabelListEntity({});
    setTypeOptions(res);
  };

  const onChangeSelect = (value: any) => {
    form.setFieldsValue({ categoryName: value });
    setRecord(value);
  };
  const onBlurSelect = () => {
    if (record) {
      onChangeSelect(record);
    }
  };
  const onSearchSelect = (value: any) => {
    if (value) {
      setRecord(value);
    }
  };

  useEffect(() => {
    if (organData.id) {
      form.setFieldsValue({ ...organData });
    }
  }, [organData.id]);
  useEffect(() => {
    setVisible(modalVisible || false);
    if (modalVisible) LabelListEntity();
  }, [modalVisible]);
  return (
    <Modal
      title={organData.id ? '编辑标签分类' : '添加标签分类'}
      visible={visible}
      confirmLoading={loading}
      {...props}
      width={560}
      onOk={() => {
        form.submit();
      }}
      onCancel={() => {
        onCancelFun();
      }}
      maskClosable={false}
    >
      <div className={['actionPage', style.addFormBox].join(' ')}>
        <Form
          labelAlign="right"
          form={form}
          onFinish={onFinish}
          labelCol={{ span: 6 }}
          colon={false}
        >
          <Form.Item
            label="标签分类名称："
            name="categoryName"
            rules={[{ required: true, message: '请选择或填写标签分类' }]}
          >
            <Select
              placeholder="请选择或填写标签分类（必选/填）"
              allowClear
              showSearch
              onChange={(value) => onChangeSelect(value)}
              onSearch={(value) => onSearchSelect(value)}
              onBlur={() => onBlurSelect()}
            >
              {typeOptions.map((item: any) => (
                <Option key={item.value} value={item.value} label={item.label}>
                  {item.value}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="标签名称："
            name="name"
            rules={[{ required: true, message: '请填写标签名称' }]}
          >
            <Input placeholder="请输入标签名称（必填）" />
          </Form.Item>
          {/* <Form.Item label="排序：" name="sort" rules={[{ required: true, message: '请填写排序' }]}>
            <Input placeholder="请输入排序（必填）" />
          </Form.Item> */}
        </Form>
      </div>
    </Modal>
  );
};

export default ApplicationAdd;
