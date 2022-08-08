import React, { useContext, useState, useEffect } from 'react';
// @ts-ignore
import Sortable from 'sortablejs';
import style from './index.less';
import { getUuid } from '@/utils';
import PlanMapRow from '@/pages/planMapEditor/components/PlanMapRow';
import { planMapContext } from '@/pages/planMapEditor';

const getChildrenLength = (data: any = [], allListData: any = null) => {
  let length = 0;
  data.forEach((fitem: any) => {
    length += 1;
    fitem.forEach((item: any) => {
      if (item.children && item.children.length > 0) {
        length += getChildrenLength(item.children);
      }
    });
  });
  if (allListData) {
    allListData.forEach((item: any) => {
      if (item.children && item.children.length > 0) {
        length += item.childrenRowCount;
      }
    });
  }
  return length;
};

const Canvas = (props: any) => {
  const { planMapState, setPlanMapState } = useContext(planMapContext);
  const [planMapList, setPlanMapList] = useState([]);
  useEffect(() => {
    if (!planMapState) return;
    setPlanMapList(transformPlanMapDataToArray(planMapState));
  }, [planMapState]);
  const transformPlanMapDataToArray = (mapData: any, mapList: any = [], offset: number = 0) => {
    const nowList: any = [];
    nowList.offset = offset;
    mapList.push(nowList);
    const reverseData = [...mapData].reverse();
    reverseData.forEach((planMapItem: any, index) => {
      const isHasChildren = planMapItem.children && planMapItem.children.length > 0;
      nowList.unshift({
        ...planMapItem,
        isHasChildren,
        childrenRowCount: getChildrenLength(planMapItem.children, nowList),
      });
      if (isHasChildren) {
        const ofs = offset + (reverseData.length - index - 1);
        planMapItem.children.forEach((list: any) => {
          transformPlanMapDataToArray(list, mapList, ofs);
        });
      }
    });
    return mapList;
  };
  return (
    <div>
      { planMapList.map((listData: any, index: number) => (<PlanMapRow key={getUuid()} listData={listData} offset={listData.offset} />))}
    </div>
  );
};

export default Canvas;
