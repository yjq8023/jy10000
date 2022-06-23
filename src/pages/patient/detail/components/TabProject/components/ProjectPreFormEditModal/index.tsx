import React, { useState } from 'react';
import { Radio, ModalProps, Steps, Space } from '@sinohealth/butterfly-ui-components/lib';
import { FormRender, useFormilyForm } from '@sinohealth/butterfly-formily-engine';
import SimpleModal from '@/components/SimpleModal';
import style from './index.less';

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
function ProjectPreFormEditModal(props: AddColumnModalProps) {
  const { data, onOk, onCancel } = props;
  const [step, setStep] = useState(0);
  const form = useFormilyForm();
  const isNoOneStep = step === 0;
  const modalProps = {
    className: style.preFormEditModal,
    title: '添加前缀信息',
    width: 800,
    visible: true,
    okText: isNoOneStep ? '下一步' : '确定',
    cancelText: isNoOneStep ? '取消' : '上一步',
    onOk: (e: any) => {
      if (isNoOneStep) {
        handleSaveFormData();
      } else {
        onOk && onOk(e);
      }
    },
    onCancel: (e: any) => {
      if (isNoOneStep) {
        onCancel && onCancel(e);
      } else {
        setStep(0);
      }
    },
  };
  const handleSaveFormData = () => {
    form.current?.submit((formValues) => {
      console.log('formValues');
      console.log(formValues);
      setStep(1);
    });
  };
  const handleShowPlanMapDetail = (e: any) => {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
  };
  const renderPlanMapList = () => {
    return (
      <div>
        <div className="but-title">选择乳腺癌管理项目随访路径</div>
        <Radio.Group>
          <Space direction="vertical">
            <Radio value={1}>
              <div className={style.planListItem}>
                随访路径一
                <a className={style.planListAction} onClick={handleShowPlanMapDetail}>查看该路径信息</a>
              </div>
            </Radio>
            <Radio value={2}>
              <div className={style.planListItem}>
                随访路径二
                <a className={style.planListAction}>查看该路径信息</a>
              </div>
            </Radio>
            <Radio value={3}>
              <div className={style.planListItem}>
                随访路径三
                <a className={style.planListAction}>查看该路径信息</a>
              </div>
            </Radio>
          </Space>
        </Radio.Group>
      </div>
    );
  };
  return (
    <SimpleModal {...modalProps}>
      <div className={style.stepBox}>
        <Steps current={step}>
          <Steps.Step key={1} title="收集前缀信息" />
          <Steps.Step key={2} title="选择随访路径" />
        </Steps>
      </div>
      <div className={style.formBox}>
        { step === 0 && <FormRender form={form} schema={schema} />}
        { step === 1 && renderPlanMapList()}
      </div>
    </SimpleModal>
  );
}

export default ProjectPreFormEditModal;
