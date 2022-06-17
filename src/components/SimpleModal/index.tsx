import { Form, Modal, ModalProps } from '@sinohealth/butterfly-ui-components/lib';
import React, { useState } from 'react';
import styles from './index.less';
import cancelIcon from '@/assets/images/common/cancel.svg';

type SimpleModalType = {
  h2?: string;
  visible: boolean;
  width?: number;
  loading?: boolean;
} & ModalProps;
const SimpleModal: React.FC<SimpleModalType> = (props) => {
  //   const [form] = Form.useForm();
  return (
    <Modal
      confirmLoading={props.loading}
      closeIcon={<img style={{ width: 18 }} src={cancelIcon} alt="" />}
      className={styles['simple-modal']}
      {...props}
    >
      <h2 className={styles.title}>{props.h2}</h2>
      <div>{props.children}</div>
    </Modal>
  );
};
SimpleModal.defaultProps = {
  loading: false,
};
export default SimpleModal;
