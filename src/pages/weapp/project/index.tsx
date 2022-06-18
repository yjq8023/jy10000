import React from 'react';
import { Button, Badge, Switch } from '@sinohealth/butterfly-ui-components/lib';
import { PlusCircleOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import BaseList, { useList } from '@/components/BaseList';
import SearchForm from './components/ScarchForm';
import { getProjectList } from '@/services/weapp';
import style from './index.less';

function WeappProject() {
  const list = useList();
  const navigate = useNavigate();
  const fetchAPi = (params: any) => {
    return getProjectList({
      pageNo: params.current,
      ...params,
    }).then((res: any) => {
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
  const Toolbar = () => {
    const toAdd = () => {
      const parentId = list.current.searchForm ? list.current.searchForm.getFieldValue('categoryId') : '';
      navigate(`add?parentId=${parentId}`);
    };
    return <Button type="primary" onClick={toAdd}><PlusCircleOutlined />新建栏目病种</Button>;
  };
  const renderActionDom = (itemData: any) => {
    return (
      <div>
        <Link to={`edit?id=${itemData.id}`}>编辑</Link>
        &nbsp;
        &nbsp;
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
      title: '项目名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '项目病种',
      dataIndex: 'diseaseName',
      key: 'diseaseName',
    },
    {
      title: '所属机构',
      dataIndex: 'chainName',
      key: 'chainName',
    },
    {
      title: '医生',
      dataIndex: 'doctorName',
      key: 'doctorName',
    },
    {
      title: '医生职称',
      dataIndex: 'doctorTitle',
      key: 'doctorTitle',
    },
    {
      title: '个案管理师',
      dataIndex: 'caseManagerName',
      key: 'caseManagerName',
    },
    {
      title: '项目简介',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
    },
    {
      title: '医生审核',
      dataIndex: 'needAudit',
      key: 'needAudit',
    },
    {
      title: '项目价格',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render(text: string, record: any) {
        const isUp = text === 'ENABLE';
        return (
          <div>
            <Badge color={isUp ? '#217ba0' : 'yellow'} text={isUp ? '上架' : '下架'} />
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
  return (
    <div className={style.projectList}>
      <BaseList list={list} ListTitle="病种项目" columns={columns} fetchApi={fetchAPi} Toolbar={Toolbar} SearchForm={SearchForm} fixed />
    </div>
  );
}

export default WeappProject;
