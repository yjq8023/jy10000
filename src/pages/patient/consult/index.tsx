import React from 'react';
import { Avatar, Input } from '@sinohealth/butterfly-ui-components/lib';
import styles from './index.less';
import ChatPanel from './components/ChatPanel';

function PatientConsult() {
  const onSubmit = (formValues: any) => {};
  return (
    <div className={styles['patient-consult']}>
      <div className={styles['patient-consult-list']}>
        <div className={styles['patient-consult-list-header']}>
          <div className={styles.title}>患者咨询列表</div>
          <div className={styles.desc}>
            <span className="iconfont icon-list-table" />
            选择项目
          </div>
        </div>
        <Input
          className={styles['patient-consult-list-search']}
          bordered={false}
          placeholder="输入患者姓名/手机号查询"
          suffix={<div className="iconfont icon-search" />}
        />
        <div className={styles['patient-consult-list-items']}>
          {[1, 23, 4, 5, 4].map((v) => (
            <div className={`${styles.item} ${v === 1 ? styles.active : ''}`} key={v}>
              <Avatar className={styles['item-avatar']} size={54}>pang</Avatar>
              <div className={styles['item-content']}>
                <div className={styles['item-content-name']}>
                  <span>梁梅</span>
                  <span>（13246855768）</span>
                </div>
                <div className={styles['item-content-msg']}>
                  医生您好！我有一些疑问，请问这个药怎么吃的？跟我平时吃的有什么禁忌或相互作用吗？什么时候吃，需要忌口吗
                </div>
                <div className={styles['item-content-footer']}>
                  <div>#乳腺癌随访管理项目</div>
                  <div>昨天 16:30</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className={styles['patient-consult-window']}>
        <ChatPanel />
      </div>
    </div>
  );
}

export default PatientConsult;
