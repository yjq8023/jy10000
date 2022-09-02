import React, { FC, useEffect, useState } from 'react';
import { Form, Input, message, Select, Steps, Tree } from '@sinohealth/butterfly-ui-components/lib';
import SimpleModal from '@/components/SimpleModal';
import { useDict } from '@/hooks/useDict';
import { handelOptions } from '@/utils';
import ConfirmModel from '@/components/Confirm';
import {
  departmentTree,
  employeeList,
  organizeTreeByOrganizeId,
  roleAdd,
  roleDataAccessAdd,
  roleDataAccessEdit,
  roleDataAccessInfo,
  roleDataAccessOption,
  roleEdit,
  roleInfo,
  roleResourceAdd,
  roleResourceEdit,
  roleResourceInfo,
  roleResourceTree,
} from '@/services/customer';
import TreeItem from '@/components/TreeItem';
import styles from './index.less';

const { Step } = Steps;

type RoleFormType = {
  data?: any;
  visible: boolean;
  organizeId?: string;
  onCancel?: (success?: boolean) => void;
};
const RoleForm: FC<RoleFormType> = (props) => {
  const dict = useDict();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [roleDataAccessOptions, setRoleDataAccessOptions] = useState<any[]>([]);
  const [stepNum, setStepNum] = useState(0);
  const [roleId, setRoleId] = useState('');
  const [disableSubmit, setDisableSubmit] = useState(false);
  // 数据配置权限 指定的数据
  const [selAssignData, setSelAssignData] = useState<any>([]);
  const [selAssignLabel, setSelAssignLabel] = useState<any>([]);
  const [roleResourceTrees, setRoleResourceTrees] = useState<any>([]);
  useEffect(() => {
    if (props.organizeId) {
      roleResourceTree(props.organizeId).then((res) => {
        setRoleResourceTrees(res);
      });
    }
  }, [props.organizeId]);
  useEffect(() => {
    roleDataAccessOption().then((res) => {
      setRoleDataAccessOptions(res);
    });
  }, []);
  useEffect(() => {
    if (props.visible) {
      if (props.data && props.data.id) {
        setStepNum(props.data.step);
        setLoading(true);
        if (props.data.step === 0) {
          roleInfo(props.data.id)
            .then((res) => {
              form.setFieldsValue(res);
            })
            .catch(() => {
              setDisableSubmit(true);
            })
            .finally(() => {
              setLoading(false);
            });
        }
        if (props.data.step === 1) {
          roleDataAccessInfo(props.data.id)
            .then((res) => {
              if (res.dataAccess) {
                handleAssignData(res.dataAccess, false);
              }
              form.setFieldsValue(res);
            })
            .catch(() => {
              setDisableSubmit(true);
            })
            .finally(() => {
              setLoading(false);
            });
        }
        if (props.data.step === 2) {
          roleResourceInfo(props.data.id)
            .then((res) => {
              form.setFieldsValue({ resource: res.map((num: number) => num.toString()) });
            })
            .catch(() => {
              setDisableSubmit(true);
            })
            .finally(() => {
              setLoading(false);
            });
        }
      } else {
        setStepNum(0);
        setSelAssignData([]);
      }
    }
  }, [props.data, props.visible]);
  const onCancel = (success?: boolean) => {
    form.resetFields();
    setStepNum(0);

    if (props.onCancel) {
      if (!props.data && stepNum > 0) {
        props.onCancel(true);
      } else {
        props.onCancel(success);
      }
    }
  };

  const handleResource = (checkedKeys: string[], tree = []) => {
    const arr = new Set<string>();
    tree.forEach((element: any) => {
      let paths: Set<string> = new Set<string>();
      if (checkedKeys.includes(element.id)) {
        console.log('有匹配到');
        paths = element.path.split('@');
      }
      if (element.children.length > 0) {
        paths = handleResource(checkedKeys, element.children);
      }
      paths.forEach((str: string) => {
        arr.add(str);
      });
    });
    return arr;
  };

  const finish = (values: any) => {
    const params = {
      ...values,
    };
    console.log(params.resource);
    if (params.resource && params.resource.length > 0) {
      const resource = handleResource(params.resource, roleResourceTrees);
      const resourceArr: string[] = [];
      resource.forEach((item) => {
        resourceArr.push(item);
      });
      params.resource = resourceArr;
    }
    if (stepNum === 2 && !params.resource) {
      params.resource = [];
    }
    console.log(params);
    setLoading(true);
    if (props.data) {
      if (props.data.step === 0) {
        roleEdit(props.data.id, params)
          .then((res) => {
            console.log(res);
            onCancel(true);
          })
          .finally(() => {
            setLoading(false);
          });
      }
      if (props.data.step === 1) {
        roleDataAccessEdit(props.data.id, params)
          .then((res) => {
            console.log(res);
            onCancel(true);
          })
          .finally(() => {
            setLoading(false);
          });
      }
      if (props.data.step === 2) {
        roleResourceEdit(props.data.id, params.resource)
          .then((res) => {
            console.log(res);
            onCancel(true);
          })
          .finally(() => {
            setLoading(false);
          });
      }
    } else {
      if (stepNum === 0) {
        roleAdd(props.organizeId, params)
          .then((res) => {
            console.log(res);
            setRoleId(res);
            setStepNum(1);
          })
          .finally(() => {
            setLoading(false);
          });
      }
      if (stepNum === 1) {
        roleDataAccessAdd(roleId, params)
          .then((res) => {
            console.log(res);
            setStepNum(2);
          })
          .finally(() => {
            setLoading(false);
          });
      }
      if (stepNum === 2) {
        roleResourceAdd(roleId, params.resource)
          .then((res) => {
            setStepNum(0);
            console.log(res);
            onCancel(true);
          })
          .finally(() => {
            setLoading(false);
          });
      }
    }
  };

  /**
   * 处理自定数据权限载入
   * @param v
   * @param reset 是否清楚选择项
   */
  const handleAssignData = (v: string, reset = true) => {
    if (reset) {
      form.resetFields(['pointId']);
    }
    setSelAssignLabel(v);
    if (v === 'POINT_ORG' && props.organizeId) {
      // 指定组织
      organizeTreeByOrganizeId(props.organizeId).then((res) => {
        setSelAssignData(res);
      });
    } else if (v === 'POINT_DEPT' && props.organizeId) {
      // 指定部门
      departmentTree(props.organizeId).then((res) => {
        setSelAssignData(res);
      });
    } else if (v === 'POINT_EMPLOYEE' && props.organizeId) {
      // 指定员工(可用员工)
      employeeList({ organizeId: props.organizeId, status: 'enabled' }).then((res) => {
        setSelAssignData(res);
      });
    } else {
      setSelAssignData([]);
      setSelAssignLabel('');
    }
  };

  return (
    <SimpleModal
      visible={props.visible}
      //   closable={false}
      title={props?.data?.id ? '编辑角色' : '增加角色'}
      cancelButtonProps={{ type: 'info' }}
      onOk={() => {
        form.submit();
      }}
      okText={stepNum === 2 || props.data ? '保存' : '下一步'}
      width={560}
      loading={loading}
      okButtonProps={{ disabled: disableSubmit }}
      onCancel={() => {
        onCancel();
      }}
    >
      {!props.data && (
        <Steps current={stepNum} style={{ marginBottom: 30 }}>
          <Step title="基本信息" />
          <Step title="数据权限" />
          <Step title="资源权限" />
        </Steps>
      )}
      <Form labelAlign="right" form={form} labelCol={{ span: 4 }} onFinish={finish} colon={false}>
        {stepNum === 0 && (
          <>
            <Form.Item
              label="角色姓名"
              name="name"
              rules={[{ required: true, message: '请填写角色姓名' }]}
            >
              <Input placeholder="请输入角色名称（必填）" />
            </Form.Item>
            <Form.Item label="角色描述" name="description">
              <Input.TextArea placeholder="请输入内容" />
            </Form.Item>
          </>
        )}
        {stepNum === 1 && (
          <>
            <Form.Item
              label="数据权限"
              name="dataAccess"
              required
              rules={[{ required: true, message: '请选择数据权限' }]}
            >
              <Select
                placeholder="请选择数据权限（必选）"
                onChange={(v) => {
                  console.log(v);
                  handleAssignData(v);
                }}
              >
                {roleDataAccessOptions.map((item) => (
                  <Select.OptGroup
                    label={item?.dimensionOption.name}
                    key={item?.dimensionOption.code}
                  >
                    {item.accessOption.map((op: any) => (
                      <Select.Option key={op.code} value={op.code}>
                        {op.name}
                      </Select.Option>
                    ))}
                  </Select.OptGroup>
                ))}
              </Select>
            </Form.Item>
            {selAssignData.length > 0 && (
              <Form.Item label=" " name="pointId" rules={[{ required: true, message: '请选择' }]}>
                {selAssignLabel === 'POINT_EMPLOYEE' ? (
                  <Select
                    showSearch
                    filterOption={(input, option) =>
                      (option!.label as unknown as string)
                        .toLowerCase()
                        .includes(input.toLowerCase())
                    }
                    mode="multiple"
                    options={selAssignData.map((item: any) => ({
                      label: item.name,
                      value: item.id,
                    }))}
                    placeholder="请选择员工"
                  />
                ) : (
                  <TreeItem
                    ortherTreeProps={{ className: styles.treeBorder }}
                    treeData={selAssignData}
                  />
                )}
              </Form.Item>
            )}
          </>
        )}
        {stepNum === 2 && (
          <Form.Item
            label="资源权限"
            name="resource"
            // rules={[{ required: true, message: '请选择资源权限' }]}
          >
            <TreeItem treeData={roleResourceTrees} />
          </Form.Item>
        )}
      </Form>
    </SimpleModal>
  );
};
export default RoleForm;
