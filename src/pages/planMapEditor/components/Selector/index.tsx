import React, { useEffect, useRef, useState } from 'react';
// @ts-ignore
import Sortable from 'sortablejs';
import style from './index.less';
import { planItemTypes } from '@/pages/planMapEditor/config';

const PlanMapEditor = () => {
  const [list, setState] = useState<any>([
    {
      id: 'node',
      name: '节点容器',
      type: 'container',
      icon: 'icon-apartment',
    },
    {
      id: planItemTypes.followUp,
      name: '跟进记录表',
      type: 'action',
      icon: 'icon-filedone',
    },
    {
      id: planItemTypes.article,
      name: '患教资料',
      type: 'action',
      icon: 'icon-send',
    },
    {
      id: planItemTypes.form,
      name: '医学量表',
      type: 'action',
      icon: 'icon-solution',
    },
    {
      id: planItemTypes.diagnosis,
      name: '复诊复查',
      type: 'action',
      icon: 'icon-project',
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
      <div className={`${style.header} but-title`}>
        业务组件
      </div>
      <div className={style.desc}>
        拖拽至路径进行添加
      </div>
      <div ref={containerDomRef}>
        {
          list.filter((item: any) => item.type === 'container').map((item: any) => {
            return (
              <div className={style.selectItem} key={item.id}>
                <span className={`iconfont ${item.icon}`} />&nbsp;&nbsp;
                {item.name}
              </div>
            );
          })
        }
      </div>
      <div className={style.desc}>
        拖拽至节点进行添加
      </div>
      <div ref={actionDomRef}>
        {
          list.filter((item: any) => item.type === 'action').map((item: any) => {
            return (
              <div className={style.selectItem} key={item.id} data-type={item.id}>
                <span className={`iconfont ${item.icon}`} />&nbsp;&nbsp;
                {item.name}
              </div>
            );
          })
        }
      </div>
    </div>
  );
};

export default PlanMapEditor;
