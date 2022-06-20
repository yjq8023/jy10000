import { useEffect, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { httpGetSystemDict } from '@/services/system';
import { dictState } from '@/store/dict';
import { getSystemDict } from '@/services/common';

/**
 * 字典数据
 */

export const useDict = () => {
  const setDictStateList = useSetRecoilState(dictState);
  const dictStateList = useRecoilValue(dictState);
  const [dictObj, setDictObj] = useState<any>(null);
  async function httpGetSystemDictReq() {
    if (dictStateList) {
      setDictObj(dictStateList);
    } else {
      const res: any = await getSystemDict();
      console.log(res);
      setDictStateList(res.data.data);
      setDictObj(res.data.data);
    }
  }
  useEffect(() => {
    httpGetSystemDictReq();
  }, []);

  return dictObj;
};

export default {};
