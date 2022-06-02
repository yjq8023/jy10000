import React, { useState } from 'react';
import { Input, InputProps } from '@sinohealth/butterfly-ui-components/lib';
import { SearchOutlined } from '@ant-design/icons';
import style from './index.less';

interface SearchInputProps extends InputProps {
  // eslint-disable-next-line no-unused-vars
  onSearch?: (value: string) => void;
  placeholder?: string;
  value?: string;
}

const SearchInput = React.forwardRef((props: SearchInputProps, ref) => {
  const { value = '', onSearch, onChange, placeholder = '', ...other } = props;
  const [inputVal, setInputVal] = useState<string>(value);
  React.useImperativeHandle(ref, () => {
    return {
      inputVal,
    };
  });
  const search = () => {
    onSearch && onSearch(inputVal);
  };
  const onEnter = (e: any) => {
    if (e.keyCode === 13) {
      search();
    }
  };
  const onInputChange = (e: any) => {
    if (onChange) {
      onChange(e);
    } else {
      setInputVal(e.target.value);
    }
  };
  const suffix = <SearchOutlined className={style.icon} onClick={search} />;
  return (
    <Input
      {...other}
      value={onChange ? value : inputVal}
      placeholder={placeholder}
      suffix={suffix}
      onChange={onInputChange}
      onKeyDown={onEnter}
    />
  );
});

SearchInput.defaultProps = {
  value: '',
  placeholder: '请输入',
  onSearch() {},
};
export default SearchInput;
