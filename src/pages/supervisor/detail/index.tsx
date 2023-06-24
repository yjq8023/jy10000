import React, { useEffect, useState, createContext, useMemo } from 'react';
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
import Services from '@/pages/supervisor/services';
import { useDict } from '@/common/hooks';

export const TeacherContext = createContext<any>({});
const Detail = () => {
  const [params] = useSearchParams();
  const [teacherDetail, setTeacherDetail] = useState<any>({});
  const teacherStatusDict = useDict('teacherStatus');
  const sexDict = useDict('sex');
  const id = params.get('id');
  useEffect(() => {
    Services.getDetail({ id: Number(id) }).then((res) => {
      setTeacherDetail(res);
    });
  }, []);

  const contextValue = useMemo(() => {
    return {
      teacherDetail,
    };
  }, [teacherDetail]);
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
  const userInfoData: any = {
    userInfo: {
      name: teacherDetail?.cn_name,
      phone: teacherDetail?.phone,
      who: '本人',
      status: teacherStatusDict[teacherDetail.status],
    },
    extendFields: [
      {
        label: '编号',
        value: teacherDetail.serial_num,
      },
      {
        label: '性别',
        value: sexDict[teacherDetail.sex],
      },
      {
        label: '生日',
        value: teacherDetail.birth_day,
      },
      {
        label: '电子邮箱',
        value: teacherDetail.email,
      },
      {
        label: '英文姓名',
        value: teacherDetail.en_name,
      },
      {
        label: '国籍',
        value: teacherDetail.nationality,
      },
      {
        label: '城市',
        value: teacherDetail.city_id,
      },
      {
        label: '居住地址',
        value: teacherDetail.address,
      },
    ],
  };
  return (
    <div className="content-page">
      <UserInfo data={userInfoData} />
      <div className={styles.content}>
        <TeacherContext.Provider value={contextValue}>
          <Tabs items={tabItems} />
        </TeacherContext.Provider>
      </div>
    </div>
  );
};

export default Detail;
