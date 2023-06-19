import React, { useState } from 'react';
import { Button, Space } from 'antd';
import InfoForm from '@/pages/student/edit/infoForm';
import styles from './index.less';

const TabInfo = () => {
  const [isEdit, setIsEdit] = useState(false);
  const handleEdit = () => {
    setIsEdit((true));
  };
  const handleSave = () => {
    setIsEdit((false));
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
                <Button type="primary" onClick={handleSave}>保存</Button>
              </>
            )
          }
        </Space>
      </div>
      <InfoForm readOnly={!isEdit} />
    </div>
  );
};

export default TabInfo;
