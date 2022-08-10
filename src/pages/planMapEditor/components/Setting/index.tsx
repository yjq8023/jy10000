import React, { useContext } from 'react';
import { planMapContext } from '@/pages/planMapEditor';
import { planItemTypes } from '@/pages/planMapEditor/config';
import FormSetting from '@/pages/planMapEditor/components/Setting/components/FormSetting';
import style from './index.less';

const Setting = () => {
  const { selectedNode } = useContext(planMapContext);
  const isFormSetting = [planItemTypes.beforeInfo, planItemTypes.followUp].indexOf(selectedNode?.type) > -1;
  return (
    <div className={style.setting}>
      <div className={style.header}>
        <div className="but-title">配置面板</div>
      </div>
      <div className={style.body}>
        { isFormSetting && <FormSetting data={selectedNode} />}
      </div>
    </div>
  );
};

export default Setting;
