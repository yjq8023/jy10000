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
  const type = params.get('type');
  const formId = params.get('formId');
  const projectId = params.get('projectId');
  useEffect(() => {
    loadInitialSchema({
      designer,
      type,
      formId,
      projectId,
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
      {
        (type === 'beforeInfo' || type === 'followUp') && (
          <Button
            onClick={() => {
              console.log(1111);
            }}
          >
            查看决策流
          </Button>
        )
      }
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
            name: params.get('name'),
          });
        }}
      >
        <TextWidget>Save</TextWidget>
      </Button>
    </div>
  );
});
export default ActionsWidget;
