import React, { useState } from 'react';
import { ReactSortable } from 'react-sortablejs';
import Selector from '@/pages/planMapEditor/components/Selector';
import Canvas from '@/pages/planMapEditor/components/Canvas';

import style from './index.less';
import { getUuid } from '@/utils';

const PlanMapEditor = () => {
  const [planMapList, setPlanList] = useState([
    {
      id: 1,
      period: '开始',
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
      children: [
        [
          {
            id: 11,
            period: 'D+1',
          },
          {
            id: 11,
            period: 'D+2',
            children: [
              [
                {
                  id: 1112,
                  period: 'D+2-1',
                },
                {
                  id: 1122,
                  period: 'D-2-2',
                },
              ],
              [
                {
                  id: 1113,
                  period: 'D-2-a',
                },
                {
                  id: 1124,
                  period: 'D-2-b',
                },
                {
                  id: 1124,
                  period: 'D-2-c',
                  children: [
                    [
                      {
                        id: getUuid(),
                        period: 'D-2-cc',
                      },
                    ],
                    [
                      {
                        id: getUuid(),
                        period: 'D-2-ccc',
                      },
                    ],
                  ],
                },
              ],
            ],
          },
        ],
        [
          {
            id: 12,
            period: 'D+100',
          },
        ],
        [
          {
            id: 123,
            period: 'D+200',
          },
        ],
        [
          {
            id: 1234,
            period: 'D+300',
          },
        ],
      ],
      midPointTime: '2022-12-04',
      projectId: '1653475735089709089',
      projectName: 'test',
      sort: 10,
      status: 'NOT_BEGIN',
      beginDate: '2022/11/27',
      completeDateTime: null,
      endDate: '2022/12/11',
    },
  ]);
  const onChange = (data: any) => {
    console.log('planList onChange');
    console.log(data);
    setPlanList([...data]);
  };
  console.log('planMapList2222');
  console.log(planMapList);
  return (
    <div className={style.planMapEditor}>
      <div className={style.selector}>
        <Selector />
      </div>
      <div className={style.editorBody}>
        <div>
          <Canvas key={planMapList} listData={planMapList} onChange={onChange} />
        </div>
      </div>
      <div className={style.config}>config</div>
    </div>
  );
};

export default PlanMapEditor;
