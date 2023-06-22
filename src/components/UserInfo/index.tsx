import React from 'react';
import { Descriptions } from 'antd';
import styles from './index.less';

type Data = {
  userInfo: {
    name?: string;
    who?: string;
    phone?: string;
    status?: string;
  }
  extendField: { label: string, value: string}[]
}
type UserInfoProps = {
  data?: Data
}
const UserInfo: React.FC<UserInfoProps> = (props) => {
  const { data = {} } = props;
  // @ts-ignore
  const { userInfo = {}, extendField = [] } = data;
  return (
    <div className={styles.userInfo}>
      <div className={styles.baseInfo}>
        <div className={styles.avatar}>
          <img src="http://dummyimage.com/720x300" alt="" />
        </div>
        <div className={styles.infoBody}>
          <div className={styles.name}>{userInfo?.name} <div className={styles.status}>{userInfo?.status}</div></div>
          <div className={styles.who}>{userInfo?.who}</div>
          <div className={styles.phone}>{userInfo?.phone || '--'}</div>
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
