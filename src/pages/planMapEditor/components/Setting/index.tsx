import React, { useContext } from 'react';
import { planMapContext } from '@/pages/planMapEditor';
import { planItemTypes } from '@/pages/planMapEditor/config';
import FormSetting from '@/pages/planMapEditor/components/Setting/components/FormSetting';
import style from './index.less';
import ArticleSetting from '@/pages/planMapEditor/components/Setting/components/ArticleSetting';

const Setting = () => {
  const { selectedNode } = useContext(planMapContext);
  const isFormSetting = [planItemTypes.beforeInfo, planItemTypes.followUp].indexOf(selectedNode?.type) > -1;
  const isArticle = planItemTypes.article === selectedNode?.type;
  return (
    <div className={style.setting}>
      <div className={style.header}>
        <div className="but-title">配置面板</div>
      </div>
      <div className={style.body}>
        { isFormSetting && <FormSetting data={selectedNode} />}
        { isArticle && <ArticleSetting data={selectedNode} />}
      </div>
    </div>
  );
};

export default Setting;
