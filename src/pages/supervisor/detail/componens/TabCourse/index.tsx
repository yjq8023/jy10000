import React from 'react';
import { Button, Space } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import BaseList, { useList } from '@/common/components/BaseList';
import { getColumns } from './config';
import Services from '@/pages/supervisor/services';
import { transformColumns, transformFetchApi } from '@/common/components/BaseList/util';
import { Link } from 'react-router-dom';

function TabFollowUp() {
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
          新增跟进
        </Button>
      </Link>
    );
  };
  return (
    <BaseList
      list={list}
      size="mini"
      ListTitle="课程列表"
      columns={transformColumns(columns)}
      fetchApi={transformFetchApi(Services.getListData)}
      Toolbar={Toolbar}
    />
  );
}

export default TabFollowUp;
