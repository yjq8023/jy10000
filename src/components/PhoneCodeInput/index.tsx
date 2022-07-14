import React, { useState, useEffect } from 'react';
import { Input, Checkbox, Button, InputProps } from '@sinohealth/butterfly-ui-components/lib';
import { KeyOutlined } from '@ant-design/icons';
import { getLocalStorage, setLocalStorage } from '@/utils/cookies';
import { validIsMobile } from '@/utils/validate';
import { sendPhoneCode } from '@/services/user';

interface PhoneCodeInputProps extends InputProps {
  stateKey: string;
  intervals: number;
  phoneNumber: string;
  resetPwd?: boolean;
}
function PhoneCodeInput(props: PhoneCodeInputProps) {
  const { stateKey, intervals, phoneNumber = '', ...other } = props;
  const [canSendCode, setCanSendCode] = useState(true);
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    const time = getLocalStorage(stateKey);
    if (time) {
      const timeLeftData = Math.floor((Date.now() - time) / 1000);
      const isCan = timeLeftData > intervals;
      setCanSendCode(isCan);
      if (!isCan) {
        setTimeLeft(intervals - timeLeftData);
      }
    }
  }, []);
  useEffect(() => {
    if (timeLeft > 0) {
      setCanSendCode(false);
      setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 900);
    } else {
      setCanSendCode(true);
    }
  }, [timeLeft]);
  const sendCode = (e: any) => {
    const resetPwd = props.resetPwd || false;
    sendPhoneCode(phoneNumber, resetPwd)
      .then(() => {
        setLocalStorage(stateKey, Date.now());
        setTimeLeft(intervals);
        setCanSendCode(false);
      })
      .catch((error) => {
        // const message = error?.message;
        // onError && onError(message || '验证码发送失败，请重新尝试');
      });
  };
  const renderCodeBtn = () => {
    const text = canSendCode ? '获取验证码' : `${timeLeft}秒后可重新获取`;
    return (
      <Button
        disabled={!canSendCode || !validIsMobile(phoneNumber)}
        onClick={(e) => sendCode(e)}
        size="small"
      >
        {text}
      </Button>
    );
  };
  return (
    <Input
      {...other}
      size="large"
      placeholder="输入短信验证码"
      prefix={<KeyOutlined />}
      suffix={renderCodeBtn()}
    />
  );
}

export default PhoneCodeInput;
