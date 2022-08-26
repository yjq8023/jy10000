import React, { useState, useImperativeHandle, useContext, useRef, useEffect } from 'react';
import { Modal, Form, Input, Select, Row, Col, Table, InputNumber } from '@sinohealth/butterfly-ui-components/lib';
import { Link } from 'react-router-dom';
import { planMapContext } from '@/pages/planMapEditor';
import { planItemTypes } from '@/pages/planMapEditor/config';
import LabelSelect from '@/pages/project/components/LabelSelect';
import BaseList from '@/components/BaseList';
import { httpGetContent } from '@/services/project';

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
    dataIndex: 'index',
    key: 'index',
    render(text: string, record: any, index: number): JSX.Element {
      return <span>{index + 1}</span>;
    },
    width: 90,
  },
  {
    title: '标题',
    dataIndex: 'title',
    key: 'title',
  },
  {
    title: '操作',
    dataIndex: 'action',
    key: 'action',
    width: 60,
    render() {
      return <Link to="a/detail">查看</Link>;
    },
  },
];

export const ArticleSettingContent = (props: any) => {
  const { nodeData, isMini, form, onFinish } = props;
  const [labelOptions, setLabelOptions] = useState<any>(labelMock);
  const [articles, setArticles] = useState<any>([]);
  const list = useRef<any>();
  useEffect(() => {
    if (list.current) {
      // list.current.setPagination({
      //   ...list.current.pagination,
      //   pageSize: 5,
      // });
    }
  }, [list]);
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

  const fetchAPi = (params: { current: any }) => {
    console.log('params');
    console.log(params);
    return httpGetContent({
      pageNo: params.current,
      ...params,
    }).then((res: any) => {
      return {
        listData: res.data,
        pagination: {
          current: res.pageNo,
          pageSize: res.pageSize,
          total: res.totalCount,
        },
      };
    });
  };

  const handleLabelSelect = (key: string, value: any) => {
    form.setFieldsValue({
      [key]: value,
    });
    const values = form.getFieldsValue(['include', 'exclusive']);
    console.log(values);
    list.current?.fetchListData({
      current: 1,
      notContainsLabelIds: values.exclusive,
      labelIds: values.include,
    });
  };

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
            name="include"
            rules={[{ required: true, message: '该字段为必填项' }]}
          >
            <LabelSelect
              search={false}
              onSelect={(v) => handleLabelSelect('include', v)}
            />
          </Form.Item>
        </Col>
        <Col span={isMini ? 24 : 12}>
          <Form.Item
            label="不包含标签"
            name="exclusive"
          >
            <LabelSelect
              search={false}
              onSelect={(v) => handleLabelSelect('exclusive', v)}
            />
          </Form.Item>
        </Col>
      </Row>

      <div className="but-title">
        筛选结果
      </div>
      <div>
        <BaseList
          ListTitle="筛选结果"
          fetchApi={fetchAPi}
          columns={columns}
          list={list}
          BodyProps={{ scroll: { y: 240 } }}
        />
      </div>

      <div className="but-title">
        推送规则
      </div>
      <Form.Item
        name="pushNum"
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
