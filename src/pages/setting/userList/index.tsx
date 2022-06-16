import React, { useState } from 'react';
import { Badge, Button, Switch } from '@sinohealth/butterfly-ui-components/lib';
import { PlusCircleOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import ListPage, { paginationType, useList } from '@/components/BaseList';
import SearchForm from './components/SearchForm';
import UserForm from './components/UserForm';

function UserList() {
  const list = useList();
  const [showUserForm, setShowUserForm] = useState(false);
  const fetchAPi = (params: any) => {
    console.log('params');
    console.log(params);
    return new Promise<{ listData: any[]; pagination: any }>((res) => {
      // @ts-ignore
      const data = [
        {
          name: '小用户名称红',
          address: '阿斯蒂芬拉',
          createTime: '2020-06-54',
          age: 1,
          id: 1,
        },
        {
          name: '小红',
          address: '阿斯蒂芬拉',
          createTime: '2020-06-54',
          age: 2,
          id: 2,
        },
        {
          name: '小红',
          address: '阿斯蒂芬拉',
          createTime: '2020-06-54',
          age: 2,
          id: 3,
        },
        {
          name: '小红',
          address: '阿斯蒂芬拉',
          createTime: '2020-06-54',
          age: 2,
          id: 4,
        },
        {
          name: '小红',
          address: '阿斯蒂芬拉',
          createTime: '2020-06-54',
          age: 2,
          id: 5,
        },
        {
          name: '小红',
          address: '阿斯蒂芬拉',
          createTime: '2020-06-54',
          age: 2,
          id: 6,
        },
        {
          name: '小红',
          address: '阿斯蒂芬拉',
          createTime: '2020-06-54',
          age: 2,
          id: 7,
        },
        {
          name: '小红',
          address: '阿斯蒂芬拉',
          createTime: '2020-06-54',
          age: 2,
          id: 8,
        },
        {
          name: '小红',
          address: '阿斯蒂芬拉',
          createTime: '2020-06-54',
          age: 2,
          id: 9,
        },
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
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: '所属机构',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: '用户角色',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: '用户职称',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: '职称级别',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: '所在科室',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: '执业医院',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: '用户描述',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: '更新时间',
      dataIndex: 'createTime',
      key: 'createTime',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render(text: string, record: any) {
        const isUp = Number(text) === 1;
        return (
          <div>
            <Badge color={isUp ? '#217ba0' : 'yellow'} text={isUp ? '启用' : '禁用'} />
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
