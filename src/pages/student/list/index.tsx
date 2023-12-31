import React from 'react';
import { Button } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import BaseList, { useList } from '@/common/components/BaseList';
import SearchForm from './components/SearchForm';
import { getColumns, searchColumns } from './config';
import Services from '../services';
import styles from './index.less';
import { transformColumns, transformFetchApi } from '@/common/components/BaseList/util';
import { Link } from 'react-router-dom';
import { useDict } from '@/common/hooks';

function SupervisorList() {
  // 列表实例
  const list = useList();
  const dict = useDict();
  // 渲染列表项操作栏
  const renderActionDom = (itemData: any) => {
    return (
      <div>
        <Link to={`detail?id=${itemData.id}`}>
          <a>
            详情
          </a>
        </Link>
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
          新建学生
        </Button>
      </Link>
    );
  };
  return (
    <BaseList
      list={list}
      ListTitle="学生列表"
      columns={transformColumns(columns, dict)}
      fetchApi={transformFetchApi(Services.getListData)}
      searchColumns={searchColumns}
      Toolbar={Toolbar}
    />
  );
}

export default SupervisorList;
