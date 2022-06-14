import React from 'react';
import ChatHeader from './ChatHeader';

type ChatPanelPropsType = {};
const ChatPanel: React.FC<ChatPanelPropsType> = () => {
  return (
    <div>
      <ChatHeader />
    </div>
  );
};

export default ChatPanel;
