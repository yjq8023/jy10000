import { useEffect, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { httpGetSystemDict } from '@/services/system';
import { dictState } from '@/store/dict';
import { getSystemDict } from '@/services/common';
import { handleDicToObj } from '@/utils';

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
      setDictStateList(res.data);
      setDictObj(res.data);
    }
  }
  useEffect(() => {
    httpGetSystemDictReq();
  }, []);

  return dictObj;
};

export const useDictKeyValue = () => {
  const setDictStateList = useSetRecoilState(dictState);
  const dictStateList = useRecoilValue(dictState);
  const [dictObj, setDictObj] = useState<any>(null);
  async function httpGetSystemDictReq() {
    if (dictStateList) {
      setDictObj(handleDicToObj(dictStateList));
    } else {
      const res: any = await getSystemDict();
      // console.log(res.data);
      if (res) {
        setDictStateList(res.data);
        const newDictObj: any = handleDicToObj(res.data);
        setDictObj(newDictObj);
      }
    }
  }
  useEffect(() => {
    httpGetSystemDictReq();
  }, []);

  return dictObj;
};

export default {};
