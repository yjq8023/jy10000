import React from 'react';
import { Button } from '@sinohealth/butterfly-ui-components/lib';
import { planItemTypes } from '@/pages/planMapEditor/config';
import style from './index.less';

const FormSetting = (props: any) => {
  const { data } = props;
  const titles: any = {
    [planItemTypes.beforeInfo]: '项目前置信息',
    [planItemTypes.followUp]: '跟进记录表',
  };
  return (
    <div className={style.formSetting}>
      <div className={style.header}>
        <div className={style.type}>{titles[data.type]}</div>
        <div className={style.title}>{data.name}</div>
      </div>
      <div className={style.body} />
      <div className={style.footer}>
        <Button type="primary">查看/编辑</Button>
      </div>
    </div>
  );
};

export default FormSetting;
