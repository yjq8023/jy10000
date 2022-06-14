import React, { useState, useEffect } from 'react';
import { Area } from '@ant-design/plots';
import { ProfileOutlined } from '@ant-design/icons';
import style from './index.less';

const getData = (n: number = 12) => {
  let i = 1;
  const res = [];
  while (i <= n) {
    res.push({
      Date: `2022-05-${i}`,
      scales: Math.floor(Math.random() * 100),
    });
    i += 1;
  }
  return res;
};
function BreakAwayNumberChart() {
  const data = getData(16);
  const config = {
    data,
    color: '#46A0C0',
    xField: 'Date',
    yField: 'scales',
    xAxis: {
      range: [0, 1],
      tickCount: 16,
    },
    areaStyle: () => {
      return {
        fill: 'l(270) 0:#ffffff 0.5:#46A0C0 1:#46A0C0',
      };
    },
  };

  return (
    <div className={style.box}>
      <div className={style.header}>
        <span className={style.title}>
          <ProfileOutlined />
          患者管理脱落率
        </span>
        <span className={style.time}>
          统计截止至：2022-04-02 17:00
        </span>
      </div>
      <Area {...config} />
    </div>
  );
}

export default BreakAwayNumberChart;
