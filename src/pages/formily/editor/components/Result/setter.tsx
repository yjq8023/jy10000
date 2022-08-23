import React, { useState, useRef, useEffect } from 'react';
import { Button, Modal } from '@sinohealth/butterfly-ui-antd';
import { DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import style from './setter.less';
import AddFormulaModal from '@/pages/formily/editor/components/Result/components/AddFormulaModal';

const ArrayRender = (props: any) => {
  const { title, data, renderItem, onAdd, onDelete } = props;
  let arrData = [];
  if (Array.isArray(data)) {
    arrData = data;
  } else if (typeof data === 'object') {
    arrData = [];
    Object.keys(data).forEach((key) => {
      arrData.push({
        key,
        value: data[key],
      });
    });
  }
  return (
    <div className={style.arrayBox}>
      <div className="but-title">
        {title}:
      </div>
      <div className={style.list}>
        { arrData.map((item: any, i: number) => {
          if (renderItem) {
            return renderItem(item, i);
          }
          return (
            <div className={style.item} key={item.key}>
              <div>
                <div onClick={() => onAdd(item)} className="text-ellipsis" style={{ width: '220px', marginRight: '10px' }}>{item.key}: {item.value}</div>
                <DeleteOutlined onClick={() => onDelete(item.key)} />
              </div>
            </div>
          );
        })}
      </div>
      <Button block onClick={() => onAdd()}>
        添加{title}
      </Button>
    </div>
  );
};
type ruleProps = {
  scope: any,
  results: { when: string, desc: string}[]
}
export const ResultSetter = (props: any) => {
  const addFormulaModal = useRef<any>(null);
  const [rule, setRule] = useState<ruleProps>({
    scope: {},
    results: [],
  });
  useEffect(() => {
    if (props.value) {
      setRule(props.value);
    }
  }, [props]);
  const handleOk = (data: any) => {
    let newData;
    if (!data.when) {
      newData = {
        ...rule,
        scope: {
          ...rule.scope,
          [data.key]: data.value,
        },
      };
    } else {
      const results = rule.results || [];
      const index = typeof data.key === 'number' ? data.key : results.length;
      results[index] = { when: data.when, desc: data.desc };
      newData = {
        ...rule,
        results,
      };
    }
    props.onChange && props.onChange(newData);
  };
  const handleAddFormula = (data: any = {}) => {
    addFormulaModal.current.handleOpen({
      ...data,
      scope: rule.scope,
    });
  };
  const handleAddResult = (data: any = {}) => {
    addFormulaModal.current.handleOpen({
      ...data,
      scope: rule.scope,
      type: 'result',
    });
  };
  const handleDeleteFormula = (key: string) => {
    Modal.confirm({
      title: '确认删除?',
      icon: <ExclamationCircleOutlined />,
      content: '删除该公式前请确认该公式没有被引用',
      okText: '删除',
      okType: 'danger',
      cancelText: '取消',
      onOk() {
        const newScope = rule.scope;
        delete newScope[key];
        props.onChange && props.onChange({
          ...rule,
          scope: newScope,
        });
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };
  const handleDeleteResult = (index: number) => {
    Modal.confirm({
      title: '确认删除?',
      icon: <ExclamationCircleOutlined />,
      content: '删除将不再显示该结果提示',
      okText: '删除',
      okType: 'danger',
      cancelText: '取消',
      onOk() {
        const newResults = rule.results;
        newResults.splice(index, 1);
        props.onChange && props.onChange({
          ...rule,
          results: newResults,
        });
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };
  const resultItem = (item: any, i: number) => {
    return (
      <div className={style.resultItem} key={i + item.when}>
        <div className={style.header}>
          <div className="text-ellipsis" onClick={() => handleAddResult({ ...item, key: i })}>提示规则：{item.when}</div>
          <DeleteOutlined onClick={() => handleDeleteResult(i)} />
        </div>
        <div className={style.desc}>提示内容：{item.desc}</div>
      </div>
    );
  };
  return (
    <div className={style.resultBox}>
      <div className={style.title}>
        结果配置
      </div>
      <ArrayRender title="计算公式" data={rule.scope} onAdd={handleAddFormula} onDelete={handleDeleteFormula} />
      <ArrayRender title="结果提示" data={rule.results} renderItem={resultItem} onAdd={handleAddResult} />
      <AddFormulaModal ref={addFormulaModal} onOk={handleOk} />
    </div>
  );
};

export default ResultSetter;
