import React, { useState } from 'react';
import { Badge, Button, Switch } from '@sinohealth/butterfly-ui-components/lib';
import { PlusCircleOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import ListPage, { paginationType, useList } from '@/components/BaseList';
import SearchForm from './components/SearchForm';
import UserForm from './components/UserForm';
import { getPageChain, getPageUserInfo, setUserStatus, userDelete } from '@/services/setting';
import ConfirmModel from '@/components/Confirm';
import { useDictKeyValue } from '@/hooks/useDict';

function UserList() {
  const list = useList();
  const [showUserForm, setShowUserForm] = useState(false);
  const [userId, setUserId] = useState<number>();
  const dict = useDictKeyValue();
  const fetchAPi = (params: any) => {
    console.log(params);
    return getPageUserInfo({ ...params, pageNo: params.current }).then((res) => {
      console.log(res);
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
  const closeUserForm = (success?: boolean) => {
    if (success) {
      (list.current as any).reloadListData();
    }
    setUserId(0);
    setShowUserForm(false);
  };
  const renderActionDom = (itemData: any) => {
    return (
      <div>
        <a
          onClick={() => {
            setUserId(itemData.id);
            setShowUserForm(true);
          }}
        >
          编辑
        </a>
        &nbsp; &nbsp;
        <a
          onClick={() => {
            ConfirmModel({
              fun: 'error',
              title: '是否确定删除该用户？',
              centered: true,
              // icon: <QuestionCircleTwoTone twoToneColor="#FFBF00" />,
              onOk: async () => {
                userDelete(itemData.id).then((res) => {
                  (list.current as any).reloadListData();
                });
              },
            });
          }}
        >
          删除
        </a>
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
      title: '用户名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '用户账号',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
    },
    {
      title: '所属机构',
      dataIndex: 'chainName',
      key: 'chainName',
    },
    {
      title: '用户角色',
      dataIndex: 'roleName',
      key: 'roleName',
      render: (text: string, record: any) => <span>{dict?.position[text]}</span>,
    },
    {
      title: '用户职称',
      dataIndex: 'title',
      key: 'title',
      render: (text: string, record: any) => <span>{dict?.doctorTitle[text]}</span>,
    },
    {
      title: '职称级别',
      dataIndex: 'titleLevel',
      key: 'titleLevel',
      render: (text: string, record: any) => <span>{dict?.technicalJobCategory[text]}</span>,
    },
    {
      title: '所在科室',
      dataIndex: 'department',
      key: 'department',
    },
    {
      title: '执业医院',
      dataIndex: 'hospitalName',
      key: 'hospitalName',
    },
    {
      title: '用户描述',
      dataIndex: 'description',
      key: 'description',
      ellipsis: true,
    },
    {
      title: '更新时间',
      width: 180,
      dataIndex: 'updateTime',
      key: 'updateTime',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      fixed: 'right',
      render(text: string, record: any, index: number) {
        const isUp = record.status === 'enabled';
        return (
          <div>
            <Badge color={isUp ? '#217ba0' : 'yellow'} text={isUp ? '启用' : '禁用'} />
            &nbsp;
            <Switch
              checked={isUp}
              onChange={(value) => {
                setUserStatus({ id: record.id, status: value ? 'enabled' : 'disabled' }).then(
                  (res) => {
                    const listData = (list.current as any).listData;
                    // listData[index].status = 'disable';
                    (list.current as any).onSetListData(
                      listData.map((item: any, _index: number) =>
                        _index === index
                          ? { ...item, status: value ? 'enabled' : 'disabled' }
                          : item,
                      ),
                    );
                  },
                );
              }}
            />
          </div>
        );
      },
    },
    {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      fixed: 'right',
      render(text: string, record: any) {
        return renderActionDom(record);
      },
    },
  ];
  const Toolbar = () => {
    return (
      <Button
        type="primary"
        onClick={() => {
          setShowUserForm(true);
        }}
      >
        <PlusCircleOutlined />
        增加用户
      </Button>
    );
  };
  return (
    <div className="content-page">
      <ListPage
        ListTitle="用户列表"
        list={list}
        fetchApi={fetchAPi}
        columns={columns}
        SearchForm={SearchForm}
        Toolbar={Toolbar}
        BodyProps={{ scroll: { x: 1700 } }}
      />
      <UserForm visible={showUserForm} onCancel={closeUserForm} userId={userId} />
    </div>
  );
}

export default UserList;
