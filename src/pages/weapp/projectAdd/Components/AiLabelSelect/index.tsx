import React, { useEffect, useRef, useState } from 'react';
import {
  Button,
  Checkbox,
  Empty,
  Input,
  Popover,
  Space,
} from '@sinohealth/butterfly-ui-components/lib';
import { Link } from 'react-router-dom';
import { PlusCircleOutlined, CloseOutlined } from '@ant-design/icons';
import { debounce, throttle } from 'lodash';
import { httpGetLabelList, httpProjecAiDecision } from '@/services/project';
import styles from './index.less';
import { getByChain } from '@/services/weapp';

const SearchIcon = () => <div className={`${styles['search-icon']} iconfont icon-search`} />;

type LabelSelectProps = {
  id?: string;
  width?: string;
  onSelect?: (val: any) => void;
};

/**
 * 量表库-选择标签
 * @returns
 */
const LabelSelect: React.FC<LabelSelectProps> = (props) => {
  const { id, width, onSelect } = props;
  const [selected, setSelected] = useState<any>({});
  const [isMap, setIsMap] = useState(false);
  const [chainParams, setChainParams] = useState({});
  const [chainSource, setChainSource] = useState<any>([]);
  const [placeholder, setPlaceholder] = useState<any>('');

  const inputRef = useRef<any>(null);
  const [isShowDrop, setIsShowDrop] = useState(false);

  const handleChecked = (val: any) => {
    setSelected(val);
    setPlaceholder(`${val?.value} | ${val?.version}`);
  };

  const httpGetByChain = async () => {
    const res: any = await getByChain(chainParams);
    setChainSource(res);
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

  useEffect(() => {
    httpGetByChain();
  }, [chainParams]);

  useEffect(() => {
    if (isMap || !chainSource?.length) return;
    const FD = chainSource.filter((el: any) => el.id === id);
    if (!FD.length) return;
    setSelected(FD[0]);
    setPlaceholder(`${FD[0]?.value} | ${FD[0]?.version}`);
  }, [id, chainSource]);

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
        placeholder="请选择关联管理项目（必选）"
        onFocus={() => setIsShowDrop(true)}
        value={placeholder}
        title="回车搜索"
        suffix={
          selected && Object.keys(selected).length ? (
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
          setChainParams({ name: v.target?.value });
        }}
        // onKeyUp={debounce((v: any) => {
        //   httpGetByChain();
        // }, 1000)}
        // onPressEnter={() => {
        //   httpGetByChain();
        // }}
      />
      {isShowDrop ? (
        <div
          className={`${styles['label-drop-container']} ${
            !chainSource.length ? styles['none-data'] : ''
          }`}
          onClick={() => {
            inputRef?.current?.focus();
            setIsShowDrop(true);
          }}
        >
          <div className={styles['drop-container']}>
            {chainSource.map((item: any, idx: number) => (
              <div
                className={`${styles['drop-father']} ${
                  item.labelNames?.length ? styles['drop-padding'] : ''
                } ${selected.id === item.id ? styles['drop-active'] : ''}`}
                key={item.id}
                onClick={() => handleChecked(item)}
              >
                <div className={`${styles.father}`}>
                  <span className={styles['father-label']}>
                    {item.value} | {item.version}
                  </span>
                  {/* <span
                    className={styles['father-review']}
                    onClick={(e) => {
                      e.preventDefault();
                      window.open(item.shareUrl);
                    }}
                  >
                    查看
                  </span> */}
                  <Link
                    className={styles['father-review']}
                    target="_blank"
                    to={`/project/term/library/planDetail?id=${item.id}`}
                  >
                    查看
                  </Link>
                </div>
                <div className={`${styles['drop-son']}`}>
                  {item?.labelNames?.map((el: any, index: number) => (
                    <span className={styles['son-label']} key={el}>
                      {el}
                    </span>
                  ))}
                </div>
              </div>
            ))}
            {!chainSource.length ? <Empty /> : null}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default LabelSelect;
