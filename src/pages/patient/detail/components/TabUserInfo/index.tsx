import React, { useState } from 'react';
import { Card, Descriptions, Button } from '@sinohealth/butterfly-ui-components/lib';
import UserInfoDetail from '@/pages/patient/detail/components/TabUserInfo/userInfoDetail';
import PatientAdd from '@/pages/patient/add';

function TabUserInfo() {
  const [isEdit, setIsEdit] = useState(false);
  return (
    <div className="actionPage">
      <div>
        {
          isEdit ? <PatientAdd onBack={() => setIsEdit(false)} /> : <UserInfoDetail onEdit={() => setIsEdit(true)} />
        }
      </div>
    </div>
  );
}

export default TabUserInfo;
