import React, { useState, useContext, useEffect } from 'react';
import { Button, Space, Form } from 'antd';
import InfoForm from '@/pages/student/edit/infoForm';
import styles from './index.less';
import { StudentContext } from '@/pages/student/detail';
import Services from '@/pages/student/services';

const TabInfo = () => {
  const [loading, setLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const { studentDetail } = useContext(StudentContext);
  const [form] = Form.useForm();

  useEffect(() => {
    form && form.setFieldsValue(studentDetail);
  }, [form, studentDetail]);

  const handleEdit = () => {
    setIsEdit((true));
  };
  const handleSave = () => {
    form.validateFields()
      .then((formData: any) => {
        setLoading(true);
        Services.updateData({
          ...studentDetail,
          ...formData,
        }).then(() => {
          setIsEdit((false));
        }).finally(() => {
          setLoading(false);
        });
      });
  };
  const handleCancel = () => {
    setIsEdit((false));
  };
  return (
    <div>
      <div className={styles.action}>
        <Space align="end">
          {
            !isEdit && (<Button type="primary" onClick={handleEdit}>编辑</Button>)
          }
          {
            isEdit && (
              <>
                <Button type="primary" ghost onClick={handleCancel}>取消</Button>
                <Button type="primary" onClick={handleSave} loading={loading}>保存</Button>
              </>
            )
          }
        </Space>
      </div>
      <InfoForm showInfoItem={isEdit} form={form} readOnly={!isEdit} />
    </div>
  );
};

export default TabInfo;
