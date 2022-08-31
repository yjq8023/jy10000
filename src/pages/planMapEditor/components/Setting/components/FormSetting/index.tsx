import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button, Select } from '@sinohealth/butterfly-ui-components/lib';
import { FormRender, registerComponents } from '@sinohealth/butterfly-formily-engine';
import * as components from '@sinohealth/butterfly-formily-components';
import { planItemTypes } from '@/pages/planMapEditor/config';
import { getBeforeInfoSchema } from '@/services/planMapAntForm';
import style from './index.less';

const allComponents = {
  components,
  FormProvider: components.Form,
};
registerComponents(allComponents);

const FormSetting = (props: any) => {
  const { data } = props;
  const [schema, setSchema] = useState<any>({
    form: {},
    schema: {},
  });
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const projectId = params.get('id');
  const isBeforeInfo = data.itemCategory === planItemTypes.beforeInfo;
  const formProps = {
    ...schema.form,
    labelCol: 24,
    wrapperCol: 24,
    layout: 'vertical',
  };
  useEffect(() => {
    if (projectId && isBeforeInfo) {
      getBeforeInfoSchema(projectId)
        .then((res: any) => {
          if (res.formJson) {
            setSchema(JSON.parse(res.formJson));
          }
        });
    }
  }, []);

  const titles: any = {
    [planItemTypes.beforeInfo]: '项目前置信息',
    [planItemTypes.followUp]: '跟进记录表',
    [planItemTypes.form]: '医学量表',
  };
  const handleEdit = () => {
    const cType = isBeforeInfo ? 'beforeInfo' : 'followUp';
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
      <div className={style.body}>
        {
          Object.keys(schema.schema).length === 0 && (
            <div className={style.empty}>暂无内容</div>
          )
        }
        <FormRender schema={schema.schema} formProps={{ componentProps: formProps }} components={components} />
      </div>
      <div className={style.footer}>
        <Button type="primary" onClick={handleEdit}>查看/编辑</Button>
      </div>
    </div>
  );
};

export default FormSetting;
