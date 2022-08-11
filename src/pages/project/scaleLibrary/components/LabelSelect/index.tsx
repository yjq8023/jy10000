import React, { useEffect, useRef, useState } from 'react';
import { Button, Checkbox, Input, Space } from '@sinohealth/butterfly-ui-components/lib';
import { PlusCircleOutlined, UpOutlined } from '@ant-design/icons';
import styles from './index.less';

const SearchIcon = () => <div className={`${styles['search-icon']} iconfont icon-search`} />;

type LabelSelectProps = {
  search?: boolean;
  placeholder?: string;
};

/**
 * 量表库-选择标签
 * @returns
 */
const LabelSelect: React.FC<LabelSelectProps> = (props) => {
  const { search = true, placeholder = '请输入' } = props;

  const inputRef = useRef<any>(null);
  const [isShowDrop, setIsShowDrop] = useState(false);

  const clickCallback = (event: { target: any }) => {
    if (inputRef.current.contains(event.target)) {
      return;
    }
    setIsShowDrop(false);
  };

  useEffect(() => {
    if (isShowDrop) {
      document.addEventListener('click', clickCallback, false);
    }
    return () => {
      document.removeEventListener('click', clickCallback, false);
    };
  }, [isShowDrop]);

  return (
    <div className={styles['label-select']} ref={inputRef}>
      {/* <div className={`${styles['label-value']} ${styles.placeholder}`}>请输入量表名称</div> */}
      <Input
        className={`${styles['label-value']} ${styles.placeholder}`}
        placeholder={placeholder}
        onFocus={() => setIsShowDrop(true)}
      />
      {isShowDrop ? (
        <div
          className={styles['label-drop-container']}
          onClick={() => {
            inputRef?.current?.focus();
            setIsShowDrop(true);
          }}
        >
          {search ? (
            <Space className={styles['drop-search']}>
              <Input
                style={{ width: '220px', border: 0, backgroundColor: 'rgba(0,0,0,0.04)' }}
                prefix={<SearchIcon />}
                placeholder="输入标签名称进行搜索"
              />
              <Button icon={<PlusCircleOutlined />} type="primary">
                添加
              </Button>
            </Space>
          ) : null}

          <div className={styles['drop-container']}>
            {[0, 1, 2, 3].map((item) => (
              <div className={`${styles['drop-father']}`} key={item}>
                <div className={`${styles.father}  iconfont icon-arrow-up`}>
                  <span className={styles['father-label']}>标签分类 01</span>
                </div>
                {[0, 1, 2, 3].map((el) => (
                  <div
                    className={`${styles['drop-son']} ${
                      el ? styles['son-active'] : ''
                    } iconfont icon-arrow-up`}
                    key={el}
                  >
                    <div
                      style={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}
                    >
                      <span className={styles['son-label']}>标签 01</span>
                      <Checkbox />
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default LabelSelect;
