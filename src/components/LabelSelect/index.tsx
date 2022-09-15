import React, { useState, useEffect } from 'react';
import { Select } from '@sinohealth/butterfly-ui-components/lib';
import { httpGetLabelList } from '@/services/project';
import { getUuid } from '@/utils';

const LabelSelect = (props: any) => {
  const [labelList, setLabelList] = useState<any>([]);
  useEffect(() => {
    httpGetLabelList({})
      .then((data) => {
        setLabelList(data.data);
      });
  }, []);
  return (
    <Select
      filterOption={(input: string, option: any) => {
        const text = option.label || option.children;
        if (typeof text !== 'string') return false;
        return text.toLowerCase().includes(input.toLowerCase());
      }}
      showSearch
      {...props}
    >
      {labelList.map((group: any) => {
        return (
          <Select.OptGroup label={group.value} key={getUuid()}>
            {
              group.children.map((item: any) => {
                return (
                  <Select.Option value={item.id} key={item.id}>{item.value}</Select.Option>
                );
              })
            }
          </Select.OptGroup>
        );
      })}
    </Select>
  );
};

export default LabelSelect;
