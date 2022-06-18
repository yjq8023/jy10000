import React, { useState, useEffect } from 'react';
import { Select, SelectProps } from '@sinohealth/butterfly-ui-components/lib';
import { getColumnsList } from '@/services/weapp';
import { isNull } from '@/utils/validate';

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
  parentId: string
}
const ProjectSelect: React.FC<ProjectSelectProps> = (props) => {
  const { parentId, ...otherProps } = props;
  const [options, setOptions] = useState<any[]>([]);

  const getData = () => {
    return getColumnsList({
      pageNo: 1,
      pageSize: 999,
      parentId,
      type: 'DISEASE_CATEGORY',
    })
      .then((res: any) => {
        console.log(23);
        console.log(res.data);
        setOptions(res.data.map((item: any) => ({
          label: item.name,
          value: item.id,
        })));
      });
  };

  useEffect(() => {
    if (!isNull(String(parentId))) {
      getData();
    }
  }, [parentId]);
  return <Select {...otherProps} options={options} />;
};

export default ProjectSelect;
