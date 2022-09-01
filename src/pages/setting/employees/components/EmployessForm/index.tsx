import React, { FC, useEffect, useState } from 'react';
import moment, { Moment } from 'moment';
import {
  Col,
  DatePicker,
  Form,
  Input,
  message,
  Row,
  Select,
  Steps,
  Tree,
  TreeSelect,
} from '@sinohealth/butterfly-ui-components/lib';
import SimpleModal from '@/components/SimpleModal';
import { useDict } from '@/hooks/useDict';
import {
  departmentTree,
  employeeAccount,
  employeeAdd,
  employeeEdit,
  employeeGetRole,
  employeeInfo,
  employeeRole,
  employeeRoleEdit,
  roleAdd,
  roleEdit,
} from '@/services/customer';
import UploadOne from '@/components/UploadOne';
import { getBirth, getSex, isEmpty } from '@/utils';

const { Step } = Steps;

type EmployessFormType = {
  data?: any;
  visible: boolean;
  organizeId?: string;
  onCancel?: (success?: boolean) => void;
};
const EmployessForm: FC<EmployessFormType> = (props) => {
  const dict = useDict();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [employeeDataAccessOptions, setEmployeeDataAccessOptions] = useState<any[]>([]);
  const [roleResourceTrees, setRoleResourceTrees] = useState<any[]>([]);
  const [stepNum, setStepNum] = useState(0);
  const [employeeId, setEmployeeId] = useState('');
  const [resourceKeys, setResourceKeys] = useState<any>([]);
  const [departmentTreeOption, setDepartmentTreeOption] = useState<any>([]);
  const [employeeRoleOptions, setEmployeeRoleOptions] = useState<any>([]);
  const [disableSubmit, setDisableSubmit] = useState(false);
  const [existing, setExisting] = useState(false); // 判断账号是否在其他机构存在

  useEffect(() => {
    if (props.organizeId) {
      departmentTree(props.organizeId).then((res) => {
        setDepartmentTreeOption(res);
      });
      employeeGetRole(props.organizeId).then((res) => {
        setEmployeeRoleOptions(res);
      });
    }
  }, [props.organizeId]);
  useEffect(() => {
    if (props.data && props.data.id) {
      setStepNum(props.data.step);
      setLoading(true);
      if (props.data.step === 0) {
        employeeInfo(props.data.id)
          .then((res) => {
            form.setFieldsValue({
              ...res,
              departmentId: res.department.id,
              birthday: res.birthday ? moment(res.birthday) : null,
              expiredTime: moment(res.expiredTime),
            });
          })
          .catch(() => {
            console.log('错误');
            setDisableSubmit(true);
          })
          .finally(() => {
            setLoading(false);
          });
      }
      if (props.data.step === 1) {
        employeeRole(props.data.id)
          .then((res) => {
            // 后端要求 角色是个数组
            form.setFieldsValue({ ...res, role: res?.length ? res[0] : null });
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
    }
  }, [props.data]);
  const onCancel = (success?: boolean) => {
    setExisting(false);
    form.resetFields();
    if (props.onCancel) {
      if (!props.data && stepNum > 0) {
        props.onCancel(true);
      } else {
        props.onCancel(success);
      }
    }
  };

  /**
   * 失焦时 获取账号
   */
  const queryAccount = () => {
    const phone = form.getFieldValue('phone');
    const idCard = form.getFieldValue('idCard');
    if (idCard) {
      form.setFieldsValue({ birthday: moment(getBirth(idCard)), gender: getSex(idCard) });
    }
    if (phone && idCard) {
      employeeAccount({ phone, idCard }).then((res) => {
        if (!isEmpty(res)) {
          setExisting(true);
          form.setFieldsValue({ account: res });
        } else {
          form.setFieldsValue({ account: null });
          setExisting(false);
        }
      });
    }
  };

  const finish = (values: any) => {
    const params = {
      ...values,
    };
    if (params.expiredTime) {
      params.expiredTime = (params.expiredTime as Moment).format('YYYY-MM-DD');
    }
    if (params.birthday) {
      params.birthday = (params.birthday as Moment).format('YYYY-MM-DD');
    }
    console.log(params, resourceKeys);
    setLoading(true);
    if (props.data) {
      if (props.data.step === 0) {
        employeeEdit(props.data.id, params)
          .then((res) => {
            console.log(res);
            onCancel(true);
          })
          .finally(() => {
            setLoading(false);
          });
      }
      if (props.data.step === 1) {
        // 后端要求 角色是个数组
        employeeRoleEdit(props.data.id, [params.role])
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
        employeeAdd(props.organizeId, params)
          .then((res) => {
            console.log(res);
            setEmployeeId(res);
            setStepNum(1);
          })
          .finally(() => {
            setLoading(false);
          });
      }
      if (stepNum === 1) {
        // 后端要求 角色是个数组
        employeeRoleEdit(employeeId, [params.role])
          .then((res) => {
            onCancel(true);
          })
          .finally(() => {
            setLoading(false);
          });
      }
    }
  };

  return (
    <SimpleModal
      visible={props.visible}
      //   closable={false}
      title={props?.data?.id ? '编辑员工' : '增加员工'}
      cancelButtonProps={{ type: 'info' }}
      onOk={() => {
        form.submit();
      }}
      okText={stepNum === 2 || props.data ? '保存' : '下一步'}
      width={stepNum === 0 ? 960 : 460}
      loading={loading}
      okButtonProps={{ disabled: disableSubmit }}
      onCancel={() => {
        onCancel();
      }}
    >
      {!props.data && (
        <Steps current={stepNum} style={{ margin: '10px auto 30px', width: 300 }}>
          <Step title="基本信息" />
          <Step title="配置角色" />
        </Steps>
      )}
      <Form labelAlign="right" form={form} labelCol={{ span: 7 }} onFinish={finish} colon={false}>
        {stepNum === 0 && (
          <Row gutter={16}>
            <Col span={9}>
              <Form.Item
                label="手机号"
                name="phone"
                rules={[{ required: true, message: '请填写手机号' }]}
              >
                <Input
                  placeholder="请输入手机号（必填）"
                  onBlur={queryAccount}
                  disabled={props.data}
                />
              </Form.Item>
              <Form.Item
                label="真实姓名"
                name="name"
                rules={[{ required: true, message: '请填写真实姓名' }]}
              >
                <Input placeholder="请输入真实姓名（必填）" disabled={props.data} />
              </Form.Item>
              <Form.Item
                label="出生日期"
                name="birthday"
                rules={[{ required: true, message: '请填出生日期' }]}
              >
                <DatePicker disabled={props.data} style={{ width: '100%' }} />
              </Form.Item>
              <Form.Item
                label="账号失效日期"
                name="expiredTime"
                rules={[{ required: true, message: '请填账号失效日期' }]}
              >
                <DatePicker style={{ width: '100%' }} />
              </Form.Item>
              <Form.Item label="用户昵称" name="nickname">
                <Input placeholder="请输入内容" />
              </Form.Item>
            </Col>
            <Col span={9}>
              <Form.Item
                label="身份证号"
                name="idCard"
                rules={[{ required: true, message: '请填写身份证号' }]}
              >
                <Input
                  placeholder="请输入身份证号（必填）"
                  onBlur={queryAccount}
                  maxLength={18}
                  disabled={props.data}
                />
              </Form.Item>
              <Form.Item
                label="用户账号"
                name="account"
                rules={[{ required: true, message: '请填写用户账号' }]}
              >
                <Input placeholder="请输入用户账号（必填）" disabled={existing || props.data} />
              </Form.Item>
              <Form.Item
                label="性别"
                name="gender"
                rules={[{ required: true, message: '请填性别' }]}
              >
                <Select
                  disabled={props.data}
                  options={dict?.gender.map((item: any) => ({
                    value: item.code,
                    label: item.name,
                  }))}
                  placeholder="请输入性别（必填）"
                />
              </Form.Item>
              <Form.Item
                label="组织/部门"
                name="departmentId"
                rules={[{ required: true, message: '请填所属部门' }]}
              >
                <TreeSelect
                  treeData={departmentTreeOption}
                  fieldNames={{ value: 'id', label: 'name' }}
                />
              </Form.Item>
              <Form.Item label="邮箱" name="email">
                <Input placeholder="请输入内容" />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="头像" name="avatar">
                <UploadOne />
              </Form.Item>
            </Col>
          </Row>
        )}
        {stepNum === 1 && (
          <Form.Item
            label="角色"
            name="role"
            required
            rules={[{ required: true, message: '请选择角色' }]}
          >
            <Select placeholder="请选择角色（必选）">
              {employeeRoleOptions.map((op: any) => (
                <Select.Option key={op.id} value={op.id}>
                  {op.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        )}
      </Form>
    </SimpleModal>
  );
};
export default EmployessForm;
