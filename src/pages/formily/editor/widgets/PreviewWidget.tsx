// @ts-nocheck
import React, { useRef, useEffect, useState } from 'react';
import { FormRender, registerComponents, useFormilyForm } from '@sinohealth/butterfly-formily-engine';
import { Button, message } from '@sinohealth/butterfly-ui-components';
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
  const form = useFormilyForm();
  const [isPc, setIsPC] = useState(true);
  const dom = useRef();
  const iframe = useRef();
  const mobileSiteUrl = `${window.location.origin}/h5/`; // 移动端通过iframe预览，站点取自/public/h5下的文件，该文件是formily-mobile-lerna下的调试站点目录打包出来的
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
        win.document.body.style = 'zoom: 0.99;'; // 未知原因会导致渲染出来的表单按钮布局定位不准确，改变一下size触发回流
      };
    }
  }, [isPc, iframe]);
  const handleSubmit = () => {
    form.current?.submit((formValues) => {
      message.success('表单已提交，请在控制台查看提交的数据');
      console.log('表单测试提交数据');
      console.log(formValues);
    });
  };
  const handleReset = () => {
    form.current?.reset();
  };
  return (
    <div style={{ width: '100%', height: '100%' }} ref={dom}>
      { isPc && (
        <>
          <FormRender form={form} schema={schema} formProps={{ componentProps: formProps }} components={components} />
          <div style={{ textAlign: 'center', padding: '10px' }}>
            <Button type="primary" onClick={handleSubmit}>测试提交</Button>
            &nbsp;
            &nbsp;
            <Button onClick={handleReset}>测试重置</Button>
          </div>
        </>
      )}
      { !isPc && (
        // eslint-disable-next-line jsx-a11y/iframe-has-title
        <iframe ref={iframe} src={mobileSiteUrl} frameBorder="0" style={{ width: '100%', height: '100%' }} />
      )}
    </div>
  );
};
