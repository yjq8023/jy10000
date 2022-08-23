import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@sinohealth/butterfly-ui-antd';
import style from './setter.less';
import AddFormulaModal from '@/pages/formily/editor/components/Result/components/AddFormulaModal';

const ArrayRender = (props: any) => {
  const { title, data, renderItem, onAdd } = props;
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
      <div className={style.title}>
        {title}:
      </div>
      <div className={style.list}>
        { arrData.map((item: any) => {
          if (renderItem) {
            return renderItem(item);
          }
          return (
            <div className={style.item} key={item.key} onClick={() => onAdd(item)}>
              <div>{item.key}: {item.value}</div>
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
    props.onChange && props.onChange({
      ...rule,
      scope: {
        ...rule.scope,
        [data.key]: data.value,
      },
    });
  };
  const handleAddFormula = (data: any = {}) => {
    addFormulaModal.current.handleOpen({
      ...data,
      scope: rule.scope,
    });
  };
  const resultItem = () => {
    return (
      <div>
        <div>S1: Q1+Q2</div>
        <div>患有轻微抑郁，请及时就医</div>
      </div>
    );
  };
  return (
    <div className={style.resultBox}>
      <div className="but-title">
        结果配置
      </div>
      <ArrayRender title="计算公式" data={rule.scope} onAdd={handleAddFormula} />
      <ArrayRender title="结果提示" data={rule.results} renderItem={resultItem} />
      <AddFormulaModal ref={addFormulaModal} onOk={handleOk} />
    </div>
  );
};

export default ResultSetter;
