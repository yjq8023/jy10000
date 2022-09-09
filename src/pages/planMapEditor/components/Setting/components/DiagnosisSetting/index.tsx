import React, { useContext, useEffect } from 'react';
import { Input, Form } from '@sinohealth/butterfly-ui-components/lib';
import lodash from 'lodash';
import style from './index.less';
import { planMapContext } from '@/pages/planMapEditor';

const debounce = lodash.debounce((c) => {
  c && c();
}, 400);
const DiagnosisSetting = (props: any) => {
  const { data } = props;
  const [form] = Form.useForm();
  const { setPlanMapState, disabled } = useContext(planMapContext);
  const handleChange = () => {
    debounce(() => {
      form.submit();
    });
  };
  const onFinish = (values: any) => {
    setPlanMapState('update', data.path, { ...data, ...values });
  };
  return (
    <div className={style.diagnosisSetting}>
      <div className={style.header}>
        <div className={style.type}>复诊复查</div>
      </div>
      <div className={style.body}>
        <Form
          form={form}
          name="basic"
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          initialValues={data}
          onFinish={onFinish}
          onValuesChange={handleChange}
          hideRequiredMark={true}
          autoComplete="off"
          layout="vertical"
        >
          <Form.Item
            label="项目名称"
            name="itemName"
            rules={[{ required: true, message: '该字段为必填项' }]}
          >
            <Input disabled={disabled || data.aiDecisionFlowsNodeId} style={{ width: '100%' }} placeholder="请输入" />
          </Form.Item>
          <Form.Item
            label="提示说明"
            name="remark"
          >
            <Input.TextArea disabled={disabled || data.aiDecisionFlowsNodeId} style={{ width: '100%' }} placeholder="请输入" />
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default DiagnosisSetting;
