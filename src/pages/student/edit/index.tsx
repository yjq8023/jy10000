import React from 'react';
import { Button, message, Form } from 'antd';
import InfoForm from './infoForm';
import Services from '../services';
import { useNavigate } from 'react-router-dom';

const Edit = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const handleSubmit = () => {
    form.validateFields()
      .then((formData: any) => {
        console.log(formData);
        Services.addStudent(formData)
          .then(() => {
            message.success('新增导师成功');
            navigate(-1);
          });
      });
  };
  return (
    <div className="content-page">
      <div className="action">
        <Button type="primary" onClick={handleSubmit}>
          保存
        </Button>
      </div>
      <InfoForm form={form} />
    </div>
  );
};

export default Edit;
