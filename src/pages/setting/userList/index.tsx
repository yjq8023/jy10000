import React, { useState } from 'react';
import { Badge, Button, Switch } from '@sinohealth/butterfly-ui-components/lib';
import { PlusCircleOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import ListPage, { paginationType, useList } from '@/components/BaseList';
import SearchForm from './components/SearchForm';
import UserForm from './components/UserForm';
import { getPageChain, getPageUserInfo } from '@/services/setting';

function UserList() {
  const list = useList();
  const [showUserForm, setShowUserForm] = useState(false);
  const fetchAPi = (params: any) => {
    console.log('params');
    console.log(params);
    return getPageUserInfo(params).then((res) => {
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
  const renderActionDom = (itemData: any) => {
    return (
      <div>
        <a>编辑</a>
        &nbsp; &nbsp;
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
      title: '用户名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '用户账号',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
    },
    {
      title: '所属机构',
      dataIndex: 'chainName',
      key: 'chainName',
    },
    {
      title: '用户角色',
      dataIndex: 'roleName',
      key: 'roleName',
    },
    {
      title: '用户职称',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: '职称级别',
      dataIndex: 'titleLevel',
      key: 'titleLevel',
    },
    {
      title: '所在科室',
      dataIndex: 'department',
      key: 'department',
    },
    {
      title: '执业医院',
      dataIndex: 'hospitalName',
      key: 'hospitalName',
    },
    {
      title: '用户描述',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: '更新时间',
      dataIndex: 'updateTime',
      key: 'updateTime',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render(text: string, record: any) {
        const isUp = record.status !== 'disabled';
        return (
          <div>
            <Badge color={isUp ? '#217ba0' : 'yellow'} text={isUp ? '启用' : '禁用'} />
            &nbsp;
            <Switch checked={isUp} />
          </div>
        );
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
  const Toolbar = () => {
    return (
      <>
        <Button
          type="primary"
          onClick={() => {
            setShowUserForm(true);
          }}
        >
          <PlusCircleOutlined />
          增加用户
        </Button>
        <UserForm
          visible={showUserForm}
          onCancel={() => {
            setShowUserForm(false);
          }}
        />
      </>
    );
  };
  return (
    <div className="content-page">
      <ListPage
        ListTitle="机构列表"
        list={list}
        fetchApi={fetchAPi}
        columns={columns}
        SearchForm={SearchForm}
        Toolbar={Toolbar}
      />
    </div>
  );
}

export default UserList;
