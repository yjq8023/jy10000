import React, { useState } from 'react';
import { Button, Badge, Switch, Tabs, Modal, message } from '@sinohealth/butterfly-ui-components/lib';
import { PlusCircleOutlined } from '@ant-design/icons';
import BaseList, { useList } from '@/components/BaseList';
import AddColumnModal from './components/AddColumnModal';
import { deleteColumn, deleteProject, getColumnsList, setColumnStatus, setProjectStatus } from '@/services/weapp';

const { TabPane } = Tabs;

type sourceItem = {
  sourceId: string,
  sourceName: string,
}
function WeappColumn() {
  const [showModal, setShowModal] = useState(false);
  const [sources, setSources] = useState<sourceItem[]>([]);
  const [modalData, setModalData] = useState<any>();
  const [selectedTab, setSelectedTab] = useState<any>();
  const list: any = useList();
  const getParentColumnsList = () => {
    return getColumnsList({
      parentId: 0,
      type: 'PLATFORM_CATEGORY',
      pageNo: 1,
      pageSize: 999,
    })
      .then((res: any) => {
        if (res.data.length) {
          setSources(res.data.map((item: any) => ({
            sourceName: item.name,
            sourceId: item.id,
          })));
          setSelectedTab(res.data[0].id);
        }
        return res;
      });
  };
  const getDefaultParams = () => {
    return new Promise((reslove, reject) => {
      if (selectedTab !== null && selectedTab !== undefined) {
        reslove({
          parentId: selectedTab,
        });
        return;
      }
      getParentColumnsList()
        .then((res: any) => {
          reslove({
            parentId: res.data[0].id,
          });
        });
    });
  };
  const fetchAPi = (params: any) => {
    return getColumnsList({
      ...params,
      type: 'DISEASE_CATEGORY',
      pageNo: params.current,
    })
      .then((res: any) => {
        return {
          listData: res.data,
          pagination: {
            current: res.pageIndex,
            pageSize: res.pageSize,
            total: res.totalCount,
          },
        };
      });
  };
  const Toolbar = () => {
    return <Button type="primary" onClick={handleCreate}><PlusCircleOutlined />新建栏目病种</Button>;
  };
  const handleDelete = (id: string) => {
    Modal.confirm({
      title: '是否确定删除该病种？',
      content: '',
      onOk() {
        deleteColumn(id)
          .then(() => {
            message.success('删除成功');
            list.current.reloadListData();
          });
      },
    });
  };
  const renderActionDom = (itemData: any) => {
    return (
      <div>
        <a onClick={() => handleEdit(itemData)}>编辑</a>
        &nbsp;
        &nbsp;
        <a onClick={() => handleDelete(itemData.id)}>删除</a>
      </div>
    );
  };
  const setProjectStatusFn = (isUp: any, item: any) => {
    setColumnStatus({
      ...item,
      status: isUp ? 'ENABLE' : 'UNABLE',
    })
      .then(() => {
        message.success(isUp ? '上架成功' : '下架成功');
        list.current.reloadListData();
      });
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
        const isUp = text === 'ENABLE';
        return (
          <div>
            <Badge color={isUp ? '#217ba0' : 'yellow'} text={isUp ? '上架' : '下架'} />
            &nbsp;
            <Switch defaultChecked={isUp} onChange={(e) => setProjectStatusFn(e, record)} />
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
      onChange({ parentId: val });
      setSelectedTab(val);
    };
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
      <BaseList getDefaultParams={getDefaultParams} list={list} ListTitle={ListTitleRef} columns={columns} fetchApi={fetchAPi} Toolbar={Toolbar} fixed />
      {
        showModal && <AddColumnModal data={modalData} onCancel={handleCancel} onOk={handleCreated} />
      }
    </div>
  );
}

export default WeappColumn;
