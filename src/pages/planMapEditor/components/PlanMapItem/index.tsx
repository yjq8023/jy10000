import React, { useState, useRef, useEffect, useContext } from 'react';
import { useSearchParams } from 'react-router-dom';
import lodash from 'lodash';
import { Badge, message } from '@sinohealth/butterfly-ui-components/lib';
import { LinkOutlined } from '@ant-design/icons';
// @ts-ignore
import Sortable from 'sortablejs';
import cls from 'classnames';
import style from './index.less';
import { getUuid } from '@/utils';
import { planItemTypes, timeUnitToShowUnit } from '@/pages/planMapEditor/config';
import { planMapContext } from '@/pages/planMapEditor';
import { useDictKeyValue } from '@/hooks/useDict';
import { getFollowUpFormInfo, saveFollowUpFormInfo } from '@/services/planMapAntForm';

export const PlanMapItem = (props: any) => {
  const { data = {}, index, hasRootNode } = props;
  const [params] = useSearchParams();
  const projectId = params.get('id');
  const {
    selectedNode,
    setSelectedNode,
    addFollowUpModal,
    addFormModal,
    addArticleModal,
    addDiagnosisModal,
    setPlanMapState,
    planMapState,
    disabled,
  } = useContext(planMapContext);
  const domRef = useRef(null);
  const dictVal = useDictKeyValue();
  const loop = data.loop; // 是否为循环节点
  const sortableConfig = {
    sort: false,
    group: {
      name: 'action',
      pull: 'clone',
      put: data.triggerNumber === 0 || disabled ? false : 'action',
    },
    animation: 0,
    onAdd: async (e: any) => {
      // type 有值代表新增，path是复制
      const { type, path } = e.clone.dataset;
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
      if (path) {
        // 克隆数据
        const forItem = lodash.get(planMapState, path);
        const newItems = JSON.parse(JSON.stringify(forItem));
        delete newItems.id;
        delete newItems.aiDecisionFlowsNodeId;
        delete newItems.projectPlanStepId;
        // 复制跟进记录表新增一个表单，不能直接复制
        if (newItems.itemCategory === planItemTypes.followUp) {
          newItems.bizId = await copyFollowUp(newItems.bizId);
        }
        setPlanMapState('update', data.path, {
          ...data,
          followUpItems: [
            ...data.followUpItems,
            newItems,
          ],
        });
        message.success('复制成功');
      }
    },
  };
  useEffect(() => {
    const sortObj = new Sortable(domRef.current, sortableConfig);
  }, []);
  const copyFollowUp = async (id: string) => {
    const formInfo = await getFollowUpFormInfo(id);
    const newFormId = await saveFollowUpFormInfo({
      ...formInfo,
      id: undefined,
    });
    return newFormId;
  };
  const classNames = cls({
    [style.planMapItem]: true,
    [style.planMapItemHasChildren]: data.isHasChildren,
    [style.first]: data.durationTimes === 0,
    [style.loopItem]: loop,
    [style.hasRootNode]: hasRootNode,
  });
  const getInfoItemCls = (itemData: any) => {
    const type = itemData.itemCategory;
    return cls({
      [style.selectItem]: true,
      [style.selectedItem]: selectedNode?.path === itemData.path && itemData.path,
      [style.beforeInfo]: type === planItemTypes.beforeInfo,
      [style.followUp]: type === planItemTypes.followUp,
      [style.article]: type === planItemTypes.article,
      [style.form]: type === planItemTypes.form,
      [style.diagnosis]: type === planItemTypes.diagnosis,
      [style.aiItem]: !!itemData.aiDecisionFlowsNodeId,
      [style.customItem]: !itemData.aiDecisionFlowsNodeId,
    });
  };

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
          <span className={style.loopText}>(节点间隔{data.triggerNumber}{dictVal?.DateUnit[data.triggerTimeUnit]}循环一次，持续{data.durationTimes}{dictVal?.DateUnit[data.durationTimeUnit]})</span>
        )}
        {
          !data.aiDecisionFlowsNodeId && !disabled && (
            <span onClick={() => handleDeleteNode(data.path)} className="iconfont icon-delete1" />
          )
        }

      </div>
      <div className={style.body}>
        <div className={style.title}>随访项目</div>
        <div className={style.infos} ref={domRef}>
          {data?.followUpItems?.map((item: any) => (
            <div className={getInfoItemCls(item)} data-path={item.path} key={getUuid()} onClick={() => handleClickInfo(item)}>
              <Badge color="cyan" />
              {item.itemName}
              &nbsp;
              {
                !item.aiDecisionFlowsNodeId && !disabled && (
                  <span onClick={() => handleDeleteNode(item.path)} className="iconfont icon-delete1" />
                )
              }
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
