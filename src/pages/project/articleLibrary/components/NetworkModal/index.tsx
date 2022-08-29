import React, { useEffect, useState } from 'react';
import {
  Space,
  Select,
  Input,
  Button,
  message,
  Empty,
} from '@sinohealth/butterfly-ui-components/lib';
import SimpleModal from '@/components/SimpleModal';
import styles from './index.less';
import { validateUrl } from '@/utils/validate';

const { Option } = Select;

interface MEDIATYPE {
  id: number;
  url: string;
  type: 'IMAGE' | 'VIDEO';
  name: string;
}

type NetworkModalProps = {
  visible?: boolean;
  source: MEDIATYPE[];
  onOk?: (v: MEDIATYPE[]) => void;
  onCancel?: () => void;
};

/**
 * 添加网络资源
 * @returns
 */
const NetworkModal: React.FC<NetworkModalProps> = (props) => {
  const { visible, source, onOk, onCancel } = props;
  const [isNetwork, setIsNetwork] = useState(false);
  const [currentType, setCurrentType] = useState<'IMAGE' | 'VIDEO'>('IMAGE');
  const [networkUrl, setNetworkUrl] = useState('');
  const [currentSelect, setCurrentSelect] = useState<MEDIATYPE[]>([]);
  const [mediaSource, setMediaSource] = useState<MEDIATYPE[]>([]);

  useEffect(() => {
    if (!visible) setCurrentSelect([]);
  }, [visible]);

  useEffect(() => {
    setMediaSource(source);
  }, [source]);

  return (
    <div className={styles['network-modal']}>
      <SimpleModal
        visible={visible}
        title="媒体库"
        okText="保 存"
        cancelButtonProps={{ type: 'info' }}
        onCancel={() => onCancel && onCancel()}
        footer={[
          <Button key="back" type="link" onClick={() => setIsNetwork(!isNetwork)}>
            {!isNetwork ? '添加网络资源' : '返回'}
          </Button>,
          !isNetwork ? (
            <Space key="network">
              <Button key="cancel" type="info" onClick={() => onCancel && onCancel()}>
                取消
              </Button>
              <Button
                key="submit"
                type="primary"
                disabled={!currentSelect.length}
                onClick={() => onOk && onOk(currentSelect)}
              >
                保存
              </Button>
            </Space>
          ) : null,
        ]}
      >
        <div className={`${styles['network-container']}`}>
          {isNetwork ? (
            <Space size="middle">
              <Select
                value={currentType}
                style={{ width: 100 }}
                onChange={(v) => setCurrentType(v)}
              >
                <Option value="IMAGE">图片资源</Option>
                <Option value="VIDEO">视频资源</Option>
              </Select>
              <Input
                value={networkUrl}
                style={{ width: 260 }}
                placeholder="http:// | https:// | 网络资源地址"
                onChange={(v: any) => setNetworkUrl(v.target.value)}
              />
              <Button
                type="primary"
                onClick={() => {
                  // if (!validateUrl(networkUrl)) {
                  //   message.error('输入的地址有问题');
                  //   return;
                  // }
                  const F = {
                    id: new Date().getTime(),
                    name: '',
                    type: currentType,
                    url: networkUrl,
                  };
                  setMediaSource([...mediaSource, F]);
                  setCurrentSelect([...currentSelect, F]);
                  setIsNetwork(false);
                  setNetworkUrl('');
                }}
              >
                确认
              </Button>
            </Space>
          ) : (
            <div className={styles['network-content']}>
              {mediaSource.map((el) => {
                return el.type === 'IMAGE' ? (
                  <div
                    className={`${styles['network-list']} ${
                      currentSelect.map((lis) => lis.id).includes(el.id)
                        ? styles['list-active']
                        : ''
                    }`}
                    key={el.id}
                    onClick={() => {
                      if (currentSelect.map((lis) => lis.id).includes(el.id)) {
                        const D = currentSelect.filter((p) => p.id !== el.id);
                        setCurrentSelect(D);
                      } else {
                        setCurrentSelect([...currentSelect, el]);
                      }
                    }}
                  >
                    {/* <PictureOutlined style={{ fontSize: 36, color: '#217BA0' }} /> */}
                    {/* <div className={styles.title}>{el.name}</div> */}
                    <div
                      className={`${styles.icon} iconfont icon-shibai1`}
                      onClick={(e) => {
                        e.stopPropagation();
                        const D = mediaSource.filter((p) => p.id !== el.id);
                        setMediaSource(D);
                      }}
                    />
                    <img className={styles['list-img']} src={el.url} alt="" />
                  </div>
                ) : (
                  <div
                    className={`${styles['network-list']} ${
                      currentSelect.map((lis) => lis.id).includes(el.id)
                        ? styles['list-active']
                        : ''
                    }`}
                    key={el.id}
                    onClick={() => {
                      if (currentSelect.map((lis) => lis.id).includes(el.id)) {
                        const D = currentSelect.filter((p) => p.id !== el.id);
                        setCurrentSelect(D);
                      } else {
                        setCurrentSelect([...currentSelect, el]);
                      }
                    }}
                  >
                    <div
                      className={`${styles.icon} iconfont icon-shibai1`}
                      onClick={(e) => {
                        e.stopPropagation();
                        const D = mediaSource.filter((p) => p.id !== el.id);
                        setMediaSource(D);
                      }}
                    />
                    <video onError={() => console.log(el.url)} onLoad={() => {}}>
                      <source src={el.url} type="video/mp4" />
                      <track src="captions_en.vtt" kind="captions" label="english_captions" />
                    </video>
                    {/* <VideoCameraOutlined style={{ fontSize: 36, color: '#217BA0' }} /> */}
                    {/* <div className={styles.title}>{el.name}</div> */}
                  </div>
                );
              })}
              {mediaSource.length ? null : <Empty description="暂无上传记录" />}
            </div>
          )}
        </div>
      </SimpleModal>
    </div>
  );
};

export default NetworkModal;
