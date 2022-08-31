import React from 'react';
import moment from 'moment';
import { Drawer } from '@sinohealth/butterfly-ui-components/lib';
import styles from './index.less';

type PreviewDrawerProps = {
  visible?: boolean;
  title?: string;
  htmlCont: string;
  author?: string;
  onClose?: () => void;
};

/**
 * 文章预览功能
 * @returns
 */
const PreviewDrawer: React.FC<PreviewDrawerProps> = (props) => {
  const { visible, title, author, htmlCont, onClose } = props;

  return (
    <Drawer
      className={styles['phone-drawer']}
      closable={false}
      placement="right"
      visible={visible}
      onClose={() => onClose && onClose()}
    >
      <div className={styles.header}>
        <span className={styles.title}>浏览内容</span>
        <span
          className={`${styles.icon} iconfont icon-shibai1`}
          onClick={() => onClose && onClose()}
        />
      </div>
      <div className={styles['phone-header']} />
      <div className={styles['phone-model']}>
        <h4 className={styles['content-title']}>{title}</h4>
        <div className={styles.container} dangerouslySetInnerHTML={{ __html: htmlCont }} />
        <div className={styles.author}>{author}</div>
        <div className={styles.time}>更新时间：{moment().format('YYYY-MM-DD')}</div>
      </div>
    </Drawer>
  );
};

export default PreviewDrawer;
