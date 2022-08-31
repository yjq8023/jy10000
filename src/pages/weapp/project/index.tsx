import React, { useState } from 'react';
import { Button, Badge, Space, message, Modal } from '@sinohealth/butterfly-ui-components/lib';
import { PlusCircleOutlined, QuestionCircleFilled } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import BaseList, { useList } from '@/components/BaseList';
import SearchForm from './components/ScarchForm';
import { deleteProject, getProjectList, setProjectStatus } from '@/services/weapp';
import style from './index.less';
import { useDictKeyValue } from '@/hooks/useDict';
import SwitchCustom from '@/components/SwitchCustom';
import { UCenter } from '@/services/weapp/data';

function WeappProject() {
  const list: any = useList();
  const dict = useDictKeyValue();
  const navigate = useNavigate();
  const [isUpdateSucc, setIsUpdateSucc] = useState(false);

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

  const handleDelete = (itemData: UCenter.ServiceProjectRes) => {
    Modal.confirm({
      title: `是否确定删除 "${itemData.serviceProjectName}" 的数据项?`,
      icon: <QuestionCircleFilled style={{ color: '#EA6868' }} />,
      okButtonProps: { danger: true },
      cancelButtonProps: { type: 'info' },
      onOk() {
        deleteProject(itemData.id).then(() => {
          message.success('删除成功');
          list.current.reloadListData(true);
        });
      },
    });
  };
  const Toolbar = () => {
    const toAdd = () => {
      const parentId = list.current.searchForm
        ? list.current.searchForm.getFieldValue('categoryId')
        : '';
      navigate(`add?parentId=${parentId}`);
    };
    return (
      <Button type="primary" onClick={toAdd}>
        <PlusCircleOutlined />
        新建项目
      </Button>
    );
  };

  const renderActionDom = (itemData: any) => {
    return (
      <Space>
        <Link to={`edit?id=${itemData.id}`}>编辑</Link>
        <a className={style['del-color']} onClick={() => handleDelete(itemData)}>
          删除
        </a>
      </Space>
    );
  };

  const setProjectStatusFn = (isUp: any, item: UCenter.ServiceProjectRes) => {
    message.loading({ content: '数据正在处理中, 请稍候...', key: 'updatable' });
    if (isUpdateSucc) return;
    setIsUpdateSucc(true);

    setProjectStatus({
      ids: [item.id],
      status: isUp ? 'ENABLE' : 'UNABLE',
    })
      .then(() => {
        message.success({ content: isUp ? '上架成功' : '下架成功', key: 'updatable', duration: 1 });
        list.current.reloadListData(true);
        setIsUpdateSucc(false);
      })
      .catch(() => {
        message.success({ content: '数据处理失败', key: 'updatable', duration: 1 });
        setIsUpdateSucc(false);
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
      dataIndex: 'serviceProjectName',
      key: 'serviceProjectName',
      width: 200,
    },
    {
      title: '关联管理项目',
      dataIndex: 'projectName',
      key: 'projectName',
      width: 200,
    },
    {
      title: '项目病种',
      dataIndex: 'diseaseName',
      key: 'diseaseName',
      width: 160,
    },
    {
      title: '机构',
      dataIndex: 'organizeName',
      key: 'organizeName',
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
      width: 300,
      render(text: string): JSX.Element {
        return (
          <span className="text-ellipsis" title={text}>
            {text}
          </span>
        );
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
      width: 100,
      render(text: any) {
        return text ? '是' : '否';
      },
    },
    {
      title: '个案管理师审核',
      dataIndex: 'needCaseManager',
      key: 'needCaseManager',
      width: 130,
      render(text: any) {
        return text ? '是' : '否';
      },
    },
    {
      title: '医生审核',
      dataIndex: 'needDoctor',
      key: 'needDoctor',
      width: 100,
      render(text: any) {
        return text ? '是' : '否';
      },
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
          <Space>
            <Badge color={isUp ? '#80B446' : '#EA6868'} text={isUp ? '上架' : '下架'} />
            <SwitchCustom defaultChecked={isUp} onChange={(e) => setProjectStatusFn(e, record)} />
          </Space>
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
      <BaseList
        BodyProps={{ scroll: { x: 2000 } }}
        list={list}
        ListTitle="病种项目"
        columns={columns}
        fetchApi={fetchAPi}
        Toolbar={Toolbar}
        SearchForm={SearchForm}
        overflow={false}
        fixed
      />
    </div>
  );
}

export default WeappProject;
