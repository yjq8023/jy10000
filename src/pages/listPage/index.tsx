import React from 'react';
import { Button } from '@sinohealth/butterfly-ui-components/lib';
import { PlusCircleOutlined } from '@ant-design/icons';
import BaseList, { useList } from '@/components/BaseList';
import SearchForm from './components/SearchForm';
import AddForm from './components/AddForm';
import ConfirmModel from '@/components/Confirm';
import { getDictPage, insertDict } from '@/services/system';
import BaseFormModal, { useFormModal } from '@/components/BaseFormModal';
import { scope } from '@/config/base';
import { getColumns } from '@/pages/listPage/config';
import styles from './index.less';

function DictList() {
  const list = useList();
  const formModal = useFormModal();
  // 获取列表数据
  const fetchListData = (params: any = {}) => {
    return getDictPage({
      ...params,
      pageNo: params.current,
    }).then((res) => {
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
  // 渲染列表项操作栏
  const renderActionDom = (itemData: any) => {
    return (
      <div>
        <a
          onClick={() => handleOpenFormModal(itemData)}
        >
          编辑
        </a>
        &nbsp; &nbsp;
        <a
          onClick={() => {
            ConfirmModel({
              fun: 'error',
              title: '是否确定删除该字典类型？',
              centered: true,
              onOk: async () => {
              },
            });
          }}
        >
          删除
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
        onClick={() => handleOpenFormModal()}
      >
        <PlusCircleOutlined />
        增加字典
      </Button>
    );
  };
  // 打开新增/编辑数据表单弹窗
  const handleOpenFormModal = (data?: any) => {
    formModal.current?.openModal(data);
  };
  // 新增/编辑弹窗提交事件
  const handleSubmit = (values: any) => {
    const params = {
      ...values,
      scopeCode: scope,
    };
    return insertDict(params)
      .then(() => {
        list.current.fetchListData();
      });
  };

  return (
    <div className={styles['content-page']}>
      <BaseList
        list={list}
        ListTitle="字典列表"
        columns={columns}
        fetchApi={fetchListData}
        SearchForm={SearchForm}
        Toolbar={Toolbar}
      />
      <BaseFormModal
        formModal={formModal}
        FormContent={AddForm}
        onSubmit={handleSubmit}
      />
    </div>
  );
}

export default DictList;
