import React, { useState, useRef, useEffect, useMemo } from 'react';
import {
  Modal,
  Form,
} from '@sinohealth/butterfly-ui-components/lib';

type BaseFormModalProps = {
  formModal: any;
  onSubmit: (formData?: any) => Promise<any>;
  FormContent: any
};

const BaseFormModal = (props: BaseFormModalProps) => {
  const { formModal, onSubmit, FormContent, ...otherProps } = props;
  const [defaultFormData, setDefaultFormData] = useState({});
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    if (!formModal) {
      return;
    }
    formModal.current = {
      form,
      openModal,
      closeModal,
    };
  }, []);
  const openModal = (defaultData: any = {}) => {
    setDefaultFormData(defaultData);
    setVisible(true);
  };

  const closeModal = () => {
    setVisible(false);
  };

  const handleOk = (data?: any) => {
    form.submit();
  };

  const handleSubmit = (formValues: any) => {
    const formData = {
      ...defaultFormData,
      ...formValues,
    };
    onSubmit(formData)
      .then(() => {
        closeModal();
      });
  };

  const renderFormContent = useMemo(() => {
    form.resetFields();
    return (
      <FormContent form={form} initialValues={defaultFormData} colon={false} onFinish={handleSubmit} labelAlign="right" labelCol={{ span: 4 }} />
    );
  }, [defaultFormData]);

  if (!visible) return null;
  return (
    <Modal
      {...otherProps}
      visible={true}
      onCancel={closeModal}
      onOk={handleOk}
    >
      { renderFormContent }
    </Modal>
  );
};

export const useFormModal = () => {
  const formModal: any = useRef();
  return formModal;
};

export default BaseFormModal;
