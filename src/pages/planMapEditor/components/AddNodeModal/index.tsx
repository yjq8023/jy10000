import React, { useState, useImperativeHandle, useContext } from 'react';
import { Modal, Form, InputNumber, Select, Radio, message } from '@sinohealth/butterfly-ui-components/lib';
import lodash from 'lodash';
import moment from 'moment';
import { planMapContext } from '@/pages/planMapEditor';
import { useDict } from '@/hooks/useDict';
import { timeUnitToMomentUnit, timeUnitToShowUnit } from '@/pages/planMapEditor/config';

// 将周期转为具体时间，以当前时间加上周期
const getTriggerNumberToDay = (number: number, type: string) => {
  // @ts-ignore
  return moment().add(number, timeUnitToMomentUnit[type]);
};

const AddNodeModal = (props: any, ref: any) => {
  getTriggerNumberToDay(1, 'days');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loop, setIsLoop] = useState(false);
  const [path, setPath] = useState('');
  const { planMapState, setPlanMapState } = useContext(planMapContext);
  const dict = useDict();
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
    const sameNodes = list.filter((i: any) => {
      return JSON.stringify(item) === JSON.stringify(i);
    });
    return sameNodes.length > 0;
    // // 不存在相同节点，返回false
    // if (sameNodes.length === 0) {
    //   return false;
    // }
    // // 存在相同节点，且当前新增的节点不是循环节点，返回true
    // if (!item.loop) {
    //   return true;
    // }
    // // 当前新增的节点是循环节点，比较循环参数是否一样
    // if (item.loop) {
    //   let isSame = false;
    //   sameNodes.forEach((sameNode: any) => {
    //     if (sameNode.durationTimes === item.durationTimes && sameNode.durationTimeUnit === item.durationTimeUnit) {
    //       isSame = true;
    //     }
    //   });
    //   return isSame;
    // }
    // return false;
  };

  const onFinish = (data: any) => {
    const { triggerNumber } = data;
    const parentNodes: any = [].concat(path ? lodash.get(planMapState, path) : planMapState);
    if (isHasSameNode(data, parentNodes)) {
      message.error(`${timeUnitToShowUnit[data.triggerTimeUnit]}+${triggerNumber}节点已存在，请勿重复添加！`);
      return;
    }
    parentNodes.push(data);
    const newParentNodes = parentNodes.sort((item: any, next: any) => {
      const itemDay = getTriggerNumberToDay(item.triggerNumber, item.triggerTimeUnit);
      const nextDay = getTriggerNumberToDay(next.triggerNumber, next.triggerTimeUnit);
      return nextDay.isBefore(itemDay) ? 1 : -1;
    });
    setPlanMapState('update', path, newParentNodes);
    setIsModalVisible(false);
  };

  const handleFormChange = (values: any) => {
    if (Object.keys(values).indexOf('loop') > -1) {
      setIsLoop(values.loop);
    }
  };
  const defaultValue: any = {
    triggerTimeUnit: 'DAYS',
    loop: false,
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
          label="周期数值"
          name="triggerNumber"
          rules={[{ required: true, message: '该字段为必填项' }]}
        >
          <InputNumber style={{ width: '100%' }} min={1} />
        </Form.Item>
        <Form.Item
          label="周期单位"
          name="triggerTimeUnit"
          rules={[{ required: true, message: '该字段为必填项' }]}
        >
          <Select style={{ width: '100%' }} options={dict?.DateUnit?.map((item: any) => ({ label: item.name, value: item.code }))} />
        </Form.Item>
        <Form.Item
          label="是否循环"
          name="loop"
          rules={[{ required: true, message: '该字段为必填项' }]}
        >
          <Radio.Group>
            <Radio value={false}>否</Radio>
            <Radio value={true}>是</Radio>
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
          <Select style={{ width: '100%' }} options={dict?.DateUnit?.map((item: any) => ({ label: item.name, value: item.code }))} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default React.forwardRef(AddNodeModal);
