// @ts-nocheck
import React, { useRef, useEffect, useState } from 'react';
import { FormRender, registerComponents } from '@sinohealth/butterfly-formily-engine';
import { TreeNode } from '@sinohealth/designable-core';
import { transformToSchema } from '@sinohealth/designable-formily-transformer';
import * as components from '@sinohealth/butterfly-formily-components';
import { Radio } from '@sinohealth/designable-formily-antd';
import Result from '@/pages/formily/editor/components/Result';

const allComponents = {
  components,
  FormProvider: components.Form,
};
registerComponents(allComponents);
export interface IPreviewWidgetProps {
  tree: TreeNode
}

export const PreviewWidget: React.FC<IPreviewWidgetProps> = (props) => {
  const { form: formProps, schema } = transformToSchema(props.tree);
  const [isPc, setIsPC] = useState(true);
  const dom = useRef();
  const iframe = useRef();
  const mobileSiteUrl = 'http://localhost:10086/#/pages/formily/index';
  useEffect(() => {
    if (dom.current) {
      setIsPC(dom.current.offsetWidth > 420);
    }
  }, []);
  useEffect(() => {
    if (!isPc && iframe.current) {
      const win = iframe.current.contentWindow;
      iframe.current.onload = () => {
        win.postMessage(JSON.stringify({ formProps, schema }), '*');
      };
    }
  }, [isPc, iframe]);
  return (
    <div style={{ width: '100%', height: '100%' }} ref={dom}>
      { isPc && (
        <FormRender schema={schema} formProps={{ componentProps: formProps }} components={components} />
      )}
      { !isPc && (
        // eslint-disable-next-line jsx-a11y/iframe-has-title
        <iframe ref={iframe} src={mobileSiteUrl} frameBorder="0" style={{ width: '100%', height: '100%' }} />
      )}
    </div>
  );
};
