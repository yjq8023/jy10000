import React, { useState, useEffect } from 'react';
import { Button, Badge, Switch, Tabs } from '@sinohealth/butterfly-ui-components/lib';
import { PlusCircleOutlined } from '@ant-design/icons';
import BaseList, { useList } from '@/components/BaseList';
import AddColumnModal from './components/AddColumnModal';
import { getColumnsList } from '@/services/weapp';
import { isNull } from '@/utils/validate';

const { TabPane } = Tabs;

const sources = [
  {
    sourceId: 0,
    sourceName: '健康管理服务',
  },
];
function WeappColumn() {
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState<any>();
  const [selectedTab, setSelectedTab] = useState<any>(sources[0].sourceId);
  const list = useList();
  const fetchAPi = (params: any) => {
    console.log('params');
    console.log(params);
    return getColumnsList({
      ...params,
      pageNo: params.current,
    })
      .then((res: any) => {
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
  const Toolbar = () => {
    return <Button type="primary" onClick={handleCreate}><PlusCircleOutlined />新建栏目病种</Button>;
  };
  const renderActionDom = (itemData: any) => {
    return (
      <div>
        <a onClick={() => handleEdit(itemData)}>编辑</a>
        &nbsp;
        &nbsp;
        <a>删除</a>
      </div>
    );
  };
  const columns = [
    {
      title: '序号',
      dataIndex: 'index',
      key: 'index',
      width: 160,
      render(text: string, record: any, index: number): JSX.Element {
        return <span>{index + 1}</span>;
      },
    },
    {
      title: '病种名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '排序',
      dataIndex: 'sort',
      key: 'sort',
      width: 120,
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 160,
      render(text: string, record: any) {
        const isUp = Number(text) === 1;
        return (
          <div>
            <Badge color={isUp ? '#217ba0' : 'yellow'} text={isUp ? '上架' : '下架'} />
            &nbsp;
            <Switch />
          </div>
        );
      },
    },
    {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      width: 160,
      render(text: string, record: any) {
        return renderActionDom(record);
      },
    },
  ];
  const ListTitleRef = (props: any) => {
    const { onChange } = props;
    const onSelectedTab = (val: any) => {
      setTimeout(() => {
        onChange({ parentId: val });
      });
      setSelectedTab(val);
    };
    useEffect(() => {
      if (!isNull(String(selectedTab))) onSelectedTab(selectedTab);
    }, []);
    return (
      <Tabs onChange={onSelectedTab} defaultValue={selectedTab}>
        {
          sources.map((item) => (
            <TabPane tab={item.sourceName} key={item.sourceId} />
          ))
        }
      </Tabs>
    );
  };
  const handleCreate = () => {
    const sourceData = sources[sources.map((item) => item.sourceId).indexOf(selectedTab)];
    setModalData(sourceData);
    setShowModal(true);
  };
  const handleEdit = (data: any) => {
    const sourceData = sources[sources.map((item) => item.sourceId).indexOf(selectedTab)];
    setModalData({
      ...sourceData,
      ...data,
    });
    setShowModal(true);
  };
  const handleCancel = () => {
    setShowModal(false);
  };
  const handleCreated = () => {
    setShowModal(false);
    list.current?.reloadListData();
  };
  return (
    <div>
      <BaseList list={list} ListTitle={ListTitleRef} columns={columns} fetchApi={fetchAPi} Toolbar={Toolbar} fixed />
      {
        showModal && <AddColumnModal data={modalData} onCancel={handleCancel} onOk={handleCreated} />
      }
    </div>
  );
}

export default WeappColumn;
