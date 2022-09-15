import React, { useState, useImperativeHandle, useContext } from 'react';
import { Modal, Form, InputNumber, Select, Radio, message, Row, Col } from '@sinohealth/butterfly-ui-components/lib';
import lodash from 'lodash';
import moment from 'moment';
import { planMapContext } from '@/pages/planMapEditor';
import { useDict } from '@/hooks/useDict';
import { timeUnitToMomentUnit, timeUnitToShowUnit } from '@/pages/planMapEditor/config';

// 将周期转为具体时间，以当前时间加上周期11
const getTriggerNumberToDay = (number: number, type: string) => {
  // @ts-ignore
  return moment(moment().format('YYYY-MM-DD')).add(number, timeUnitToMomentUnit[type]);
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
    form.resetFields();
    setIsLoop(false);
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
    // 需要比较的字段
    const keys = ['durationTimeUnit', 'durationTimes', 'loop', 'triggerNumber', 'triggerTimeUnit'];
    const sameNodes = list.filter((i: any) => {
      let isSame = true;
      keys.forEach((key) => {
        // eslint-disable-next-line eqeqeq
        if (item[key] != i[key]) {
          isSame = false;
        }
      });
      return isSame;
    });
    return sameNodes.length > 0;
  };

  const onFinish = (data: any) => {
    const { triggerNumber } = data;
    const parentNodes: any = [].concat(path ? lodash.get(planMapState, path) : planMapState);
    if (isHasSameNode(data, parentNodes)) {
      message.error(`${timeUnitToShowUnit[data.triggerTimeUnit]}+${triggerNumber}节点已存在，请勿重复添加！`);
      return;
    }
    parentNodes.push({
      ...data,
      followUpItems: [],
    });
    const newParentNodes = parentNodes.sort((item: any, next: any) => {
      const itemDay = getTriggerNumberToDay(item.triggerNumber, item.triggerTimeUnit);
      const nextDay = getTriggerNumberToDay(next.triggerNumber, next.triggerTimeUnit);
      const res: number = itemDay.valueOf() - nextDay.valueOf();
      if (res === 0) {
        return next.loop ? -1 : 1;
      }
      return res;
    });
    setPlanMapState('update', path, newParentNodes);
    setIsModalVisible(false);
  };

  const handleFormChange = (values: any) => {
    if (Object.keys(values).indexOf('loop') > -1) {
      setIsLoop(values.loop);
    }
  };
  const defaultUnit = dict?.DateUnit && dict?.DateUnit[dict.DateUnit.length - 1].code;
  const defaultValue: any = {
    triggerTimeUnit: defaultUnit,
    durationTimeUnit: defaultUnit,
    loop: false,
  };
  return (
    <Modal title="添加节点容器信息" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} width={600}>
      <Form
        form={form}
        name="basic"
        labelCol={{ span: 10 }}
        wrapperCol={{ span: 14 }}
        initialValues={defaultValue}
        onFinish={onFinish}
        onValuesChange={handleFormChange}
        autoComplete="off"
      >
        <Row>
          <Col span={15}>
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
          </Col>
        </Row>
        <Row gutter={14}>
          <Col span={15}>
            <Form.Item
              label={!loop ? '周期数值' : '循环间隔多久一次'}
              name="triggerNumber"
              rules={[{ required: true, message: '该字段为必填项' }]}
            >
              <InputNumber placeholder="请输入数值" style={{ width: '100%' }} min={1} />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              label="周期单位"
              name="triggerTimeUnit"
              noStyle
              rules={[{ required: true, message: '该字段为必填项' }]}
            >
              <Select placeholder="单位" style={{ width: '100%' }} options={dict?.DateUnit?.map((item: any) => ({ label: item.name, value: item.code }))} />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={14}>
          <Col span={15}>
            <Form.Item
              label="循环持续时长"
              name="durationTimes"
              dependencies={['loop']}
              hidden={!loop}
              rules={[{ required: loop, message: '该字段为必填项' }]}
            >
              <InputNumber placeholder="请输入数值" style={{ width: '100%' }} min={1} />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              label="持续周期单位"
              name="durationTimeUnit"
              hidden={!loop}
              noStyle
              rules={[{ required: loop, message: '该字段为必填项' }]}
            >
              <Select placeholder="单位" style={{ width: '100%' }} options={dict?.DateUnit?.map((item: any) => ({ label: item.name, value: item.code }))} />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default React.forwardRef(AddNodeModal);
