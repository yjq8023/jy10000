import React, { useEffect } from 'react';
import { Cascader, Input, Form } from '@sinohealth/butterfly-ui-components/lib';
import regionData from '@/assets/json/region.json';
import { getRegionList } from '@/services/common';

type AddressSelectProps = {
  names: string[]
}
function AddressSelect(props: AddressSelectProps) {
  const { names } = props;
  const fieldNames = { label: 'name', value: 'id', children: 'children' };
  useEffect(() => {
    getRegionList()
      .then((res) => {
        // todo: 引用字典
        // console.log('res111');
        // console.log(res);
      });
  }, []);
  return (
    <div>
      <Form.Item name={names[0]} label="现住址">
        <Cascader fieldNames={fieldNames} options={regionData} placeholder="请选择省市区" />
      </Form.Item>
      <div style={{ marginTop: '24px', paddingLeft: '100px' }}>
        <Form.Item name={names[1]} noStyle>
          <Input placeholder="请输入详细地址" />
        </Form.Item>
      </div>
    </div>
  );
}

export default AddressSelect;
