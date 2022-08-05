// @ts-nocheck
import React, { useMemo } from 'react';
import { FormRender, registerComponents } from '@sinohealth/butterfly-formily-engine';
import { TreeNode } from '@sinohealth/designable-core';
import { transformToSchema } from '@sinohealth/designable-formily-transformer';
import * as components from '@sinohealth/butterfly-formily-components';
import { Radio } from '@sinohealth/designable-formily-antd';

registerComponents({
  components,
  FormProvider: components.Form,
});
export interface IPreviewWidgetProps {
  tree: TreeNode
}

export const PreviewWidget: React.FC<IPreviewWidgetProps> = (props) => {
  const { form: formProps, schema } = transformToSchema(props.tree);
  console.log('formProps');
  console.log(formProps);
  return (
    <div style={{ padding: '8px' }}>
      <div>
        <Radio.Group defaultValue="a">
          <Radio.Button value="a">PC</Radio.Button>
          <Radio.Button value="b">移动</Radio.Button>
        </Radio.Group>
      </div>
      <FormRender schema={schema} formProps={{ componentProps: formProps }} components={components} />
    </div>
  );
};
