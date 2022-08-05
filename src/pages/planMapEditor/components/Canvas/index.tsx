import React, { useState, useRef, useEffect } from 'react';
// @ts-ignore
import Sortable from 'sortablejs';
import style from './index.less';
import { getUuid } from '@/utils';
import PlanMapRow from '@/pages/planMapEditor/components/PlanMapRow';

const getPlanData = (count: number) => {
  let i = 0;
  const d = [];
  while (i < count) {
    i += 1;
    d.push({
      id: getUuid(),
      period: `D+${i}`,
      infos: [
        {
          name: '糖尿病的急性并发症',
          status: 'NOT_BEGIN',
          type: 'AUTO',
        },
        {
          name: '2型糖尿病的病因有哪些？',
          status: 'NOT_BEGIN',
          type: 'AUTO',
        },
      ],
    });
  }
  return d;
};
const Canvas = (props: any) => {
  const demoData: any = [
    getPlanData(5),
    getPlanData(6),
    getPlanData(3),
    getPlanData(2),
  ];
  demoData[0][1].isHasChildren = true;
  demoData[1][1].isHasChildren = true;
  demoData[2][1].isHasChildren = true;
  console.log('demoData');
  console.log(demoData);
  return (
    <div>
      { demoData.map((listData: any, index: number) => (<PlanMapRow listData={listData} offset={index} />))}
    </div>
  );
};

export default Canvas;
