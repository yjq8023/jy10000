import React, { useContext, useState, useEffect } from 'react';
// @ts-ignore
import Sortable from 'sortablejs';
import style from './index.less';
import { getUuid } from '@/utils';
import PlanMapRow from '@/pages/planMapEditor/components/PlanMapRow';
import { planMapContext } from '@/pages/planMapEditor';
import { planItemTypes } from '@/pages/planMapEditor/config';

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
  const { planMapState, projectPlanData, setPlanMapState } = useContext(planMapContext);
  const [planMapList, setPlanMapList] = useState<any>([]);

  useEffect(() => {
    if (!planMapState) return;
    setPlanMapList(transformPlanMapDataToArray(planMapState));
  }, [planMapState]);

  const getBeforeNode = () => {
    if (projectPlanData.preFormId) {
      return [
        {
          id: getUuid(),
          aiDecisionFlowsNodeId: getUuid(),
          itemName: '项目前置信息', // 名称
          itemCategory: planItemTypes.beforeInfo, // 类型
          preFormId: projectPlanData.preFormId,
        },
      ];
    }
    return [];
  };
  const transformPlanMapDataToArray = (mapData: ProjectPlanMap.roadMaps) => {
    const newMapData = mapData.map((item, index) => {
      const path = `[${index}].roadMapSteps`;
      const offset = index === 0 ? 0 : 1;
      const res: ProjectPlanMap.roadMapItem = {
        ...item,
        path,
        offset,
        roadMapSteps: item.roadMapSteps.map((stepItem, stepItemIndex) => {
          return {
            ...stepItem,
            path: `${path}[${stepItemIndex}]`,
            isHasChildren: stepItemIndex === 0 && index === 0,
            childrenRowCount: mapData.length - 1,
            followUpItems: stepItem.followUpItems?.map((followUpItem, followUpItemIndex) => {
              return {
                ...followUpItem,
                path: `${path}[${stepItemIndex}].followUpItems[${followUpItemIndex}]`,
              };
            }),
          };
        }),
      };
      return res;
    });
    newMapData[0].roadMapSteps.unshift({
      path: '',
      id: getUuid(),
      aiDecisionFlowsNodeId: getUuid(),
      durationTimes: 0,
      durationTimeUnit: 'DAYS',
      loop: false,
      triggerNumber: 0,
      triggerTimeUnit: 'DAYS',
      isHasChildren: false,
      followUpItems: getBeforeNode(),
    });
    return newMapData;
  };
  return (
    <div>
      { planMapList.map((listData: any, index: number) => (<PlanMapRow key={getUuid()} listData={listData} offset={listData.offset} />))}
    </div>
  );
};

export default Canvas;

/*

  const transformPlanMapDataToArray = (mapData: any, mapList: any = [], offset: number = 0, path: any = '') => {
    const nowList: any = [];
    nowList.offset = offset;
    nowList.path = path;
    mapList.push(nowList);
    const reverseData = [...mapData].reverse();
    reverseData.forEach((planMapItem: any, rIndex) => {
      const isHasChildren = planMapItem.children && planMapItem.children.length > 0;
      const index = reverseData.length - rIndex - 1;
      const node = {
        ...planMapItem,
        isHasChildren,
        childrenRowCount: getChildrenLength(planMapItem.children, nowList),
        path: `${path}[${index}]`,
      };
      nowList.unshift(node);
      if (isHasChildren) {
        const ofs = offset + index;
        planMapItem.children.forEach((list: any, i: number) => {
          transformPlanMapDataToArray(list, mapList, ofs, `${node.path}.children[${i}]`);
        });
      }
    });
    return mapList;
  };
* */
