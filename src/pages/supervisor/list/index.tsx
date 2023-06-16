import React from 'react';
import { Button } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import BaseList, { useList } from '@/common/components/BaseList';
import SearchForm from './components/SearchForm';
import { getColumns } from './config';
import Services from '../services';
import styles from './index.less';
import { transformColumns, transformFetchApi } from '@/common/components/BaseList/util';
import { Link } from 'react-router-dom';

function SupervisorList() {
  // 列表实例
  const list = useList();
  // 渲染列表项操作栏
  const renderActionDom = (itemData: any) => {
    return (
      <div>
        <a>
          操作
        </a>
      </div>
    );
  };
  // 列表表格列配置
  const columns: any = getColumns({ renderActionDom });
  // 列表操作栏
  const Toolbar = () => {
    return (
      <Link to="edit">
        <Button
          type="primary"
        >
          <PlusCircleOutlined />
          新增导师
        </Button>
      </Link>
    );
  };
  return (
    <BaseList
      list={list}
      ListTitle="导师列表"
      columns={transformColumns(columns)}
      fetchApi={transformFetchApi(Services.getListData)}
      SearchForm={SearchForm}
      Toolbar={Toolbar}
    />
  );
}

export default SupervisorList;
