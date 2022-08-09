type categoryType = 'SINGLE_SELETE' | 'MULTI_SELETE' | 'NUMBER' | 'DATE' | 'DATE_TIME'
const defaultSchemaConfig = {
  SINGLE_SELETE: {
    type: 'string',
    title: '单选',
    enum: [],
    key: 'IoRadio.Group',
    'x-decorator': 'FormItem',
    'x-component': 'Radio.Group',
  },
  MULTI_SELETE: {
    type: 'array',
    title: '多选',
    enum: [],
    key: 'IoCheckbox.Group',
    'x-decorator': 'FormItem',
    'x-component': 'Checkbox.Group',
  },
  DATE: {
    title: '日期',
    'x-decorator': 'FormItem',
    'x-component': 'DatePicker',
    'x-component-props': {
      placeholder: '请选择',
    },
    key: 'IoDatePicker',
    type: 'string',
  },
  DATE_TIME: {
    title: '时间',
    key: 'IoDatePicker',
    'x-decorator': 'FormItem',
    'x-component': 'DatePicker',
    'x-component-props': {
      placeholder: '请选择时间',
      showTime: true,
    },
    type: 'string',
  },
  NUMBER: {
    title: '数字',
    key: 'IoNumberPicker',
    'x-decorator': 'FormItem',
    'x-component': 'NumberPicker',
    'x-component-props': {
      placeholder: '请输入',
    },
    type: 'string',
  },
};

export const getSchemaItem = (aiSchema: AiSchema) => {
  const defaultSchemaItem = defaultSchemaConfig[aiSchema.labelCategory] || {};
  return {
    ...defaultSchemaItem,
    title: aiSchema.label,
    name: aiSchema.labelCode,
    enum: transformOptions(aiSchema.labelOptions),
  };
};

const transformOptions = (labelOptions: labelOptionsItem[] = []) => {
  return labelOptions?.map((item) => ({
    label: item.label,
    value: item.labelCode,
  }));
};

type labelOptionsItem = { label: string, labelCode: string, sort: number }
type AiSchema = {
  id: string;
  label: string;
  labelCategory: categoryType;
  labelCode: string;
  labelOptions: labelOptionsItem[];
  projectId: string;
}
export const handleTransformSchema = (aiSchema: AiSchema[]) => {
  if (!Array.isArray(aiSchema)) return {};
  const schema: any = {
    type: 'object',
    properties: {
      layout: {
        type: 'void',
        'x-component': 'FormLayout',
        'x-component-props': {
          labelCol: 6,
          wrapperCol: 10,
          layout: 'vertical',
        },
        properties: {},
      },
    },
  };
  aiSchema.forEach((aiSchemaItem) => {
    const newSchemaItem = getSchemaItem(aiSchemaItem);
    schema.properties[aiSchemaItem.labelCode || aiSchemaItem.id] = newSchemaItem;
  });
  return schema;
};

export default {
  handleTransformSchema,
  getSchemaItem,
};
