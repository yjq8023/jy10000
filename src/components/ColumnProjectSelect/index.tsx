import React, { useState, useEffect } from 'react';
import { Select, SelectProps } from '@sinohealth/butterfly-ui-components/lib';
import { getColumnsList } from '@/services/weapp';
import { isNull } from '@/utils/validate';
import { getProjectByUser } from '@/services/patient';

interface Option {
  value: string;
  label: string;
  children?: Option[];
  isLeaf?: boolean;
  loading?: boolean;
}

interface ProjectSelectProps extends SelectProps{
  value?: any,
  onChange?: (value: any) => void,
}
const ColumnProjectSelect: React.FC<ProjectSelectProps> = (props) => {
  const { ...otherProps } = props;
  const [options, setOptions] = useState<any[]>([]);

  const getData = () => {
    return getProjectByUser()
      .then((res: any) => {
        setOptions(res.map((item: any) => ({
          label: item.value,
          value: item.id,
        })));
      });
  };

  useEffect(() => {
    getData();
  }, []);
  return <Select {...otherProps} options={options} />;
};

export default ColumnProjectSelect;
