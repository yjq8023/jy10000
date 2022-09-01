import React, { useEffect, useState } from 'react';
import { Tree } from '@sinohealth/butterfly-ui-components/lib';
import { roleResourceTree } from '@/services/customer';

interface TreeFormItemProps {
  value?: string[];
  onChange?: (value: any[]) => void;
  oid: any;
}
const TreeFormItem: React.FC<TreeFormItemProps> = ({ value = [], onChange, oid }) => {
  const [roleResourceTrees, setRoleResourceTrees] = useState<any>([]);
  useEffect(() => {
    roleResourceTree(oid).then((res) => {
      setRoleResourceTrees(res);
    });
  }, []);
  return (
    <Tree
      checkable
      defaultExpandAll
      checkedKeys={value}
      onCheck={(checkedKeys: any) => {
        onChange && onChange(checkedKeys);
      }}
      treeData={roleResourceTrees}
      fieldNames={{ key: 'id', title: 'name' }}
    />
  );
};

export default TreeFormItem;
