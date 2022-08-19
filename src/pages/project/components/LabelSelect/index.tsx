import React, { useEffect, useRef, useState } from 'react';
import { Button, Checkbox, Input, Popover, Space } from '@sinohealth/butterfly-ui-components/lib';
import { PlusCircleOutlined, UpOutlined } from '@ant-design/icons';
import styles from './index.less';
import { httpGetLabelList } from '@/services/project';

const SearchIcon = () => <div className={`${styles['search-icon']} iconfont icon-search`} />;

type LabelSelectProps = {
  width?: string;
  mapSour?: string[];
  search?: boolean;
  add?: boolean;
  placeholder?: string;
  onSelect?: (val: any) => void;
};

/**
 * 量表库-选择标签
 * @returns
 */
const LabelSelect: React.FC<LabelSelectProps> = (props) => {
  const { width, mapSour, search = true, add = true, onSelect, placeholder = '请输入' } = props;
  const [isMap, setIsMap] = useState(false);
  const [selected, setSelected] = useState<ProjectType.LabelListRes[]>([]);
  const [source, setSource] = useState<ProjectType.LabelListRes[]>([]);

  const inputRef = useRef<any>(null);
  const [isShowDrop, setIsShowDrop] = useState(false);

  const handleChecked = (e: any, fidx: any, sidx: any, val: any) => {
    const coDa = source.slice();
    coDa[fidx].children[sidx].checked = e;
    const coSe = selected.slice();
    if (e) {
      coSe.push(coDa[fidx].children[sidx]);
      setSelected(coSe);
    } else {
      const d = coSe.filter((el: any) => el.id !== val);
      setSelected(d);
    }
    setSource(coDa);
  };

  // 添加标签
  const handleAddLabel = () => {};

  const httpGetLabelListReq = async () => {
    const res: any = await httpGetLabelList({});
    // console.log(res);
    if (!res.empty) {
      checkedDefault(res.data, true);
    }
  };

  const checkedDefault = (arr: any, filter: boolean = false) => {
    const FilD: ProjectType.LabelListRes[] = [];
    arr.forEach((el: ProjectType.LabelListRes) => {
      el.children.forEach((lis: ProjectType.LabelListRes) => {
        if (filter) {
          mapSour?.includes(lis.id) && FilD.push(lis);
          setSelected(FilD);
        } else {
          // eslint-disable-next-line no-param-reassign
          lis.checked = false;
        }
      });
    });
    setSource(arr);
  };

  const PopoverContent = () => {
    return (
      <div className={styles['popover-content']}>
        {selected.map((el) => (
          <span className={styles['select-tag']} key={el.id}>
            {el.value}
          </span>
        ))}
      </div>
    );
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
    onSelect && onSelect(selected.map((el) => el.id));
  }, [selected]);

  useEffect(() => {
    httpGetLabelListReq();
  }, []);

  useEffect(() => {
    if (isMap || !mapSour?.length) return;

    const FilD: ProjectType.LabelListRes[] = [];
    source.forEach((el: ProjectType.LabelListRes) => {
      el.children.forEach((lis: ProjectType.LabelListRes) => {
        if (mapSour?.includes(lis.id)) {
          // eslint-disable-next-line no-param-reassign
          lis.checked = true;
          FilD.push(lis);
          setSelected(FilD);
        }
      });
      setIsMap(true);
    });
  }, [mapSour, source]);

  return (
    <div className={styles['label-select']} style={{ width }} ref={inputRef}>
      <Popover style={{ width: '320px' }} content={selected.length ? PopoverContent : ''}>
        <div
          className={`${styles['label-value']} ${selected.length ? '' : styles.placeholder}`}
          onClick={() => setIsShowDrop(true)}
        >
          {selected.map((el) => (
            <span className={styles['select-tag']} key={el.id}>
              {el.value}
            </span>
          ))}
          {!selected.length ? placeholder : ''}
          {!selected.length &&
            (!isShowDrop ? (
              <span className={`${styles['icon-select']} iconfont icon-arrow-down`} />
            ) : (
              <span className={`${styles['icon-select']} iconfont icon-arrow-up`} />
            ))}
          {selected.length ? (
            <span
              className={`${styles['icon-select']} iconfont icon-shibai1`}
              onClick={(e) => {
                e.stopPropagation();
                checkedDefault(source);
                setSelected([]);
              }}
            />
          ) : null}
        </div>
      </Popover>
      {/* <Input
        className={`${styles['label-select-input']} ${styles.placeholder}`}
        placeholder={placeholder}
        onFocus={() => setIsShowDrop(true)}
      /> */}
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
                style={{
                  width: add ? '220px' : '310px',
                  border: 0,
                  backgroundColor: 'rgba(0,0,0,0.04)',
                }}
                prefix={<SearchIcon />}
                placeholder="输入标签名称进行搜索"
              />
              {add ? (
                <Button
                  icon={<PlusCircleOutlined />}
                  type="primary"
                  onClick={() => handleAddLabel()}
                >
                  添加
                </Button>
              ) : null}
            </Space>
          ) : null}

          <div className={styles['drop-container']}>
            {source.map((item, idx: number) => (
              <div className={`${styles['drop-father']}`} key={item.value}>
                {/* <div className={`${styles.father}  iconfont icon-arrow-up`}> */}
                <div className={`${styles.father}`}>
                  <span className={styles['father-label']}>{item.value}</span>
                </div>
                {item.children.map((el, index: number) => (
                  <div
                    className={`${styles['drop-son']} ${
                      selected.map((lis: any) => lis.id).includes(el.id) ? styles['son-active'] : ''
                    }`}
                    // } iconfont icon-arrow-up`}
                    key={el.id}
                  >
                    <div
                      style={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}
                      onClick={() => handleChecked(!el.checked, idx, index, el.id)}
                    >
                      <span className={styles['son-label']}>{el.value}</span>
                      <Checkbox
                        checked={el.checked}
                        onChange={(e) => handleChecked(e.target.checked, idx, index, el.id)}
                      />
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
