import React, { useState, useRef, useEffect } from 'react';
// @ts-ignore
import Sortable from 'sortablejs';
import cls from 'classnames';
import style from './index.less';
import { getUuid } from '@/utils';

export const PlanMapItem = (props: any) => {
  const { data = {}, onChange, index } = props;
  const domRef = useRef(null);
  const sortableConfig = {
    sort: false,
    group: {
      name: 'action',
      pull: 'clone',
      put: 'action',
    },
    animation: 150,
  };
  useEffect(() => {
    const sortObj = new Sortable(domRef.current, sortableConfig);
  }, []);
  const classNames = cls({
    [style.planMapItem]: true,
    [style.planMapItemHasChildren]: data.isHasChildren,
  });
  return (
    <div className={classNames}>
      <span className={style.index}>{ index + 1}</span>
      <h3>{data.period}</h3>
      <div className={style.body}>
        <div className={style.title}>随访项目</div>
        <div className={style.infos} ref={domRef}>
          {data?.infos?.map((item: any) => (
            <div className={style.selectItem} key={item.id}>{item.name}</div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PlanMapItem;
