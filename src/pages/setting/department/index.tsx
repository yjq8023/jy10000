import React, { useEffect, useState } from 'react';
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
  Empty,
  Radio,
} from '@sinohealth/butterfly-ui-components/lib';
import { PlusCircleOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import ListPage, { paginationType, useList } from '@/components/BaseList';
import SearchForm from './components/SearchForm';
import ConfirmModel from '@/components/Confirm';
import { useDictKeyValue } from '@/hooks/useDict';
import styles from './index.less';
import TreeList from '@/components/TreeList';
import {
  departmentDelete,
  departmentStatus,
  departmentTree,
  treeWithTenant,
} from '@/services/customer';
import DepartmentForm from './components/DepartmentForm';
import { filterChildren, handleTreeData, searchTreeData, isPermission } from '@/utils';
import { useExpandRowKeys } from '@/hooks';

const { Search } = Input;

function CustomerDepartment() {
  const list = useList();
  const [showDictForm, setShowDictForm] = useState(false);
  const [treeWithTenantData, setTreeWithTenantData] = useState<any>();
  const [tableLoading, setTableLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [currOrganizeId, setCurrOrganizeId] = useState<any>('');
  const [departmentForm, setDepartmentForm] = useState<any>({});
  const { triggerExpandRows, expandIds, expandRows, closeRows } = useExpandRowKeys(dataSource);
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

  const getTreeWithTenant = () => {
    treeWithTenant().then((res) => {
      setTreeWithTenantData(res.map((item: any) => ({ ...item, selectable: false })));
    });
  };

  useEffect(() => {
    getTreeWithTenant();
  }, []);

  const fetchAPi = (organizeId?: string) => {
    console.log(organizeId, currOrganizeId);
    setTableLoading(true);
    departmentTree(organizeId || currOrganizeId)
      .then((res: any) => {
        setDataSource(filterChildren(res));
      })
      .finally(() => {
        setTableLoading(false);
      });
  };

  const closeDictForm = (success?: boolean, parentId?: string | number) => {
    if (success) {
      fetchAPi();
    }
    setShowDictForm(false);
  };

  const renderActionDom = (itemData: any) => {
    return (
      <div>
        <a
          onClick={() => {
            console.log(itemData.data);
            setDepartmentForm({ parentId: itemData.data.id });
            setShowDictForm(true);
          }}
        >
          添加下级
        </a>
        &nbsp; &nbsp;
        <a
          onClick={() => {
            setDepartmentForm({
              ...itemData.data,
            });
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
              title: `是否确定删除${itemData.name}?`,
              centered: true,
              onOk: async () => {
                departmentDelete(itemData.data.id).then((res) => {
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
      title: '部门名称',
      dataIndex: 'name',
      key: 'name',
      ellipsis: true,
    },
    {
      title: '排序',
      dataIndex: 'sort',
      key: 'sort',
      width: 90,
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
      render: (text: string, record: any) => <span>{record.data.createTime}</span>,
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
                departmentStatus(value ? 'enabled' : 'disabled', record.data.id).then((res) => {
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
      key: 'action',
      // fixed: 'right',
      render(text: string, record: any) {
        return renderActionDom(record);
      },
    },
  ];
  const Toolbar = () => {
    return (
      <div>
        <Radio.Group
          value={!!(expandIds && expandIds.length > 0)}
          buttonStyle="solid"
          optionType="button"
          onChange={(e) => {
            if (e.target.value) {
              expandRows();
            } else {
              closeRows([]);
            }
          }}
        >
          <Radio.Button value={true}>全局展开</Radio.Button>
          <Radio.Button value={false}>全局折叠</Radio.Button>
        </Radio.Group>
        &nbsp;
        <Button
          type="primary"
          onClick={() => {
            setShowDictForm(true);
            setDepartmentForm({ parentId: '0' });
          }}
        >
          <PlusCircleOutlined />
          增加部门
        </Button>
      </div>
    );
  };

  const onSearch = (value: string) => {
    if (value) {
      const { array } = handleTreeData(treeWithTenantData, value);
      setTreeWithTenantData(array);
    } else {
      getTreeWithTenant();
    }
  };

  return (
    <div className={styles['content-page']}>
      <TreeList
        dataSource={treeWithTenantData}
        fieldNames={{ title: 'name', key: 'id' }}
        autoExpandParent={true}
        onSearch={onSearch}
        defaultExpandAll
        onSelect={(key, e) => {
          closeRows([]);
          if (e.node.data.isOrganize) {
            fetchAPi(e.node.data.id);
            setCurrOrganizeId(e.node.data.id);
          } else {
            setCurrOrganizeId(null);
          }
        }}
      />
      {currOrganizeId ? (
        <div>
          <SearchForm
            organizedid={currOrganizeId}
            onFinish={(values) => {
              if (values.name) {
                setDataSource(searchTreeData(dataSource, values.name));
                expandRows();
              } else {
                fetchAPi();
                closeRows();
              }
            }}
          />
          <div className={styles.table}>
            <Row className={styles.listHeader}>
              <Col span={12}>
                <div className={styles.title}>部门列表</div>
              </Col>
              <Col span={12}>
                <div className={styles.toolbar}>
                  <Toolbar />
                </div>
              </Col>
            </Row>
            <Table
              loading={tableLoading}
              dataSource={dataSource}
              columns={columns}
              rowKey="id"
              pagination={false}
              expandedRowKeys={expandIds}
              expandable={{
                rowExpandable: (record: any) => {
                  console.log(record);
                  return record.children.length > 0;
                },
                onExpand: (e) => {
                  closeRows();
                },
              }}
            />
          </div>
        </div>
      ) : (
        <Empty style={{ width: '100%' }} />
      )}
      <DepartmentForm
        visible={showDictForm}
        data={departmentForm}
        organizeId={currOrganizeId}
        onCancel={closeDictForm}
      />
    </div>
  );
}

export default CustomerDepartment;
