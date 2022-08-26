import React, { useState, useImperativeHandle, useContext } from 'react';
import { Modal, Form, InputNumber, Select, Radio, message } from '@sinohealth/butterfly-ui-components/lib';
import lodash from 'lodash';
import { planMapContext } from '@/pages/planMapEditor';

const triggerNumberUnitOptions = [
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
  const [loop, setIsLoop] = useState(false);
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
    console.log(pathStr);
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
    const sameNodes = list.filter((i: any) => i.triggerNumber === item.triggerNumber);
    // 不存在相同节点，返回false
    if (sameNodes.length === 0) {
      return false;
    }
    // 存在相同节点，且当前新增的节点不是循环节点，返回true
    if (!item.loop) {
      return true;
    }
    // 当前新增的节点是循环节点，比较循环参数是否一样
    if (item.loop === 1) {
      let isSame = false;
      sameNodes.forEach((sameNode: any) => {
        if (sameNode.durationTimes === item.durationTimes && sameNode.durationTimeUnit === item.durationTimeUnit) {
          isSame = true;
        }
      });
      return isSame;
    }
    return false;
  };

  const onFinish = (data: any) => {
    const { triggerNumber } = data;
    const parentNodes: any = [].concat(path ? lodash.get(planMapState, path) : planMapState);
    if (isHasSameNode(data, parentNodes)) {
      message.error(`D+${triggerNumber}节点已存在，请勿重复添加！`);
      return;
    }
    parentNodes.push(data);
    const newParentNodes = parentNodes.sort((item: any, next: any) => item.triggerNumber - next.triggerNumber);
    setPlanMapState('update', path, newParentNodes);
    setIsModalVisible(false);
  };

  const handleFormChange = (values: any) => {
    if (Object.keys(values).indexOf('loop') > -1) {
      setIsLoop(values.loop === 1);
    }
  };

  const defaultValue: any = {
    triggerTimeUnit: 3,
    loop: 0,
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
          name="triggerNumber"
          rules={[{ required: true, message: '该字段为必填项' }]}
        >
          <InputNumber style={{ width: '100%' }} min={1} />
        </Form.Item>
        {/* <Form.Item */}
        {/*  label="周期单位" */}
        {/*  name="triggerTimeUnit" */}
        {/*  rules={[{ required: true, message: '该字段为必填项' }]} */}
        {/* > */}
        {/*  <Select style={{ width: '100%' }} options={triggerNumberUnitOptions} /> */}
        {/* </Form.Item> */}
        <Form.Item
          label="是否循环"
          name="loop"
          rules={[{ required: true, message: '该字段为必填项' }]}
        >
          <Radio.Group>
            <Radio value={0}>否</Radio>
            <Radio value={1}>是</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          label="持续周期数量"
          name="durationTimes"
          dependencies={['loop']}
          hidden={!loop}
          rules={[({ getFieldValue }) => ({
            required: getFieldValue('loop') === 1,
            message: '该字段为必填项',
          })]}
        >
          <InputNumber style={{ width: '100%' }} min={1} />
        </Form.Item>
        <Form.Item
          label="持续周期单位"
          name="durationTimeUnit"
          hidden={!loop}
          rules={[({ getFieldValue }) => ({
            required: getFieldValue('loop') === 1,
            message: '该字段为必填项',
          })]}
        >
          <Select style={{ width: '100%' }} options={triggerNumberUnitOptions} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default React.forwardRef(AddNodeModal);
