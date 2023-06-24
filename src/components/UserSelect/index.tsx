import React from 'react';
import { Select } from 'antd';

const UserSelect = (props: any) => {
  const { readOnly, value } = props;
  const options = [
    {
      label: '员工-小华',
      value: 1,
    },
    {
      label: '员工-小鳄',
      value: 2,
    },
  ];
  if (readOnly) {
    let valueLabel = '--';
    options.forEach((item) => {
      if (item.value === value) {
        valueLabel = item.label;
      }
    });
    return <span>{valueLabel}</span>;
  }
  return <Select {...props} options={options} />;
};
UserSelect.defaultProps = {
  selfRenderReadOnly: true,
};
export default UserSelect;
