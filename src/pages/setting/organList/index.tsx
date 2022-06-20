import React, { useState } from 'react';
import { Badge, Button, Switch } from '@sinohealth/butterfly-ui-components/lib';
import { PlusCircleOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import ListPage, { paginationType, useList } from '@/components/BaseList';
import SearchForm from './components/SearchForm';
import SimpleModal from '@/components/SimpleModal';
import OrganForm from './components/OrganForm';
import { chainDelete, getPageChain, setChainStatus } from '@/services/setting';
import ConfirmModel from '@/components/Confirm';

function OrganList() {
  const [showOrganForm, setShowOrganForm] = useState(false);
  const [organId, setOrganId] = useState<number>();
  const list = useList();
  const fetchAPi = (params: any) => {
    console.log(params);
    return getPageChain({ ...params, pageNo: params.current }).then((res) => {
      console.log(res);
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
  const closeOrganForm = (success?: boolean) => {
    if (success) {
      (list.current as any).reloadListData();
    }
    setOrganId(0);
    setShowOrganForm(false);
  };
  const renderActionDom = (itemData: any) => {
    return (
      <div>
        <a
          onClick={() => {
            setOrganId(itemData.id);
            setShowOrganForm(true);
          }}
        >
          编辑
        </a>
        &nbsp; &nbsp;
        <a
          onClick={() => {
            if (itemData.status === 'enabled') {
              ConfirmModel({
                fun: 'warning',
                title: '当前机构存在启用的用户账号，请先禁用后，再进行删除。',
                centered: true,
                // icon: <QuestionCircleTwoTone twoToneColor="#FFBF00" />,
                onOk: async () => {},
              });
            } else {
              ConfirmModel({
                fun: 'error',
                title: '是否确定删除该机构？',
                centered: true,
                // icon: <QuestionCircleTwoTone twoToneColor="#FFBF00" />,
                onOk: async () => {
                  chainDelete(itemData.id).then((res) => {
                    (list.current as any).reloadListData();
                  });
                },
              });
            }
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
      title: '机构名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '机构地址',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: '建立时间',
      dataIndex: 'createTime',
      key: 'createTime',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render(text: string, record: any, index: number) {
        const isUp = record.status === 'enabled';
        return (
          <div>
            <Badge color={isUp ? '#217ba0' : 'yellow'} text={isUp ? '启用' : '禁用'} />
            &nbsp;
            <Switch
              checked={isUp}
              onChange={(value) => {
                setChainStatus({ id: record.id, status: value ? 'enabled' : 'disabled' }).then(
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
          setShowOrganForm(true);
        }}
      >
        <PlusCircleOutlined />
        增加机构
      </Button>
    );
  };
  return (
    <div className="content-page">
      <ListPage
        ListTitle="机构列表"
        list={list}
        fetchApi={fetchAPi}
        columns={columns}
        SearchForm={SearchForm}
        Toolbar={Toolbar}
      />
      <OrganForm organId={organId} visible={showOrganForm} onCancel={closeOrganForm} />
    </div>
  );
}

export default OrganList;
