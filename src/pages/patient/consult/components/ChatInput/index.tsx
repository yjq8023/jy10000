import { Button, Input } from '@sinohealth/butterfly-ui-components/lib';
import React from 'react';
import styles from './index.less';

type ChatInputPropsType = {};
const ChatInput: React.FC<ChatInputPropsType> = () => {
  const sendMessage = (e: any) => {
    console.log(e);
  };
  return (
    <div className={styles['chat-input']}>
      <Input.TextArea
        className={styles['chat-input-textarea']}
        autoSize={{ minRows: 3, maxRows: 6 }}
        bordered={false}
        onPressEnter={sendMessage}
        placeholder="在此处输入内容…"
      />
      <Button type="primary">发送</Button>
    </div>
  );
};

export default ChatInput;
