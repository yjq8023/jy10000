import React, { useEffect, useState } from 'react';
import {
  Badge,
  Button,
  Col,
  Empty,
  message,
  Row,
  Switch,
  Table,
} from '@sinohealth/butterfly-ui-components/lib';
import { PlusCircleOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import ListPage, { paginationType, useList } from '@/components/BaseList';
import SearchForm from './components/SearchForm';
import EmployessForm from './components/EmployessForm';
import { getPageChain, getPageUserInfo, setUserStatus, userDelete } from '@/services/setting';
import ConfirmModel from '@/components/Confirm';
import { useDictKeyValue } from '@/hooks/useDict';
import {
  employeeDelete,
  employeePage,
  employeeReset,
  employeeStatus,
  roleDelete,
  roleStatus,
  treeWithTenant,
} from '@/services/customer';
import TreeList from '@/components/TreeList';
import { handleTreeData, isPermission } from '@/utils';
import styles from './index.less';

function TenantList() {
  const list = useList();
  const [showEmployeeForm, setShowEmployeeForm] = useState(false);
  const [showRoleEmployees, setShowRoleEmployees] = useState(false);
  const [employeeFormData, setEmployeeFormData] = useState<any>();
  const [treeWithTenantData, setTreeWithTenantData] = useState<any>();
  const [currOrganizeId, setCurrOrganizeId] = useState<any>('');
  const [tableLoading, setTableLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [stepNum, setStepNum] = useState<number>(-1);
  const [paginationParams, setPaginationParams] = useState<any>({ current: 1, pageSize: 10 });
  const [cond, setCond] = useState<any>([]);
  const dict = useDictKeyValue();
  const fetchAPi = (organizeId?: string, ext = {}, pageInfo: any = {}) => {
    return employeePage({
      ...paginationParams,
      ...pageInfo,
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
    setEmployeeFormData(null);
    setShowEmployeeForm(false);
  };
  const renderActionDom = (itemData: any) => {
    return (
      <div>
        {isPermission('csr:emp:u') && (
          <>
            &nbsp; &nbsp;
            <a
              onClick={() => {
                setEmployeeFormData({ ...itemData, step: 0 });
                setStepNum(0);
                setShowEmployeeForm(true);
              }}
            >
              基本信息
            </a>
          </>
        )}
        {isPermission('csr:emp:role:config') && (
          <>
            &nbsp; &nbsp;
            <a
              onClick={() => {
                setEmployeeFormData({ ...itemData, step: 1 });
                setStepNum(2);
                setShowEmployeeForm(true);
              }}
            >
              角色
            </a>
          </>
        )}
        &nbsp; &nbsp;
        <a
          onClick={() => {
            ConfirmModel({
              fun: 'info',
              title: '是否重置该员工密码？',
              centered: true,
              onOk: async () => {
                employeeReset(itemData.id, itemData.userId).then((res) => {
                  fetchAPi();
                  message.success('操作成功');
                });
              },
            });
          }}
        >
          重置密码
        </a>
        {isPermission('csr:emp:d') && (
          <>
            &nbsp; &nbsp;
            <a
              onClick={() => {
                ConfirmModel({
                  fun: 'error',
                  title: '是否确定删除该员工？',
                  centered: true,
                  onOk: async () => {
                    employeeDelete(itemData.id).then((res) => {
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
      title: '用户账号',
      dataIndex: 'account',
      key: 'account',
    },
    {
      title: '手机号',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: '真实姓名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '所属部门/组织',
      dataIndex: 'department',
      key: 'department',
      render: (_: any, record: any) => record.department.name,
    },
    {
      title: '账号失效期',
      dataIndex: 'expiredTime',
      key: 'expiredTime',
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
            {isPermission('csr:emp:u') && (
              <Switch
                checked={isUp}
                onChange={(value) => {
                  employeeStatus(value ? 'enabled' : 'disabled', record.id).then((res) => {
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
      title: '创建时间',
      width: 180,
      dataIndex: 'createTime',
      key: 'createTime',
    },
    {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      width: 250,
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
          setShowEmployeeForm(true);
        }}
      >
        <PlusCircleOutlined />
        增加员工
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
          {isPermission('csr:emp:q') && (
            <SearchForm
              organizedid={currOrganizeId}
              onFinish={(values: any) => {
                fetchAPi(currOrganizeId, values);
              }}
            />
          )}
          <Row className={styles.listHeader}>
            <Col span={12}>
              <div className={styles.title}>员工列表</div>
            </Col>
            <Col span={12}>
              {Toolbar && isPermission('csr:emp:c') && (
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
      <EmployessForm
        visible={showEmployeeForm}
        onCancel={closeRoleForm}
        data={employeeFormData}
        organizeId={currOrganizeId}
      />
    </div>
  );
}

export default TenantList;
