import React from 'react';
import { Input as FormilyInput } from '@sinohealth/butterfly-formily-components';
import { createBehavior, createResource } from '@sinohealth/designable-core';
import { DnFC } from '@sinohealth/designable-react';

export const IO: any = () => {
  return <div>IO</div>;
};

IO.Behavior = createBehavior(
  {
    name: 'IO',
    selector: (node: any) => {
      console.log('node');
      console.log(node);
      return node.props.key === 'IoRadio';
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
              required: {
                type: 'boolean',
                'x-decorator': 'FormItem',
                'x-component': 'Switch',
              },
              title: {
                type: 'string',
                'x-decorator': 'FormItem',
                'x-component': 'Input',
              },
              description: {
                type: 'string',
                'x-decorator': 'FormItem',
                'x-component': 'Input.TextArea',
              },
              'x-display': {
                type: 'string',
                enum: ['visible', 'hidden', 'none', ''],
                'x-decorator': 'FormItem',
                'x-component': 'Select',
                'x-component-props': {
                  defaultValue: 'visible',
                },
              },
              'x-pattern': {
                type: 'string',
                enum: ['editable', 'disabled', 'readOnly', 'readPretty', ''],
                'x-decorator': 'FormItem',
                'x-component': 'Select',
                'x-component-props': {
                  defaultValue: 'editable',
                },
              },
              default: {
                'x-decorator': 'FormItem',
                'x-component': 'ValueInput',
              },
            },
          },
        },
      },
    },
  },
);

IO.Resource = createResource(
  {
    icon: 'InputSource',
    title: 'IO组件',
    elements: [
      {
        componentName: 'Field',
        props: {
          type: 'string',
          title: 'IO组件',
          key: 'IoRadio',
          'x-decorator': 'FormItem',
          'x-component': 'Radio.Group',
          'x-component-props': {
            placeholder: '123',
          },
        },
      },
    ],
  },
);

export default IO;
