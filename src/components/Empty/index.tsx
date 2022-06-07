import React from 'react';
import style from './index.less';

function Empty(props: any) {
  const { isSearch } = props;
  const iconClass = [style.emptyIcon];
  if (isSearch) {
    iconClass.push(style.search);
  }
  return (
    <div className={style.empty}>
      <div className={iconClass.join(' ')} />
    </div>
  );
}
Empty.defaultProps = {
  isSearch: false,
};
export default Empty;
