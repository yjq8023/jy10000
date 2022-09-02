import React, { useEffect, useState } from 'react';
import {
  Badge,
  Button,
  Col,
  Empty,
  Row,
  Switch,
  Table,
} from '@sinohealth/butterfly-ui-components/lib';
import { PlusCircleOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import ListPage, { paginationType, useList } from '@/components/BaseList';
import SearchForm from './components/SearchForm';
import RoleForm from './components/RoleForm';
import ConfirmModel from '@/components/Confirm';
import { useDictKeyValue } from '@/hooks/useDict';
import { roleDelete, rolePage, roleStatus, treeWithTenant } from '@/services/customer';
import TreeList from '@/components/TreeList';
import { handleTreeData, isPermission } from '@/utils';
import styles from './index.less';
import EmployeesTable from './components/EmployeesTable';

function TenantList() {
  const list = useList();
  const [showRoleForm, setShowRoleForm] = useState(false);
  const [showRoleEmployees, setShowRoleEmployees] = useState(false);
  const [roleFormData, setRoleFormData] = useState<any>();
  const [treeWithTenantData, setTreeWithTenantData] = useState<any>();
  const [currOrganizeId, setCurrOrganizeId] = useState<any>('');
  const [tableLoading, setTableLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [stepNum, setStepNum] = useState<number>(-1);
  const [paginationParams, setPaginationParams] = useState<any>({});
  const dict = useDictKeyValue();
  const [cond, setCond] = useState<any>([]);
  const fetchAPi = (organizeId?: string, ext = {}, pageInfo: any = {}) => {
    return rolePage({
      ...paginationParams,
      pageNo: pageInfo.current || paginationParams.current,
      limit: pageInfo.pageSize,
      cond: { organizeId: organizeId || currOrganizeId, ...cond, ...ext },
    })
      .then((res) => {
        console.log(res);
        setDataSource(res.data);
        setCond(ext);
        setPaginationParams({
          current: res.pageIndex,
          pageSize: res.pageSize,
          total: res.totalCount,
        });
      })
      .finally(() => {
        setTableLoading(false);
      });
  };

  const getTreeWithTenant = () => {
    treeWithTenant().then((res) => {
      setTreeWithTenantData(res.map((item: any) => ({ ...item, selectable: false })));
    });
  };

  useEffect(() => {
    getTreeWithTenant();
  }, []);

  const closeRoleForm = (success?: boolean) => {
    if (success) {
      fetchAPi();
    }
    setRoleFormData(null);
    setShowRoleForm(false);
  };
  const renderActionDom = (itemData: any) => {
    return (
      <div>
        {isPermission('csr:role:u') && (
          <a
            onClick={() => {
              setRoleFormData({ ...itemData, step: 0 });
              setStepNum(0);
              setShowRoleForm(true);
            }}
          >
            基本信息
          </a>
        )}
        {isPermission('csr:role:data:config') && (
          <>
            &nbsp; &nbsp;
            <a
              onClick={() => {
                setRoleFormData({ ...itemData, step: 1 });
                setStepNum(1);
                setShowRoleForm(true);
              }}
            >
              数据权限
            </a>
          </>
        )}
        {isPermission('csr:role:res:config') && (
          <>
            &nbsp; &nbsp;
            <a
              onClick={() => {
                setRoleFormData({ ...itemData, step: 2 });
                setStepNum(2);
                setShowRoleForm(true);
              }}
            >
              资源权限
            </a>
          </>
        )}
        {isPermission('csr:role:emp:q') && (
          <>
            &nbsp; &nbsp;
            <a
              onClick={() => {
                setRoleFormData({ ...itemData });
                setShowRoleEmployees(true);
              }}
            >
              查看员工
            </a>
          </>
        )}
        {isPermission('csr:role:d') && (
          <>
            &nbsp; &nbsp;
            <a
              onClick={() => {
                ConfirmModel({
                  fun: 'error',
                  title: '是否确定删除该角色？',
                  centered: true,
                  onOk: async () => {
                    roleDelete(itemData.id).then((res) => {
                      fetchAPi();
                    });
                  },
                });
              }}
            >
              删除
            </a>
          </>
        )}
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
      title: '角色名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '角色描述',
      dataIndex: 'description',
      key: 'description',
      ellipsis: true,
    },
    {
      title: '创建时间',
      width: 180,
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
            {isPermission('csr:role:status:u') && (
              <Switch
                checked={isUp}
                onChange={(value) => {
                  roleStatus(value ? 'enabled' : 'disabled', record.id).then((res) => {
                    fetchAPi();
                  });
                }}
              />
            )}
          </div>
        );
      },
    },
    {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      width: 380,
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
          setShowRoleForm(true);
        }}
      >
        <PlusCircleOutlined />
        增加角色
      </Button>
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
          if (e.node.data.isOrganize) {
            fetchAPi(e.node.data.id, {}, { current: 1, pageSize: 10 });
            setCurrOrganizeId(e.node.data.id);
          } else {
            setCurrOrganizeId(null);
          }
        }}
      />
      {currOrganizeId ? (
        <div className={styles.roleTable}>
          {isPermission('csr:role:q') && (
            <SearchForm
              organizedid={currOrganizeId}
              onFinish={(values: any) => {
                fetchAPi(currOrganizeId, values);
              }}
            />
          )}
          <Row className={styles.listHeader}>
            <Col span={12}>
              <div className={styles.title}>角色列表</div>
            </Col>
            <Col span={12}>
              {Toolbar && isPermission('csr:role:c') && (
                <div className={styles.toolbar}>
                  <Toolbar />
                </div>
              )}
            </Col>
          </Row>
          <Table
            loading={tableLoading}
            dataSource={dataSource}
            columns={columns}
            rowKey="id"
            pagination={paginationParams}
            onChange={(pagination) => {
              fetchAPi(currOrganizeId, {}, pagination);
            }}
            expandable={{
              rowExpandable: (record: any) => {
                console.log(record);
                return record.children.length > 0;
              },
            }}
          />
        </div>
      ) : (
        <Empty style={{ width: '100%' }} />
      )}
      <RoleForm
        visible={showRoleForm}
        onCancel={closeRoleForm}
        data={roleFormData}
        organizeId={currOrganizeId}
      />
      {showRoleEmployees && (
        <EmployeesTable
          visible={true}
          roleId={roleFormData?.id}
          onCancel={() => {
            setShowRoleEmployees(false);
            setRoleFormData(null);
          }}
        />
      )}
    </div>
  );
}

export default TenantList;
