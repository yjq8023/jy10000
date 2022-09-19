import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

export const LogoWidget: React.FC = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const formName = params.get('name');
  return (
    <div style={{ paddingLeft: '6px' }}>
      <div>
        <a onClick={() => navigate(-1)}>
          <span className="iconfont icon-left" style={{ fontSize: '14px', border: '1px dashed #cfcfcf', marginRight: '4px' }} />
          返回上一级
        </a>
      </div>
      <div style={{ fontSize: '20px', fontWeight: 500 }}>{formName}</div>
    </div>
  );
};
export default LogoWidget;
