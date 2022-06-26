import { atom, selector } from 'recoil';
import { UCenter } from '@/services/user/data';

export const userInfoAtom = atom<UCenter.UserInfo>({
  key: 'userInfo',
  default: {
    name: '',
  } as any,
});

export default {};
