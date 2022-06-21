import React, { useState, useEffect } from 'react';
import { Select, SelectProps } from '@sinohealth/butterfly-ui-components/lib';
import { getUserList } from '@/services/weapp';
import { getUserListByUser } from '@/services/patient';

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
  const [isInit, setIsInit] = useState<boolean>(true);

  const getData = () => {
    const api = params.byUser ? getUserListByUser : getUserList;
    return api(params)
      .then((res: any) => {
        setIsInit(false);
        setOptions(res.map((item: any) => ({
          label: item.value,
          value: item.id,
        })));
      });
  };

  useEffect(() => {
    if (!isInit) {
      props.onChange && props.onChange('', {} as any);
    }
    getData();
  }, [params]);
  return <Select {...otherProps} options={options} />;
};

export default UserSelect;
