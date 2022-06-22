import React from 'react';
import classnames from 'classnames';
import { Badge } from '@sinohealth/butterfly-ui-components/lib';
import style from './index.less';

type FollowPlanMapProps = {
  data: any[]
}
function FollowPlanMap(props: FollowPlanMapProps) {
  const { data } = props;
  const renderPlanItem = (item: any, index: number) => {
    return (
      <div className={style.planCol} key={Date.now() * Math.random()}>
        <div className={style.planItem}>
          <div className={style.tag}>
            {index}
          </div>
          <div className={style.itemTitle}>
            {item.title}
          </div>
          <div className={style.itemBody}>
            <div className={style.bodyHeader}>
              <div>预计随访时间</div>
              <div>{item.date}</div>
            </div>
            <div className={style.bodyContent}>
              <div>随访项目</div>
              <ul>
                {item.project.map((pItem: any) => {
                  const projectItemClass = classnames({
                    [style.projectItem]: true,
                    [style.primary]: pItem.type === '1',
                    [style.success]: pItem.type === '2',
                  });
                  return <li className={projectItemClass}>{pItem.title}</li>;
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  };
  const renderPlanList = () => {
    const listData = [...data];
    const listDom: any = [];
    let rowNum = 0;
    while (listData.length > 0) {
      const cList = listData.splice(0, 5);
      const itemBox = (
        <div className={style.planRow} key={Date.now() + Math.random()}>
          {/* eslint-disable-next-line no-loop-func */}
          {cList.map((item, i) => {
            return renderPlanItem(item, rowNum * 5 + i);
          })}
        </div>
      );
      rowNum += 1;
      listDom.push(itemBox);
    }
    return listDom;
  };
  return (
    <div className={style.followPlanMap}>
      <div className={style.legend}>
        <Badge status="success" text="个案管理师通知" />
        <Badge color="#46A0C0" text="系统通知" />
        <Badge status="default" text="已完成或已失效任务" className={style.bTag} />
        <Badge status="processing" text="正在执行任务" className={style.bTag} />
        <Badge color="#46A0C0" text="待执行任务" className={style.bTag} />
      </div>
      <div className={style.mapBox}>
        {renderPlanList()}
      </div>
    </div>
  );
}

export default FollowPlanMap;
