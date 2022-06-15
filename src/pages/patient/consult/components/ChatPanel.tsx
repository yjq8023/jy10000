import React from 'react';
import ChatContent from './ChatContent';
import ChatHeader from './ChatHeader';
import ChatInput from './ChatInput';

type ChatPanelPropsType = {};
const ChatPanel: React.FC<ChatPanelPropsType> = () => {
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <ChatHeader />
      <ChatContent />
      <ChatInput />
    </div>
  );
};

export default ChatPanel;
