import React, { useState, useRef, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Badge } from '@sinohealth/butterfly-ui-components/lib';
import { LinkOutlined } from '@ant-design/icons';
// @ts-ignore
import Sortable from 'sortablejs';
import cls from 'classnames';
import style from './index.less';
import { getUuid } from '@/utils';
import { planItemTypes, timeUnitToShowUnit } from '@/pages/planMapEditor/config';
import { planMapContext } from '@/pages/planMapEditor';
import { useDictKeyValue } from '@/hooks/useDict';

const getInfoItemCls = (type: string) => {
  return cls({
    [style.selectItem]: true,
    [style.beforeInfo]: type === planItemTypes.beforeInfo,
    [style.followUp]: type === planItemTypes.followUp,
    [style.article]: type === planItemTypes.article,
    [style.form]: type === planItemTypes.form,
    [style.diagnosis]: type === planItemTypes.diagnosis,
  });
};
export const PlanMapItem = (props: any) => {
  const { data = {}, index, hasRootNode } = props;
  const {
    setSelectedNode,
    addFollowUpModal,
    addFormModal,
    addArticleModal,
    addDiagnosisModal,
    setPlanMapState,
  } = useContext(planMapContext);
  const domRef = useRef(null);
  const dictVal = useDictKeyValue();
  const loop = data.loop; // 是否为循环节点
  const sortableConfig = {
    sort: false,
    group: {
      name: 'action',
      pull: 'clone',
      put: 'action',
    },
    animation: 150,
    onAdd(e: any) {
      const type = e.clone.dataset.type;
      if (type === planItemTypes.followUp) {
        addFollowUpModal.current?.handleOpen(data);
      }
      if (type === planItemTypes.article) {
        addArticleModal.current?.handleOpen(data);
      }
      if (type === planItemTypes.form) {
        addFormModal.current?.handleOpen(data);
      }
      if (type === planItemTypes.diagnosis) {
        addDiagnosisModal.current?.handleOpen(data);
      }
    },
  };
  useEffect(() => {
    const sortObj = new Sortable(domRef.current, sortableConfig);
  }, []);
  const classNames = cls({
    [style.planMapItem]: true,
    [style.planMapItemHasChildren]: data.isHasChildren,
    [style.first]: data.durationTimes === 0,
    [style.loopItem]: loop,
    [style.hasRootNode]: hasRootNode,
  });
  const handleClickInfo = (item: any) => {
    setSelectedNode(item);
  };
  const handleDeleteNode = (path: string) => {
    setPlanMapState('delete', path);
  };
  return (
    <div className={classNames}>
      <span className={style.index}>{ index }</span>
      <div className={style.header}>
        { data.triggerNumber === 0 ? '开始' : `${timeUnitToShowUnit[data.triggerTimeUnit]}+${data.triggerNumber}`}
        { loop && (
          <span className={style.loopText}>(每{data.triggerNumber}个{dictVal?.DateUnit[data.triggerTimeUnit]}循环1次，持续{data.durationTimes}{dictVal?.DateUnit[data.durationTimeUnit]})</span>
        )}
        <span onClick={() => handleDeleteNode(data.path)} className="iconfont icon-delete1" />
      </div>
      <div className={style.body}>
        <div className={style.title}>随访项目</div>
        <div className={style.infos} ref={domRef}>
          {data?.followUpItems?.map((item: any) => (
            <div className={getInfoItemCls(item.itemCategory)} key={getUuid()} onClick={() => handleClickInfo(item)}>
              <Badge color="cyan" />
              {item.itemName}&nbsp;<span onClick={() => handleDeleteNode(item.path)} className="iconfont icon-delete1" />
            </div>
          ))}
        </div>
        { loop && <LinkOutlined className={style.linkIcon} />}
      </div>
      { !!data.isHasChildren && <div className={style.borderDom} style={{ height: `${data.childrenRowCount * 100}%` }} />}
    </div>
  );
};

export default PlanMapItem;
