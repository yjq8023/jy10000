import { AutoComplete, Input, InputProps, Tag } from '@sinohealth/butterfly-ui-components/lib';
import React from 'react';
import style from './index.less';

const renderItem = (data: any) => {
  const isMyPatient = data.type === 1;
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
          <a>
            {isMyPatient ? '进入档案' : '引用档案'}
          </a>
        </span>
      </div>
    ),
  };
};

const options = [
  renderItem({
    value: '梁梅梅',
    type: 1,
    text: '梁梅梅，18046855766，441225197901020028',
  }),
  renderItem({
    value: '范冰冰',
    type: 2,
    text: '范冰冰，18046855766，441225197901020028',
  }),
  renderItem({
    value: '杨幂',
    type: 2,
    text: '杨幂，18046855766，441225197901020028',
  }),
];

const UserNameInput: React.FC<InputProps> = (props) => {
  const { onChange, ...otherProps } = props;
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
