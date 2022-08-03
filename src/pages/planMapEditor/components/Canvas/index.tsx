import React, { useState, useRef, useEffect } from 'react';
// @ts-ignore
import Sortable from 'sortablejs';
import style from './index.less';
import { getUuid } from '@/utils';

const PlanMapItem = (props: any) => {
  const { data = {}, onChange } = props;
  const domRef = useRef(null);
  const sortableConfig = {
    sort: false,
    group: 'action',
    animation: 150,
  };
  useEffect(() => {
    const sortObj = new Sortable(domRef.current, sortableConfig);
  }, []);
  const hasChildren = data.children && data.children.length > 0;

  const onChildrenChange = (newChildrenList: any, i: number) => {
    const children = data.children;
    children[i] = newChildrenList;
    onChange({
      ...data,
      children,
    });
  };
  const renderItem = () => (
    <div className={style.sortTableItem}>
      <h3>{data.period}</h3>
      <div className={style.infos} ref={domRef}>
        {data?.infos?.map((item: any) => (
          <div className={style.selectItem} key={item.id}>{item.name}</div>
        ))}
      </div>
    </div>
  );
  if (hasChildren) {
    return (
      <div className={`itemSortTableList ${style.itemSortTableList}`}>
        {renderItem()}
        <div className={style.sortTableListBox}>
          { data.children.map((childrenList: any, index: number) => {
            return <Canvas key={getUuid()} listData={childrenList} onChange={(listData: any) => onChildrenChange(listData, index)} />;
          })}
        </div>
      </div>
    );
  }
  return renderItem();
};

const Canvas = (props: any) => {
  const { listData, onChange } = props;
  const domRef = useRef(null);
  const sortableConfig = {
    group: 'container',
    filter: '.itemSortTableList',
    animation: 150,
    onAdd(e: any) {
      const data = {
        id: getUuid(),
        period: Date.now(),
      };
      const newListData = [...listData];
      newListData.splice(e.newIndex, 0, data);
      onChange(newListData);
    },
    scroll: true,
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
    <div ref={domRef} className={style.sortTableList}>
      {listData.map((item: any, index: number) => {
        return <PlanMapItem key={getUuid()} data={item} onChange={(itemData: any) => onItemChange(itemData, index)} />;
      })}
    </div>
  );
};

export default Canvas;
