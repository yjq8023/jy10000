import React from 'react';
import { Switch, SwitchProps } from '@sinohealth/butterfly-ui-components/lib';
import styles from './index.less';

interface SwitchCustomProps extends SwitchProps {}

/**
 * 自定义的CheckBox
 * @returns
 */
const SwitchCustom: React.FC<SwitchCustomProps> = (props: any) => {
  return (
    <div className={styles['check-box']}>
      <Switch {...props} />
    </div>
  );
};

export default SwitchCustom;
