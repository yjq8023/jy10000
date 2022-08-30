import React, { useState, useImperativeHandle, useContext } from 'react';
import { Modal, Form, Input, message } from '@sinohealth/butterfly-ui-components/lib';
import { planMapContext } from '@/pages/planMapEditor';
import { planItemTypes } from '@/pages/planMapEditor/config';

const AddDiagnosisModal = (props: any, ref: any) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [nodeData, setNodeData] = useState<any>();
  const { planMapState, setPlanMapState } = useContext(planMapContext);

  const [form] = Form.useForm();

  useImperativeHandle(ref, () => {
    return {
      handleOpen,
      handleOk,
      handleCancel,
    };
  }, []);

  const handleOpen = (node: any) => {
    setNodeData(node);
    setIsModalVisible(true);
    form.resetFields();
  };

  const handleOk = () => {
    form.submit();
  };

  const handleCancel = () => {
    setPlanMapState([...planMapState]);
    setIsModalVisible(false);
  };

  const onFinish = (data: any) => {
    const newData = { ...nodeData };
    const newInfos = [
      {
        ...data,
        itemCategory: planItemTypes.diagnosis,
      },
    ];
    if (Array.isArray(newData.followUpItems)) {
      newData.followUpItems = [...newData.followUpItems, ...newInfos];
    } else {
      newData.followUpItems = newInfos;
    }
    setPlanMapState('update', newData.path, newData);
    setIsModalVisible(false);
  };

  const defaultValue: any = {};
  return (
    <Modal title="添加跟进记录表" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} width={600}>
      <Form
        form={form}
        name="basic"
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 16 }}
        initialValues={defaultValue}
        onFinish={onFinish}
        hideRequiredMark={true}
        autoComplete="off"
      >
        <Form.Item
          label="项目名称"
          name="itemName"
          rules={[{ required: true, message: '该字段为必填项' }]}
        >
          <Input style={{ width: '100%' }} placeholder="请输入" />
        </Form.Item>
        <Form.Item
          label="提示说明"
          name="remark"
        >
          <Input.TextArea style={{ width: '100%' }} placeholder="请输入" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default React.forwardRef(AddDiagnosisModal);
