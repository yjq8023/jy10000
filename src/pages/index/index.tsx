import React from 'react';
import Task from './components/Task';
import style from './index.less';
import Project from './components/Project';

function Index() {
  return (
    <div className={style.indexPage}>
      <div className="but-title">主要任务</div>
      <Task />
      <div className="but-title">管理项目</div>
      <Project />
      <div className="but-title">汇总统计</div>
    </div>
  );
}

export default Index;
