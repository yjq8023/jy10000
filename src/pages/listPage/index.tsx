import React from 'react';
import { Button } from '@sinohealth/butterfly-ui-components/lib';
import { PlusCircleOutlined } from '@ant-design/icons';
import BaseList, { useList } from '@/components/BaseList';
import BaseFormModal, { useFormModal } from '@/components/BaseFormModal';
import SearchForm from './components/SearchForm';
import AddForm from './components/AddForm';
import { getColumns } from '@/pages/listPage/config';
import styles from './index.less';

const demoListData: any = [
  {
    code: 'gender',
    description: null,
    id: '1',
    leaf: '0',
    name: '性别',
    parentId: null,
    scopeCode: 'scope-common',
    sort: 0,
    status: 'enable',
    type: 'gender',
    version: '0',
  },
  {
    code: 'female',
    description: null,
    id: '2',
    leaf: '1',
    name: '女',
    parentId: '1',
    scopeCode: 'scope-common',
    sort: 1,
    status: 'enable',
    type: 'gender',
    version: '0',
  },
  {
    code: 'male',
    description: null,
    id: '3',
    leaf: '1',
    name: '男',
    parentId: '1',
    scopeCode: 'scope-common',
    sort: 2,
    status: 'enable',
    type: 'gender',
    version: '0',
  },
];
function DemoList() {
  // 列表实例
  const list = useList();
  // 新增表单弹窗实例
  const formModal = useFormModal();
  // 获取列表数据
  const fetchListData = (params: any = {}) => {
    // 响应Promise更新列表数据和分页
    return Promise.resolve({
      listData: demoListData,
      pagination: {
        current: 1,
        pageSize: 10,
        total: 100,
      },
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
        <a>
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
    // 响应Promise，成功会关闭弹窗，失败则不会关闭
    return new Promise(() => {
      console.log('新增数据');
      console.log(values);
    }).then(() => {
      // 新增成功刷新数据
      list.current.fetchListData();
    });
  };
  return (
    <div className={styles.listPageBox}>
      <BaseList
        fixed
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

export default DemoList;
