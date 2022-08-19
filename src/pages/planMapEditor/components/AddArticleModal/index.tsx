import React, { useState, useImperativeHandle, useContext } from 'react';
import { Modal, Form, Input, Select, Row, Col, Table, InputNumber } from '@sinohealth/butterfly-ui-components/lib';
import { Link } from 'react-router-dom';
import { planMapContext } from '@/pages/planMapEditor';
import { planItemTypes } from '@/pages/planMapEditor/config';

const labelMock = [
  {
    label: '标签1',
    value: '1',
  },
  {
    label: '标签2',
    value: '2',
  },
  {
    label: '标签3',
    value: '3',
  },
  {
    label: '标签4',
    value: '4',
  },
];

const columns = [
  {
    title: '序号',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '标题',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '操作',
    dataIndex: 'name',
    key: 'name',
    render() {
      return <Link to="a/detail">查看</Link>;
    },
  },
];
const AddArticleModal = (props: any, ref: any) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [nodeData, setNodeData] = useState<any>();
  const [labelOptions, setLabelOptions] = useState<any>(labelMock);
  const [articles, setArticles] = useState<any>([]);
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
        type: planItemTypes.article,
        name: '患教文章',
      },
    ];
    if (Array.isArray(newData.infos)) {
      newData.infos = [...newData.infos, ...newInfos];
    } else {
      newData.infos = newInfos;
    }
    console.log('newData');
    console.log(newData);
    setPlanMapState('update', newData.path, newData);
    setIsModalVisible(false);
  };
  const AcNumber = (p: any) => {
    const { value, onChange } = p;
    return (
      <div>
        本周期推送 <InputNumber value={value} onChange={onChange} style={{ width: '100px' }} min={1} /> 篇患教文章
      </div>
    );
  };
  const defaultValue: any = {};
  return (
    <Modal title="添加患教文章" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} width={800}>
      <div className="but-title">
        患教文章筛选条件
      </div>
      <Form
        form={form}
        name="basic"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 16 }}
        labelAlign="left"
        initialValues={defaultValue}
        onFinish={onFinish}
        hideRequiredMark={true}
        autoComplete="off"
      >
        <Row>
          <Col span={12}>
            <Form.Item
              label="包含标签"
              name="includeLabel"
              rules={[{ required: true, message: '该字段为必填项' }]}
            >
              <Select style={{ width: '100%' }} mode="multiple" options={labelOptions} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="不包含标签"
              name="noIncludeLabel"
            >
              <Select style={{ width: '100%' }} mode="multiple" options={labelOptions} />
            </Form.Item>
          </Col>
        </Row>

        <div className="but-title">
          筛选结果
        </div>
        <div>
          <Table columns={columns} dataSource={articles} />
        </div>

        <div className="but-title">
          推送规则
        </div>
        <Form.Item
          name="quantity"
          rules={[{ required: true, message: '该字段为必填项' }]}
        >
          <AcNumber />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default React.forwardRef(AddArticleModal);
