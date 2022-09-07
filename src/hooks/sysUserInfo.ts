import { useEffect, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { getUserInfo } from '@/services/user';
import { userInfoAtom } from '@/store/atom';

/**
 * 用户信息
 */
export function sysUserInfo(flag: boolean) {
  const [msgCount, setMsgCount] = useState<any>(22);
  const Data = useRecoilValue(userInfoAtom);
  const setUserInfo = useSetRecoilState(userInfoAtom);
  // 初始化菜单数据
  useEffect(() => {
    getUserInfo({}).then((data) => {
      setUserInfo(data);
    });
  }, [flag]);
  return [msgCount];
}

export default { sysUserInfo };
