import React, { useState, useRef, useImperativeHandle } from 'react';
import {
  Button,
  Modal,
  Input,
  Row,
  Col,
  Tree,
  message,
} from '@sinohealth/butterfly-ui-antd';
import { useSelectedNode } from '@sinohealth/designable-react';
import { transformDataSource } from '@/pages/formily/editor/utils/schema';
import style from './index.less';

const validRule = (ruleStr: string, scope: any = {}) => {
  return new Promise((resolve, reject) => {
    try {
      // eslint-disable-next-line no-new-func
      const fn = new Function(...Object.keys(scope), `return ${ruleStr}`);
      const r = fn(...Object.keys(scope).map((key) => scope[key]));
      console.log(r);
      resolve(true);
    } catch (e) {
      reject(e);
    }
  });
};
const AddFormulaModal = (props: any, ref: any) => {
  const { onOk } = props;
  const [isResult, setIsResult] = useState(false);
  const [key, setKey] = useState();
  const [value, setValue] = useState('');
  const [code, setCode] = useState('');
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

  const varsData = [
    ...scope,
    ...dataSource,
  ];
  const handleOpen = (data: any = {}) => {
    setIsResult(data.type === 'result');
    setKey(data.key);
    if (data.type === 'result') {
      setValue(data.when || '');
      setDesc(data.desc || '');
      setCode(data.code || '');
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
    const scopeObj: any = {};
    varsData.forEach((item) => {
      scopeObj[item.value] = 1;
    });
    validRule(value, scopeObj)
      .then(() => {
        if (isResult) {
          onOk && onOk({ when: value, desc, key, code });
        } else {
          const newKey = key !== undefined ? key : `$S${scope.length + 1}`;
          onOk && onOk({ key: newKey, value });
        }
        setVisible(false);
      })
      .catch((e) => {
        console.error('公式/规则错误内容');
        console.error(e);
        message.error('公式/规则格式错误，请检查确认');
      });
  };
  const onCancel = () => {
    setVisible(false);
    props.onCancel && props.onCancel();
  };
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
    let selectedStart = selectionStart + val.length + 2; // 因为操作符合在set时默认前后加空格了，所以光标位置+2
    if (val === '()') {
      selectedStart -= 2; // 双括号光标默认位置移动到括号中间
    }
    setSelectionStart(selectedStart);
    const index = selectionStart;
    setValue(`${value.substring(0, index)} ${val} ${value.substring(index, value.length + val.length)}`);
    // 需要等dom重渲染后才去设置光标位置，否则不会生效
    setTimeout(() => {
      const dom = inputDom.current.resizableTextArea.textArea;
      dom.focus();
      dom.setSelectionRange(selectedStart, selectedStart);
    }, 300);
  };
  const renderOperator = (data: any) => {
    const titleRender = (item: any, i: number) => {
      return (
        <div key={item.value + i} onClick={() => handleSelectItem(item.value)}>
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
      title={isResult ? '添加结果提示' : '添加计算公式'}
      visible={visible}
      onOk={handleOk}
      onCancel={onCancel}
      okText="确定"
      cancelText="取消"
      width={800}
    >
      <div className={style.ruleBox}>
        <div>{ isResult ? '判断规则' : '公式='}</div>
        <Input.TextArea placeholder={isResult ? '结果提示判断规则，如：$S1 < 10' : '引用公式或编辑，如：$Q1 + $Q2'} ref={inputDom} value={value} onInput={handleInput} onBlur={handelSelectionStart} rows={4} maxLength={6} />
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
      {
        isResult && (
          <div className={style.resultConfig}>
            <Input addonBefore="评估结果" value={code} placeholder="请输入评估结果" onInput={(e: any) => setCode(e.target.value)} />
            <Input.TextArea value={desc} rows={4} maxLength={6} placeholder="请输入评估建议" onInput={(e: any) => setDesc(e.target.value)} />
          </div>
        )
      }
    </Modal>
  );
};

export default React.forwardRef(AddFormulaModal);
