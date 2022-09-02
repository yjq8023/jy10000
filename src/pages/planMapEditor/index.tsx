import React, { useState, createContext, useMemo, useRef, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import lodash from 'lodash';
import { Badge, Modal } from '@sinohealth/butterfly-ui-components/lib';
import Selector from '@/pages/planMapEditor/components/Selector';
import Canvas from '@/pages/planMapEditor/components/Canvas';
import { getUuid } from '@/utils';
import AddNodeModal from '@/pages/planMapEditor/components/AddNodeModal';
import Setting from '@/pages/planMapEditor/components/Setting';
import AddFollowUpModal from '@/pages/planMapEditor/components/AddFollowUpModal';
import AddArticleModal from '@/pages/planMapEditor/components/AddArticleModal';
import AddFormModal from '@/pages/planMapEditor/components/AddFormModal';
import AddDiagnosisModal from '@/pages/planMapEditor/components/AddDiagnosisModal';
import PageHeader from '@/pages/planMapEditor/components/PageHeader';
import { planItemTypes, timeUnitToShowUnit } from '@/pages/planMapEditor/config';
import { getProjectPlanMap } from '@/services/planMapAntForm';

import style from './index.less';

export const planMapContext = createContext<any>(null);

const defaultData = {
  projectId: '',
  preInfoFormId: '',
  roadMaps: [
    {
      id: '1',
      aiDecisionFlowsNodeId: '1', // ai节点标识
      name: '项目名称',
      projectId: 'string',
      roadMapSteps: [],
    },
  ],
};
const PlanMapEditor = ({ disabled }: any) => {
  const [projectPlanData, setProjectPlanData] = useState<ProjectPlanMap.data>();
  const [planMapState, setPlanMapStateFn] = useState<ProjectPlanMap.roadMaps>();
  const [selectedNode, setSelectedNode] = useState<any>(null);
  const [params] = useSearchParams();
  const addNodeModalRef = useRef<any>(null);
  const addFollowUpModal = useRef<any>(null);
  const addArticleModal = useRef<any>(null);
  const addFormModal = useRef<any>(null);
  const addDiagnosisModal = useRef<any>(null);
  const contextData = useMemo(() => {
    const handleDeleteItem = (path: string) => {
      const state = planMapState ? [...planMapState] : [];
      const targetNode = lodash.get(state, path);
      const name = `节点${timeUnitToShowUnit[targetNode.triggerTimeUnit]}+${targetNode.triggerNumber}`;
      Modal.confirm({
        title: `是否确定删除${targetNode.itemName || name}？`,
        content: '',
        onOk() {
          const i = path.lastIndexOf('[');
          const parentPath = path.substring(0, i);
          const targetIndex = path.substring(i).replace('[', '').replace(']', '');
          const node = lodash.get(state, parentPath);
          node.splice(targetIndex, 1);
          lodash.set(state, parentPath, node);
          setPlanMapStateFn(state);
          setSelectedNode(null);
        },
      });
    };
    const handleSetValue = (type: string, path: string, data: any) => {
      const state = planMapState ? [...planMapState] : [];
      let node = path ? lodash.get(state, path) : state;
      if (type === 'add') {
        addNodeModalRef.current.handleOpen(path);
        return;
      }
      if (type === 'delete') {
        handleDeleteItem(path);
        return;
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
      // 暂存数据
      // setLocalStorageForJson('planMapState', {
      //   ...projectPlanData,
      //   roadMaps: planMapState,
      // });
    };
    return {
      projectPlanData,
      planMapState,
      setPlanMapState: handleSetValue,
      selectedNode,
      setSelectedNode,
      addFollowUpModal,
      addFormModal,
      addArticleModal,
      addDiagnosisModal,
      disabled,
    };
  }, [planMapState, setPlanMapStateFn, selectedNode, setSelectedNode]);

  useEffect(() => {
    const id = params.get('id');
    if (id) {
      getProjectPlanMap(id)
        .then((data: any) => {
          setProjectPlanData(data);
          setPlanMapStateFn(data.roadMaps);
        })
        .catch(() => {
          // 调试用，也避免接口失败页面空白了
          const data: any = defaultData;
          setProjectPlanData(data);
          setPlanMapStateFn(data.roadMaps);
        });
    }
  }, []);
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
