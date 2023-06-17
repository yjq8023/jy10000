import React from 'react';
import { Descriptions } from 'antd';
import styles from './index.less';

const UserInfo = () => {
  return (
    <div className={styles.userInfo}>
      <div className={styles.baseInfo}>
        <div className={styles.avatar}>
          <img src="http://dummyimage.com/720x300" alt="" />
        </div>
        <div className={styles.infoBody}>
          <div className={styles.name}>李小萌 <div className={styles.status}>在读</div></div>
          <div className={styles.who}>本人</div>
          <div className={styles.phone}>13674829122</div>
        </div>
      </div>
      <div className={styles.moreInfo}>
        <Descriptions size="small" column={4}>
          <Descriptions.Item label="编号">Zhou Maomao</Descriptions.Item>
          <Descriptions.Item label="性别">1810000000</Descriptions.Item>
          <Descriptions.Item label="生日">Hangzhou, Zhejiang</Descriptions.Item>
          <Descriptions.Item label="电子邮箱">empty</Descriptions.Item>
          <Descriptions.Item label="英文姓名">Zhou Maomao</Descriptions.Item>
          <Descriptions.Item label="国籍">Zhou Maomao</Descriptions.Item>
          <Descriptions.Item label="城市">Zhou Maomao</Descriptions.Item>
          <Descriptions.Item label="居住地址">Zhou Maomao</Descriptions.Item>
        </Descriptions>
      </div>
    </div>
  );
};

export default UserInfo;
