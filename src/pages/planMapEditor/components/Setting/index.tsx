import React, { useContext } from 'react';
import { planMapContext } from '@/pages/planMapEditor';
import { planItemTypes } from '@/pages/planMapEditor/config';
import FormSetting from '@/pages/planMapEditor/components/Setting/components/FormSetting';
import style from './index.less';
import ArticleSetting from '@/pages/planMapEditor/components/Setting/components/ArticleSetting';
import DiagnosisSetting from '@/pages/planMapEditor/components/Setting/components/DiagnosisSetting';

const Setting = () => {
  const { selectedNode } = useContext(planMapContext);
  const isFormSetting = [planItemTypes.beforeInfo, planItemTypes.followUp, planItemTypes.form].indexOf(selectedNode?.itemCategory) > -1;
  const isArticle = planItemTypes.article === selectedNode?.itemCategory;
  const isDiagnosis = planItemTypes.diagnosis === selectedNode?.itemCategory;
  return (
    <div className={style.setting}>
      <div className={style.header}>
        <div className="but-title">配置面板</div>
      </div>
      <div className={style.body} key={selectedNode.path}>
        { isFormSetting && <FormSetting data={selectedNode} />}
        { isArticle && <ArticleSetting data={selectedNode} />}
        { isDiagnosis && <DiagnosisSetting data={selectedNode} />}
      </div>
    </div>
  );
};

export default Setting;
