import React, { useEffect, useRef, useState } from 'react';
import {
  Button,
  Checkbox,
  Empty,
  Form,
  Input,
  message,
  Popover,
  Space,
} from '@sinohealth/butterfly-ui-components/lib';
import { PlusCircleOutlined, CloseOutlined } from '@ant-design/icons';
import { throttle } from 'lodash';
import { httpGetLabelList, httpSaveOrUpdateList } from '@/services/project';
import SimpleModal from '@/components/SimpleModal';
import styles from './index.less';

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
  const [form] = Form.useForm();
  const { width, mapSour, search = true, add = true, onSelect, placeholder = '请输入' } = props;
  const [isMap, setIsMap] = useState(false);
  const [labelModalVisiable, setLabelModalVisiable] = useState(false);
  const [selected, setSelected] = useState<ProjectType.LabelListRes[]>([]);
  const [source, setSource] = useState<ProjectType.LabelListRes[]>([]);
  const [searchValue, setSearchValue] = useState('');

  const inputRef = useRef<any>(null);
  const [isShowDrop, setIsShowDrop] = useState(false);

  const handleChecked = (
    sor: ProjectType.LabelListRes[],
    e: any,
    fidx: any,
    sidx: any,
    val: any,
  ) => {
    const coDa = rebuildTreeData(sor.slice(), searchValue);
    coDa[fidx].children[sidx].checked = e;
    const coSe = selected.slice();
    if (e) {
      coSe.push(coDa[fidx].children[sidx]);
      setSelected(coSe);
      checkedDefault(
        source,
        coSe.map((el) => el.id),
        true,
      );
    } else {
      const d = coSe.filter((el: any) => el.id !== val);
      setSelected(d);
      checkedDefault(
        source,
        d.map((el) => el.id),
        true,
      );
    }
    // setSource(coDa);
  };

  // 添加标签
  const httpSaveOrUpdateListReq = async () => {
    const hide = message.loading({ content: '数据正在处理中, 请稍候...', key: 'updatable' });
    const insertParams = form.getFieldsValue() as any;
    try {
      const res: any = await httpSaveOrUpdateList(insertParams);
      if (res.success) {
        httpGetLabelListReq();
        message.loading({ content: '数据更新成功', key: 'updatable', duration: 1 });
        form.resetFields();
      }
    } catch (err) {
      // message.error({ content: '数据更新失败', key: 'updatable', duration: 1 });
      setTimeout(hide, 50);
    }
  };

  const httpGetLabelListReq = async () => {
    const res: any = await httpGetLabelList({});
    // console.log(res);
    if (!res.empty) {
      setLabelModalVisiable(false);
      checkedDefault(res.data, mapSour, true);
    }
  };

  const checkedDefault = (arr: any, map?: string[], filter: boolean = false) => {
    const FilD: ProjectType.LabelListRes[] = [];
    arr.forEach((el: ProjectType.LabelListRes) => {
      el.children.forEach((lis: ProjectType.LabelListRes) => {
        if (filter) {
          if (!map?.includes(lis.id)) {
            // eslint-disable-next-line no-param-reassign
            lis.checked = false;
          }
          if (map?.includes(lis.id)) {
            FilD.push(lis);
            // eslint-disable-next-line no-param-reassign
            lis.checked = true;
          }
          setSelected(FilD);
        } else {
          // eslint-disable-next-line no-param-reassign
          lis.checked = false;
        }
      });
    });
    setSource(arr);
  };

  const rebuildTreeData = (arr: ProjectType.LabelListRes[], value?: string) => {
    if (!arr) return [];
    if (!value) return arr;
    const newarr: ProjectType.LabelListRes[] = [];

    // arr.forEach((el: any) => {
    //   if (el.value.indexOf(value) > -1) {
    //     const ab = rebuildTreeData(el.children, value);
    //     const obj = {
    //       ...el,
    //       children: ab,
    //     };
    //     newarr.push(obj);
    //   } else if (el.children && el.children.length > 0) {
    //     const ab = rebuildTreeData(el.children, value);
    //     const obj = {
    //       ...el,
    //       children: ab,
    //     };
    //     if (ab && ab.length > 0) {
    //       newarr.push(obj);
    //     }
    //   }
    // });
    // console.log(newarr);
    arr.forEach((el) => {
      // 父级匹配
      if (el.value.includes(value)) {
        if (el.children && el.children.length) {
          const child: ProjectType.LabelListRes[] = [];
          el.children.forEach((item) => {
            if (item.value.includes(value)) {
              child.push(item);
            }
          });
          if (child.length) {
            newarr.push({ ...el, children: child });
          } else {
            newarr.push({ ...el });
          }
        }
      } else if (el.children && el.children.length) {
        const child: ProjectType.LabelListRes[] = [];
        el.children.forEach((item) => {
          if (item.value.includes(value)) {
            child.push(item);
          }
        });
        if (child.length) {
          newarr.push({ ...el, children: child });
        }
      }
    });
    return newarr;
  };

  const PopoverContent = () => {
    return (
      <>
        <h4 className={styles['tag-title']}>标签</h4>
        <div className={styles['popover-content']}>
          {selected.map((el) => (
            <span className={`${styles['select-tag']} ${styles['tag-fff']}`} key={el.id}>
              {el.value}
            </span>
          ))}
        </div>
      </>
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
        } else {
          // eslint-disable-next-line no-param-reassign
          lis.checked = false;
        }
      });
      setIsMap(true);
    });
  }, [mapSour, source]);

  return (
    <>
      <div className={styles['label-select']} style={{ width }} ref={inputRef}>
        <Popover
          color="rgba(0,0,0,0.70)"
          style={{ width: '320px' }}
          content={selected.length ? PopoverContent : ''}
        >
          <div
            className={`${styles['label-value']} ${selected.length ? '' : styles.placeholder}`}
            onClick={() => setIsShowDrop(true)}
          >
            {selected.map((el) => (
              <span className={`${styles['select-tag']}`} key={el.id}>
                {el.value}
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
        {/* <Input
        className={`${styles['label-select-input']} ${styles.placeholder}`}
        placeholder={placeholder}
        onFocus={() => setIsShowDrop(true)}
      /> */}
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
            {search ? (
              <div className={styles['drop-search']}>
                <Input
                  style={{
                    // width: add ? '100%' : '310px',
                    border: 0,
                    backgroundColor: 'rgba(0,0,0,0.04)',
                  }}
                  value={searchValue}
                  prefix={<SearchIcon />}
                  placeholder="输入标签名称进行搜索"
                  onChange={(e) => setSearchValue(e.target.value)}
                />
                {add ? (
                  <Button
                    style={{ marginLeft: 10 }}
                    icon={<PlusCircleOutlined />}
                    type="primary"
                    onClick={() => setLabelModalVisiable(true)}
                  >
                    添加
                  </Button>
                ) : null}
              </div>
            ) : null}

            <div className={styles['drop-container']}>
              {rebuildTreeData(source, searchValue)?.map((item, idx: number) => (
                <div className={`${styles['drop-father']}`} key={item.value}>
                  {/* <div className={`${styles.father}  iconfont icon-arrow-up`}> */}
                  <div className={`${styles.father}`}>
                    <span className={styles['father-label']}>{item.value}</span>
                  </div>
                  {item.children.map((el, index: number) => (
                    <div
                      className={`${styles['drop-son']} ${
                        selected.map((lis: any) => lis.id).includes(el.id)
                          ? styles['son-active']
                          : ''
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
                        onClick={() => handleChecked(source, !el.checked, idx, index, el.id)}
                      >
                        <span className={styles['son-label']}>{el.value}</span>
                        <Checkbox
                          checked={el.checked}
                          onChange={(e) =>
                            handleChecked(source, e.target.checked, idx, index, el.id)
                          }
                        />
                      </div>
                    </div>
                  ))}
                </div>
              ))}
              {!source.length ? <Empty /> : null}
            </div>
          </div>
        ) : null}
      </div>
      {labelModalVisiable ? (
        <SimpleModal
          visible={labelModalVisiable}
          title="添加标签"
          okText="添 加"
          cancelButtonProps={{ type: 'info' }}
          onCancel={() => {
            form.resetFields();
            setLabelModalVisiable(false);
          }}
          onOk={throttle(() => {
            form
              .validateFields()
              .then(() => {
                httpSaveOrUpdateListReq();
              })
              .catch(() => {});
          }, 1000)}
        >
          <Form
            name="basic"
            form={form}
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 20 }}
            onFinish={() => {}}
            onFinishFailed={() => {}}
            autoComplete="off"
          >
            <Form.Item
              label="标签分类名称"
              name="categoryName"
              rules={[
                {
                  required: true,
                  validator: (rule, value, callback) => {
                    if (!value) {
                      return Promise.reject(new Error('标签分类名称不能为空'));
                    }
                    if (value && value.trim() === '') {
                      return Promise.reject(new Error('标签分类名称不能为空'));
                    }
                    return Promise.resolve();
                  },
                },
              ]}
            >
              <Input placeholder="请输入标签分类名称" />
            </Form.Item>
            <Form.Item
              label="标签名称"
              name="name"
              rules={[
                {
                  required: true,
                  validator: (rule, value, callback) => {
                    if (!value) {
                      return Promise.reject(new Error('标签名称不能为空'));
                    }
                    if (value && value.trim() === '') {
                      return Promise.reject(new Error('标签名称不能为空'));
                    }
                    return Promise.resolve();
                  },
                },
              ]}
            >
              <Input placeholder="请输入标签名称" />
            </Form.Item>
          </Form>
        </SimpleModal>
      ) : null}
    </>
  );
};

export default LabelSelect;
