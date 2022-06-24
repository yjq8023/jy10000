import React, { useState, useImperativeHandle } from 'react';
import { Radio, ModalProps, Steps, Space } from '@sinohealth/butterfly-ui-components/lib';
import { FormRender, useFormilyForm } from '@sinohealth/butterfly-formily-engine';
import SimpleModal from '@/components/SimpleModal';

interface AddColumnModalProps extends ModalProps {
  data?: any
}
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
function ProjectPreFormEditModal(props: AddColumnModalProps, ref: any) {
  const { data, onOk, onCancel } = props;
  const [visible, setVisible] = useState(false);
  useImperativeHandle(ref, () => {
    return {
      openModal,
    };
  });
  const openModal = (config: any) => {
    console.log(config);
    setVisible(true);
  };
  const modalProps = {
    title: '乳腺癌随访管理项目前置信息',
    width: 800,
    visible,
    onCancel() {
      setVisible(false);
    },
  };
  const formProps = {
    editable: true,
  };
  return (
    <SimpleModal {...modalProps}>
      <div>
        <div>
          开始/结束时间：2021/10/18  15:34:45  —  2022/06/18  15:34:45
        </div>
        <div>
          <FormRender formProps={formProps} schema={schema} />
        </div>
      </div>
    </SimpleModal>
  );
}

export default React.forwardRef(ProjectPreFormEditModal);
