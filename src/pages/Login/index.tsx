import React, { useState } from 'react';
import { Button, Input } from '@sinohealth/butterfly-ui-components/lib';
import { setToken } from '@/utils/cookies';
// import { requestFd } from '@/core/request';

export default function Login() {
  const [token, setTokens] = useState('123');
  const handleLogin = () => {
    setToken(token);
  };
  return (
    <div>
      <Input value={token} onChange={(e) => setTokens(e.target.value)} />
      <Button onClick={handleLogin}>set tooken</Button>
    </div>
  );
}
