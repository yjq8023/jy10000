import React from 'react';
import { createBehavior, createResource } from '@sinohealth/designable-core';

export const Result: any = (props: any) => {
  return (
    <div {...props}>
      <div className="but-title">评测结果</div>
      <div>
        <div>评测结果提示文本1（x分）</div>
        <div>评测结果提示文本2（x分）</div>
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
              rule: {
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
          'x-component-props': {
            placeholder: '123',
          },
        },
      },
    ],
  },
);

export default Result;
