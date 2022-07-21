import React, { useState, useEffect } from 'react';
import { TreeSelect } from '@sinohealth/butterfly-ui-components/lib';
import { getMechanismList } from '@/services/weapp';

interface Option {
  value: string;
  label: string;
  children?: Option[];
  isLeaf?: boolean;
  loading?: boolean;
}

const mapChildren = (item: any) => {
  const resItem: any = {
    label: item.value,
    value: item.id,
  };
  if (item.children) {
    console.log(resItem);
    resItem.children = item.children.map(mapChildren);
  }
  return resItem;
};
const MechanismCascader: React.FC<any> = (props) => {
  const { params, disabled, onChange, ...otherProps } = props;
  const [options, setOptions] = useState<any[]>([]);

  const getData = () => {
    return getMechanismList(params).then((res: any) => {
      return res.map(mapChildren);
    });
  };

  useEffect(() => {
    getData().then((data: any) => {
      setOptions(data);
    });
  }, [params]);

  return (
    <TreeSelect
      style={{ width: '100%' }}
      {...otherProps}
      dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
      treeData={options}
      treeDefaultExpandAll
      disabled={disabled}
      onChange={(e) => {
        onChange && onChange(e);
      }}
    />
  );
};

export default MechanismCascader;
