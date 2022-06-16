import React, { useState, useEffect, useContext, createContext } from 'react';
import { Badge } from '@sinohealth/butterfly-ui-components/lib';
import { useNavigate } from 'react-router-dom';
import style from './index.less';
// import { getUnreadCount } from '@/services/messagePage/index';
// import { pushMessage } from '@/services/prescription';
import msgIcon from '@/assets/images/messagePage/msgIcon.svg';

type OrderFormProps = {
  unreas: any;
  ifOpMsgCount: () => void;
};
/**
 * 消息
 * @returns
 */
// export const mgsCont = createContext(0);
const messagePage: React.FC<OrderFormProps> = (props) => {
  const navigate = useNavigate();
  const { ifOpMsgCount, unreas } = props;
  const [msgCount, setMsgCount] = useState<number>(0);
  const opMsgCount = () => {
    // ifOpMsgCount();
    // getMsgTime();
    navigate('/message');
  };

  const [msgTime, setMsgTime] = useState<any>(null);
  const getMsgTime = () => {
    clearInterval(msgTime);
    const time: any = setInterval(() => {
      getUnreadCountFun();
    }, 600000);
    setMsgTime(time);
    return () => {
      clearInterval(msgTime);
    };
  };

  useEffect(() => {
    getMsgTime();
  }, []);

  useEffect(() => {
    getUnreadCountFun();
  }, [unreas]);
  // 获取 红点数
  const getUnreadCountFun = async () => {
    // const res: any = await getUnreadCount();
    // setMsgCount(res || 0);
  };
  // 测试消息推送
  const pushMessageFun = async () => {
    // const res: any = await pushMessage();
  };

  return (
    <>
      <span className={`${style['msg-box']}`} onClick={opMsgCount}>
        <Badge count={msgCount}>
          <img src={msgIcon} className={`${style['msg-icon']}`} />
        </Badge>
      </span>
      {/* <a href="#" onClick={pushMessageFun}>
        <span>测试消息推送</span>
      </a> */}
    </>
  );
};
export default messagePage;
