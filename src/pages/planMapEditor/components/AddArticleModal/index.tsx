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

export const ArticleSettingContent = (props: any) => {
  const { nodeData, isMini, form, onFinish } = props;
  const [labelOptions, setLabelOptions] = useState<any>(labelMock);
  const [articles, setArticles] = useState<any>([]);
  const onFinishFn = (data: any) => {
    const newData = { ...nodeData };
    const newInfos = [
      {
        ...data,
        itemCategory: planItemTypes.article,
        itemName: '患教文章',
      },
    ];
    if (Array.isArray(newData.infos)) {
      newData.followUpItems = [...newData.infos, ...newInfos];
    } else {
      newData.followUpItems = newInfos;
    }
    onFinish && onFinish(newData);
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
    <Form
      form={form}
      name="basic"
      labelCol={{ span: isMini ? 24 : 6 }}
      wrapperCol={{ span: isMini ? 24 : 16 }}
      labelAlign="left"
      initialValues={defaultValue}
      onFinish={onFinishFn}
      hideRequiredMark={true}
      autoComplete="off"
      layout={isMini ? 'vertical' : 'horizontal'}
    >
      <Row>
        <Col span={isMini ? 24 : 12}>
          <Form.Item
            label="包含标签"
            name="includeLabel"
            rules={[{ required: true, message: '该字段为必填项' }]}
          >
            <Select style={{ width: '100%' }} mode="multiple" options={labelOptions} />
          </Form.Item>
        </Col>
        <Col span={isMini ? 24 : 12}>
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
  );
};
const AddArticleModal = (props: any, ref: any) => {
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
  };

  const handleOk = () => {
    form.submit();
  };

  const handleCancel = () => {
    setPlanMapState([...planMapState]);
    setIsModalVisible(false);
  };

  const onFinish = (newData: any) => {
    setPlanMapState('update', newData.path, newData);
    setIsModalVisible(false);
  };

  return (
    <Modal title="添加患教文章" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} width={800}>
      <div className="but-title">
        患教文章筛选条件
      </div>
      <div>
        <ArticleSettingContent form={form} onFinish={onFinish} />
      </div>
    </Modal>
  );
};

export default React.forwardRef(AddArticleModal);
