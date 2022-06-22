import React, { useEffect } from 'react';
import { Badge } from '@sinohealth/butterfly-ui-components/lib';
import { FormRender, useFormilyForm } from '@sinohealth/butterfly-formily-engine';
import style from '@/pages/patient/detail/components/TabProject/index.less';

const schema = {
  type: 'object',
  properties: {
    radio: {
      type: 'number',
      title: '一般检查',
      enum: [
        {
          label: '正常',
          value: 1,
        },
        {
          label: '异常',
          value: 0,
        },
      ],
      'x-decorator': 'FormItem',
      'x-component': 'Radio.Group',
    },
    multiple: {
      type: 'array',
      title: '用药类型',
      enum: [
        {
          label: '选择性雌激素受体调节剂（SERM）',
          value: 1,
        },
        {
          label: '卵巢功能抑制（OFS）药物',
          value: 2,
        },
        {
          label: '芳香化酶抑制剂（AI）',
          value: 3,
        },
        {
          label: '芳香化酶抑制剂（AI1）',
          value: 31,
        },
        {
          label: '芳香化酶抑制剂（AI2）',
          value: 32,
        },
        {
          label: '芳香化酶抑制剂（AI3）',
          value: 33,
        },
      ],
      'x-decorator': 'FormItem',
      'x-component': 'Checkbox.Group',
    },
    year: {
      title: '年选择',
      'x-decorator': 'FormItem',
      'x-component': 'DatePicker',
      'x-component-props': {
        picker: 'year',
      },
      type: 'string',
    },
    '[startDate,endDate]': {
      title: '日期范围',
      'x-decorator': 'FormItem',
      'x-component': 'DatePicker.RangePicker',
      'x-component-props': {
        showTime: true,
      },
      type: 'string',
    },
  },
};
function ProjectPreForm(props: any) {
  const { projectItem } = props;
  const form = useFormilyForm();
  const formProps = {
    disabled: true,
    values: {
      radio: 1,
      multiple: [1, 2],
      year: 2021,
    },
  };
  return (
    <div className={style.projectListItem}>
      <div className={style.projectListHeader}>
        <Badge status="processing" />
        前列腺随访管理项目
        <a className={style.action}>填写前置信息</a>
      </div>
      {
        projectItem.schema && (
          <div className={style.formBox}>
            <FormRender form={form} formProps={formProps} schema={schema} />
          </div>
        )
      }
    </div>
  );
}

export default ProjectPreForm;
