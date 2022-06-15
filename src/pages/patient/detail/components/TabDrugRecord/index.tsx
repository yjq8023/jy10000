import React from 'react';
import { Button } from '@sinohealth/butterfly-ui-components/lib';
import BaseList, { useList } from '@/components/BaseList';

function TabDrugRecord() {
  const list = useList();
  const fetchAPi = (params: any) => {
    console.log('params');
    console.log(params);
    return new Promise<{listData: any[], pagination: any}>((res) => {
      // @ts-ignore
      const data = [
        { name: '小红', age: 1, id: 1 },
        { name: '小绿', age: 2, id: 2 },
        { name: '小绿', age: 2, id: 3 },
        { name: '小绿', age: 2, id: 4 },
        { name: '小绿', age: 2, id: 5 },
        { name: '小绿', age: 2, id: 6 },
        { name: '小绿', age: 2, id: 7 },
        { name: '小绿', age: 2, id: 8 },
        { name: '小绿', age: 2, id: 9 },
      ];
      res({
        listData: data,
        pagination: {
          current: params.current,
          pageSize: 10,
          total: 100,
        },
      });
    });
  };
  const Toolbar = () => {
    return <Button type="primary">增加用药记录</Button>;
  };
  const renderActionDom = (itemData: any) => {
    return (
      <div>
        <a>编辑</a>
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
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '药品名称',
      dataIndex: 'sort',
      key: 'sort',
    },
    {
      title: '服用方法',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: '服用次数',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: '单次用量',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: '规格',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: '开始用药时间',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: '结束用药时间',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: '备注',
      dataIndex: 'status',
      key: 'status',
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
    </div>
  );
}

export default TabDrugRecord;
