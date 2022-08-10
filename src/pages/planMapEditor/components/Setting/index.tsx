import React, { useContext } from 'react';
import { planMapContext } from '@/pages/planMapEditor';

const Setting = () => {
  const { selectedNode } = useContext(planMapContext);
  return (
    <div>
      <div className="but-title">配置面板</div>
      {selectedNode?.name}
    </div>
  );
};

export default Setting;
