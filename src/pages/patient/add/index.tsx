import React from 'react';
import { Card, Form, Row, Col, Button, Input, Select, DatePicker } from '@sinohealth/butterfly-ui-components/lib';
import { MinusCircleOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import style from './index.less';
import UserNameInput from '@/components/UserNameInput';
import AddressSelect from '@/components/AddressSelect';
import ArrayFormItem from '@/components/ArrayFormItem';
import { savePatient } from '@/services/patient';

const { Option } = Select;
const { useForm } = Form;
const requiredRule = [{ required: true, message: '该字段为必填项。' }];
function PatientAdd(props: any) {
  const { onBack } = props;
  const navigate = useNavigate();
  const [form] = useForm();
  const handleSubmit = () => {
    form.submit();
  };
  const onSubmit = (formValues: any) => {
    console.log('onSubmit');
    console.log(formValues);
    savePatient(formValues)
      .then((res) => {
        console.log(res);
      });
  };
  const onCancel = () => {
    if (onBack) {
      onBack();
    }
  };
  const handelImportUserInfo = (data: any, isMyPatient: boolean) => {
    console.log(isMyPatient);
    console.log(data);
    if (isMyPatient) {
      navigate(`/patient/detail?id=${data.id}`);
    } else {
      form.setFieldsValue(data);
    }
  };
  const renderArrayFormChildren = (field: any, options: any) => {
    const { remove } = options;
    return (
      <div className={style.arrayFormItemBox}>
        <Row gutter={100}>
          <Col span={12}>
            <Form.Item name={[field.name, 'relation']} label="关系" rules={requiredRule}>
              <Input placeholder="请输入姓名" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name={[field.name, 'disease']} label="疾病名称" rules={requiredRule}>
              <Input placeholder="请输入姓名" />
            </Form.Item>
          </Col>
        </Row>
        <MinusCircleOutlined className={style.removeIcon} onClick={() => remove(field.name)} />
      </div>
    );
  };
  return (
    <div className={`${style.addPage} actionPage`}>
      <Card title="基本信息" className={`${style.body} but-card`}>
        <Form
          form={form}
          labelAlign="left"
          colon={false}
          onFinish={onSubmit}
        >
          <Row gutter={100}>
            <Col span={8}>
              <Form.Item name="name" label="姓名" rules={requiredRule}>
                <UserNameInput placeholder="请输入姓名" onImportUser={handelImportUserInfo} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="idCard" label="身份证号" rules={requiredRule}>
                <Input placeholder="请输入患者身份证号" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="sex" label="性别" rules={requiredRule}>
                <Select placeholder="请选择性别">
                  <Option value="male">男</Option>
                  <Option value="female">女</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="phone" label="手机号码" rules={requiredRule}>
                <Input placeholder="请输入患者手机号码" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="birthDay" label="出生年月" rules={requiredRule}>
                <DatePicker picker="month" style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="年龄" name="age">
                <Input readOnly placeholder="根据出生年月自动计算年龄" />
              </Form.Item>
            </Col>
            <Col span={16}>
              <Form.Item name="mainDisease" label="主要诊断" required>
                <Input placeholder="请输入主要诊断结果" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={100}>
            <Col span={8}>
              <Form.Item name="allergy" label="过敏史">
                <Input placeholder="请输入主要诊断结果" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="history" label="既往史">
                <Input placeholder="请输入主要诊断结果" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={100}>
            <Col span={8}>
              <Form.Item name="height" label="身高（cm）">
                <Input placeholder="请输入家属姓名" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="weight" label="体重（kg）">
                <Input placeholder="请输家属与患者关系入" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="bmi" label="BMI">
                <Input placeholder="根据身高体重自动计算" readOnly />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={100}>
            <Col span={8}>
              <Form.Item name="memberName" label="家属姓名">
                <Input placeholder="请输入家属姓名" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="memberRelationship" label="与患者关系">
                <Input placeholder="请输家属与患者关系入" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="memberPhone" label="家属联系电话">
                <Input placeholder="请输入家属联系电话" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={100}>
            <Col span={16}>
              <AddressSelect names={['regionals', 'address']} />
            </Col>
          </Row>
          <div className={style.formItemTitle}>家族史</div>
          <Row gutter={100}>
            <Col span={16}>
              <ArrayFormItem name="familyMedicalHistorys">
                {renderArrayFormChildren}
              </ArrayFormItem>
            </Col>
          </Row>
        </Form>
      </Card>
      <div className="actionBar">
        <Button onClick={onCancel}>取消</Button>
        &nbsp;
        &nbsp;
        <Button type="primary" onClick={handleSubmit}>保存</Button>
      </div>
    </div>
  );
}

export default PatientAdd;
