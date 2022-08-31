import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button, Select } from '@sinohealth/butterfly-ui-components/lib';
import { planItemTypes } from '@/pages/planMapEditor/config';
import style from './index.less';

const FormSetting = (props: any) => {
  const { data } = props;
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const titles: any = {
    [planItemTypes.beforeInfo]: '项目前置信息',
    [planItemTypes.followUp]: '跟进记录表',
    [planItemTypes.form]: '医学量表',
  };
  const handleEdit = () => {
    const { itemCategory } = data;
    const cType = itemCategory === planItemTypes.beforeInfo ? 'beforeInfo' : 'followUp';
    navigate(`/project/formily/editor?type=${cType}&formId=${data.id}&projectId=${params.get('id')}`);
  };
  return (
    <div className={style.formSetting}>
      <div className={style.header}>
        <div className={style.type}>{titles[data.itemCategory]}</div>
        <div className={style.title}>{data.itemName}</div>
        {
          data.itemCategory === planItemTypes.form && (
            <>
              <div className={style.type}>关联IO</div>
              <div>
                <Select style={{ width: '100%' }} />
              </div>
            </>
          )
        }
      </div>
      <div className={style.body} />
      <div className={style.footer}>
        <Button type="primary" onClick={handleEdit}>查看/编辑</Button>
      </div>
    </div>
  );
};

export default FormSetting;
