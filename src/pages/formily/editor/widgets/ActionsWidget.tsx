// @ts-nocheck
import React, { useEffect } from 'react';
import { Button } from '@sinohealth/butterfly-ui-components/lib';
import { useDesigner, TextWidget } from '@sinohealth/designable-react';
import { GlobalRegistry } from '@sinohealth/designable-core';
import { observer } from '@formily/react';
import { loadInitialSchema, saveSchema } from '../service';

export const ActionsWidget = observer(() => {
  const designer = useDesigner();
  useEffect(() => {
    loadInitialSchema(designer);
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
          saveSchema(designer);
        }}
      >
        <TextWidget>Save</TextWidget>
      </Button>
      &nbsp;
      &nbsp;
      <Button
        type="primary"
        onClick={() => {
          saveSchema(designer);
        }}
      >
        <TextWidget>Publish</TextWidget>
      </Button>
    </div>
  );
});
export default ActionsWidget;
