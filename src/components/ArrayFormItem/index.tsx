import React from 'react';
import { Button, Form } from '@sinohealth/butterfly-ui-components/lib';
import style from './index.less';

function ArrayFormItem(props: any) {
  const { children, name } = props;
  const renderChildren = (item: any, options: any) => {
    return (
      <div className={style.formItem} key={item.fieldKey}>{children(item, options)}</div>
    );
  };
  const renderList = (fields: any, options: any) => {
    const { add } = options;
    return (
      <div className={style.arrayFormItem}>
        <div>
          {fields.map((field: any) => renderChildren(field, options))}
        </div>
        <div>
          <Button ghost type="dashed" block onClick={() => add()}>新增</Button>
        </div>
      </div>
    );
  };
  return (
    <Form.List name={name}>
      {renderList}
    </Form.List>
  );
}

export default ArrayFormItem;
