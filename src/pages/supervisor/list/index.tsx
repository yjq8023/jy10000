import React from 'react';
import { Button } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import BaseList, { useList } from '@/common/components/BaseList';
import SearchForm from './components/SearchForm';
import { getColumns } from './config';
import Services from '../services';
import styles from './index.less';
import { transformColumns } from '@/common/components/BaseList/util';

function SupervisorList() {
  // 列表实例
  const list = useList();
  // 获取列表数据
  const fetchListData = (params: any = {}): any => {
    // 响应Promise更新列表数据和分页
    return Services.getListData(params).then((res) => {
      console.log('res');
      console.log(res);
      return {
        listData: res,
        pagination: {
          current: 1,
          pageSize: 10,
          total: 100,
        },
      };
    });
  };
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
      <Button
        type="primary"
      >
        <PlusCircleOutlined />
        新增导师
      </Button>
    );
  };
  return (
    <div className={styles.listPageBox}>
      <BaseList
        list={list}
        ListTitle="导师列表"
        columns={transformColumns(columns)}
        fetchApi={fetchListData}
        SearchForm={SearchForm}
        Toolbar={Toolbar}
      />
    </div>
  );
}

export default SupervisorList;
