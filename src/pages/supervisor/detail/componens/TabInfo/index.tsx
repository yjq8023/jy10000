import React, { useState, useContext, useEffect } from 'react';
import { Button, Space, Form } from 'antd';
import InfoForm from '@/pages/supervisor/edit/infoForm';
import styles from './index.less';
import { TeacherContext } from '@/pages/supervisor/detail';
import Services from '@/pages/supervisor/services';

const TabInfo = () => {
  const [loading, setLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const { teacherDetail, updateDetailData } = useContext(TeacherContext);
  const [form] = Form.useForm();
  useEffect(() => {
    form && form.setFieldsValue(teacherDetail);
  }, [form, teacherDetail]);
  const handleEdit = () => {
    setIsEdit((true));
  };
  const handleSave = () => {
    form.validateFields()
      .then((formData: any) => {
        setLoading(true);
        Services.updateData({
          id: teacherDetail.user_id,
          ...teacherDetail,
          ...formData,
        }).then(() => {
          setIsEdit((false));
          updateDetailData();
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
