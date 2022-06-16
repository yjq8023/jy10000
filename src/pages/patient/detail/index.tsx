import React from 'react';
import { Button, Tabs } from '@sinohealth/butterfly-ui-components/lib';
import { CommentOutlined, WhatsAppOutlined } from '@ant-design/icons';
import style from './index.less';
import TabProject from './components/TabProject';
import TabRecord from './components/TabRecord';
import TabFile from './components/TabFile';
import TabConsultRecord from './components/TabConsultRecord';
import TabUserInfo from './components/TabUserInfo';
import TabDrugRecord from './components/TabDrugRecord';
import TabMedicalRecord from './components/TabMedicalRecord';

const { TabPane } = Tabs;
function PatientDetail() {
  const isMan = false;
  const userInfo: Patient.Item = {
    id: 1110,
    number: '000001',
    name: '小妹妹',
    idCard: '440921188765456789',
    phone: '15521381433',
    mainDisease: '乳腺癌、子宫癌、乳腺癌、子宫癌乳腺癌、子宫癌乳腺癌、子宫癌乳腺癌、子宫癌乳腺癌、子宫癌',
    history: '肾虚',
  };
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
          <div>小妹妹</div>
          <div><span className={`iconfont ${isMan ? 'icon-nan' : 'icon-nv'}`} /> 18岁</div>
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
