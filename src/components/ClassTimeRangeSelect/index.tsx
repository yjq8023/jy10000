import { Select } from 'antd';

const ClassTimeRangeSelect = (props: any) => {
  const { value, onChange, ...other } = props;
  const handleChange = (v: any) => {
    onChange && onChange(v.join(','));
  };
  return <Select mode="multiple" {...other} onChange={handleChange} value={value && value.split(',')} />;
};
export default ClassTimeRangeSelect;
