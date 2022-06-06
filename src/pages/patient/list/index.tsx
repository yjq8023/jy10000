import React from 'react';
import { Button } from '@sinohealth/butterfly-ui-components/lib';
import { PlusCircleOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import ListPage, { paginationType, useList } from '@/components/BaseList';
import SearchForm from './components/SearchForm';
import ListBody from './components/ListBody';

function PatientList() {
  const list = useList();
  const fetchAPi = (pagination: paginationType, params: any) => {
    console.log(pagination);
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
          current: pagination.current,
          pageSize: 10,
          total: 100,
        },
      });
    });
  };
  const Toolbar = () => {
    return <Link to="/patient/add"><Button type="primary"><PlusCircleOutlined />新增患者</Button></Link>;
  };
  return (
    <div className="content-page">
      <ListPage listTitle="患者档案" list={list} fetchApi={fetchAPi} SearchForm={SearchForm} Body={ListBody} Toolbar={Toolbar} />
    </div>
  );
}

export default PatientList;
