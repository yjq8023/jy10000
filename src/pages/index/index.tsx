import React from 'react';
import Task from './components/Task';
import style from './index.less';
import Project from './components/Project';
import ParticipantsNumberChart from '@/pages/index/components/ParticipantsNumberChart';
import DatePickerSelect from '@/components/DatePickerSelect';
import BreakAwayNumberChart from '@/pages/index/components/BreakAwayNumberChart';

function Index() {
  return (
    <div className={style.indexPage}>
      <div className="but-title">主要任务</div>
      <Task />
      <div className="but-title">管理项目</div>
      <Project />
      <div className="but-title">汇总统计</div>
      <div className={style.totalChartsBox}>
        <div className={style.header}>
          时间范围&nbsp;&nbsp;&nbsp;<DatePickerSelect />
        </div>
        <ParticipantsNumberChart />
        <BreakAwayNumberChart />
      </div>
    </div>
  );
}

export default Index;
