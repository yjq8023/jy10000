import React from 'react';
import { useNavigate } from 'react-router-dom';

export const LogoWidget: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div style={{ paddingLeft: '6px' }}>
      <div>
        <a onClick={() => navigate(-1)}>
          <span className="iconfont icon-left" style={{ fontSize: '14px', border: '1px dashed #cfcfcf', marginRight: '4px' }} />
          返回上一级
        </a>
      </div>
      <div style={{ fontSize: '20px', fontWeight: 500 }}>表单编辑</div>
    </div>
  );
};
export default LogoWidget;
