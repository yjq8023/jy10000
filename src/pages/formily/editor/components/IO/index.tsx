import React from 'react';
import { Input as FormilyInput } from '@sinohealth/butterfly-formily-components';
import { createBehavior, createResource } from '@sinohealth/designable-core';
import { DnFC } from '@sinohealth/designable-react';

export const IO: DnFC<React.ComponentProps<typeof FormilyInput>> =
  FormilyInput;

IO.Behavior = createBehavior(
  {
    name: 'IO',
    extends: ['Field'],
    // @ts-ignore
    selector: (node) => node.props['x-component'] === 'Input',
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
              required: {
                type: 'boolean',
                'x-decorator': 'FormItem',
                'x-component': 'Switch',
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
    elements: [
      {
        componentName: 'Field',
        props: {
          type: 'string',
          title: 'Input',
          'x-decorator': 'FormItem',
          'x-component': 'Input',
        },
      },
    ],
  },
);

export default IO;
