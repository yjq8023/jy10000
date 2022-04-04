import { atom, selector } from 'recoil';

export const demoState = atom({
  key: 'demoState',
  default: 'default data',
});

export const transformDemoState = selector({
  key: 'transformDemoState',
  get({ get }) {
    const demoStateData = get(demoState);
    return `transform ${demoStateData}`;
  },
});

export default {
  demoState,
};
