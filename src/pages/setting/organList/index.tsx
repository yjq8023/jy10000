import React from 'react';
import { Badge, Button, Switch } from '@sinohealth/butterfly-ui-components/lib';
import { PlusCircleOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import ListPage, { paginationType, useList } from '@/components/BaseList';
import SearchForm from './components/SearchForm';

function OrganList() {
  const list = useList();
  const fetchAPi = (params: any) => {
    console.log('params');
    console.log(params);
    return new Promise<{ listData: any[]; pagination: any }>((res) => {
      // @ts-ignore
      const data = [
        {
          name: '小红',
          address: '阿斯蒂芬拉萨解放撒附件爱上了开始附近的撒浪费',
          createTime: '2020-06-54',
          age: 1,
          id: 1,
        },
        {
          name: '小红',
          address: '阿斯蒂芬拉萨解放撒附件爱上了开始附近的撒浪费',
          createTime: '2020-06-54',
          age: 2,
          id: 2,
        },
        {
          name: '小红',
          address: '阿斯蒂芬拉萨解放撒附件爱上了开始附近的撒浪费',
          createTime: '2020-06-54',
          age: 2,
          id: 3,
        },
        {
          name: '小红',
          address: '阿斯蒂芬拉萨解放撒附件爱上了开始附近的撒浪费',
          createTime: '2020-06-54',
          age: 2,
          id: 4,
        },
        {
          name: '小红',
          address: '阿斯蒂芬拉萨解放撒附件爱上了开始附近的撒浪费',
          createTime: '2020-06-54',
          age: 2,
          id: 5,
        },
        {
          name: '小红',
          address: '阿斯蒂芬拉萨解放撒附件爱上了开始附近的撒浪费',
          createTime: '2020-06-54',
          age: 2,
          id: 6,
        },
        {
          name: '小红',
          address: '阿斯蒂芬拉萨解放撒附件爱上了开始附近的撒浪费',
          createTime: '2020-06-54',
          age: 2,
          id: 7,
        },
        {
          name: '小红',
          address: '阿斯蒂芬拉萨解放撒附件爱上了开始附近的撒浪费',
          createTime: '2020-06-54',
          age: 2,
          id: 8,
        },
        {
          name: '小红',
          address: '阿斯蒂芬拉萨解放撒附件爱上了开始附近的撒浪费',
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
      title: '机构名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '机构地址',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: '建立时间',
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
      <Link to="/patient/add">
        <Button type="primary">
          <PlusCircleOutlined />
          增加机构
        </Button>
      </Link>
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

export default OrganList;
