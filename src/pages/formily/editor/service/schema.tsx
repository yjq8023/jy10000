// @ts-nocheck
import { Engine, createBehavior, createResource } from '@sinohealth/designable-core';
import { CloseCircleOutlined } from '@ant-design/icons';
import {
  transformToSchema,
  transformToTreeNode,
} from '@sinohealth/designable-formily-transformer';
import { message, Modal, Button } from '@sinohealth/butterfly-ui-components/lib';
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
    // 2、校验是否设置评估结果
    if (item['x-component'] === 'Result') {
      isHasResult = true;
    }
  });
  if (isValidResult && !isHasResult) {
    errors.push({
      type: 'result',
      message: '量表未设置评估结果',
    });
  }
  return errors;
};

const mapTreeNode = (node, callback) => {
  callback(node.props);
  if (Array.isArray(node.children) && node.children.length > 0) {
    node.children.forEach((item: any) => mapTreeNode(item, callback));
  }
};
const validTreeNodeOnly = (treeNode) => {
  const names = [];
  const fields = {};
  const repeatingFields = {};
  mapTreeNode(treeNode, (nodeItem) => {
    if (nodeItem.name === undefined) {
      return;
    }
    // 重复字段归类记录
    if (names.indexOf(nodeItem.name) > -1) {
      if (Array.isArray(repeatingFields[nodeItem.name])) {
        repeatingFields[nodeItem.name].push(nodeItem);
      } else {
        repeatingFields[nodeItem.name] = [fields[nodeItem.name], nodeItem];
      }
    } else {
      fields[nodeItem.name] = nodeItem;
      names.push(nodeItem.name);
    }
  });
  const repeatingFieldKeys = Object.keys(repeatingFields);
  if (repeatingFieldKeys.length > 0) {
    repeatingFieldKeys.forEach((key: string) => {
      message.open({
        content: (
          <div style={{ textAlign: 'left', padding: '0px 0px 0px 40px', position: 'relative' }}>
            <div><CloseCircleOutlined style={{ fontSize: '26px', color: 'red', position: 'absolute', left: '0px', top: '5px' }} /> </div>
            表单有重复项，请保留一项：
            <ul>
              { repeatingFields[key].map((filed, index) => (
                <li>{index + 1}、{filed.title}</li>
              ))}
            </ul>
          </div>
        ),
      });
    });
    return false;
  }
  return true;
};
export const saveSchema = (props: { designer: Engine, type: string, id: string }) => {
  const { designer, type, projectId, formId, name } = props;
  const treeNode = designer.getCurrentTree();
  // 校验控件字段唯一，避免重复ID
  const validTree = validTreeNodeOnly(treeNode);
  if (!validTree) {
    return Promise.reject();
  }
  // 组件树转换成schema数据
  const formConfig = transformToSchema(designer.getCurrentTree());
  const errors = validSchema(formConfig.schema, {
    isValidResult: type === 'form', // 量表校验必须设置评估结果
  });
  if (errors.length > 0) {
    errors.forEach((errorItem) => {
      if (errorItem.type === 'required') {
        message.error(errorItem.message);
      }
    });
    // 最后的最后才校验量表是否设置评估结果
    if (errors.length === 1 && errors[0].type === 'result') {
      Modal.confirm({
        title: '未设置评估结果，确认保存？',
        content: '如无需评估结果，可直接保存，系统会自动添加量表提交按钮',
        okText: '保存',
        cancelText: '返回添加评估结果',
        onOk() {
          formConfig.schema.properties.result = {
            type: 'number',
            name: 'result',
            'x-component': 'Result',
            'x-component-props': {
              rule: {
                scope: {},
                scoreKey: '',
                results: [],
              },
            },
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
    return Promise.reject();
  }
  return saveFormConfigApi({
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
    return saveManagePlanPreInfo({
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
    return saveFollowUpFormInfo({
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
    return httpUpdateScale({
      id: formId,
      scaleJson: formJson,
    }).then(() => {
      message.success('保存成功');
    });
  }
  return Promise.reject();
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

const transFormProperties = (nowProperties: any, properties: any) => {
  const confirms = [];
  let res = nowProperties;
  const repeatKeys = {};
  // 拼接导入的字段
  Object.keys(properties).forEach((key) => {
    if (!res[key]) {
      res[key] = {
        ...properties[key],
      };
    } else {
      repeatKeys[key] = {
        ...properties[key],
      };
    }
  });
  // 重复字段弹确认框选择全部覆盖或关闭
  let allIsCover;
  const handleAll = (isCover) => {
    allIsCover = isCover;
    Modal.destroyAll();
  };
  // 重复字段弹确认框
  Object.keys(repeatKeys).forEach((key: string) => {
    const p = new Promise((reslove) => {
      const handleSelf = (isCover) => {
        reslove({
          [key]: isCover ? repeatKeys[key] : res[key],
        });
        modal.destroy();
      };
      const modal = Modal.confirm({
        className: 'formily-field-confirm',
        title: `${repeatKeys[key].title}（${repeatKeys[key].name}）字段已存在，是否覆盖?`,
        maskClosable: false,
        mask: false,
        width: 460,
        content: (
          <div style={{ textAlign: 'right', paddingTop: '60px' }}>
            <Button onClick={() => handleAll(false)}>全部跳过</Button>&nbsp;
            <Button onClick={() => handleAll(true)}>全部覆盖</Button>&nbsp;
            <Button onClick={() => handleSelf(false)}>跳过</Button>&nbsp;
            <Button onClick={() => handleSelf(true)} type="primary">覆盖</Button>
          </div>
        ),
        afterClose() {
          // 当选择全部覆盖时，会触发关闭事件
          if (typeof allIsCover === 'boolean') {
            handleSelf(allIsCover);
          }
        },
      });
    });
    confirms.push(p);
  });
  // 等待确认框全部操作完成再合并数据
  return Promise.all(confirms)
    .then((data) => {
      data.forEach((item) => {
        res = {
          ...res,
          ...item,
        };
      });
      Object.keys(res).forEach((key, index) => {
        res[key] = {
          ...res[key],
          'x-index': index,
        };
      });
      return res;
    });
};
export const importSchema = async (designer: Engine, formId: string) => {
  const nowSchema = transformToSchema(designer.getCurrentTree());
  const data = await getFollowUpFormInfo(formId);
  const schema = JSON.parse(data.formJson).schema;
  try {
    const propertiesData = await transFormProperties(nowSchema.schema.properties, schema.properties);
    const importedData = {
      form: nowSchema.form,
      schema: {
        ...nowSchema.schema,
        properties: propertiesData,
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
