import React, { useEffect, useRef, useState } from 'react';
import {
  Badge,
  Button,
  Col,
  List,
  Row,
  Switch,
  Table,
  TableColumnsType,
  Input,
  Form,
  Popover,
  Radio,
} from '@sinohealth/butterfly-ui-components/lib';
import { PlusCircleOutlined } from '@ant-design/icons';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import ListPage, { paginationType, useList } from '@/components/BaseList';
import SearchForm from './components/SearchForm';
import ConfirmModel from '@/components/Confirm';
import { useDictKeyValue } from '@/hooks/useDict';
import styles from './index.less';
import {
  organizeDelete,
  organizePage,
  organizeStatus,
  organizeTree,
  tenantPage,
} from '@/services/customer';
import OrganForm from './components/OrganForm';
import { handleTreeData, searchTreeData, isPermission, filterChildren } from '@/utils';
import { useExpandRowKeys } from '@/hooks';
import LabelForm from './components/LabelForm';

const { Search } = Input;

function DictList() {
  const [urlParams] = useSearchParams();
  const list = useList();
  const [showOrganForm, setShowOrganForm] = useState(false);
  const [dictData, setdictData] = useState<any>();
  const [labelData, setLabelData] = useState<any>();
  const [dataSource, setDataSource] = useState([]);
  const [childDataSource, setChildDataSource] = useState<any>({});
  const [tenantList, setTenantList] = useState([]);
  const [curr] = urlParams.getAll('curr');
  console.log(curr);
  const [currTenantId, setCurrTenantId] = useState(''); // 当前租户id
  const [searchForm, setSearchForm] = useState({});
  const { triggerExpandRows, expandIds, expandRows, closeRows } = useExpandRowKeys(dataSource);

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
    organizeTree(params.tenantId || currTenantId).then((res: any) => {
      if (params.name) {
        // const { array } = handleTreeData(res, params.name);
        setDataSource(searchTreeData(res, params.name));
        return;
      }
      setDataSource(filterChildren(res));
    });
  };

  const getTenantListPage = (name = '') => {
    tenantPage({ limit: 1000, cond: { name } }).then((data) => {
      if (data?.length > 0) {
        if (name) {
          setTenantList(
            data.filter((item: { id: string; name: string }) => item.name.includes(name)),
          );
        } else {
          setCurrTenantId(curr || data[0].id);
          setTenantList(data);
        }
        fetchAPi({ current: 1, tenantId: curr || data[0].id });
      }
    });
  };

  useEffect(() => {
    getTenantListPage();
  }, []);

  /**
   * 切换租户id
   * @param tenantId
   */
  const switchTenant = (tenantId: string) => {
    setCurrTenantId(tenantId);
    fetchAPi({ current: 1, tenantId });
  };

  const closeOrganForm = (success?: boolean, parentId?: string | number) => {
    if (parentId) {
      updateChildData(parentId);
    } else if (success) {
      fetchAPi();
    }
    setdictData(null);
    setShowOrganForm(false);
  };

  /**
   * 更新子表
   * @param parentId
   */
  const updateChildData = (parentId: any) => {
    const childData = childDataSource;
    // getDictPage({ pageSize: 100, cond: { parentId } }).then((res: any) => {
    //   const data = res.data;
    //   childData[parentId] = data;
    //   setChildDataSource({ ...childData });
    // });
  };

  const navigate = useNavigate();
  const renderActionDom = (itemData: any) => {
    return (
      <div>
        <a
          onClick={() => {
            setLabelData({
              id: itemData.id,
              tenantId: currTenantId,
              labels: itemData?.data?.labels.map((item: any) => item.id),
            });
          }}
        >
          编辑标签
        </a>
        &nbsp; &nbsp;
        <a
          onClick={() => {
            navigate(
              `/setting/organ/detail?parentId=${itemData.id}&tenantId=${currTenantId}&back=${currTenantId}`,
            );
          }}
        >
          添加下级
        </a>
        &nbsp; &nbsp;
        <a
          onClick={() => {
            navigate(`/setting/organ/detail?id=${itemData.id}&back=${currTenantId}`);
          }}
        >
          编辑
        </a>
        &nbsp; &nbsp;
        <a
          onClick={() => {
            ConfirmModel({
              fun: 'error',
              title: `是否确定删除${itemData.name}？`,
              centered: true,
              onOk: async () => {
                organizeDelete(itemData.id).then((res) => {
                  fetchAPi();
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
    {
      title: '标签',
      dataIndex: 'label',
      key: 'labek',
      render: (text: string, record: any) => {
        const content = record.data.labels.map((item: any) => (
          <span key={item.name} className={styles.labelsItem}>
            {item.name}
          </span>
        ));
        return (
          <Popover content={<div className={styles.poplabels}>{content}</div>}>
            <div className={styles.labels}>{content}</div>
          </Popover>
        );
      },
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
      render: (text: string, record: any) => <span>{record.data.description}</span>,
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      // fixed: 'right',
      render(text: string, record: any, index: number) {
        const isUp = record.data.status === 'enabled';
        return (
          <div>
            <Badge color={isUp ? '#217ba0' : 'yellow'} text={isUp ? '启用' : '禁用'} />
            &nbsp;
            <Switch
              checked={isUp}
              onChange={(value) => {
                organizeStatus(value ? 'enabled' : 'disabled', record.id).then((res) => {
                  fetchAPi();
                });
              }}
            />
          </div>
        );
      },
    },
    {
      title: '操作',
      dataIndex: 'action',
      width: 280,
      key: 'action',
      // fixed: 'right',
      render(text: string, record: any) {
        return renderActionDom(record);
      },
    },
  ];
  const Toolbar = () => {
    return (
      <>
        <Radio.Group
          value={!!(expandIds && expandIds.length > 0)}
          buttonStyle="solid"
          optionType="button"
          onChange={(e) => {
            if (e.target.value) {
              expandRows();
            } else {
              closeRows();
            }
          }}
        >
          <Radio.Button value={true}>全局展开</Radio.Button>
          <Radio.Button value={false}>全局折叠</Radio.Button>
        </Radio.Group>
        &nbsp; &nbsp;
        <Button
          type="primary"
          onClick={() => {
            navigate(`/setting/organ/detail?tenantId=${currTenantId}`);
          }}
        >
          <PlusCircleOutlined />
          增加组织
        </Button>
      </>
    );
  };
  const onSearch = (value: string) => {
    getTenantListPage(value);
  };

  return (
    <div className={styles['content-page']}>
      <List
        className={styles['content-page-list']}
        bordered={true}
        header={
          <Search
            className={styles['content-page-list-search']}
            placeholder="请输入关键词进行过滤"
            allowClear
            onSearch={onSearch}
          />
        }
        dataSource={tenantList}
        renderItem={(item: any) => (
          <List.Item
            className={item.id === currTenantId ? styles.active : ''}
            onClick={() => {
              switchTenant(item.id);
              closeRows([]);
            }}
          >
            <div>{item.name}</div>
          </List.Item>
        )}
      />
      <div className={styles['content-page-main']}>
        <SearchForm
          tenantid={currTenantId}
          onFinish={(values) => {
            // console.log(Object.keys(values));
            setSearchForm(values);
            fetchAPi({ ...values });
            if (values.name) {
              expandRows();
            } else {
              closeRows();
            }
          }}
        />
        <div className={styles['content-page-main_table']}>
          <Row className={styles.listHeader}>
            <Col span={12}>
              <div className={styles.title}>组织列表</div>
            </Col>
            <Col span={12}>
              <div className={styles.toolbar}>
                <Toolbar />
              </div>
            </Col>
          </Row>
          <Table
            dataSource={dataSource}
            expandedRowKeys={expandIds}
            expandable={{
              //   expandedRowRender,
              //   rowExpandable: (record: any) => record.parentId === null,
              onExpand: () => {
                closeRows();
              },
            }}
            columns={columns}
            rowKey="id"
          />
        </div>
      </div>
      <OrganForm visible={showOrganForm} onCancel={closeOrganForm} />
      <LabelForm
        labelData={labelData}
        onCancel={(success) => {
          setLabelData(null);
          fetchAPi();
        }}
      />
    </div>
  );
}

export default DictList;
