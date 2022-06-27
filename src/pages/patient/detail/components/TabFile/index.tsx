import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Tabs } from '@sinohealth/butterfly-ui-components/lib';
import FilesItem from '@/pages/patient/detail/components/TabFile/components/filesItem';
import DateMapTab from '@/pages/patient/detail/components/DateMapTab';
import style from './index.less';
import { useDict } from '@/hooks/useDict';
import { getPatientProject } from '@/services/patient';

function TabFile() {
  const dict = useDict();
  const [projectListData, setProjectListData] = useState<Patient.ProjectInfo[]>([]);
  const [params] = useSearchParams();
  const patientId = params.get('id');

  const fetchPatientProjectData = () => {
    getPatientProject(patientId || '')
      .then((res) => {
        setProjectListData(res.projectInfos || []);
      })
      .finally(() => {
        setProjectListData([
          {
            projectId: '1649105865254371350',
            projectName: '管理项目1',
          },
          {
            projectId: '2',
            projectName: '管理项目2',
            status: '1',
          },
          {
            projectId: '3',
            projectName: '管理项目3',
            status: '0',
            schema: '1',
          },
        ]);
      });
  };

  useEffect(() => {
    fetchPatientProjectData();
  }, []);
  const renderTabContent = (projectId: string) => {
    return (
      <div className={style.fileTabBox}>
        <DateMapTab />
        <div className={style.body}>
          { dict?.documentCategory?.map((item: any) => {
            return <FilesItem projectId={projectId} config={item} key={item.code} />;
          })}
        </div>
      </div>
    );
  };
  return (
    <div>
      <Tabs defaultActiveKey="1" type="card">
        { projectListData.map((item) => {
          return (
            <Tabs.TabPane tab={item.projectName} key={item.projectId}>
              { renderTabContent(item.projectId) }
            </Tabs.TabPane>
          );
        })}
      </Tabs>
    </div>
  );
}

export default TabFile;
