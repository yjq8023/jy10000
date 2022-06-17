import React, { useState } from 'react';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { message, Upload, UploadProps } from '@sinohealth/butterfly-ui-components/lib';

import { getBase64 } from '@/utils';
import { getToken } from '@/utils/cookies';
import { baseURL } from '@/config/base';

const CustomUpload: React.FC<UploadProps> = (props) => {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>上传图片</div>
    </div>
  );

  const handleChange = (data: any) => {
    console.log(data);
  };
  const uploadProps: UploadProps = {
    name: 'file',
    action: `${baseURL}api/oss/upload/ALIYUN`,
    headers: {
      Authorization: getToken() || '',
    },
    accept: 'image/png, image/jpeg',
    listType: 'picture-card',
    showUploadList: false,
    itemRender() {
      return '';
    },
    onChange(info: any) {
      if (info.file.status === 'uploading') {
        setLoading(true);
        return;
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} 上传成功`);
        console.log(info);
        console.log(info.file.response.result);
        handleChange(info.file.response.result);
        getBase64(info.file.originFileObj, (uri: string) => {
          setImageUrl(uri);
        });
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} 上传失败`);
      }
    },
    beforeUpload(file: any) {
      const isLt1M = file.size / 1024 / 1024 < 1;
      if (!isLt1M) {
        message.error('上传头像不能大于1MB!');
      }
      return isLt1M;
    },
    ...props,
  };
  return (
    <Upload {...uploadProps}>
      {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
    </Upload>
  );
};

export default CustomUpload;
