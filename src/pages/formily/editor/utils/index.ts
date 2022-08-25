import { createBehavior, createResource } from '@sinohealth/designable-core';
import { getSchemaItem } from './schema';
import IO from '@/pages/formily/editor/components/IO';

export const getIoComponents = () => {
  const data = [
    {
      followUpLogId: null,
      followUpNodeId: '1658251671521722439',
      label: '您有时是否忘记服药？',
      labelCategory: 'SINGLE_SELETE',
      labelCode: 'TAKEMEDICINE',
      labelOptions: [
        {
          label: '是',
          labelCode: '0',
          sort: 1,
        },
        {
          label: '否',
          labelCode: '1',
          sort: 2,
        },
      ],
      labelResult: null,
      serialNO: 1,
    },
    {
      followUpLogId: null,
      followUpNodeId: '1658251671521722439',
      label: '在过去的2周内，是否会有一天或几天您忘记服药？',
      labelCategory: 'SINGLE_SELETE',
      labelCode: 'TAKEMEDICINE2',
      labelOptions: [
        {
          label: '是',
          labelCode: '0',
          sort: 1,
        },
        {
          label: '否',
          labelCode: '1',
          sort: 2,
        },
      ],
      labelResult: null,
      serialNO: 2,
    },
    {
      followUpLogId: null,
      followUpNodeId: '1658251671521722439',
      label: '治疗期间，当您觉得症状加重或者出现其他症状时，您是否未告知医生而自行减少药量？',
      labelCategory: 'SINGLE_SELETE',
      labelCode: 'TREATMENT',
      labelOptions: [
        {
          label: '是',
          labelCode: '0',
          sort: 1,
        },
        {
          label: '否',
          labelCode: '1',
          sort: 2,
        },
      ],
      labelResult: null,
      serialNO: 3,
    },
    {
      followUpLogId: null,
      followUpNodeId: '1658251671521722439',
      label: '当您外出旅行或长时间离家时，您是否有时忘记携带药物？',
      labelCategory: 'SINGLE_SELETE',
      labelCode: 'FORGETDRUGS',
      labelOptions: [
        {
          label: '是',
          labelCode: '0',
          sort: 1,
        },
        {
          label: '否',
          labelCode: '1',
          sort: 2,
        },
      ],
      labelResult: null,
      serialNO: 4,
    },
    {
      followUpLogId: null,
      followUpNodeId: '1658251671521722439',
      label: '昨天您服用药物了了吗？',
      labelCategory: 'SINGLE_SELETE',
      labelCode: 'TAKEMEDICINE',
      labelOptions: [
        {
          label: '是',
          labelCode: '0',
          sort: 1,
        },
        {
          label: '否',
          labelCode: '1',
          sort: 2,
        },
      ],
      labelResult: null,
      serialNO: 5,
    },
    {
      followUpLogId: null,
      followUpNodeId: '1658251671521722439',
      label: '当您觉得自己的症状已经好转或消失时，您是否停止过服药？',
      labelCategory: 'SINGLE_SELETE',
      labelCode: 'DISAPPEAR',
      labelOptions: [
        {
          label: '是',
          labelCode: '0',
          sort: 1,
        },
        {
          label: '否',
          labelCode: '1',
          sort: 2,
        },
      ],
      labelResult: null,
      serialNO: 6,
    },
    {
      followUpLogId: null,
      followUpNodeId: '1658251671521722439',
      label: '您是否觉得要坚持治疗计划有困难？',
      labelCategory: 'SINGLE_SELETE',
      labelCode: 'DIFFCULTYSTICK',
      labelOptions: [
        {
          label: '是',
          labelCode: '0',
          sort: 1,
        },
        {
          label: '否',
          labelCode: '1',
          sort: 2,
        },
      ],
      labelResult: null,
      serialNO: 7,
    },
    {
      followUpLogId: null,
      followUpNodeId: '1658251671521722439',
      label: '您觉得要按时按量服药很难吗？',
      labelCategory: 'SINGLE_SELETE',
      labelCode: 'DIFFCULTYTAKE',
      labelOptions: [
        {
          label: '从不',
          labelCode: '1',
          sort: 1,
        },
        {
          label: '偶尔',
          labelCode: '0.75',
          sort: 2,
        },
        {
          label: '有时',
          labelCode: '0.5',
          sort: 3,
        },
        {
          label: '经常',
          labelCode: '0.25',
          sort: 4,
        },
        {
          label: '所有时间 ',
          labelCode: '0',
          sort: 5,
        },
      ],
      labelResult: null,
      serialNO: 8,
    },
  ];
  const components = data.map((item: any) => getSchemaItem(item));
  const selectorList = components.map((item: any) => {
    return {
      Resource: createResource(
        {
          // icon: `${item['x-component']}Source`.replace(/\./g, ''),
          title: item.title,
          elements: [
            {
              componentName: 'Field',
              props: item,
            },
          ],
        },
      ),
      Behavior: createBehavior(
        {
          name: item.name,
          selector: (node: any) => {
            return node.props.key === 'IoRadio.Group';
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
                  },
                },
              },
            },
          },
        },
      ),
    };
  });
  return selectorList;
};

export default {
  getIoComponents,
};
