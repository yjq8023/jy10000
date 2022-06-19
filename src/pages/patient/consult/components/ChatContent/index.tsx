import { Avatar } from '@sinohealth/butterfly-ui-components/lib';
import React from 'react';
import styles from './index.less';

type ChatContentPropsType = {};
const staticMessageData = [1, 2, 3, 4, 5, 6, 7];
const ChatContent: React.FC<ChatContentPropsType> = () => {
  return (
    <div className={styles['chat-content']}>
      {staticMessageData.map((item) => {
        return (
          <div className={`${styles.message} ${styles.left}`} key={item}>
            <Avatar size={40} className={styles.avatar} />
            <div>
              <div className={styles.name}>
                <span>梁梅</span>
                <span>患者</span>
              </div>
              <div className={styles.text}>
                医生您好！我有一些疑问，请问这个药怎么吃的？跟我平时吃的有什么禁忌或相互作用吗？什么时候吃，需要忌口吗
              </div>
            </div>
          </div>
        );
      })}
      <div className={styles.time}>09:35:25</div>
      <div className={`${styles.message} ${styles.right}`}>
        <Avatar size={40} className={styles.avatar} />
        <div>
          <div className={styles.name}>
            <span>王志明</span>
            <span>医生</span>
          </div>
          <div className={styles.text}>您好，请把具体药品信息给我看下</div>
        </div>
      </div>
    </div>
  );
};

export default ChatContent;
