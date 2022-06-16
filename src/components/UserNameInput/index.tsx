import { AutoComplete, Input, InputProps, Tag } from '@sinohealth/butterfly-ui-components/lib';
import React from 'react';
import style from './index.less';

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

interface UserNameInputProps extends InputProps {
  onImportUser: (data: any, isMyPatient: boolean) => void
}
const UserNameInput: React.FC<UserNameInputProps> = (props) => {
  const { onChange, onImportUser, ...otherProps } = props;
  const data = [
    {
      id: 1,
      type: '1',
      name: '梁梅梅1',
      phone: '15521371244',
      idCard: '440921231271615267',
    },
    {
      id: 2,
      type: '2',
      name: '梁梅梅2',
      phone: '15521371244',
      idCard: '440921231271615267',
    },
    {
      id: 3,
      type: '2',
      name: '梁梅梅3',
      phone: '15521371244',
      idCard: '440921231271615267',
    },
  ];
  const handleImport = (item: any, isMyPatient: boolean) => {
    const index = data.map((c) => c.id).indexOf(item.value);
    const itemData = data[index];
    onImportUser(itemData, isMyPatient);
  };
  const options = data.map((item) => renderItem({
    value: item.id,
    type: item.type,
    text: [item.name, item.phone, item.idCard].join(', '),
  }, handleImport));
  return (
    <AutoComplete
      dropdownClassName="certain-category-search-dropdown"
      dropdownMatchSelectWidth={550}
      style={{ width: '100%' }}
      options={options}
      onChange={onChange}
    >
      <Input {...otherProps} />
    </AutoComplete>
  );
};

export default UserNameInput;
