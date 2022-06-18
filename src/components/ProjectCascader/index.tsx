import React, { useState, useEffect } from 'react';
import { Cascader } from '@sinohealth/butterfly-ui-components/lib';
import { getColumnsList } from '@/services/weapp';

interface Option {
  value: string;
  label: string;
  children?: Option[];
  isLeaf?: boolean;
  loading?: boolean;
}

type ProjectSelectProps = {
  value?: any,
  onChange?: (value: any) => void
}
const ProjectCascader: React.FC<ProjectSelectProps> = (props) => {
  const { value, onChange } = props;
  const [options, setOptions] = useState<any[]>([]);

  const getData = (params: any) => {
    return getColumnsList({
      pageNo: 1,
      pageSize: 999,
      ...params,
    })
      .then((res: any) => {
        return res.data.map((item: any) => ({
          label: item.name,
          value: item.id,
          isLeaf: params.type !== 'PLATFORM_CATEGORY',
        }));
      });
  };

  useEffect(() => {
    getData({
      parentId: 0,
      type: 'PLATFORM_CATEGORY',
    }).then((data: any) => {
      setOptions(data);
    });
  }, []);
  const handleChange = (newValue: any) => {
    onChange && onChange(newValue);
  };

  const loadData = (selectedOptions: any[]) => {
    const targetOption = selectedOptions[selectedOptions.length - 1];
    targetOption.loading = true;
    getData({
      parentId: targetOption.value,
      type: 'DISEASE_CATEGORY',
    }).then((data: any) => {
      targetOption.loading = false;
      targetOption.children = data;
      setOptions([...options]);
    });
  };

  return <Cascader value={value} options={options} loadData={loadData} onChange={handleChange} changeOnSelect />;
};

export default ProjectCascader;
