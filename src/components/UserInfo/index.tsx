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
  const { userInfo = {}, extendFields = [] } = data;
  return (
    <div className={styles.userInfo}>
      <div className={styles.baseInfo}>
        <div className={styles.box}>
          <div className={styles.avatar}>
            <img src="http://dummyimage.com/720x300" alt="" />
          </div>
          <div className={styles.infoBody}>
            <div className={styles.name}>{userInfo?.name} <div className={styles.status}>{userInfo?.status}</div></div>
            <div className={styles.who}>{userInfo?.who}</div>
            <div className={styles.phone}>{userInfo?.phone || '--'}</div>
          </div>
        </div>
      </div>
      <div className={styles.moreInfo}>
        <Descriptions size="small" column={4}>
          {
            extendFields.map((fieldItem: any) => {
              const { label, value, ...other } = fieldItem;
              return (
                <Descriptions.Item {...other} label={label}>{value || '--'}</Descriptions.Item>
              );
            })
          }
        </Descriptions>
      </div>
    </div>
  );
};

export default UserInfo;
