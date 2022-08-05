import React from 'react';
import { Input, Select } from '@sinohealth/designable-formily-antd';

export const LinkagesSetter = (props: any) => {
  console.log('props');
  console.log(props);
  const { onChange, value = {} } = props;
  const linkagesData = props.value || {};
  const handleChange = (key: string, val: any) => {
    linkagesData[key] = val;
    onChange(linkagesData);
  };
  return (
    <div>
      依赖字段：
      <Select
        mode="multiple"
        allowClear
        style={{ width: '100%' }}
        placeholder="请选择"
        defaultValue={value.dependencies}
        onChange={(v) => handleChange('dependencies', v)}
        options={[
          { label: '1', value: '1' },
          { label: '11', value: '11' },
          { label: '12', value: '12' },
        ]}
      />
    </div>
  );
};

export default LinkagesSetter;
