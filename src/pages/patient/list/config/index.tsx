import React from 'react';
import { Link } from 'react-router-dom'

export const columns = [
  {
    title: '序号',
    dataIndex: 'index',
    key: 'index',
    render(text: string, record: any, index: number): JSX.Element {
      return <span>{index + 1}</span>;
    },
  },
  {
    title: '档案号',
    dataIndex: 'number',
    key: 'number',
  },
  {
    title: '患者姓名',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '患者性别',
    dataIndex: 'sex',
    key: 'sex',
    render(text: string): JSX.Element {
      return <div>{text === 'female' ? '女' : '男'}</div>;
    },
  },
  {
    title: '患者年龄',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: '患者电话',
    dataIndex: 'phone',
    key: 'phone',
  },
  {
    title: '微信绑定',
    dataIndex: 'wxBindStatus',
    key: 'wxBindStatus',
    render(text: string): JSX.Element {
      return <div>{text === '1' ? '已绑定' : '未绑定'}</div>;
    },
  },
  {
    title: '主要诊断',
    dataIndex: 'mainDisease',
    key: 'mainDisease',
    render(text: string): JSX.Element {
      return <div className="text-ellipsis">{text}</div>;
    },
  },
  {
    title: '管理项目',
    dataIndex: 'diseaseProjectName',
    key: 'diseaseProjectName',
  },
  {
    title: '个案管理师',
    dataIndex: 'caseManager',
    key: 'caseManager',
  },
  {
    title: '操作',
    dataIndex: 'action',
    key: 'action',
    render(text: string, record: any) {
      return <Link to={`/patient/detail?id=${record.id}`}>查看详情</Link>;
    },
  },
];

export default {
  columns
}
