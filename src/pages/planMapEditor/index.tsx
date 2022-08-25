import React, { useState, createContext, useMemo, useRef } from 'react';
import { ReactSortable } from 'react-sortablejs';
import lodash from 'lodash';
import { Badge } from '@sinohealth/butterfly-ui-components/lib';
import Selector from '@/pages/planMapEditor/components/Selector';
import Canvas from '@/pages/planMapEditor/components/Canvas';

import style from './index.less';
import { getUuid } from '@/utils';
import AddNodeModal from '@/pages/planMapEditor/components/AddNodeModal';
import Setting from '@/pages/planMapEditor/components/Setting';
import AddFollowUpModal from '@/pages/planMapEditor/components/AddFollowUpModal';
import AddArticleModal from '@/pages/planMapEditor/components/AddArticleModal';
import AddFormModal from '@/pages/planMapEditor/components/AddFormModal';
import AddDiagnosisModal from '@/pages/planMapEditor/components/AddDiagnosisModal';
import PageHeader from '@/pages/planMapEditor/components/PageHeader';

export const planMapContext = createContext<any>(null);

const getPlanData = (count: number) => {
  let i = 0;
  const d = [];
  while (i < count) {
    i += 1;
    d.push({
      id: getUuid(),
      period: i * 10,
      infos: [
        {
          name: '跟进记录表',
          type: 'followUp',
        },
        {
          name: '患教资料',
          type: 'article',
        },
        {
          name: '医学量表',
          type: 'form',
        },
        {
          name: '复诊复查',
          type: 'diagnosis',
        },
      ],
    });
  }
  return d;
};
const planData: any = [
  {
    id: 1,
    period: 0,
    infos: [
      {
        name: '项目前置信息',
        type: 'beforeInfo',
      },
    ],
  },
  ...getPlanData(4),
];
planData[1].children = [getPlanData(4)];
const PlanMapEditor = () => {
  const [planMapState, setPlanMapStateFn] = useState(planData);
  const [selectedNode, setSelectedNode] = useState<any>(null);
  const addNodeModalRef = useRef<any>(null);
  const addFollowUpModal = useRef<any>(null);
  const addArticleModal = useRef<any>(null);
  const addFormModal = useRef<any>(null);
  const addDiagnosisModal = useRef<any>(null);
  const contextData = useMemo(() => {
    const handleSetValue = (type: string, path: string, data: any) => {
      const state = [...planMapState];
      let node = path ? lodash.get(state, path) : state;
      if (type === 'add') {
        addNodeModalRef.current.handleOpen(path);
        return;
      }
      if (type === 'delete') {
        node.splice(data, 1);
      }
      if (type === 'update') {
        node = data;
      }
      if (path) {
        lodash.set(state, path, node);
        setPlanMapStateFn(state);
      } else {
        setPlanMapStateFn(node);
      }
    };
    return {
      planMapState,
      setPlanMapState: handleSetValue,
      selectedNode,
      setSelectedNode,
      addFollowUpModal,
      addFormModal,
      addArticleModal,
      addDiagnosisModal,
    };
  }, [planMapState, setPlanMapStateFn, selectedNode, setSelectedNode]);
  return (
    <planMapContext.Provider value={contextData}>
      <PageHeader />
      <div className={style.planMapEditor}>
        <div className={style.selector}>
          <Selector />
        </div>
        <div className={style.editorBody}>
          <div className={style.bodyHeader}>
            <div>
              <div className="but-title">管理计划</div>
            </div>
            <div>
              <Badge color="cyan" text="前置信息" />
              <Badge color="green" text="跟进记录表" />
              <Badge color="blue" text="患教文章" />
              <Badge color="gold" text="医学量表" />
              <Badge color="purple" text="复诊复查项目" />
            </div>
          </div>
          <div>
            <Canvas />
          </div>
        </div>
        {
            selectedNode && (
              <div className={style.config}>
                <Setting />
              </div>
            )
          }
        <AddNodeModal ref={addNodeModalRef} />
        <AddFollowUpModal ref={addFollowUpModal} />
        <AddArticleModal ref={addArticleModal} />
        <AddFormModal ref={addFormModal} />
        <AddDiagnosisModal ref={addDiagnosisModal} />
      </div>
    </planMapContext.Provider>
  );
};

export default PlanMapEditor;
