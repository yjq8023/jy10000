import React, { useState, useEffect } from 'react';
import { Select } from '@sinohealth/butterfly-ui-components/lib';
import { httpGetLabelList } from '@/services/project';

const LabelSelect = (props: any) => {
  const [labelList, setLabelList] = useState<any>([]);
  useEffect(() => {
    httpGetLabelList({})
      .then((data) => {
        console.log('data');
        console.log(data);
        setLabelList(data.data);
      });
  }, []);
  return (
    <Select {...props}>
      {labelList.map((group: any) => {
        return (
          <Select.OptGroup label={group.value} key={group.id}>
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
