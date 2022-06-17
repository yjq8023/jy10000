import React from 'react';
import { Card, Form, Row, Col, Button, Input, Select, DatePicker, Modal } from '@sinohealth/butterfly-ui-components/lib';
import { MinusCircleOutlined, ExclamationCircleFilled } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import UserAutoComplete from '@/components/UserAutoComplete';
import AddressSelect from '@/components/AddressSelect';
import ArrayFormItem from '@/components/ArrayFormItem';
import { savePatient, verifyIdCard } from '@/services/patient';
import style from './index.less';
import { getUserInfoFromIdCard } from '@/utils';
import { idCardReg } from '@/utils/validate';

const { Option } = Select;
const { useForm } = Form;
const requiredRule = [{ required: true, message: '该字段为必填项。' }];
const defaultData = { name: '杨继强', idCard: '440921199508306814', sex: 'MALE', phone: '15521371144', birthDay: '2021-01', age: 1, mainDisease: '大叔的是', allergy: '螨虫过敏', history: '便秘', height: '158', weight: '58', bmi: '23.23', memberName: '小红', memberRelationship: '母女', memberPhone: '120123', regionals: ['110000', '110000', '110101'], address: '天安门', familyMedicalHistorys: [{ relation: '大恶棍', disease: '穿插' }, { relation: '小二哥', disease: '常常' }] };
function PatientAdd(props: any) {
  const { onBack } = props;
  const navigate = useNavigate();
  const [form] = useForm();
  const verifyIdCardFn = (params: any) => {
    return new Promise((resolve, reject) => {
      verifyIdCard(params)
        .then((res) => {
          console.log(res);
          Modal.confirm({
            title: '是否确定建档？',
            icon: <ExclamationCircleFilled style={{ color: '#217ba0' }} />,
            content: '',
            onOk() {
              resolve(res);
            },
            onCancel() {
              reject();
            },
          });
        })
        .catch(() => {
          Modal.warning({
            title: '患者姓名与身份证号不匹配',
            icon: <ExclamationCircleFilled style={{ color: '#faad14' }} />,
            content: '请重新确认患者信息',
            okText: '好的',
            onOk() {
              reject();
            },
            onCancel() {
              reject();
            },
          });
        });
    });
  };
  const handleSubmit = () => {
    form.submit();
  };
  const onSubmit = (formValues: any) => {
    verifyIdCardFn({
      name: formValues.name,
      idCard: formValues.idCard,
    }).then((verifyToken) => {
      savePatient({
        ...formValues,
        verifyToken,
        birthDay: formValues.birthDay.format('YYYY-MM'),
      })
        .then((res) => {
          console.log(res);
        });
    });
  };
  const onCancel = () => {
    if (onBack) {
      onBack();
      return;
    }
    navigate(-1);
  };
  const handelImportUserInfo = (data: any) => {
    form.setFieldsValue({
      name: data.name,
      phone: data.phone,
      idCard: data.idCard,
    });
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
  const onFormValueChange = (changedValues: any, allValues: any) => {
    const formValues = form.getFieldsValue(true);
    let newFormValues: any = {};
    // 根据身份证解析性别-出生日期-年龄
    if (formValues.idCard) {
      const userInfo = getUserInfoFromIdCard(formValues.idCard);
      newFormValues = {
        ...newFormValues,
        ...userInfo,
      };
    }
    // 技术bmi
    if (formValues.height && formValues.weight) {
      const w = formValues.weight;
      const h = formValues.height / 100;
      newFormValues.bmi = (w / (h * h)).toFixed(2);
    }
    form.setFieldsValue(newFormValues);
  };
  return (
    <div className={`${style.addPage} actionPage`}>
      <Card title="基本信息" className={`${style.body} but-card`}>
        <Form
          form={form}
          labelAlign="left"
          colon={false}
          onFinish={onSubmit}
          onValuesChange={onFormValueChange}
        >
          <Row gutter={100}>
            <Col span={8}>
              <Form.Item name="name" label="姓名" rules={requiredRule}>
                <UserAutoComplete onImportUser={handelImportUserInfo}>
                  <Input placeholder="请输入姓名" />
                </UserAutoComplete>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="idCard" label="身份证号" rules={[...requiredRule, { pattern: idCardReg, message: '身份证号格式有误' }]}>
                <UserAutoComplete onImportUser={handelImportUserInfo}>
                  <Input placeholder="请输入患者身份证号" />
                </UserAutoComplete>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="sex" label="性别" rules={requiredRule}>
                <Select placeholder="请选择性别">
                  <Option value="MALE">男</Option>
                  <Option value="FEMALE">女</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="phone" label="手机号码" rules={requiredRule}>
                <UserAutoComplete onImportUser={handelImportUserInfo}>
                  <Input placeholder="请输入患者手机号码" />
                </UserAutoComplete>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="birthDay" label="出生年月" rules={requiredRule}>
                <DatePicker picker="month" format="YYYY-MM" style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="年龄" name="age">
                <Input readOnly placeholder="根据出生年月自动计算年龄" />
              </Form.Item>
            </Col>
            <Col span={16}>
              <Form.Item name="mainDisease" label="主要诊断" rules={requiredRule}>
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
