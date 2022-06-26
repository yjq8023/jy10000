import React from 'react';
import Project from './components/Project';
// import Task from './components/Task';
import style from './index.less';
import followOrderIcon from '@/assets/images/follow/order.svg';

function FollowCount() {
  return (
    <div className={style.followCount}>
      <div className="but-title">指标统计</div>
      {/* <Task /> */}
      <div className={style.countList}>
        {[1, 2, 3, 4, 5, 6, 7, 7].map((item) => {
          return (
            <div className={style.countItem}>
              <div className={style.label}>本月待跟进 (人)</div>
              <div className={style.value}>1241</div>
              {/* <span className={iconCls} style={{ backgroundColor: item.bgColor }} /> */}
              <img src={followOrderIcon} alt="" />
            </div>
          );
        })}
      </div>
      <div className="but-title">管理项目统计</div>
      <Project />
    </div>
  );
}

export default FollowCount;
