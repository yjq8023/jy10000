import React, { useState, useMemo } from 'react';
import { Button, message, Form, Radio } from 'antd';
import Form1v1 from './Form1v1';
import Form1v2 from './Form1v2';
import Form1vN from './Form1vN';
import Services from '../services';
import { useNavigate } from 'react-router-dom';

const options = [
  { label: '1on1课程', value: '1v1' },
  { label: '1on2课程', value: '1v2' },
  { label: '班级课程', value: '1vN' },
];
const Edit = () => {
  const [form] = Form.useForm();
  const [formType, setFormType] = useState(options[0].value);
  const navigate = useNavigate();
  const onChange = ({ target: { value } }: any) => {
    setFormType(value);
  };
  const handleSubmit = () => {
    form.validateFields()
      .then((formData: any) => {
        console.log(formData);
        // Services.addStudent(formData)
        //   .then(() => {
        //     message.success('新增导师成功');
        //     navigate(-1);
        //   });
      });
  };
  const formDom = useMemo(() => {
    if (formType === '1v1') {
      return <Form1v1 form={form} />;
    }
    if (formType === '1v2') {
      return <Form1v2 form={form} />;
    }
    return <Form1vN form={form} />;
  }, [formType]);
  return (
    <div className="content-page">
      <div style={{ textAlign: 'center', marginBottom: 12 }}>
        <Radio.Group size="large" options={options} onChange={onChange} value={formType} optionType="button" buttonStyle="solid" />
      </div>
      <div className="action">
        <Button type="primary" onClick={handleSubmit}>
          保存
        </Button>
      </div>
      {formDom}
    </div>
  );
};

export default Edit;
