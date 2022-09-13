import React, { useState, useImperativeHandle, useContext } from 'react';
import { Modal, Form, Input, Row, Col, Button, message, Drawer } from '@sinohealth/butterfly-ui-components/lib';
import { FormRender } from '@sinohealth/butterfly-formily-engine';
import * as components from '@sinohealth/butterfly-formily-components';
import { planMapContext } from '@/pages/planMapEditor';
import { planItemTypes } from '@/pages/planMapEditor/config';
import { httpScaleDetail, httpScalePage } from '@/services/project';
import BaseList from '@/components/BaseList';
import style from './index.less';
import schema from '@/pages/formily/editor/utils/schema';

const FormSelectTable = (p: any) => {
  const { onChange } = p;
  const [drawerData, setDrawerData] = useState<any>({});
  const [drawerOpen, setDrawerOpen] = useState(false);
  const fetchScaleListData = (params: any) => {
    return httpScalePage({
      pageNo: params.current,
      status: 'ENABLE',
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
  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: any) => {
      onChange(selectedRows[0]);
    },
  };
  const SearchForm = (props: any) => {
    return (
      <Form {...props}>
        <Row gutter={20}>
          <Col span={16}>
            <Form.Item name="title">
              <Input placeholder="输入量表名称搜索" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Button type="primary" htmlType="submit">搜索</Button>
          </Col>
        </Row>
      </Form>
    );
  };
  const columns = [
    {
      title: '量表名称',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      width: '60px',
      render(text: string, record: any) {
        return <a onClick={() => handleOpen(record)}>查看</a>;
      },
    },
  ];
  const handleOpen = (record: any) => {
    httpScaleDetail(record.id)
      .then((res: any) => {
        if (res.scaleJson) {
          setDrawerData({
            ...record,
            schema: JSON.parse(res.scaleJson),
          });
        } else {
          setDrawerData(record);
        }
        setDrawerOpen(true);
      });
  };
  return (
    <div className={style.listBox}>
      <BaseList
        ListTitle="搜索结果"
        columns={columns}
        BodyProps={{
          rowSelection: {
            type: 'radio',
            ...rowSelection,
          },
        }}
        fetchApi={fetchScaleListData}
        SearchForm={SearchForm}
      />
      <Drawer title={drawerData.title} placement="right" onClose={() => setDrawerOpen(false)} visible={drawerOpen}>
        { drawerData.schema && (
          <FormRender schema={drawerData.schema?.schema} components={components} />
        )}
        { !drawerData.schema && (
          <div className={style.empty}>暂无内容</div>
        )}
      </Drawer>
    </div>
  );
};

const AddFormModal = (props: any, ref: any) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [nodeData, setNodeData] = useState<any>();
  const { planMapState, setPlanMapState } = useContext(planMapContext);
  const [selectedForm, setSelectedForm] = useState<any>({});
  useImperativeHandle(ref, () => {
    return {
      handleOpen,
      handleOk,
      handleCancel,
    };
  }, []);

  const handleOpen = (node: any) => {
    setNodeData(node);
    setSelectedForm({});
    setIsModalVisible(true);
  };

  const handleOk = () => {
    if (selectedForm.id) {
      onFinish();
    } else {
      message.error('请选择量表');
    }
  };

  const handleCancel = () => {
    setPlanMapState([...planMapState]);
    setIsModalVisible(false);
  };

  const onFinish = () => {
    const newData = { ...nodeData };
    const newInfos = [
      {
        itemName: selectedForm.title,
        bizId: selectedForm.id,
        itemCategory: planItemTypes.form,
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
  const handleSelectForm = (data: any) => {
    setSelectedForm(data);
  };
  return (
    <Modal title="添加医学量表" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} width={800}>
      <div>
        {
          isModalVisible && (
            <FormSelectTable onChange={handleSelectForm} />
          )
        }
      </div>
    </Modal>
  );
};

export default React.forwardRef(AddFormModal);
