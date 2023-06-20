import React from 'react';
import { Table } from 'antd';

const ClassSchedule = () => {
  const dataSource = [
    {
      index: '06:00',
    },
    {
      index: '07:00',
    },
    {
      index: '08:00',
    },
  ];

  const columns = [
    {
      title: '',
      dataIndex: 'index',
      key: 'index',
      width: 120,
    },
    {
      title: '2-2',
      dataIndex: '2-2',
      key: '2-2',
    },
    {
      title: '2-3',
      dataIndex: '2-3',
      key: '2-3',
    },
    {
      title: '2-4',
      dataIndex: '2-34',
      key: '2-34',
    },
    {
      title: '2-5',
      dataIndex: '2-5',
      key: '2-5',
    },
    {
      title: '2-6',
      dataIndex: '2-6',
      key: '2-6',
    },
    {
      title: '2-7',
      dataIndex: '2-6',
      key: '2-6',
    },
    {
      title: '2-8',
      dataIndex: '2-6',
      key: '2-6',
    },
  ];
  return (
    <Table dataSource={dataSource} columns={columns} pagination={false} bordered size="small" />
  );
};

export default ClassSchedule;
