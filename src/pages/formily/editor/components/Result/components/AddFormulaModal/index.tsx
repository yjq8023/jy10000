import React, { useState, useRef, useImperativeHandle } from 'react';
import {
  Button,
  Modal,
  Input,
  Row,
  Col,
  Tree,
} from '@sinohealth/butterfly-ui-antd';
import { useSelectedNode } from '@sinohealth/designable-react';
import { transformDataSource } from '@/pages/formily/editor/utils/schema';
import style from './index.less';

const AddFormulaModal = (props: any, ref: any) => {
  const { onOk } = props;
  const [isResult, setIsResult] = useState(false);
  const [key, setKey] = useState('');
  const [value, setValue] = useState('');
  const [desc, setDesc] = useState('');
  const [scope, setScope] = useState([]);
  const [selectionStart, setSelectionStart] = useState<any>(0);
  const [visible, setVisible] = useState(false);
  const inputDom = useRef<any>(null);
  const baseNode = useSelectedNode();
  const dataSource = transformDataSource(baseNode);

  useImperativeHandle(ref, () => {
    return {
      handleOpen,
    };
  });

  const handleOpen = (data: any = {}) => {
    setIsResult(data.type === 'result');
    setKey(data.key || '');
    if (data.type === 'result') {
      setValue(data.when || '');
      setDesc(data.desc || '');
    } else {
      setValue(data.value || '');
    }
    const scopeArr: any = [];
    data.scope && Object.keys(data.scope).forEach((scopeKey: string) => {
      scopeArr.push({
        label: data.scope[scopeKey],
        value: scopeKey,
      });
    });
    setScope(scopeArr);
    setVisible(true);
  };

  const handleOk = () => {
    setVisible(false);
    if (isResult) {
      onOk && onOk({ when: value, desc, key });
    } else {
      const newKey = key || `$S${scope.length + 1}`;
      onOk && onOk({ key: newKey, value });
    }
  };
  const onCancel = () => {
    setVisible(false);
    props.onCancel && props.onCancel();
  };
  const varsData = [
    ...scope,
    ...dataSource,
  ];
  const formulaData = !isResult ?
    [
      { label: '加', value: '+' },
      { label: '减', value: '-' },
      { label: '乘', value: '*' },
      { label: '除', value: '/' },
      { label: '双括号', value: '()' },
    ]
    :
    [
      { label: '大于', value: '>' },
      { label: '小于', value: '<' },
      { label: '大于等于', value: '>=' },
      { label: '小于等于', value: '<=' },
      { label: '等于', value: '==' },
      { label: '不等于', value: '!=' },
    ];
  const handleSelectItem = (val: any) => {
    setSelectionStart(selectionStart + val.length);
    const index = selectionStart;
    setValue(value.substring(0, index) + val + value.substring(index, value.length + val.length));
    inputDom.current.focus();
  };
  const renderOperator = (data: any) => {
    const titleRender = (item: any, i: number) => {
      return (
        <div key={item.value + i} onClick={() => handleSelectItem(` ${item.value} `)}>
          <div className={style.item} title={item.title || item.label}>
            {item.value}: {item.title || item.label}
          </div>
        </div>
      );
    };
    // return <Tree treeData={data} selectable={false} titleRender={titleRender} />;
    return data.map(titleRender);
  };
  const handleInput = (e: any) => {
    setValue(e.target.value);
  };
  const handelSelectionStart = (e: any) => {
    setSelectionStart(e.target.selectionStart);
  };
  return (
    <Modal
      className={style.addFormulaModal}
      title="添加计算公式"
      visible={visible}
      onOk={handleOk}
      onCancel={onCancel}
      width={800}
    >
      <div>
        <Input.TextArea placeholder={isResult ? '结果提示判断规则，如：$S1 < 10' : '引用公式或编辑，如：$Q1 + $Q2'} ref={inputDom} value={value} onInput={handleInput} onBlur={handelSelectionStart} rows={4} maxLength={6} />
        {
          isResult && (
            <Input value={desc} placeholder="结果提示内容" onInput={(e: any) => setDesc(e.target.value)} />
          )
        }
      </div>
      <Row gutter={44}>
        <Col span={12}>
          <div className={style.vars}>
            <div>可用变量</div>
            <div className={style.body}>
              { renderOperator(varsData) }
            </div>
          </div>
        </Col>
        <Col span={12}>
          <div className={style.vars}>
            <div>计算符号</div>
            <div className={style.body}>
              { renderOperator(formulaData) }
            </div>
          </div>
        </Col>
      </Row>
    </Modal>
  );
};

export default React.forwardRef(AddFormulaModal);
