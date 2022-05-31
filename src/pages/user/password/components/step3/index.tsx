import React, { useEffect } from 'react';
import { Button, Result } from '@sinohealth/butterfly-ui-components/lib';
import { useNavigate } from 'react-router-dom';

function Step3() {
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      navigate('/login');
    }, 5000);
  });
  return (
    <div>
      <Result
        status="success"
        title="密码重置成功"
        subTitle="5s 后自动跳转登录页"
        extra={[
          <Button
            type="primary"
            key="console"
            block
            size="large"
            onClick={() => navigate('/login')}
          >
            立即登录
          </Button>,
        ]}
      />
    </div>
  );
}

export default Step3;
