import React, { useEffect, useState } from 'react';
import { Select } from 'antd';
import { getCityList } from '@/services';

const fieldNames = {
  label: 'name',
  value: 'name',
};
const CitySelect = (props: any) => {
  const [options, setOptions] = useState([]);
  useEffect(() => {
    getCityList()
      .then((res: any) => {
        console.log('res');
        console.log(res);
        setOptions(res);
      });
  }, []);
  const params = {
    ...props,
    options,
    fieldNames,
  };
  return <Select {...params} />;
};

export default CitySelect;
