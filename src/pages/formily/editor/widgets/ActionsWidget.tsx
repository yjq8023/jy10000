// @ts-nocheck
import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Button } from '@sinohealth/butterfly-ui-components/lib';
import { useDesigner, TextWidget } from '@sinohealth/designable-react';
import { GlobalRegistry } from '@sinohealth/designable-core';
import { observer } from '@formily/react';
import { loadInitialSchema, saveSchema } from '../service';

export const ActionsWidget = observer(() => {
  const designer = useDesigner();
  const [params] = useSearchParams();
  useEffect(() => {
    loadInitialSchema({
      designer,
      type: params.get('type'),
      formId: params.get('formId'),
      projectId: params.get('projectId'),
    });
  }, []);
  const supportLocales = ['zh-cn', 'en-us', 'ko-kr'];
  useEffect(() => {
    if (!supportLocales.includes(GlobalRegistry.getDesignerLanguage())) {
      GlobalRegistry.setDesignerLanguage('zh-cn');
    }
  }, []);
  return (
    <div style={{ marginRight: 10 }}>
      <Button
        onClick={() => {
          console.log(1111);
        }}
      >
        查看决策流
      </Button>
      &nbsp;
      &nbsp;
      <Button
        type="primary"
        onClick={() => {
          saveSchema({
            designer,
            type: params.get('type'),
            formId: params.get('formId'),
            projectId: params.get('projectId'),
          });
        }}
      >
        <TextWidget>Save</TextWidget>
      </Button>
    </div>
  );
});
export default ActionsWidget;
