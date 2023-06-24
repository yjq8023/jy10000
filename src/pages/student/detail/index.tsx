import React, { useEffect, useState, createContext, useMemo } from 'react';
import { Tabs } from 'antd';
import { useSearchParams } from 'react-router-dom';
import UserInfo from '@/components/UserInfo';
import styles from './index.less';
import TabInfo from './componens/TabInfo';
import TabFollowUp from './componens/TabFollowUp';
import TabSchoolWork from './componens/TabSchoolWork';
import TabSignIn from './componens/TabSignIn';
import TabCourse from './componens/TabCourse';
import TabAccount from './componens/TabAccount';
import TabLog from './componens/TabLog';
import TabSchoolCheck from './componens/TabSchoolCheck';
import Services from '../services';

export const StudentContext = createContext<any>({});
const Detail = () => {
  const [params] = useSearchParams();
  const [studentDetail, setStudentDetail] = useState<any>({});
  const id = params.get('id');
  useEffect(() => {
    Services.getDetail({ id: Number(id) }).then((res) => {
      setStudentDetail(res);
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
  const contextValue = useMemo(() => {
    return {
      studentDetail,
    };
  }, [studentDetail]);
  return (
    <div className="content-page">
      <UserInfo />
      <div className={styles.content}>
        <StudentContext.Provider value={contextValue}>
          <Tabs items={tabItems} />
        </StudentContext.Provider>
      </div>
    </div>
  );
};

export default Detail;
