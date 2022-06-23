import React, { useState } from 'react';
import cls from 'classnames';
import style from './index.less';

function DateMapTab() {
  const planRecordList = [
    {
      id: 1,
      title: 'D+90',
      date: '2022.06.01',
      now: true,
    },
    {
      id: 2,
      title: 'D+190',
      date: '2022.06.02',
    },
    {
      id: 3,
      title: 'D+190',
      date: '2022.06.03',
    },
  ];
  const [selectedTab, setSelectedTab] = useState(planRecordList[0].id);
  const renderPlanListItem = (item: any) => {
    const classNames = cls({
      [style.tabItem]: true,
      [style.active]: selectedTab === item.id,
    });
    return (
      <div className={classNames} onClick={() => setSelectedTab(item.id)}>
        <div className={style.title}>[{item.title}]</div>
        <div>{item.now ? '当前周期' : `周期结束日期：${item.date}`}</div>
      </div>
    );
  };
  return (
    <div className={style.tab}>
      {planRecordList.map(renderPlanListItem)}
    </div>
  );
}

export default DateMapTab;
