import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Button, message } from '@sinohealth/butterfly-ui-components/lib';
import { useDict } from '@/hooks/useDict';
import BaseList, { useList } from '@/components/BaseList';
import AddDrugRecordModal from './components/AddDrugRecordModal';
import { getPatientDrugRecordList, deleteMechanism } from '@/services/patient';
import ConfirmModel from '@/components/Confirm';

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
  const getDictLabel = (key: string, value: string) => {
    if (dict && dict[key]) {
      const d = dict[key].filter((item: any) => item.code === value);
      if (d && d[0]) return d[0].name;
    }
    return '--';
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
  const handleDelete = (itemData: any) => {
    ConfirmModel({
      fun: 'error',
      title: '是否确定删除该用药记录？',
      centered: true,
      // icon: <QuestionCircleTwoTone twoToneColor="#FFBF00" />,
      onOk: async () => {
        deleteMechanism(itemData.id)
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
        <a onClick={() => handleEditRecord(itemData)}>编辑</a>
        &nbsp;
        &nbsp;
        <a onClick={() => handleDelete(itemData)}>删除</a>
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
        return <span>{text}{getDictLabel('useNumUnit', record.useNumUnit)}</span>;
      },
    },
    {
      title: '单次用量',
      dataIndex: 'singleDosage',
      key: 'singleDosage',
      render(text: string, record: any): JSX.Element {
        return <span>{text}{getDictLabel('singleDosageUnit', record.singleDosageUnit)}</span>;
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
        return <span className="text-ellipsis">{text}</span>;
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
