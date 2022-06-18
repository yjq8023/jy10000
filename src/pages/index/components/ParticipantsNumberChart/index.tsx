import React, { useState, useEffect } from 'react';
import { Column, ColumnConfig } from '@ant-design/plots';
import { ProfileOutlined } from '@ant-design/icons';
import style from './index.less';

const getData = (n: number = 12) => {
  let i = 1;
  const res = [];
  while (i <= n) {
    res.push({
      date: `2022-05-${i}`,
      sales: Math.floor(Math.random() * 100),
    });
    i += 1;
  }
  return res;
};
function ParticipantsNumberChart() {
  const data = getData(16);
  const config: ColumnConfig = {
    data,
    xField: 'date',
    yField: 'sales',
    padding: 24,
    height: 490,
    label: {
      // 可手动配置 label 数据标签位置
      position: 'middle',
      // 'top', 'bottom', 'middle',
      // 配置样式
      style: {
        fill: '#fff',
        opacity: 0,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      date: {
        alias: '日期',
      },
      sales: {
        alias: '人数',
      },
    },
    columnStyle: {
      radius: [8, 8, 0, 0],
      fill: 'l(270) 0:#7CCEE1 1:#46A0C0',
    },
    minColumnWidth: 56,
    maxColumnWidth: 56,
  };
  return (
    <div className={style.box}>
      <div className={style.header}>
        <span className={style.title}>
          新增管理人数
        </span>
        <span className={style.time}>
          统计截止至：2022-04-02 17:00
        </span>
      </div>
      <Column {...config} />
    </div>
  );
}

export default ParticipantsNumberChart;
