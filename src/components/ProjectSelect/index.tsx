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

interface ProjectSelectProps extends SelectProps {
  parent?: boolean;
  value?: any;
  onChange?: (value: any) => void;
  parentId: string;
  disable?: boolean;
}
const ProjectSelect: React.FC<ProjectSelectProps> = (props) => {
  const { parentId, disable, ...otherProps } = props;
  const isParent = parentId === '0';
  const [options, setOptions] = useState<any[]>([]);

  const getData = () => {
    return getColumnsList({
      pageNo: 1,
      pageSize: 999,
      parentId,
      type: isParent ? 'PLATFORM_CATEGORY' : 'DISEASE_CATEGORY',
    }).then((res: any) => {
      setOptions(
        res.data.map((item: any) => ({
          label: item.name,
          value: item.id,
        })),
      );
    });
  };

  useEffect(() => {
    if (!isNull(String(parentId))) {
      getData();
    }
  }, [parentId]);
  return <Select {...otherProps} disabled={disable} options={options} />;
};

export default ProjectSelect;
