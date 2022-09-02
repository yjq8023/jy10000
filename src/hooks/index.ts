import { useState } from 'react';
import { getNodeShow } from '@/utils';

export * from './menu';
export const useExpandRowKeys = (treeData: any[]) => {
  const [expandIds, setExpandIds] = useState<any>([]);

  //   useEffect(() => {
  //     if (treeData) {
  //       setExpandIds(getNodeShow(treeData));
  //     }
  //   }, [treeData]);

  const triggerExpandRows = () => {
    if (expandIds && expandIds.length > 0) {
      setExpandIds([]);
      return;
    }

    if (treeData && treeData.length > 0) {
      setExpandIds(getNodeShow(treeData));
    }
  };

  const expandRows = () => {
    if (treeData && treeData.length > 0) {
      setExpandIds(getNodeShow(treeData));
    }
  };

  const closeRows = (params: any = null) => {
    setExpandIds(params);
  };

  return { expandIds, expandRows, closeRows, triggerExpandRows };
};
