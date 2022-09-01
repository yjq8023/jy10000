import React, { useEffect, useState } from 'react';
import { Tree, TreeProps } from '@sinohealth/butterfly-ui-components/lib';
import { roleResourceTree } from '@/services/customer';

interface TreeFormItemProps {
  value?: string[];
  onChange?: (value: any[]) => void;
  treeData: any[];
  ortherTreeProps?: TreeProps;
}
const TreeFormItem: React.FC<TreeFormItemProps> = ({
  value = [],
  onChange,
  treeData,
  ortherTreeProps,
}) => {
  return (
    <Tree
      checkable
      // defaultExpandAll
      checkedKeys={value}
      style={{ maxHeight: 250, overflow: 'auto' }}
      onCheck={(checkedKeys: any) => {
        onChange && onChange(checkedKeys);
      }}
      treeData={treeData}
      fieldNames={{ key: 'id', title: 'name' }}
      {...ortherTreeProps}
    />
  );
};

export default TreeFormItem;
