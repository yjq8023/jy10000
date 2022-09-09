// @ts-nocheck
import { Engine, createBehavior, createResource } from '@sinohealth/designable-core';
import { Schema } from '@formily/react';
import {
  transformToSchema,
  transformToTreeNode,
} from '@sinohealth/designable-formily-transformer';
import { message, Modal } from '@sinohealth/butterfly-ui-components/lib';
import {
  getAiIoComponents,
  getBeforeInfoSchema,
  getFollowUpFormInfo, saveFollowUpFormInfo,
  saveManagePlanPreInfo,
} from '@/services/planMapAntForm';
import { getSchemaItem } from '@/pages/formily/editor/utils/schema';
import { httpScaleDetail, httpUpdateScale } from '@/services/project';

const mapSchemaProperties = (schema: any, callback) => {
  const { properties } = schema;
  if (properties) {
    Object.keys(properties).forEach((key) => {
      const item = properties[key];
      callback(item);
      if (item.properties) mapSchemaProperties(item, callback);
    });
  }
};
const validNameRequired = (item, errors) => {
  if (item.name === '' || item.name === undefined) {
    errors.push({
      type: 'required',
      filed: item,
      message: `"${item.title}"控件未设置字段标识`,
    });
  }
};
const validSchema = (schema: any, options) => {
  const { isValidResult } = options;
  const errors = [];
  let isHasResult = false;
  mapSchemaProperties(schema, (item) => {
    // 1、校验每个控件name值必须
    if (item.type !== 'void') {
      validNameRequired(item, errors);
    }
    // 2、校验是否设置评测结果
    if (item['x-component'] === 'Result') {
      isHasResult = true;
    }
  });
  if (isValidResult && !isHasResult) {
    errors.push({
      type: 'result',
      message: '量表未设置评测结果',
    });
  }
  return errors;
};
export const saveSchema = (props: { designer: Engine, type: string, id: string }) => {
  const { designer, type, projectId, formId, name } = props;
  const formConfig = transformToSchema(designer.getCurrentTree());
  const errors = validSchema(formConfig.schema, {
    isValidResult: type === 'form', // 量表校验必须设置评测结果
  });
  if (errors.length > 0) {
    errors.forEach((errorItem) => {
      if (errorItem.type === 'required') {
        message.error(errorItem.message);
      }
    });
    // 最后的最后才校验量表是否设置评测结果
    if (errors.length === 1 && errors[0].type === 'result') {
      Modal.confirm({
        title: '未设置评测结果，确认保存？',
        content: '如无需评测结果，可直接保存，系统会自动添加量表提交按钮',
        okText: '保存',
        cancelText: '返回添加评测结果',
        onOk() {
          formConfig.schema.properties.result = {
            type: 'number',
            name: 'result',
            'x-component': 'Result',
          };
          designer.setCurrentTree(
            transformToTreeNode(formConfig),
          );
          saveFormConfigApi({
            type,
            formId,
            projectId,
            name,
            formConfig,
          });
        },
        onCancel() {},
      });
    }
    return;
  }
  saveFormConfigApi({
    type,
    formId,
    projectId,
    name,
    formConfig,
  });
};

const saveFormConfigApi = (props) => {
  const { formConfig, name, projectId, formId, type } = props;
  const formJson = JSON.stringify(formConfig);
  // 前置信息表单
  if (type === 'beforeInfo') {
    saveManagePlanPreInfo({
      projectId,
      formJson,
      category: 'PRE',
    })
      .then((data) => {
        message.success('保存成功');
      });
  }
  // 跟进记录表
  if (type === 'followUp') {
    saveFollowUpFormInfo({
      id: formId,
      projectId,
      formJson,
      name,
      category: 'FOLLOWUP',
    }).then(() => {
      message.success('保存成功');
    });
  }
  // 量表
  if (type === 'form') {
    httpUpdateScale({
      id: formId,
      scaleJson: formJson,
    }).then(() => {
      message.success('保存成功');
    });
  }
};

export const loadInitialSchema = (props: { designer: Engine, type: string, id: string }) => {
  const { designer, type, projectId, formId } = props;
  if (type === 'beforeInfo') {
    getBeforeInfoSchema(projectId)
      .then((data) => {
        if (data.formJson) {
          try {
            designer.setCurrentTree(
              transformToTreeNode(JSON.parse(data.formJson)),
            );
          } catch {
            message.error('加载历史数据失败，你可以重新编辑或刷新页面');
          }
        }
      });
  }
  if (type === 'followUp') {
    getFollowUpFormInfo(formId)
      .then((data) => {
        if (data.formJson) {
          try {
            designer.setCurrentTree(
              transformToTreeNode(JSON.parse(data.formJson)),
            );
          } catch {
            message.error('加载历史数据失败，你可以重新编辑或刷新页面');
          }
        }
      });
  }
  if (type === 'form') {
    httpScaleDetail(formId)
      .then((data) => {
        if (data.scaleJson) {
          try {
            designer.setCurrentTree(
              transformToTreeNode(JSON.parse(data.scaleJson)),
            );
          } catch {
            message.error('加载历史数据失败，你可以重新编辑或刷新页面');
          }
        }
      });
  }
};

const transFormProperties = (properties: any) => {
  const res = {};
  Object.keys(properties).forEach((key, index) => {
    res[key] = {
      ...properties[key],
      'x-index': index,
    };
  });
  return res;
};
export const importSchema = async (designer: Engine, formId: string) => {
  const nowSchema = transformToSchema(designer.getCurrentTree());
  const data = await getFollowUpFormInfo(formId);
  const schema = JSON.parse(data.formJson).schema;
  try {
    const importedData = {
      form: nowSchema.form,
      schema: {
        ...nowSchema.schema,
        properties: transFormProperties({
          ...schema.properties,
          ...nowSchema.schema.properties,
        }),
      },
    };
    designer.setCurrentTree(transformToTreeNode(importedData));
    message.success('导入成功');
  } catch {
    message.error('导入失败');
  }
};

export const fetchAiIoComponents = (projectId) => {
  return getAiIoComponents(projectId)
    .then((data: any) => {
      const components = data.map((item: any) => getSchemaItem(item));
      const ioSelector = components.map((item: any) => {
        return {
          Resource: createResource(
            {
              title: item.title.replace(/\[/g, '【').replace(/\]/g, '】'),
              elements: [
                {
                  componentName: 'Field',
                  props: item,
                },
              ],
            },
          ),
        };
      });
      return ioSelector;
    });
};
