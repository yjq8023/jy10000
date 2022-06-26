import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Button } from '@sinohealth/butterfly-ui-components/lib';
import { useDict } from '@/hooks/useDict';
import BaseList, { useList } from '@/components/BaseList';
import AddDrugRecordModal from './components/AddDrugRecordModal';
import { getPatientDrugRecordList } from '@/services/patient';

function TabDrugRecord() {
  const list = useList();
  const [searchParams] = useSearchParams();
  const dict = useDict();
  const patientId = searchParams.get('id');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editModalData, setEditModalData] = useState<any>();
  const fetchAPi = (params: any) => {
    return getPatientDrugRecordList({
      ...params,
      patientId,
    }).then((res) => {
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
    return <Button type="primary" onClick={() => setShowAddModal(true)}>增加用药记录</Button>;
  };
  const handleEditRecord = (item: any) => {
    setEditModalData(item);
    setShowAddModal(true);
  };
  const handleEditModalOk = () => {
    list.current.reloadListData();
    handleEditModalCancel();
  };
  const handleEditModalCancel = () => {
    setEditModalData(null);
    setShowAddModal(false);
  };
  const renderActionDom = (itemData: any) => {
    return (
      <div>
        <a onClick={() => handleEditRecord(itemData)}>编辑</a>
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
      render(text: string, record: any, index: number): JSX.Element {
        return <span>{index + 1}</span>;
      },
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
    },
    {
      title: '药品名称',
      dataIndex: 'medicineName',
      key: 'medicineName',
    },
    {
      title: '服用方法',
      dataIndex: 'useWay',
      key: 'useWay',
      render(text: string): JSX.Element {
        return dict.drugUsage[text];
      },
    },
    {
      title: '服用次数',
      dataIndex: 'useNum',
      key: 'useNum',
      render(text: string, record: any): JSX.Element {
        return <span>{text} {dict.useNumUnit[record.useNumUnit]}</span>;
      },
    },
    {
      title: '单次用量',
      dataIndex: 'singleDosage',
      key: 'singleDosage',
      render(text: string, record: any): JSX.Element {
        return <span>{text} {dict.singleDosageUnit[record.singleDosageUnit]}</span>;
      },
    },
    {
      title: '规格',
      dataIndex: 'spec',
      key: 'spec',
    },
    {
      title: '开始用药时间',
      dataIndex: 'startUseTime',
      key: 'startUseTime',
    },
    {
      title: '结束用药时间',
      dataIndex: 'endUseTime',
      key: 'endUseTime',
    },
    {
      title: '备注',
      dataIndex: 'remark',
      key: 'remark',
      render(text: string) {
        return <span className="text-ellipsis">{text}asdasdasdasdasdasdaasdasdsasadsasdasdasfasd</span>;
      },
    },
    {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      render(text: string, record: any) {
        return renderActionDom(record);
      },
    },
  ];
  return (
    <div>
      <BaseList list={list} ListTitle="用药记录列表" fetchApi={fetchAPi} Toolbar={Toolbar} columns={columns} />
      {showAddModal && <AddDrugRecordModal data={editModalData} onCancel={handleEditModalCancel} onOk={handleEditModalOk} />}
    </div>
  );
}

export default TabDrugRecord;
