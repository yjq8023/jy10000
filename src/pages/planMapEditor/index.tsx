import React, { useState, createContext, useMemo } from 'react';
import { ReactSortable } from 'react-sortablejs';
import lodash from 'lodash';
import { Badge } from '@sinohealth/butterfly-ui-components/lib';
import Selector from '@/pages/planMapEditor/components/Selector';
import Canvas from '@/pages/planMapEditor/components/Canvas';

import style from './index.less';
import { getUuid } from '@/utils';

export const planMapContext = createContext<any>(null);

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
const PlanMapEditor = () => {
  const planData: any = [
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
    },
    ...getPlanData(4),
  ];
  const c: any = getPlanData(4);
  c[2].children = [getPlanData(4)];
  planData[3].children = [c, getPlanData(4)];
  planData[1].children = [getPlanData(4), getPlanData(3)];
  const [planMapList, setPlanList] = useState(planData);
  const [planMapState, setPlanMapState] = useState(planData);
  const onChange = (data: any) => {
    console.log('planList onChange2');
    console.log(data);
    setPlanList([...data]);
  };
  const contextData = useMemo(() => {
    return {
      planMapState,
      setPlanMapState: (type: string, path: string, data: any) => {
        console.log('setPlanMapState');
        console.log(type, path, data);
        const state = [...planMapState];
        const parentNode = path ? lodash.get(state, path) : state;
        if (type === 'add') {
          parentNode.push(data);
        }
        if (type === 'delete') {
          parentNode.splice(data, 1);
        }

        if (path) {
          lodash.set(state, path, parentNode);
          setPlanMapState(state);
        } else {
          setPlanMapState(parentNode);
        }
      },
    };
  }, [planMapState]);
  return (
    <div className={style.planMapEditor}>
      <planMapContext.Provider value={contextData}>
        <div className={style.selector}>
          <Selector />
        </div>
        <div className={style.editorBody}>
          <div className={style.bodyHeader}>
            <div>
              <Badge color="cyan" text="前置信息" />
              <Badge color="green" text="跟进记录表" />
              <Badge color="blue" text="患教文章" />
              <Badge color="gold" text="医学量表" />
              <Badge color="purples" text="复诊复查项目" />
            </div>
          </div>
          <div>
            <Canvas key={planMapList} listData={planMapList} onChange={onChange} />
          </div>
        </div>
        <div className={style.config}>config</div>
      </planMapContext.Provider>
    </div>
  );
};

export default PlanMapEditor;
