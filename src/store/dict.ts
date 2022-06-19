import { atom, selector } from 'recoil';

export const dictState = atom({
  key: 'dictState',
  default: null,
});

export default { dictState };
