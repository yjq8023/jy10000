import React from 'react';
import { Card, Button, Tabs } from '@sinohealth/butterfly-ui-components/lib';
import FollowPlanMap from '@/components/FollowPlanMap';
import style from './index.less';
import ProjectPreForm from '@/pages/patient/detail/components/TabProject/components/ProjectPreForm';

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
const projectListData = [
  {

  },
];
function TabProject() {
  const renderProjectList = (projectItem?: any) => {
    return (
      <div className={style.projectListItem}>
        <div className={style.projectListHeader}>
          <span>1</span>
          前列腺随访管理项目
          <a className={style.action}>结束该管理项目</a>
        </div>
      </div>
    );
  };
  const renderProjectForm = (projectItem: any) => {
    return <ProjectPreForm projectItem={projectItem} />;
  };
  return (
    <div>
      <Card className="but-card" title="已加入的管理项目" extra={<Button type="primary">添加管理项目</Button>}>
        <div className={style.projectList}>
          {renderProjectList()}
          {renderProjectList()}
          {renderProjectList()}
        </div>
      </Card>
      <Card className="but-card" title="智能推荐管理项目随访路径前置信息">
        <div className={style.projectList}>
          {renderProjectForm({})}
          {renderProjectForm({ schema: 1 })}
          {renderProjectForm({})}
        </div>
      </Card>
      <Card className="but-card" title="已加入管理项目计划路径">
        <Tabs defaultActiveKey="1" type="card">
          <Tabs.TabPane tab="管理项目1" key="1">
            <FollowPlanMap data={followPlanMapData} />
          </Tabs.TabPane>
          <Tabs.TabPane tab="管理项目1" key="2">
            <FollowPlanMap data={followPlanMapData} />
          </Tabs.TabPane>
        </Tabs>
      </Card>
    </div>
  );
}

export default TabProject;
