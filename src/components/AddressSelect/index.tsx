import React from 'react';
import { Cascader, Input } from '@sinohealth/butterfly-ui-components/lib';

interface Option {
  value: string | number;
  label: string;
  children?: Option[];
}

const options: Option[] = [
  {
    value: 'zhejiang',
    label: '广东',
    children: [
      {
        value: 'hangzhou',
        label: '广州',
        children: [
          {
            value: 'xihu',
            label: '天河',
          },
        ],
      },
    ],
  },
  {
    value: 'jiangsu',
    label: '广西',
    children: [
      {
        value: 'nanjing',
        label: '福田',
        children: [
          {
            value: 'zhonghuamen',
            label: 'Zhong Hua Men',
          },
        ],
      },
    ],
  },
];

function AddressSelect() {
  const onChange: any = (value: string[]) => {
    console.log(value);
  };
  return (
    <div>
      <Cascader options={options} onChange={onChange} placeholder="请选择省市区" />
      <div style={{ marginTop: '24px' }}>
        <Input placeholder="请输入详细地址" />
      </div>
    </div>
  );
}

export default AddressSelect;
