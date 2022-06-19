import React from 'react';
import { Avatar, Button } from '@sinohealth/butterfly-ui-components/lib';
import styles from './index.less';

type ChatHeaderPropsType = {};
const ChatHeader: React.FC<ChatHeaderPropsType> = () => {
  return (
    <div className={styles['chat-header']}>
      <Avatar size={54} className={styles['chat-header-avatar']} />
      <div>
        <div className={styles['chat-header-info']}>
          <div className={styles['chat-header-name']}>梁梅</div>
          <div className={styles['chat-header-info-age']}>
            {'man'.length === 2 ? (
              <span className="iconfont icon-nan" />
            ) : (
              <span className="iconfont icon-nv" />
            )}
            45
          </div>
          <div className={styles['chat-header-info-phone']}>（13246855768）</div>
          <div className={styles['chat-header-info-word']}>
            患者档案 <span className="iconfont icon-arrow-right" />
          </div>
        </div>
        <div className={styles['chat-header-pro']}>
          <span>#乳腺癌随访管理项目</span>
          <span>医生：王志明 ｜ 个案管理师：林溪</span>
        </div>
      </div>
      <div className={styles['chat-header-close']}>
        <Button type="primary" icon={<span className="iconfont icon-desc" />}>
          结束咨询
        </Button>
      </div>
    </div>
  );
};

export default ChatHeader;
