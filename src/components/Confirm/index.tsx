import React, { ReactNode } from 'react';
import { Modal, ModalFuncProps } from '@sinohealth/butterfly-ui-components/lib';
import { ExclamationCircleFilled, QuestionCircleTwoTone } from '@ant-design/icons';
import styles from './index.less';

const { confirm } = Modal;

type ConfirmModelProps = ModalFuncProps & {
  fun: 'success' | 'info' | 'error' | 'warning';
  subtitle?: string;
  node?: ReactNode;
};

const icons = {
  success: <QuestionCircleTwoTone twoToneColor="#FFBF00" />,
  info: <QuestionCircleTwoTone twoToneColor="#FFBF00" />,
  error: <ExclamationCircleFilled style={{ color: '#F53F3F' }} />,
  warning: <ExclamationCircleFilled style={{ color: '#FFBF00' }} />,
};

const btnType: any = {
  success: 'primary',
  info: 'primary',
  warning: 'warning',
  error: 'primary',
};

const ConfirmModel = (props: ConfirmModelProps) => {
  // eslint-disable-next-line dot-notation
  //   return Modal[props.fun]({ ...props });
  return confirm({
    ...props,
    centered: true,
    className: styles.confirm,
    icon: icons[props.fun],
    cancelButtonProps: { type: 'info' },
    okButtonProps: { danger: props.fun === 'error', type: btnType[props.fun] },
    content: (
      <div>
        <h3>{props.subtitle}</h3>
        <div className={styles.content}>{props.node}</div>
      </div>
    ),
  });
};

ConfirmModel.defaultProps = {};

export default ConfirmModel;
