import React, { useEffect, useState } from 'react';
import {
  Badge,
  Button,
  Col,
  Row,
  Switch,
  Table,
  TableColumnsType,
} from '@sinohealth/butterfly-ui-components/lib';
import { PlusCircleOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import ListPage, { paginationType, useList } from '@/components/BaseList';
import SearchForm from './components/SearchForm';
import DictForm from './components/DictForm';
import ConfirmModel from '@/components/Confirm';
import { useDictKeyValue } from '@/hooks/useDict';
import { deleteDict, getDictPage } from '@/services/system';
import styles from './index.less';

function DictList() {
  const list = useList();
  const [showDictForm, setShowDictForm] = useState(false);
  const [dictData, setdictData] = useState<any>();
  const [dataSource, setDataSource] = useState([]);
  const [tableParams, setTableParams] = useState<any>({});
  const [childDataSource, setChildDataSource] = useState<any>({});
  // const dict = useDictKeyValue();

  const [pagination, setPagination] = useState<paginationType>({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  const paginationConfig = {
    showSizeChanger: true,
    showQuickJumper: true,
    showTotal(totalNum: any) {
      return `共 ${totalNum} 条数据`;
    },
  };

  const fetchAPi = (params: any = {}, parentId = null) => {
    console.log(params);
    getDictPage({
      ...tableParams,
      ...params,
      pageNo: params.current || tableParams.current,
      cond: { parentId },
    }).then((res) => {
      console.log(res);
      setTableParams({ ...tableParams, ...params, pageNo: params.current });
      setPagination({
        current: res.pageNo,
        pageSize: res.pageSize,
        total: res.totalCount,
      });
      setDataSource(res.data);
    });
  };

  useEffect(() => {
    fetchAPi({});
  }, []);
  const closeDictForm = (success?: boolean, parentId?: string | number) => {
    if (parentId) {
      updateChildData(parentId);
    } else if (success) {
      fetchAPi();
    }
    setdictData(null);
    setShowDictForm(false);
  };

  /**
   * 更新子表
   * @param parentId
   */
  const updateChildData = (parentId: any) => {
    const childData = childDataSource;
    getDictPage({ pageSize: 100, cond: { parentId } }).then((res: any) => {
      const data = res.data;
      childData[parentId] = data;
      setChildDataSource({ ...childData });
    });
  };

  const renderActionDom = (itemData: any) => {
    return (
      <div>
        {itemData.parentId === null && (
          <>
            <a
              onClick={() => {
                setdictData({ parentId: itemData.id, type: itemData.type });
                setShowDictForm(true);
              }}
            >
              新增
            </a>
            &nbsp; &nbsp;
          </>
        )}
        <a
          onClick={() => {
            setdictData(itemData);
            setShowDictForm(true);
          }}
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
              // icon: <QuestionCircleTwoTone twoToneColor="#FFBF00" />,
              onOk: async () => {
                deleteDict(itemData.id).then((res) => {
                  if (itemData.parentId === null) fetchAPi();
                  else updateChildData(itemData.parentId);
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
  const columns: any = [
    {
      title: '序号',
      dataIndex: 'index',
      key: 'index',
      width: 100,
      render(text: string, record: any, index: number): JSX.Element {
        return <span>{index + 1}</span>;
      },
    },
    {
      title: '名称',
      dataIndex: 'name',
      key: 'name',
      ellipsis: true,
    },
    // {
    //   title: '系统域',
    //   dataIndex: 'scopeCode',
    //   key: 'scopeCode',
    // },
    // {
    //   title: '父级标识',
    //   dataIndex: 'parentId',
    //   key: 'parentId',
    // },
    {
      title: '类型',
      dataIndex: 'type',
      key: 'type',
      // render: (text: string, record: any) => <span>{dict?.position[text]}</span>,
    },
    {
      title: '编码',
      dataIndex: 'code',
      key: 'code',
      // render: (text: string, record: any) => <span>{dict?.doctorTitle[text]}</span>,
    },
    {
      title: '排序',
      dataIndex: 'sort',
      key: 'sort',
      width: 90,
    },
    {
      title: '描述',
      dataIndex: 'description',
      key: 'description',
      ellipsis: true,
    },
    // {
    //   title: '版本号',
    //   dataIndex: 'version',
    //   key: 'version',
    // },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      // fixed: 'right',
      render(text: string, record: any, index: number) {
        const isUp = record.status === 'enable';
        return (
          <div>
            <Badge color={isUp ? '#217ba0' : 'yellow'} text={isUp ? '启用' : '禁用'} />
          </div>
        );
      },
    },
    {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      // fixed: 'right',
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
          setShowDictForm(true);
        }}
      >
        <PlusCircleOutlined />
        增加字典
      </Button>
    );
  };
  const getChildRowData = (expanded: any, record: any) => {
    console.log(expanded, record);
    let data: any[] = [];
    if (!childDataSource[record.id]) {
      getDictPage({ pageSize: 100, cond: { parentId: record.id } }).then((res: any) => {
        data = res.data;
        const childData = childDataSource;
        childData[record.id] = data;
        setChildDataSource({ ...childData });
      });
    }
  };
  const expandedRowRender = (record: any) => {
    // eslint-disable-next-line no-plusplus
    return (
      <Table
        rowKey="id"
        showHeader={false}
        loading={!childDataSource[record.id]}
        columns={columns}
        dataSource={childDataSource[record.id]}
        pagination={false}
      />
    );
  };

  return (
    <div className={styles['content-page']}>
      {/* <ListPage
        ListTitle="字典列表"
        list={list}
        fetchApi={fetchAPi}
        columns={columns}
        SearchForm={SearchForm}
        Toolbar={Toolbar}
        BodyProps={{
          expandable: {
            expandedRowRender,
          },
        }}
      /> */}
      <Row className={styles.listHeader}>
        <Col span={12}>
          <div className={styles.title}>字典列表</div>
        </Col>
        <Col span={12}>
          {Toolbar && (
            <div className={styles.toolbar}>
              <Toolbar />
            </div>
          )}
        </Col>
      </Row>
      <Table
        dataSource={dataSource}
        expandable={{ expandedRowRender, rowExpandable: (record: any) => record.parentId === null }}
        columns={columns}
        rowKey="id"
        pagination={{
          position: ['bottomLeft'],
          ...paginationConfig,
          ...pagination,
          onChange: (page, pageSize) => {
            fetchAPi({ current: page, pageSize });
          },
        }}
        onExpand={getChildRowData}
      />
      <DictForm visible={showDictForm} onCancel={closeDictForm} dictData={dictData} />
    </div>
  );
}

export default DictList;
