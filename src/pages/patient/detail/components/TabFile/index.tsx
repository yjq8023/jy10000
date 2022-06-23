import React from 'react';
import { Tabs } from '@sinohealth/butterfly-ui-components/lib';
import FilesItem from '@/pages/patient/detail/components/TabFile/components/filesItem';
import DateMapTab from '@/pages/patient/detail/components/DateMapTab';
import style from './index.less';

function TabFile() {
  const renderTabContent = () => {
    return (
      <div className={style.fileTabBox}>
        <DateMapTab />
        <div className={style.body}>
          <FilesItem />
          <FilesItem />
          <FilesItem />
          <FilesItem />
        </div>
      </div>
    );
  };
  return (
    <div>
      <Tabs defaultActiveKey="1" type="card">
        <Tabs.TabPane tab="管理项目1" key="1">
          { renderTabContent() }
        </Tabs.TabPane>
        <Tabs.TabPane tab="管理项目1" key="2">
          { renderTabContent() }
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
}

export default TabFile;
