import React from 'react';
import { createBehavior, createResource } from '@sinohealth/designable-core';

export const Result: any = (props: any) => {
  const { rule } = props;
  return (
    <div {...props} style={{ padding: '10px 20px' }}>
      <div style={{ fontSize: '24px', marginBottom: '26px' }}>评测结果</div>
      <div style={{ border: '1px solid #46A0C0', background: '#EFFAFF', borderRadius: '4px', padding: '10px', minHeight: '70px' }}>
        <div>
          测量得分：-- 分
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
  );
};

Result.Behavior = createBehavior(
  {
    name: '评测结果',
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
    title: '评测结果',
    elements: [
      {
        componentName: 'Field',
        props: {
          type: 'string',
          title: '评测结果',
          'x-component': 'Result',
          'x-component-props': {},
        },
      },
    ],
  },
);

export default Result;
