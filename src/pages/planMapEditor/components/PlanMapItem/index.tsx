import React, { useState, useRef, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Badge } from '@sinohealth/butterfly-ui-components/lib';
// @ts-ignore
import Sortable from 'sortablejs';
import cls from 'classnames';
import style from './index.less';
import { getUuid } from '@/utils';
import { planItemTypes } from '@/pages/planMapEditor/config';
import { planMapContext } from '@/pages/planMapEditor';

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
  const { data = {}, onDelete, index } = props;
  const {
    setSelectedNode,
    addFollowUpModal,
    addFormModal,
    addArticleModal,
    addDiagnosisModal,
  } = useContext(planMapContext);
  const navigate = useNavigate();
  const domRef = useRef(null);
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
      console.log('e');
      console.log(type);
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
    [style.first]: data.period === 0,
  });
  const handleClickInfo = (item: any) => {
    console.log(item);
    setSelectedNode(item);
    const { type } = item;
    // if (type === planItemTypes.beforeInfo) {
    //   navigate('/formily/editor?type=beforeInfo');
    // }
  };
  return (
    <div className={classNames}>
      <span className={style.index}>{ index + 1}</span>
      <div className={style.header}>
        { data.period === 0 ? '开始' : `D+${data.period}`}
        <span onClick={onDelete} className="iconfont icon-delete" />
      </div>
      <div className={style.body}>
        <div className={style.title}>随访项目</div>
        <div className={style.infos} ref={domRef}>
          {data?.infos?.map((item: any) => (
            <div className={getInfoItemCls(item.type)} key={getUuid()} onClick={() => handleClickInfo(item)}>
              <Badge color="cyan" />
              {item.name}
            </div>
          ))}
        </div>
      </div>
      { data.isHasChildren && <div className={style.borderDom} style={{ height: `${data.childrenRowCount * 100}%` }} />}
    </div>
  );
};

export default PlanMapItem;
