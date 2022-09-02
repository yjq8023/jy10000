import React, { useState, useImperativeHandle, useContext } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Modal, Form, Input, message } from '@sinohealth/butterfly-ui-components/lib';
import { planMapContext } from '@/pages/planMapEditor';
import { planItemTypes } from '@/pages/planMapEditor/config';
import { saveFollowUpFormInfo } from '@/services/planMapAntForm';

const AddFollowUpModal = (props: any, ref: any) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [nodeData, setNodeData] = useState<any>();
  const { planMapState, setPlanMapState } = useContext(planMapContext);
  const [params] = useSearchParams();
  const projectId = params.get('id');
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
    saveFollowUpFormInfo({
      name: data.name,
      category: 'FOLLOWUP',
      formJson: null,
      projectId,
    }).then((res: any) => {
      const newInfos = [
        {
          itemName: data.name,
          itemCategory: planItemTypes.followUp,
          bizId: res,
        },
      ];
      if (Array.isArray(newData.followUpItems)) {
        newData.followUpItems = [...newData.followUpItems, ...newInfos];
      } else {
        newData.followUpItems = newInfos;
      }
      setPlanMapState('update', newData.path, newData);
      setIsModalVisible(false);
    });
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
          label="记录表名称"
          name="name"
          rules={[{ required: true, message: '该字段为必填项' }]}
        >
          <Input style={{ width: '100%' }} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default React.forwardRef(AddFollowUpModal);
