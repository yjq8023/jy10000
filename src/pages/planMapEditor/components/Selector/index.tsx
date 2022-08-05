import React, { useState, useEffect, useRef } from 'react';
// @ts-ignore
import Sortable from 'sortablejs';
import style from './index.less';

const PlanMapEditor = () => {
  const [list, setState] = useState<any>([
    {
      id: 1,
      name: '节点容器',
      type: 'container',
    },
    {
      id: 2,
      name: '根据记录表',
      type: 'action',
    },
    {
      id: 3,
      name: '患教资料',
      type: 'action',
    },
    {
      id: 4,
      name: '医学量表',
      type: 'action',
    },
    {
      id: 5,
      name: '复诊复查',
      type: 'action',
    },
  ]);
  const containerDomRef = useRef(null);
  const actionDomRef = useRef(null);
  const initSortTable = (elRef: any, groupName: string) => {
    const sortableConfig = {
      sort: false,
      group: {
        name: groupName,
        pull: 'clone',
        put: false,
      },
      dragClass: 'dragDom',
      animation: 150,
    };
    return new Sortable(elRef.current, sortableConfig);
  };
  useEffect(() => {
    initSortTable(containerDomRef, 'container');
    initSortTable(actionDomRef, 'action');
  }, []);
  return (
    <div className={style.selector}>
      <div className={style.header}>
        业务组件
      </div>
      <div ref={containerDomRef}>
        {
          list.filter((item: any) => item.type === 'container').map((item: any) => {
            return <div className={style.selectItem} key={item.id}>{item.name}</div>;
          })
        }
      </div>
      <div ref={actionDomRef}>
        {
          list.filter((item: any) => item.type === 'action').map((item: any) => {
            return <div className={style.selectItem} key={item.id}>{item.name}</div>;
          })
        }
      </div>
    </div>
  );
};

export default PlanMapEditor;
