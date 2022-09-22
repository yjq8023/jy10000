import React, { useState } from 'react';
import { Badge, Switch, Button } from '@sinohealth/butterfly-ui-components/lib';
import { PlusCircleOutlined } from '@ant-design/icons';
import ListPage, { paginationType, useList } from '@/components/BaseList';
import SearchForm from './components/SearchForm';
import AddForm from './components/AddForm';
import { getLabelTypePage, getLabelTypeListDelete } from '@/services/project';
import ConfirmModel from '@/components/Confirm';
import styles from './index.less';

function OrganList() {
  const [visible, setVisible] = useState(false);
  const [organData, setOrganData] = useState<any>({});
  const [sortStatus, setSortStatus] = useState<string>('descend');

  const list = useList();
  const fetchAPi = (params: any) => {
    const req: any = {
      // ...params,
      limit: params.pageSize,
      pageNo: params.current,
      cond: {
        name: params.name,
        categoryName: params.categoryName,
      },
      orders: [
        {
          direction: params.direction === 'ascend' ? 'ASC' : 'DESC',
          property: params.property || 'createTime',
        },
      ],
    };
    setSortStatus(params.direction);

    return getLabelTypePage(req).then((res) => {
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
  const changetable = (pagination: any, filters: any, sorter: any) => {
    const property: string = sorter.columnKey;
    list.current.fetchListData({ direction: sorter.order, property });
  };
  // eslint-disable-next-line no-shadow
  const handleOk = (ref: any) => {
    console.log(ref);
    setVisible(false);
  };

  const closeOrganForm = (success?: boolean) => {
    if (success) {
      (list.current as any).reloadListData();
    }
    setOrganData({});
    setVisible(false);
  };

  const renderActionDom = (itemData: any) => {
    return (
      <div>
        <a
          onClick={() => {
            setOrganData(itemData);
            setVisible(true);
          }}
        >
          编辑
        </a>
        &nbsp; &nbsp;
        <a
          onClick={() => {
            if (itemData.bindCountNum > 0) return;
            ConfirmModel({
              fun: 'error',
              title: `是否确定删除名称为“${itemData.name}”的数据项？`,
              centered: true,
              onOk: async () => {
                getLabelTypeListDelete(itemData.id).then((res) => {
                  (list.current as any).reloadListData();
                });
              },
            });
          }}
        >
          <span style={{ color: itemData.bindCountNum > 0 ? 'rgb(175, 175, 175)' : '' }}>删除</span>
        </a>
      </div>
    );
  };

  const columns = [
    {
      title: '标签分类名称',
      dataIndex: 'categoryName',
      key: 'categoryName',
      minWidth: 250,
      ellipsis: true,
    },
    {
      title: '标签名称',
      dataIndex: 'name',
      key: 'name',
      minWidth: 300,
      ellipsis: true,
      render(text: string, record: any) {
        return <div className={`${styles.tag}`}>{text}</div>;
      },
    },
    {
      title: '关联资源数',
      dataIndex: 'bindCountNum',
      key: 'bindCountNum',
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
      sortOrder: sortStatus,
      sorter: true,
    },

    {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      width: 150,
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
          setVisible(true);
        }}
      >
        <PlusCircleOutlined />
        添加标签
      </Button>
    );
  };
  return (
    <div className="content-page">
      <ListPage
        ListTitle="标签列表"
        list={list}
        fetchApi={fetchAPi}
        columns={columns}
        SearchForm={SearchForm}
        Toolbar={Toolbar}
        BodyProps={{
          onChange: (pagination: any, filters: any, sorter: any) => {
            changetable(pagination, filters, sorter);
          },
        }}
      />
      <AddForm
        organData={organData}
        modalVisible={visible}
        handleOk={(e: any) => handleOk(e)}
        onCancel={(e: any) => closeOrganForm(e)}
      />
    </div>
  );
}

export default OrganList;
