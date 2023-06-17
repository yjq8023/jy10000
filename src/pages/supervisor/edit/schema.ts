const schema = {
  form: {
    labelCol: 6,
    wrapperCol: 12,
  },
  schema: {
    type: 'object',
    properties: {
      name: {
        type: 'void',
        title: '姓名',
        'x-decorator': 'FormItem',
        'x-decorator-props': {
          asterisk: true,
          feedbackLayout: 'none',
        },
        'x-component': 'Space',
        properties: {
          firstName: {
            type: 'string',
            'x-decorator': 'FormItem',
            'x-component': 'Input',
            required: true,
          },
          lastName: {
            type: 'string',
            'x-decorator': 'FormItem',
            'x-component': 'Input',
            required: true,
          },
        },
      },
      texts: {
        type: 'void',
        title: '文本串联',
        'x-decorator': 'FormItem',
        'x-decorator-props': {
          asterisk: true,
          feedbackLayout: 'none',
        },
        'x-component': 'Space',
        properties: {
          aa: {
            type: 'string',
            'x-decorator': 'FormItem',
            'x-decorator-props': {
              addonAfter: '单位',
            },
            'x-component': 'Input',
            required: true,
          },
          bb: {
            type: 'string',
            'x-decorator': 'FormItem',
            'x-decorator-props': {
              addonAfter: '单位',
            },
            'x-component': 'Input',
            required: true,
          },
          cc: {
            type: 'string',
            'x-decorator': 'FormItem',
            'x-decorator-props': {
              addonAfter: '单位',
            },
            'x-component': 'Input',
            required: true,
          },
        },
      },

      textarea: {
        type: 'string',
        title: '文本框',
        'x-decorator': 'FormItem',
        'x-component': 'Input.TextArea',
        'x-component-props': {
          style: {
            width: 400,
          },
        },
        required: true,
      },
    },
  },
};
export default schema;
