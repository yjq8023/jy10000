import React from 'react';
import { Input, Select } from '@sinohealth/butterfly-ui-components/lib';
import style from './index.less';

const DiagnosisSetting = (props: any) => {
  const { data } = props;
  return (
    <div className={style.diagnosisSetting}>
      <div className={style.label}>
        复诊复查项目
      </div>
      <div>
        <Input value={data.itemName} />
      </div>
      <div className={style.label}>
        提示说明
      </div>
      <div>
        <Input.TextArea value={data.remark} />
      </div>
    </div>
  );
};

export default DiagnosisSetting;
