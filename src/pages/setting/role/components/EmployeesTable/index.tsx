import React, { useEffect, useState } from 'react';
import {
  Form,
  Row,
  Col,
  Button,
  Input,
  Select,
  Checkbox,
  Slider,
  Table,
  Badge,
} from '@sinohealth/butterfly-ui-components/lib';
import { PlusCircleOutlined, UpSquareOutlined } from '@ant-design/icons';
import ListPage, { paginationType, useList } from '@/components/BaseList';
import style from '../../index.less';
import SimpleModal from '@/components/SimpleModal';
import { getPageUserInfo } from '@/services/setting';
import { roleEmployeePage } from '@/services/customer';

const { Option } = Select;

const EmployeesTable = (props: any = {}) => {
  const list = useList();
  const fetchAPi = (params: any) => {
    console.log(params);
    return roleEmployeePage({
      ...params,
      pageNo: params.current,
      limit: params.pageSize,
      cond: { roleId: props.roleId },
    }).then((res) => {
      console.log(res);
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
  const columns = [
    {
      title: '序号',
      dataIndex: 'index',
      key: 'index',
      width: 90,
      render(text: string, record: any, index: number): JSX.Element {
        return <span>{index + 1}</span>;
      },
    },
    {
      title: '用户账号',
      dataIndex: 'account',
      key: 'account',
    },
    {
      title: '手机号',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: '真实姓名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '所属部门/组织',
      dataIndex: 'department',
      key: 'department',
      render: (_: any, record: any) => record.department.name,
    },
    {
      title: '账号失效期',
      dataIndex: 'expiredTime',
      key: 'expiredTime',
    },
    {
      title: '用户描述',
      dataIndex: 'description',
      key: 'description',
      ellipsis: true,
    },

    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render(text: string, record: any, index: number) {
        const isUp = record.status === 'enabled';
        return (
          <div>
            <Badge color={isUp ? '#217ba0' : 'yellow'} text={isUp ? '启用' : '禁用'} />
          </div>
        );
      },
    },
    {
      title: '创建时间',
      width: 180,
      dataIndex: 'createTime',
      key: 'createTime',
    },
  ];
  return (
    <SimpleModal
      visible={props.visible}
      //   closable={false}
      title="员工角色使用列表"
      cancelButtonProps={{ type: 'info' }}
      onOk={() => {
        props.onCancel();
      }}
      width={1200}
      onCancel={() => {
        props.onCancel();
      }}
    >
      <ListPage ListTitle="员工列表" list={list} fetchApi={fetchAPi} columns={columns} />
    </SimpleModal>
  );
};

export default EmployeesTable;
