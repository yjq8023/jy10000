import React, { useEffect, useRef, useState } from 'react';
import {
  Button,
  Checkbox,
  Empty,
  Input,
  Popover,
  Space,
} from '@sinohealth/butterfly-ui-components/lib';
import { PlusCircleOutlined, CloseOutlined } from '@ant-design/icons';
import { debounce } from 'lodash';
import { httpGetLabelList, httpProjecAiDecision } from '@/services/project';
import styles from './index.less';

const SearchIcon = () => <div className={`${styles['search-icon']} iconfont icon-search`} />;

type LabelSelectProps = {
  width?: string;
  onSelect?: (val: any) => void;
};

/**
 * 量表库-选择标签
 * @returns
 */
const LabelSelect: React.FC<LabelSelectProps> = (props) => {
  const { width, onSelect } = props;
  const [selected, setSelected] = useState<ProjectType.AiDecisionRes>({});
  const [aiDecisionParams, setAiDecisionParams] = useState({ name: '' });
  const [aiDecision, setAiDecision] = useState<ProjectType.AiDecisionRes[]>([]);
  const [placeholder, setPlaceholder] = useState<any>('');

  const inputRef = useRef<any>(null);
  const [isShowDrop, setIsShowDrop] = useState(false);

  const handleChecked = (val: ProjectType.AiDecisionRes) => {
    setSelected(val);
    setPlaceholder(val?.decisionFlowsVersionName);
  };

  const httpProjecAiDecisionReq = async () => {
    const res = await httpProjecAiDecision({ ...aiDecisionParams });
    setAiDecision(res.data);
  };

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

  useEffect(() => {
    onSelect && onSelect(selected);
  }, [selected]);

  // useEffect(() => {
  //   httpProjecAiDecisionReq();
  // }, [aiDecisionParams]);

  return (
    <div className={styles['label-select']} style={{ width }} ref={inputRef}>
      {/* <div
        className={`${styles['label-value']} ${selected ? '' : styles.placeholder}`}
        onClick={() => setIsShowDrop(true)}
      >
        <span className={styles['select-tag']}>
          {selected.decisionFlowsVersionName}
        </span>
        {!Object.keys(selected).length ? placeholder : ''}
        {!Object.keys(selected).length &&
          (!isShowDrop ? (
            <span className={`${styles['icon-select']} iconfont icon-arrow-down`} />
          ) : (
            <span className={`${styles['icon-select']} iconfont icon-arrow-up`} />
          ))}
        {Object.keys(selected).length ? (
          <span
            className={`${styles['icon-select']} iconfont icon-shibai1`}
            onClick={(e) => {
              e.stopPropagation();
              checkedDefault(source);
              setSelected({});
            }}
          />
        ) : null}
      </div> */}
      <Input
        className={`${styles['label-select-input']}`}
        placeholder="请输入决策流名称进行搜索"
        onFocus={() => setIsShowDrop(true)}
        value={placeholder}
        title="回车搜索"
        suffix={
          Object.keys(selected).length ? (
            <span
              className={`${styles['icon-select']} iconfont icon-shibai1`}
              onClick={(e) => {
                e.stopPropagation();
                setPlaceholder('');
                setSelected({});
              }}
            />
          ) : null
        }
        onChange={(v: any) => {
          setPlaceholder(v.target?.value);
          setAiDecisionParams({ name: v.target?.value });
        }}
        onKeyUp={debounce((v: any) => {
          httpProjecAiDecisionReq();
        }, 1000)}
        onPressEnter={() => {
          httpProjecAiDecisionReq();
        }}
      />
      {isShowDrop ? (
        <div
          className={`${styles['label-drop-container']} ${
            !aiDecision.length ? styles['none-data'] : ''
          }`}
          onClick={() => {
            inputRef?.current?.focus();
            setIsShowDrop(true);
          }}
        >
          <div className={styles['drop-container']}>
            {aiDecision.map((item, idx: number) => (
              <div
                className={`${styles['drop-father']} ${
                  item.labels?.length ? styles['drop-padding'] : ''
                } ${
                  selected.decisionFlowsVersionId === item.decisionFlowsVersionId
                    ? styles['drop-active']
                    : ''
                }`}
                key={item.decisionFlowsVersionId}
                onClick={() => handleChecked(item)}
              >
                <div className={`${styles.father}`}>
                  <span className={styles['father-label']}>{item.decisionFlowsVersionName}</span>
                  <span
                    className={styles['father-review']}
                    onClick={(e) => {
                      e.preventDefault();
                      window.open(item.shareUrl);
                    }}
                  >
                    查看
                  </span>
                </div>
                <div className={`${styles['drop-son']}`}>
                  {item?.labels?.map((el, index: number) => (
                    <span className={styles['son-label']} key={el}>
                      {el}
                    </span>
                  ))}
                </div>
              </div>
            ))}
            {!aiDecision.length ? <Empty /> : null}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default LabelSelect;
