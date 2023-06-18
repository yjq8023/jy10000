import React from 'react';
import { Button, Form, message } from 'antd';
import InfoForm from '@/pages/supervisor/edit/infoForm';
import { addData } from '@/pages/supervisor/services';
import { useNavigate } from 'react-router-dom';

const Edit = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const handleSubmit = () => {
    form.validateFields()
      .then((formData) => {
        console.log(formData);
        addData(formData)
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
