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

  message.success('Save Success');
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
