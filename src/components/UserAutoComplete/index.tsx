import { AutoComplete, Tag } from '@sinohealth/butterfly-ui-components/lib';
import React, { useState, useCallback, useEffect } from 'react';
import _ from 'lodash';
import style from './index.less';
import { searchPatient } from '@/services/patient';

const renderItem = (data: any, onSelect: (c: any, isMyPatient: boolean) => void) => {
  const isMyPatient = Number(data.type) === 1;
  return {
    value: data.value,
    disabled: isMyPatient,
    label: (
      <div>
        <Tag className={style.radiusTag} color={isMyPatient ? 'warning' : 'processing'}>{isMyPatient ? '我的患者' : '本机构患者'}</Tag>
        {data.text}
        <span
          style={{ float: 'right' }}
        >
          <a onClick={() => onSelect(data, isMyPatient)}>
            {isMyPatient ? '进入档案' : '引用档案'}
          </a>
        </span>
      </div>
    ),
  };
};

interface UserNameInputProps {
  onImportUser: (data: any) => void,
  onChange?: (val: any) => void
  id?: string
  value?: any
}
const UserAutoComplete: React.FC<UserNameInputProps> = (props) => {
  const { id = '', onChange, onImportUser, children, ...otherProps } = props;
  const [data, setData] = useState<any[]>([]);
  const fetchUserListData = useCallback(_.debounce((params: any) => {
    searchPatient(params)
      .then((res: any) => {
        setData(res);
      });
  }, 500), []);
  useEffect(() => {
    if (props.value) {
      fetchUserListData({
        [id]: props.value,
      });
    }
  }, [props.value]);
  const onInput = (val: any) => {
    onChange && onChange(val);
  };
  const handleImport = (item: any) => {
    const index = data.map((c) => c.id).indexOf(item.value);
    const itemData = data[index];
    onChange && onChange(itemData[id]);
    onImportUser(itemData);
  };
  const options = data.map((item: any) => renderItem({
    value: item.id,
    type: item.type,
    text: [item.name, item.phone, item.idCard].join(', '),
  }, handleImport));
  const childrenDom = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, {
        ...otherProps,
        ...child.props,
      });
    } return null;
  });
  const onSelect = (value: any) => {
    handleImport({ value });
  };
  return (
    <AutoComplete
      dropdownClassName="certain-category-search-dropdown"
      dropdownMatchSelectWidth={550}
      style={{ width: '100%' }}
      options={options}
      onChange={onInput}
      onSelect={onSelect}
    >
      <div>
        { childrenDom }
      </div>
    </AutoComplete>
  );
};

export default UserAutoComplete;
