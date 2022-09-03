import React, { useState, useImperativeHandle, useContext, useRef, useEffect } from 'react';
import { Modal, Form, Input, Select, Row, Col, Popover, InputNumber } from '@sinohealth/butterfly-ui-components/lib';
import { Link } from 'react-router-dom';
import { planMapContext } from '@/pages/planMapEditor';
import { planItemTypes } from '@/pages/planMapEditor/config';
import LabelSelect from '@/components/LabelSelect';
import BaseList from '@/components/BaseList';
import { httpGetContent } from '@/services/project';

import style from './index.less';
import styles from '@/pages/project/articleLibrary/index.less';
import PreviewDrawer from '@/pages/project/articleLibrary/components/PreviewDrawer';

const PopoverContent = (record: ProjectType.ContentRes) => {
  return (
    <div className={styles.sortDom}>
      {record.labelVoList.map((el, ids) => (
        <div className={styles.tag} key={el.id}>
          {el.name}
        </div>
      ))}
    </div>
  );
};

export const ArticleSettingContent = (props: any) => {
  const { isMini, form, onFinish, formValue = {}, ...otherProps } = props;
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewData, setPreviewData] = useState<any>({});
  const { disabled } = useContext(planMapContext);
  const list = useRef<any>();
  useEffect(() => {
    if (formValue) {
      form.setFieldsValue(formValue);
      list.current?.fetchListData({
        current: 1,
        notContainsLabelIds: formValue.exclusive,
        labelIds: formValue.include,
      });
    }
  }, [formValue]);

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
      title: '标签',
      dataIndex: 'weight',
      key: 'weight',
      width: 200,
      render(text: string, record: ProjectType.ContentRes, index: number) {
        if (!record.status) {
          return '--';
        }
        return (
          <Popover
            trigger="click"
            content={record.labelVoList.length > 2 ? () => PopoverContent(record) : ''}
          >
            <div
              className={`${styles.sortDom} ${record.labelVoList.length > 2 ? styles.pointer : ''}`}
            >
              {record.labelVoList.length
                ? record.labelVoList.map((el, ids) =>
                  ids < 2 ? (
                    <div className={styles.tag} key={el.id}>
                      {el.name}
                    </div>
                  ) : null,
                )
                : '--'}
            </div>
          </Popover>
        );
      },
    },
    {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      width: 60,
      render(text: string, record: any) {
        return <a onClick={() => handleShowDetail(record)}>查看</a>;
      },
    },
  ];

  const handleShowDetail = (data: any) => {
    setPreviewVisible(true);
    setPreviewData({
      title: data.title,
      htmlCont: data.content,
      author: data.author,
      updateTime: data.updateTime,
    });
  };
  const getDefaultParams = () => {
    return Promise.resolve({
      notContainsLabelIds: formValue.exclusive,
      labelIds: formValue.include,
    });
  };
  const onFinishFn = (data: any) => {
    onFinish && onFinish(data);
  };
  const AcNumber = (p: any) => {
    const { value, onChange } = p;
    return (
      <div>
        本周期推送 <InputNumber disabled={disabled} value={value} onChange={onChange} style={{ width: '80px' }} min={1} /> 篇患教文章
      </div>
    );
  };
  const defaultValue: any = {};

  const fetchAPi = (params: { current: any }) => {
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

  const ListBody = (data: any) => {
    return (
      <div className={style.customList}>
        {data.listData?.map((item: any) => {
          return (
            <div className={style.listItem} onClick={() => handleShowDetail(item)}>
              · { item.title }
            </div>
          );
        })}
        { data.listData.length === 0 && '暂无数据'}
      </div>
    );
  };
  const listBodyProps = isMini ? { Body: ListBody, paginationOptions: { simple: true } } : {};
  const onFieldsChange = (changeFields: any) => {
    const values = form.getFieldsValue(['include', 'exclusive']);
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
      hideRequiredMark={true}
      initialValues={defaultValue}
      onFieldsChange={onFieldsChange}
      onFinish={onFinishFn}
      autoComplete="off"
      layout={isMini ? 'vertical' : 'horizontal'}
      {...otherProps}
    >
      <Row>
        <Col span={isMini ? 24 : 12}>
          <Form.Item
            label="包含标签"
            name="include"
            rules={[{ required: true, message: '该字段为必填项' }]}
          >
            <LabelSelect disabled={disabled} mode="multiple" placeholder="请选择包含的标签" />
          </Form.Item>
        </Col>
        <Col span={isMini ? 24 : 12}>
          <Form.Item
            label="不包含标签"
            name="exclusive"
          >
            <LabelSelect disabled={disabled} mode="multiple" placeholder="请选择不包含的标签" />
          </Form.Item>
        </Col>
      </Row>
      <div className={style.listBox}>
        <BaseList
          ListTitle="筛选结果"
          fetchApi={fetchAPi}
          columns={columns}
          list={list}
          getDefaultParams={getDefaultParams}
          BodyProps={{ scroll: { y: 240 } }}
          {...listBodyProps}
        />
      </div>
      <br />
      <div className="but-title">
        推送规则
      </div>
      <Form.Item
        name="pushNum"
        rules={[{ required: true, message: '该字段为必填项' }]}
      >
        <AcNumber />
      </Form.Item>
      <PreviewDrawer visible={previewVisible} {...previewData} onClose={() => setPreviewVisible(false)} />
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
    form.resetFields();
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
        itemCategory: planItemTypes.article,
        itemName: '患教文章',
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

  return (
    <Modal title="添加患教文章" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} width={800}>
      <div className="but-title">
        患教文章筛选条件
      </div>
      <div>
        <ArticleSettingContent nodeData={nodeData} form={form} onFinish={onFinish} />
      </div>
    </Modal>
  );
};

export default React.forwardRef(AddArticleModal);
