// @ts-nocheck
import { Engine, createBehavior, createResource } from '@sinohealth/designable-core';
import {
  transformToSchema,
  transformToTreeNode,
} from '@sinohealth/designable-formily-transformer';
import { message } from '@sinohealth/butterfly-ui-components/lib';
import {
  getAiIoComponents,
  getBeforeInfoSchema,
  getFollowUpFormInfo, saveFollowUpFormInfo,
  saveManagePlanPreInfo,
} from '@/services/planMapAntForm';
import { getSchemaItem } from '@/pages/formily/editor/utils/schema';
import { httpScaleDetail, httpUpdateScale } from '@/services/project';

export const saveSchema = (props: { designer: Engine, type: string, id: string }) => {
  const { designer, type, projectId, formId, name } = props;

  const schema = JSON.stringify(transformToSchema(designer.getCurrentTree()));
  // 前置信息表单
  if (type === 'beforeInfo') {
    saveManagePlanPreInfo({
      projectId,
      formJson: schema,
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
      formJson: schema,
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
      scaleJson: schema,
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
