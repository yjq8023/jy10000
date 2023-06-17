import React from 'react';
import { Tabs } from 'antd';
import UserInfo from '@/components/UserInfo';
import styles from './index.less';
import TabInfo from '@/pages/supervisor/detail/componens/TabInfo';

const Detail = () => {
  const tabItems = [
    {
      key: '1',
      label: '档案',
      children: <TabInfo />,
    },
    {
      key: '2',
      label: '跟进',
      children: 'Content of Tab Pane 1',
    },
    {
      key: '3',
      label: '课程',
      children: 'Content of Tab Pane 1',
    },
    {
      key: '4',
      label: '签到',
      children: 'Content of Tab Pane 1',
    },
    {
      key: '5',
      label: '作业',
      children: 'Content of Tab Pane 1',
    },
    {
      key: '6',
      label: '测试',
      children: 'Content of Tab Pane 1',
    },
    {
      key: '7',
      label: 'APP账号',
      children: 'Content of Tab Pane 1',
    },
    {
      key: '8',
      label: '操作日志',
      children: 'Content of Tab Pane 1',
    },
  ];
  return (
    <div className="content-page">
      <UserInfo />
      <div className={styles.content}>
        <Tabs items={tabItems} />
      </div>
    </div>
  );
};

export default Detail;
