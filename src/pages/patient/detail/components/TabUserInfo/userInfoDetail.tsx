import React, { useState, useEffect } from 'react';
import { Card, Descriptions, Button } from '@sinohealth/butterfly-ui-components/lib';
import { useSearchParams } from 'react-router-dom';
import { getPatientDetail } from '@/services/patient';

function UserInfoDetail(props: any) {
  const { onEdit } = props;
  const [params] = useSearchParams();
  const [userInfo, setUserInfo] = useState<Patient.Item>({} as any);
  const patientUserId: any = params.get('id');
  const getUserInfoDetail = () => {
    getPatientDetail(patientUserId)
      .then((res: any) => {
        setUserInfo(res);
      });
  };
  useEffect(() => {
    getUserInfoDetail();
  }, []);
  return (
    <div>
      <Card className="but-card" title="基本信息">
        <Descriptions bordered size="small" labelStyle={{ width: '140px' }} contentStyle={{ minWidth: '160px' }}>
          <Descriptions.Item label="姓名" span={3}>{userInfo.name}</Descriptions.Item>
          <Descriptions.Item label="手机号码">{userInfo.phone}</Descriptions.Item>
          <Descriptions.Item label="身份证号" span={2}>{userInfo.idCard}</Descriptions.Item>
          <Descriptions.Item label="性别">{userInfo.sex}</Descriptions.Item>
          <Descriptions.Item label="年龄">{userInfo.age}</Descriptions.Item>
          <Descriptions.Item label="出生年月">{userInfo.birthDay}</Descriptions.Item>
          <Descriptions.Item label="身高 (cm)">{userInfo.height}</Descriptions.Item>
          <Descriptions.Item label="体重 (kg)">{userInfo.weight}</Descriptions.Item>
          <Descriptions.Item label="BMI" span={2}>{userInfo.bmi}</Descriptions.Item>
          <Descriptions.Item label="主要诊断" span={3}>{userInfo.mainDisease}</Descriptions.Item>
          <Descriptions.Item label="过敏史" span={3}>{userInfo.allergy}</Descriptions.Item>
          <Descriptions.Item label="既往史" span={3}>{userInfo.history}</Descriptions.Item>
          <Descriptions.Item label="家属姓名">{userInfo.memberName}</Descriptions.Item>
          <Descriptions.Item label="与患者关系">{userInfo.memberRelationship}</Descriptions.Item>
          <Descriptions.Item label="家属联系电话">{userInfo.memberPhone}</Descriptions.Item>
          <Descriptions.Item label="现住址" span={3}>{userInfo.address}</Descriptions.Item>
        </Descriptions>
      </Card>
      <Card className="but-card" title="家族史">
        {
          (!userInfo.familyMedicalHistorys || userInfo.familyMedicalHistorys.length === 0) &&
          <div>无</div>
        }
        {
          userInfo.familyMedicalHistorys?.map((item) => {
            return (
              <Descriptions bordered size="small" labelStyle={{ width: '140px' }} contentStyle={{ width: '160px' }}>
                <Descriptions.Item label="关系">{item.relation}</Descriptions.Item>
                <Descriptions.Item label="疾病名称" span={2}>{item.disease}</Descriptions.Item>
              </Descriptions>
            );
          })
        }
      </Card>
      <div className="actionBar">
        <Button type="primary" onClick={() => onEdit()}>编辑</Button>
      </div>
    </div>
  );
}

export default UserInfoDetail;
