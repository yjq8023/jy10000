import React, { useEffect, useState } from 'react';
import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';

function Step3() {
  const [countdownm, setCountdown] = useState(5);
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      navigate('/login');
    }, 5000);
    const interval = setInterval(() => {
      setCountdown((n) => n - 1);
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);
  return (
    <div>
      <Result
        status="success"
        title="密码重置成功"
        subTitle={`${countdownm}s 后自动跳转登录页`}
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
