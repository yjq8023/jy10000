import React, { useState, useEffect } from 'react';
import { Card, Button, Tabs, message, Modal } from '@sinohealth/butterfly-ui-components/lib';
import { useSearchParams } from 'react-router-dom';
import FollowPlanMap from '@/components/FollowPlanMap';
import style from './index.less';
import ProjectPreForm from '@/pages/patient/detail/components/TabProject/components/ProjectPreForm';
import { getPatientProject, quitProject } from '@/services/patient';
import ConfirmModel from '@/components/Confirm';
import { handleNotify } from '@/services/notify';

const planItem = {
  title: '开始',
  date: '2022/5/30 12:12:12',
  project: [
    {
      type: '0',
      title: '复诊复查项目',
    },
    {
      type: '1',
      title: '推送用药提醒',
    },
    {
      type: '2',
      title: '推送用药提醒',
    },
    {
      type: '0',
      title: '推送用药提醒',
    },
  ],
};
const l = 12;
// @ts-ignore
const followPlanMapData = new Array(l).fill(planItem, 0, l);

function TabProject() {
  const [params] = useSearchParams();
  const patientId = params.get('id');
  const [hasHistoryProject, setHasHistoryProject] = useState(false);
  const [projectListData, setProjectListData] = useState<Patient.ProjectInfo[]>([]);
  useEffect(() => {
    fetchPatientProjectData();
  }, [patientId]);

  const fetchPatientProjectData = () => {
    getPatientProject(patientId || '')
      .then((res) => {
        // setProjectListData(res.projectInfos || []);
        setHasHistoryProject(!!res.hasHistory);
      })
      .finally(() => {
        setProjectListData([
          {
            projectId: '1',
            projectName: '管理项目1',
            status: '1',
            schema: '1',
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

  const handleQuitProject = (id: string) => {
    ConfirmModel({
      fun: 'error',
      title: '确认结束该管理项目',
      centered: true,
      onCancel: () => {

      },
      onOk: async () => {
        await quitProject(id)
          .then(() => {
            message.success('结束管理项目成功');
            fetchPatientProjectData();
          });
      },
    });
  };

  const renderProjectList = (projectItem: Patient.ProjectInfo, index: number) => {
    return (
      <div className={style.projectListItem} key={projectItem.projectId}>
        <div className={style.projectListHeader}>
          <span>{index + 1}</span>
          {projectItem.projectName}
          <a className={style.action} onClick={() => handleQuitProject(projectItem.projectId)}>结束该管理项目</a>
        </div>
      </div>
    );
  };
  const renderProjectForm = (projectItem: any) => {
    return <ProjectPreForm projectItem={projectItem} />;
  };
  return (
    <div>
      <Card className="but-card" title="已加入的管理项目" extra={hasHistoryProject && <Button type="primary">历史管理项目</Button>}>
        <div className={style.projectList}>
          { projectListData.map(renderProjectList) }
        </div>
      </Card>
      <Card className="but-card" title="智能推荐管理项目随访路径前置信息">
        <div className={style.projectList}>
          {
            projectListData.map(renderProjectForm)
          }
        </div>
      </Card>
      <Card className="but-card" title="已加入管理项目计划路径">
        <Tabs defaultActiveKey={projectListData[0].projectId} type="card">
          {
            projectListData.map((projectItem) => {
              return (
                <Tabs.TabPane tab={projectItem.projectName} key={projectItem.projectId}>
                  <FollowPlanMap data={followPlanMapData} />
                </Tabs.TabPane>
              );
            })
          }
        </Tabs>
      </Card>
    </div>
  );
}

export default TabProject;
