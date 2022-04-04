import React from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { demoState, transformDemoState } from '@/store/atom';

export default function Page1() {
  const [text, setText] = useRecoilState(demoState);
  const text2 = useRecoilValue(transformDemoState);
  return (
    <div>
      <h3>page1</h3>
      <div>{text}</div>
      <div>{text2}</div>
      <input type="text" onChange={(e) => setText(e.target.value)} />
    </div>
  );
}
