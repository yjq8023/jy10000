import React, { useState, useRef, useEffect, useContext } from 'react';
// @ts-ignore
import Sortable from 'sortablejs';
import style from './index.less';
import PlanMapItem from '../PlanMapItem';
import { planMapContext } from '@/pages/planMapEditor';
import { getUuid } from '@/utils';

const PlanMapRow = (props: any) => {
  const { listData, onChange, offset = 0 } = props;
  const domRef = useRef(null);
  const { setPlanMapState } = useContext(planMapContext);
  const sortableConfig = {
    group: {
      pull: 'clone',
      put: 'container',
    },
    animation: 150,
    onAdd(e: any) {
      handleAddItem();
    },
    scroll: true,
    sort: false,
  };
  useEffect(() => {
    const s = new Sortable(domRef.current, sortableConfig);
  }, [listData]);

  const handleAddItem = () => {
    setPlanMapState('add', listData.path, {});
  };
  const handleDeleteItem = (itemData: any, index: number) => {
    setPlanMapState('delete', listData.path, index);
  };
  return (
    <div className={style.planMapRow} style={{ marginLeft: `${offset * 240}px` }} ref={domRef}>
      {listData?.map((item: any, index: number) => {
        return (<PlanMapItem key={item.id} data={item} index={index} onDelete={(itemData: any) => handleDeleteItem(itemData, index)} />);
      })}
    </div>
  );
};

export default PlanMapRow;
