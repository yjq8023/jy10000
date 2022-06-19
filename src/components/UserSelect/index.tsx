import React, { useState, useEffect } from 'react';
import { Select, SelectProps } from '@sinohealth/butterfly-ui-components/lib';
import { isNull } from '@/utils/validate';
import { getUserList } from '@/services/weapp';

interface Option {
  value: string;
  label: string;
  children?: Option[];
  isLeaf?: boolean;
  loading?: boolean;
}

interface UserSelectProps extends SelectProps{
  params: any;
}
const UserSelect: React.FC<UserSelectProps> = (props) => {
  const { params = {}, ...otherProps } = props;
  const [options, setOptions] = useState<any[]>([]);

  const getData = () => {
    return getUserList(params)
      .then((res: any) => {
        setOptions(res.map((item: any) => ({
          label: item.value,
          value: item.id,
        })));
      });
  };

  useEffect(() => {
    getData();
  }, [params]);
  return <Select {...otherProps} options={options} />;
};

export default UserSelect;
