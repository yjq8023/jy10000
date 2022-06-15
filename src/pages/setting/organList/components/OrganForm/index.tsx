import React from 'react';
import { Form } from '@sinohealth/butterfly-ui-components/lib';
import SimpleModal from '@/components/SimpleModal';

type OrganFormType = {
  visible: boolean;
  onCancel: () => {};
};
const OrganForm = (props: any) => {
  const [form] = Form.useForm();
  return (
    <SimpleModal
      visible={props.visible}
      //   closable={false}
      cancelButtonProps={{ type: 'info' }}
      onOk={() => {
        // form.submit();
      }}
      width={560}
      onCancel={() => {
        props.onCancel();
      }}
    >
      <div>
        <Form>123</Form>
      </div>
    </SimpleModal>
  );
};

export default OrganForm;
