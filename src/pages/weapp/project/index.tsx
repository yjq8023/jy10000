import React from 'react';
import { Button, Badge, Switch, message, Modal } from '@sinohealth/butterfly-ui-components/lib';
import { PlusCircleOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import BaseList, { useList } from '@/components/BaseList';
import SearchForm from './components/ScarchForm';
import { deleteProject, getProjectList, setProjectStatus } from '@/services/weapp';
import style from './index.less';
import { useDictKeyValue } from '@/hooks/useDict';

function WeappProject() {
  const list: any = useList();
  const dict = useDictKeyValue();
  const navigate = useNavigate();
  const fetchAPi = (params: any) => {
    return getProjectList({
      pageNo: params.current,
      ...params,
    }).then((res: any) => {
      return {
        listData: res.data,
        pagination: {
          current: res.pageNo,
          pageSize: res.pageSize,
          total: res.totalCount,
        },
      };
    });
  };
  const handleDelete = (id: string) => {
    Modal.confirm({
      title: '是否确定删除该项目？',
      content: '',
      onOk() {
        deleteProject(id)
          .then(() => {
            message.success('删除成功');
            list.current.reloadListData(true);
          });
      },
    });
  };
  const Toolbar = () => {
    const toAdd = () => {
      const parentId = list.current.searchForm ? list.current.searchForm.getFieldValue('categoryId') : '';
      navigate(`add?parentId=${parentId}`);
    };
    return <Button type="primary" onClick={toAdd}><PlusCircleOutlined />新建项目</Button>;
  };
  const renderActionDom = (itemData: any) => {
    return (
      <div>
        <Link to={`edit?id=${itemData.id}`}>编辑</Link>
        &nbsp;
        &nbsp;
        <a onClick={() => handleDelete(itemData.id)}>删除</a>
      </div>
    );
  };
  const setProjectStatusFn = (isUp: any, item: any) => {
    setProjectStatus({
      ...item,
      status: isUp ? 'ENABLE' : 'UNABLE',
    })
      .then(() => {
        message.success(isUp ? '上架成功' : '下架成功');
        list.current.reloadListData(true);
      });
  };
  const columns = [
    {
      title: '序号',
      dataIndex: 'index',
      key: 'index',
      width: 80,
      render(text: string, record: any, index: number): JSX.Element {
        return <span>{index + 1}</span>;
      },
    },
    {
      title: '项目名称',
      dataIndex: 'name',
      key: 'name',
      width: 200,
    },
    {
      title: '项目病种',
      dataIndex: 'diseaseName',
      key: 'diseaseName',
      width: 200,
    },
    {
      title: '所属机构',
      dataIndex: 'chainName',
      key: 'chainName',
      width: 160,
    },
    {
      title: '医生',
      dataIndex: 'doctorName',
      key: 'doctorName',
      width: 120,
    },
    {
      title: '医生职称',
      dataIndex: 'doctorTitle',
      key: 'doctorTitle',
      width: 120,
      render: (text: string, record: any) => <span>{dict?.doctorTitle[text]}</span>,
    },
    {
      title: '个案管理师',
      dataIndex: 'caseManagerName',
      key: 'caseManagerName',
      width: 120,
    },
    {
      title: '项目简介',
      dataIndex: 'description',
      key: 'description',
      width: 250,
      render(text: string): JSX.Element {
        return <span className="text-ellipsis" title={text}>{text}</span>;
      },
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
      width: 200,
    },
    {
      title: '患者咨询',
      dataIndex: 'openConsult',
      key: 'openConsult',
      render(text: any) {
        return text ? '是' : '否';
      },
    },
    {
      title: '医生审核',
      dataIndex: 'needAudit',
      key: 'needAudit',
      render(text: any) {
        return text ? '是' : '否';
      },
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
      width: 120,
      fixed: 'right',
      render(text: string, record: any) {
        const isUp = text === 'ENABLE';
        return (
          <div>
            <Badge color={isUp ? '#217ba0' : 'yellow'} text={isUp ? '上架' : '下架'} />
            &nbsp;
            <Switch defaultChecked={isUp} onChange={(e) => setProjectStatusFn(e, record)} />
          </div>
        );
      },
    },
    {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      width: 100,
      fixed: 'right',
      render(text: string, record: any) {
        return renderActionDom(record);
      },
    },
  ];
  return (
    <div className={style.projectList}>
      <BaseList BodyProps={{ scroll: { x: 2000 } }} list={list} ListTitle="病种项目" columns={columns} fetchApi={fetchAPi} Toolbar={Toolbar} SearchForm={SearchForm} fixed />
    </div>
  );
}

export default WeappProject;
