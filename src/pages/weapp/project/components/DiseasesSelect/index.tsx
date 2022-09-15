import React, { useEffect, useRef, useState } from 'react';
import { Checkbox, Empty, Popover } from '@sinohealth/butterfly-ui-components/lib';
import styles from './index.less';
import { getColumnsList } from '@/services/weapp';

type DiseasesSelectProps = {
  width?: string;
  mapSour?: string[];
  search?: boolean;
  add?: boolean;
  placeholder?: string;
  onSelect?: (val: any) => void;
};

/**
 * 病种选择
 * @returns
 */
const DiseasesSelect: React.FC<DiseasesSelectProps> = (props) => {
  const { width, mapSour, search = true, add = true, onSelect, placeholder = '请输入' } = props;
  const [isMap, setIsMap] = useState(false);
  const [selected, setSelected] = useState<any[]>([]);
  const [source, setSource] = useState<any[]>([]);

  const inputRef = useRef<any>(null);
  const [isShowDrop, setIsShowDrop] = useState(false);

  const handleChecked = (e: any, fidx: any, val: any) => {
    const coDa = source.slice();
    coDa[fidx].checked = e;
    const coSe = selected.slice();
    if (e) {
      coSe.push(coDa[fidx]);
      setSelected(coSe);
    } else {
      const d = coSe.filter((el: any) => el.id !== val);
      setSelected(d);
    }
    setSource(coDa);
  };

  const getParentColumnsList = (parentId?: number) => {
    return getColumnsList({
      parentId,
      type: parentId === 0 ? 'PLATFORM_CATEGORY' : 'DISEASE_CATEGORY',
      pageNo: 1,
      pageSize: 999,
    }).then((res: any) => {
      if (res.data.length) {
        if (parentId === 0) {
          getParentColumnsList(res.data[0].id);
        } else {
          checkedDefault(res.data);
        }
      }
    });
  };

  const checkedDefault = (arr: any, map?: string[], filter: boolean = false) => {
    const FilD: ProjectType.LabelListRes[] = [];
    arr.forEach((el: ProjectType.LabelListRes) => {
      if (filter) {
        map?.includes(el.id) && FilD.push(el);
        if (!map?.includes(el.id)) {
          // eslint-disable-next-line no-param-reassign
          el.checked = false;
        }
        setSelected(FilD);
      } else {
        // eslint-disable-next-line no-param-reassign
        el.checked = false;
      }
    });
    console.log(arr);
    setSource(arr);
  };

  const PopoverContent = () => {
    return (
      <div className={styles['popover-content']}>
        {selected.map((el) => (
          <span className={`${styles['select-tag']} ${styles['tag-fff']}`} key={el.id}>
            {el.name}
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
    getParentColumnsList(0);
  }, []);

  useEffect(() => {
    if (isMap || !mapSour?.length) return;

    const FilD: ProjectType.LabelListRes[] = [];
    source.forEach((el: ProjectType.LabelListRes) => {
      if (mapSour?.includes(el.id)) {
        // eslint-disable-next-line no-param-reassign
        el.checked = true;
        FilD.push(el);
        setSelected(FilD);
      } else {
        // eslint-disable-next-line no-param-reassign
        el.checked = false;
      }
      setIsMap(true);
    });
  }, [mapSour, source]);

  return (
    <div className={styles['diseases-select']} style={{ width }} ref={inputRef}>
      <Popover
        overlayClassName="back-popover"
        color="rgba(0,0,0,0.70)"
        style={{ width: '320px' }}
        content={selected.length ? PopoverContent : ''}
      >
        <div
          className={`${styles['label-value']} ${selected.length ? '' : styles.placeholder}`}
          onClick={() => setIsShowDrop(true)}
        >
          {selected.map((el) => (
            <span className={styles['select-tag']} key={el.id}>
              {el.name}
              <span
                style={{ fontSize: 12, marginLeft: 5 }}
                className="iconfont icon-shibai1"
                onClick={(e) => {
                  e.stopPropagation();
                  const D = selected.filter((itm) => itm.id !== el.id);
                  setSelected(D);

                  checkedDefault(
                    source,
                    D.map((lis) => lis.id),
                    true,
                  );
                }}
              />
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
      {isShowDrop ? (
        <div
          className={`${styles['label-drop-container']} ${
            !source.length ? styles['none-data'] : ''
          }`}
          onClick={() => {
            inputRef?.current?.focus();
            setIsShowDrop(true);
          }}
        >
          <div className={styles['drop-container']}>
            <div className={`${styles['drop-father']}`}>
              {/* <div className={`${styles.father}`}>
                  <span className={styles['father-label']}>{item.name}</span>
                </div> */}
              {source.map((item, idx: number) => (
                <div
                  className={`${styles['drop-son']} 
                    ${
                      selected.map((lis: any) => lis.id).includes(item.id)
                        ? styles['son-active']
                        : ''
                    }
                    `}
                  key={item.id}
                >
                  <div
                    style={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                    onClick={() => handleChecked(!item.checked, idx, item.id)}
                  >
                    <span className={styles['son-label']}>{item.name}</span>
                    <Checkbox
                      checked={item.checked}
                      onChange={(e) => handleChecked(e.target.checked, idx, item.id)}
                    />
                  </div>
                </div>
              ))}
            </div>
            {!source.length ? <Empty /> : null}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default DiseasesSelect;
