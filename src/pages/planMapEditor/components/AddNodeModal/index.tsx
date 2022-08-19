import React, { useState, useImperativeHandle, useContext } from 'react';
import { Modal, Form, InputNumber, Select, Radio, message } from '@sinohealth/butterfly-ui-components/lib';
import lodash from 'lodash';
import { planMapContext } from '@/pages/planMapEditor';

const periodUnitOptions = [
  {
    label: '分钟',
    value: 1,
  },
  {
    label: '小时',
    value: 2,
  },
  {
    label: '天',
    value: 3,
  },
  {
    label: '周',
    value: 4,
  },
  {
    label: '月',
    value: 5,
  },
  {
    label: '年',
    value: 6,
  },
];
const AddNodeModal = (props: any, ref: any) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isLoop, setIsLoop] = useState(false);
  const [path, setPath] = useState('');
  const { planMapState, setPlanMapState } = useContext(planMapContext);

  const [form] = Form.useForm();

  useImperativeHandle(ref, () => {
    return {
      handleOpen,
      handleOk,
      handleCancel,
    };
  }, []);

  const handleOpen = (pathStr: string) => {
    setPath(pathStr);
    setIsModalVisible(true);
  };

  const handleOk = () => {
    form.submit();
  };

  const handleCancel = () => {
    setPlanMapState([...planMapState]);
    setIsModalVisible(false);
  };
  // 判断是否存在相同节点
  const isHasSameNode = (item: any, list: any) => {
    const sameNodes = list.filter((i: any) => i.period === item.period);
    // 不存在相同节点，返回false
    if (sameNodes.length === 0) {
      return false;
    }
    // 存在相同节点，且当前新增的节点不是循环节点，返回true
    if (!item.isLoop) {
      return true;
    }
    // 当前新增的节点是循环节点，比较循环参数是否一样
    if (item.isLoop === 1) {
      let isSame = false;
      sameNodes.forEach((sameNode: any) => {
        if (sameNode.loopCount === item.loopCount && sameNode.loopUnit === item.loopUnit) {
          isSame = true;
        }
      });
      return isSame;
    }
    return false;
  };

  const onFinish = (data: any) => {
    const { period } = data;
    const parentNodes: any = [].concat(path ? lodash.get(planMapState, path) : planMapState);
    if (isHasSameNode(data, parentNodes)) {
      message.error(`D+${period}节点已存在，请勿重复添加！`);
      return;
    }
    parentNodes.push(data);
    const newParentNodes = parentNodes.sort((item: any, next: any) => item.period - next.period);
    setPlanMapState('update', path, newParentNodes);
    setIsModalVisible(false);
  };

  const handleFormChange = (values: any) => {
    if (Object.keys(values).indexOf('isLoop') > -1) {
      setIsLoop(values.isLoop === 1);
    }
  };

  const defaultValue: any = {
    periodUnit: 3,
    isLoop: 0,
  };
  return (
    <Modal title="添加节点容器信息" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} width={600}>
      <Form
        form={form}
        name="basic"
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 16 }}
        initialValues={defaultValue}
        onFinish={onFinish}
        onValuesChange={handleFormChange}
        hideRequiredMark={true}
        autoComplete="off"
      >
        <Form.Item
          label="周期数值（天）"
          name="period"
          rules={[{ required: true, message: '该字段为必填项' }]}
        >
          <InputNumber style={{ width: '100%' }} min={1} />
        </Form.Item>
        {/* <Form.Item */}
        {/*  label="周期单位" */}
        {/*  name="periodUnit" */}
        {/*  rules={[{ required: true, message: '该字段为必填项' }]} */}
        {/* > */}
        {/*  <Select style={{ width: '100%' }} options={periodUnitOptions} /> */}
        {/* </Form.Item> */}
        <Form.Item
          label="是否循环"
          name="isLoop"
          rules={[{ required: true, message: '该字段为必填项' }]}
        >
          <Radio.Group>
            <Radio value={0}>否</Radio>
            <Radio value={1}>是</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          label="持续周期数量"
          name="loopCount"
          dependencies={['isLoop']}
          hidden={!isLoop}
          rules={[({ getFieldValue }) => ({
            required: getFieldValue('isLoop') === 1,
            message: '该字段为必填项',
          })]}
        >
          <InputNumber style={{ width: '100%' }} min={1} />
        </Form.Item>
        <Form.Item
          label="持续周期单位"
          name="loopUnit"
          hidden={!isLoop}
          rules={[({ getFieldValue }) => ({
            required: getFieldValue('isLoop') === 1,
            message: '该字段为必填项',
          })]}
        >
          <Select style={{ width: '100%' }} options={periodUnitOptions} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default React.forwardRef(AddNodeModal);
