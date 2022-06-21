import React, { useState, useEffect } from 'react';
import { Button, Tabs } from '@sinohealth/butterfly-ui-components/lib';
import { CommentOutlined, WhatsAppOutlined } from '@ant-design/icons';
import { useSearchParams } from 'react-router-dom';
import style from './index.less';
import TabProject from './components/TabProject';
import TabRecord from './components/TabRecord';
import TabFile from './components/TabFile';
import TabConsultRecord from './components/TabConsultRecord';
import TabUserInfo from './components/TabUserInfo';
import TabDrugRecord from './components/TabDrugRecord';
import TabMedicalRecord from './components/TabMedicalRecord';
import { getPatientDetail } from '@/services/patient';

const { TabPane } = Tabs;
function PatientDetail() {
  const [params] = useSearchParams();
  const [userInfo, setUserInfo] = useState<Patient.Item>({} as any);
  const patientUserId: any = params.get('id');
  const isMan = false;
  const getUserInfoDetail = () => {
    // getPatientDetail(patientUserId)
    //   .then((res: any) => {
    //     setUserInfo(res);
    //   });
  };
  useEffect(() => {
    getUserInfoDetail();
  }, []);
  const userInfoItem = (item: any) => {
    return (
      <div className={style.userinfoItem}>
        <div>{item.label}</div>
        <div title={item.value}>{item.value}</div>
      </div>
    );
  };
  const userData = [
    {
      label: '档案号',
      value: userInfo.number,
    },
    {
      label: '联系电话',
      value: userInfo.phone,
    },
    {
      label: '过敏史',
      value: userInfo.history,
    },
    {
      label: '主要诊断',
      value: userInfo.mainDisease,
    },
  ];
  return (
    <div className={style.patientDetail}>
      <div className={style.userinfo}>
        <img className={style.img} src="https://test.sdc.sinohealth.com/dev/api/oss/preview/cb5a3b990d52a7c7e114689e0dd3e022" alt="头像" />
        <div className={style.username}>
          <div>{userInfo.name}</div>
          <div><span className={`iconfont ${isMan ? 'icon-nan' : 'icon-nv'}`} /> {userInfo.age}岁</div>
        </div>
        <div className={style.userInfoList}>
          {userData.map((item) => userInfoItem(item))}
        </div>
        <div className={style.actionBar}>
          <Button type="primary" ghost><CommentOutlined /> 即时聊天</Button>
          &nbsp;
          &nbsp;
          <Button type="primary"><WhatsAppOutlined /> 拨打电话</Button>
        </div>
      </div>
      <div className={style.body}>
        <Tabs defaultActiveKey="1">
          <TabPane tab="管理项目" key="1">
            <TabProject />
          </TabPane>
          <TabPane tab="管理记录" key="2">
            <TabRecord />
          </TabPane>
          <TabPane tab="基本信息" key="3">
            <TabUserInfo />
          </TabPane>
          <TabPane tab="用药记录" key="4">
            <TabDrugRecord />
          </TabPane>
          <TabPane tab="咨询记录" key="5">
            <TabConsultRecord />
          </TabPane>
          <TabPane tab="患者上传资料" key="6">
            <TabFile />
          </TabPane>
          <TabPane tab="医药病例" key="7">
            <TabMedicalRecord />
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
}

export default PatientDetail;
