import React, { useState, useEffect } from 'react';
import {
  Radio,
  Button,
  Space,
  RadioChangeEvent,
  ModalProps,
  Modal,
} from '@sinohealth/butterfly-ui-components/lib';
import style from './index.less';
import { getUserLinkChain, switchChain } from '@/services/user';
import { setToken } from '@/utils/cookies';

interface SwitchChainModalProps extends ModalProps {
  chainId?: string;
  cancelBtnText?: string;
  onCancel?: any;
}
function SwitchChainModal(props: SwitchChainModalProps) {
  const { chainId, visible, cancelBtnText = '返回登录', onCancel, onOk } = props;
  const [value, setValue] = useState(chainId);
  const [chainList, setChainList] = useState([]);

  useEffect(() => {
    if (visible) {
      getData();
    }
  }, [visible]);
  const getData = () => {
    getUserLinkChain().then((data: any) => {
      setChainList(data);
    });
  };
  const handleOk = async () => {
    const selectedChain: any = chainList.find((item: any) => item.chainId === value);
    const newToken: any = await switchChain({
      chainId: value,
      chainName: selectedChain?.chainName,
    });
    setToken(newToken?.access_token);
    onOk && onOk(newToken);
  };
  const onChangeChain = (e: RadioChangeEvent) => {
    setValue(e.target.value);
  };
  const title = <div className={style.title}>选择所属机构</div>;
  const footer = (
    <div className={style.title}>
      <Button disabled={!value} type="primary" size="large" block onClick={handleOk}>
        开始工作
      </Button>
      <div className={style.back} onClick={onCancel}>
        {cancelBtnText}
      </div>
    </div>
  );
  return (
    <Modal
      className={style.chainModal}
      title={title}
      footer={footer}
      width={560}
      visible={visible}
      closable={false}
    >
      <Radio.Group onChange={onChangeChain} value={value}>
        <Space direction="vertical" size={24}>
          {chainList.map((item: any) => (
            <div
              className={[style.chainItem, item.chainId === value ? style.active : ''].join(' ')}
              key={item.chainId}
            >
              <Radio value={item.chainId}>{item.chainName}</Radio>
            </div>
          ))}
        </Space>
      </Radio.Group>
    </Modal>
  );
}

export default SwitchChainModal;
