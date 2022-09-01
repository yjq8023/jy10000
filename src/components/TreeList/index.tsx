import { Input, Tree } from '@sinohealth/butterfly-ui-components/lib';
import React from 'react';
import styles from './index.less';

const { Search } = Input;
const TreeList: React.FC<{
  dataSource: any[];
  fieldNames?: { title: string; key: string; children?: string };
  autoExpandParent?: boolean;
  defaultExpandedKeys?: any[];
  defaultExpandAll?: boolean;
  onSelect?: (
    selectedKeys: any,
    e: { selected: boolean; selectedNodes: any; node: any; event: any },
  ) => void;
  onSearch?: (value: string) => void;
}> = (props) => {
  const {
    dataSource,
    fieldNames,
    autoExpandParent,
    defaultExpandedKeys,
    defaultExpandAll,
    onSelect,
  } = props;
  const onSearch = (value: string) => {
    props.onSearch && props.onSearch(value);
  };

  return (
    <div className={styles['tree-list']}>
      <div className={styles['tree-list-header']}>
        <Search placeholder="搜索文字" allowClear onSearch={onSearch} />
      </div>
      <div className={styles['tree-list-content']}>
        {dataSource && (
          <Tree
            showLine
            treeData={dataSource}
            fieldNames={fieldNames || {}}
            autoExpandParent={autoExpandParent}
            blockNode={true}
            defaultExpandedKeys={defaultExpandedKeys || []}
            defaultExpandAll={defaultExpandAll || false}
            onSelect={onSelect}
          />
        )}
      </div>
    </div>
  );
};

export default TreeList;
