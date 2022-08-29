import React, { useEffect, useState } from 'react';
import { message, Upload, UploadProps } from '@sinohealth/butterfly-ui-components/lib';
import { UploadOutlined, DeleteOutlined } from '@ant-design/icons';
import { baseURL, scope } from '@/config/base';
import styles from './index.less';
import { getToken } from '@/utils/cookies';
import { getBase64 } from '@/utils';

const defaultAccepts = 'image/png, image/jpeg';

interface CustomUploadProps extends UploadProps {
  fileId?: string;
  onSuccess: (values: any) => void;
  onDel: () => void;
  maxSize: number;
}

/**
 * 上传封面
 * @returns
 */
const UploadCover: React.FC<CustomUploadProps> = (props) => {
  const { maxSize, fileId, onSuccess, onDel } = props;
  const [imgBase64, setImgBase64] = useState('');

  const uploadProps: UploadProps = {
    name: 'file',
    action: `${baseURL}cs/file/public/upload`,
    headers: {
      authorization: getToken() || '',
      scope,
      app: 'sdc-hccm-backend',
    },
    itemRender() {
      return '';
    },
    accept: defaultAccepts,
    onRemove: () => {},
    onChange(info: any) {
      if (info.file.status === 'done') {
        getBase64(info.file.originFileObj, (imageUrl: string) => {
          setImgBase64(imageUrl);
        });
        onSuccess(info.file.response.data);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} 上传失败`);
      }
    },
    beforeUpload: async (file: any) => {
      const accepts = defaultAccepts;
      if (accepts.indexOf(file.type) === -1) {
        message.error(`文件类型仅限${accepts}!`);
        return false;
      }
      const isLt1M = file.size / 1024 / 1024 < maxSize;
      if (!isLt1M) {
        message.error('上传图片不能大于500KB!');
      }
      return isLt1M;
    },
  };

  const handleDelBase64 = () => {
    setImgBase64('');
    onDel && onDel();
  };

  const UploadContainer = () => {
    return (
      <div className={styles['upload-container']}>
        <UploadOutlined
          style={{ fontSize: 30, color: '#217BA0' }}
          className={styles['upload-icon']}
        />
        <div className={styles['upload-title']}>上传图片</div>
        <div className={styles['upload-tip']}>
          最多可上传1张图片，图片支持上传jpg/png格式，单个图片不超过500KB。
        </div>
      </div>
    );
  };

  useEffect(() => {
    setImgBase64(fileId || '');
  }, [fileId]);

  return (
    <div className={styles['upload-cover']}>
      {!imgBase64 ? (
        <Upload {...uploadProps}>{UploadContainer()}</Upload>
      ) : (
        <div className={styles['upload-preview']}>
          <img className={styles['del-img']} src={imgBase64} alt="封面" />
          <div className={styles.delete} onClick={() => handleDelBase64()}>
            <DeleteOutlined style={{ fontSize: 24 }} className={styles['del-icon']} />
            <div className={styles['del-title']}>删除图片</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadCover;
