// @ts-nocheck
import { Engine } from '@sinohealth/designable-core';
import {
  transformToSchema,
  transformToTreeNode,
} from '@sinohealth/designable-formily-transformer';
import { message } from '@sinohealth/butterfly-ui-components/lib';

export const saveSchema = (designer: Engine) => {
  localStorage.setItem(
    'formily-schema',
    JSON.stringify(transformToSchema(designer.getCurrentTree())),
  );

  message.success('保存成功');
};

export const loadInitialSchema = (designer: Engine) => {
  try {
    designer.setCurrentTree(
      transformToTreeNode(JSON.parse(localStorage.getItem('formily-schema'))),
    );
  } catch {
    console.log('loadInitialSchema error');
  }
};

export const importSchema = (designer: Engine, formId: string) => {
  const nowSchema = transformToSchema(designer.getCurrentTree());
  const schema = {
    type: 'object',
    properties: {
      enm91kou8a2: {
        type: 'string',
        title: '被引入的组件',
        'x-decorator': 'FormItem',
        'x-component': 'Input',
        'x-validator': [],
        'x-component-props': {},
        'x-decorator-props': {},
        'x-linkages': {},
        'x-designable-id': 'enm91kou8a2',
        'x-index': 0,
      },
      '4stf7hnxy3y': {
        type: 'string',
        title: '被引入的组件',
        'x-decorator': 'FormItem',
        'x-component': 'Input.TextArea',
        'x-validator': [],
        'x-component-props': {},
        'x-decorator-props': {},
        'x-linkages': {},
        'x-designable-id': '4stf7hnxy3y',
        'x-index': 1,
      },
    },
    'x-designable-id': '9ywsm1aw8jf',
  };
  try {
    const importedData = {
      ...nowSchema,
      schema: {
        ...nowSchema.schema,
        properties: {
          ...nowSchema.properties,
          ...schema.properties,
        },
      },
    };
    designer.setCurrentTree(transformToTreeNode(importedData));
    message.success('导入成功');
  } catch {
    message.error('导入失败');
  }
};
