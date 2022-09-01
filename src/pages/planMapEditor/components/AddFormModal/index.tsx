import React, { useState, useImperativeHandle, useContext, useEffect } from 'react';
import { Modal, Form, Input, Select, Row, Col, Table, Button } from '@sinohealth/butterfly-ui-components/lib';
import { Link } from 'react-router-dom';
import { planMapContext } from '@/pages/planMapEditor';
import { planItemTypes } from '@/pages/planMapEditor/config';
import SearchInput from '@/components/SearchInput';
import { getAiIoComponents } from '@/services/planMapAntForm';

const labelMock = [
  {
    label: 'IO1',
    value: '1',
  },
  {
    label: 'IO2',
    value: '2',
  },
  {
    label: 'IO3',
    value: '3',
  },
  {
    label: 'IO4',
    value: '4',
  },
];

const columns = [
  {
    title: '量表名称',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '操作',
    dataIndex: 'name',
    key: 'name',
    width: '60px',
    render() {
      return <Link to="a/detail">查看</Link>;
    },
  },
];

const FormSelectTable = (p: any) => {
  const { value, onChange } = p;
  const [dataSource, setDataSource] = useState([
    {
      id: '1',
      name: '测试量表',
    },
    {
      id: '11',
      name: '测试量表1',
    },
    {
      id: '12',
      name: '测试量表2',
    },
    {
      id: '13',
      name: '测试量表3',
    },
  ]);
  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: any) => {
      onChange(selectedRows[0]);
    },
  };
  return (
    <div>
      <div style={{ marginBottom: '10px' }}>
        <Row gutter={20}>
          <Col span={16}><SearchInput placeholder="输入量表名称搜索" /></Col>
          <Col span={8}><Button type="primary">搜索</Button></Col>
        </Row>

      </div>
      <div className="but-title">
        搜索结果
      </div>
      <div>
        <Table
          rowKey="id"
          rowSelection={{
            type: 'radio',
            ...rowSelection,
          }}
          columns={columns}
          dataSource={dataSource}
          pagination={false}
        />
      </div>
    </div>
  );
};

const AddFormModal = (props: any, ref: any) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [nodeData, setNodeData] = useState<any>();
  const [labelOptions, setLabelOptions] = useState<any>(labelMock);
  const [articles, setArticles] = useState<any>([]);
  const { projectPlanData, planMapState, setPlanMapState } = useContext(planMapContext);

  const [form] = Form.useForm();

  useImperativeHandle(ref, () => {
    return {
      handleOpen,
      handleOk,
      handleCancel,
    };
  }, []);

  useEffect(() => {
    if (projectPlanData) {
      getAiIoComponents(projectPlanData.projectId)
        .then((res: any) => {
          setLabelOptions(res.map((item: any) => {
            return {
              label: item.label,
              value: item.fieldId,
            };
          }));
        });
    }
  }, [projectPlanData]);

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
        itemName: data.form.name,
        itemCategory: planItemTypes.form,
      },
    ];
    if (Array.isArray(newData.infos)) {
      newData.followUpItems = [...newData.infos, ...newInfos];
    } else {
      newData.followUpItems = newInfos;
    }
    setPlanMapState('update', newData.path, newData);
    setIsModalVisible(false);
  };
  const defaultValue: any = {};
  return (
    <Modal title="添加医学量表" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} width={800}>
      <Form
        form={form}
        name="basic"
        labelCol={{ span: 2 }}
        wrapperCol={{ span: 16 }}
        labelAlign="left"
        initialValues={defaultValue}
        onFinish={onFinish}
        hideRequiredMark={true}
        autoComplete="off"
      >
        <Form.Item
          name="form"
          labelCol={{ span: 0 }}
          wrapperCol={{ span: 24 }}
          rules={[{ required: true, message: '请选择量表' }]}
        >
          <FormSelectTable />
        </Form.Item>
        <Form.Item
          label="关联IO"
          name="io"
        >
          <Select options={labelOptions} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default React.forwardRef(AddFormModal);
