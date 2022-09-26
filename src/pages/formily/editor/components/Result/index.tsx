import React from 'react';
import { Button } from '@sinohealth/butterfly-ui-components/lib';
import { createBehavior, createResource } from '@sinohealth/designable-core';

export const Result: any = (props: any) => {
  const { rule } = props;
  return (
    <div {...props} style={{ padding: '10px 20px' }}>
      { rule?.scoreKey && (
        <div style={{ padding: '0px 0px 20px' }}>
          <div style={{ fontSize: '24px', marginBottom: '26px' }}>评估结果</div>
          <div style={{ border: '1px solid #46A0C0', background: '#EFFAFF', borderRadius: '4px', padding: '10px', minHeight: '70px' }}>
            <div>
              测量得分：-- 分
            </div>
            <div>
              <div style={{ float: 'left' }}>
                评估结果：
              </div>
              <div style={{ paddingLeft: '70px' }}>
                { (!rule?.results || rule?.results?.length === 0) && '无'}
                {rule?.results?.map((item: any, index: number) => {
                  return <div key={item.code}>{index + 1}、{item.code}</div>;
                })}
              </div>
            </div>
            <div>
              <div style={{ float: 'left' }}>
                评估建议：
              </div>
              <div style={{ paddingLeft: '70px' }}>
                { (!rule?.results || rule?.results?.length === 0) && '无'}
                {rule?.results?.map((item: any, index: number) => {
                  return <div key={item.desc}>{index + 1}、{item.desc}</div>;
                })}
              </div>
            </div>
          </div>
        </div>
      )}
      <Button type="primary">提交</Button>
      { !rule?.scoreKey && (
        <div style={{ color: '#cfcfcf' }}>没有添加评估结果配置的情况下，评估结果仅显示提交按钮</div>
      )}
    </div>
  );
};

Result.Behavior = createBehavior(
  {
    name: '评估结果',
    selector: (node: any) => {
      return node.props['x-component'] === 'Result';
    },
    designerProps: {
      propsSchema: {
        type: 'object',
        properties: {
          'field-group': {
            type: 'void',
            'x-component': 'CollapseItem',
            properties: {
              name: {
                type: 'string',
                'x-decorator': 'FormItem',
                'x-component': 'Input',
              },
              'x-component-props.rule': {
                type: 'object',
                'x-component': 'ResultSetter',
              },
            },
          },
        },
      },
    },
  },
);

Result.Resource = createResource(
  {
    icon: 'CardSource',
    title: '评估结果',
    elements: [
      {
        componentName: 'Field',
        props: {
          type: 'number',
          title: '评估结果',
          name: 'result',
          'x-component': 'Result',
          'x-component-props': {
            rule: {
              scope: {},
              scoreKey: '',
              results: [],
            },
          },
        },
      },
    ],
  },
);

export default Result;
