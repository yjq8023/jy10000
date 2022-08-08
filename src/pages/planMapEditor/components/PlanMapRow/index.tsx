import React, { useState, useRef, useEffect, useContext } from 'react';
// @ts-ignore
import Sortable from 'sortablejs';
import style from './index.less';
import { getUuid } from '@/utils';
import PlanMapItem from '../PlanMapItem';
import { planMapContext } from '@/pages/planMapEditor';

const PlanMapRow = (props: any) => {
  const { listData, onChange, offset = 0 } = props;
  const domRef = useRef(null);
  const { planMapState, setPlanMapState } = useContext(planMapContext);
  const sortableConfig = {
    group: 'container',
    animation: 150,
    onAdd(e: any) {
      const data = {
        id: getUuid(),
        period: Date.now(),
      };
      const newListData = [...listData];
      newListData.splice(e.newIndex, 0, data);
      // onChange(newListData);
    },
    scroll: true,
    sort: false,
    dragClass: 'dragDom',
  };
  useEffect(() => {
    const s = new Sortable(domRef.current, sortableConfig);
  }, [listData]);

  const onItemChange = (itemData: any, index: number) => {
    const newListData = [...listData];
    newListData[index] = itemData;
    onChange(newListData);
  };
  return (
    <div className={style.planMapRow} style={{ marginLeft: `${offset * 240}px` }} ref={domRef}>
      {listData?.map((item: any, index: number) => {
        return (<PlanMapItem key={item.id} data={item} index={index} onChange={(itemData: any) => onItemChange(itemData, index)} />);
      })}
    </div>
  );
};

export default PlanMapRow;
