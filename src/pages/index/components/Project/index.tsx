import React from 'react';
import { EllipsisOutlined } from '@ant-design/icons';
import style from './index.less';

function Project() {
  const data = [
    {
      title: '乳腺癌随访管理项目',
      currentParticipantsNumber: '25',
      totalParticipantsNumber: '125',
      totalBreakAwayNumber: '18',
      bgColor: '#46A0C0',
    },
    {
      title: '结肠癌随访管理项目',
      currentParticipantsNumber: '25',
      totalParticipantsNumber: '125',
      totalBreakAwayNumber: '18',
      bgColor: '#213FA0',
    },
    {
      title: '结肠癌随访管理项目',
      currentParticipantsNumber: '25',
      totalParticipantsNumber: '125',
      totalBreakAwayNumber: '18',
      bgColor: '#8221A0',
    },
  ];
  const renderItem = (item: any) => {
    return (
      <div className={style.item} style={{ backgroundColor: item.bgColor }}>
        <EllipsisOutlined className={style.icon} />
        <div className={style.title}>{item.title}</div>
        <div className={style.currentNum}>
          <div className={style.label}>
            当前参与（人）
          </div>
          <div className={style.value}>
            { item.currentParticipantsNumber}
          </div>
        </div>
        <div className={style.totalNum}>
          <div>
            累计参与（人）{ item.totalParticipantsNumber}
          </div>
          <div>
            累计脱落（人）{ item.totalBreakAwayNumber}
          </div>
        </div>
      </div>
    );
  };
  return (
    <div className={style.projectBox}>
      {data.map(renderItem)}
    </div>
  );
}

export default Project;
