import React, { useEffect, useState, createContext } from 'react';
import { Tabs } from 'antd';
import { useSearchParams } from 'react-router-dom';
import UserInfo from '@/components/UserInfo';
import styles from './index.less';
import TabInfo from '@/pages/supervisor/detail/componens/TabInfo';
import TabFollowUp from '@/pages/supervisor/detail/componens/TabFollowUp';
import TabSchoolWork from '@/pages/supervisor/detail/componens/TabSchoolWork';
import TabSignIn from '@/pages/supervisor/detail/componens/TabSignIn';
import TabCourse from '@/pages/supervisor/detail/componens/TabCourse';
import TabAccount from '@/pages/supervisor/detail/componens/TabAccount';
import TabLog from '@/pages/supervisor/detail/componens/TabLog';
import TabSchoolCheck from '@/pages/supervisor/detail/componens/TabSchoolCheck';
import Services from '../services';

const SupervisorContext = createContext<any>({});
const Detail = () => {
  const [params] = useSearchParams();
  const id = params.get('id');
  useEffect(() => {
    Services.getDetail({ id }).then((res) => {
      console.log('res');
      console.log(res);
    });
  }, []);
  const tabItems = [
    {
      key: '1',
      label: '档案',
      children: <TabInfo />,
    },
    {
      key: '2',
      label: '跟进',
      children: <TabFollowUp />,
    },
    {
      key: '3',
      label: '课程',
      children: <TabCourse />,
    },
    {
      key: '4',
      label: '签到',
      children: <TabSignIn />,
    },
    {
      key: '5',
      label: '作业',
      children: <TabSchoolWork />,
    },
    {
      key: '6',
      label: '测试',
      children: <TabSchoolCheck />,
    },
    {
      key: '7',
      label: 'APP账号',
      children: <TabAccount />,
    },
    {
      key: '8',
      label: '操作日志',
      children: <TabLog />,
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
