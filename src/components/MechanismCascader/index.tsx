import React, { useState, useEffect } from 'react';
import { Cascader } from '@sinohealth/butterfly-ui-components/lib';
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
    label: item.name,
    value: item.id,
  };
  if (item.children) {
    resItem.children = resItem.children.map(mapChildren);
  }
  return resItem;
};
const MechanismCascader: React.FC<any> = (props) => {
  const { params, ...otherProps } = props;
  const [options, setOptions] = useState<any[]>([]);

  const getData = () => {
    return getMechanismList(params)
      .then((res: any) => {
        console.log(1231231231);
        console.log(res);
        return res.map(mapChildren);
      });
  };

  useEffect(() => {
    getData().then((data: any) => {
      setOptions(data);
    });
  }, [params]);

  return <Cascader {...otherProps} options={options} changeOnSelect />;
};

export default MechanismCascader;
