import React, { useState, useEffect } from 'react';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { message, Upload, UploadProps } from '@sinohealth/butterfly-ui-components/lib';

import { getBase64 } from '@/utils';
import { getToken } from '@/utils/cookies';
import { baseURL } from '@/config/base';
import add from '@/pages/patient/add';

interface CustomUploadProps extends UploadProps{
  value?: any
  onChange?: (values: any) => void
}
const CustomUpload: React.FC<CustomUploadProps> = (props) => {
  console.log('props');
  console.log(props);
  const { value, onChange, ...otherProps } = props;
  const [loading, setLoading] = useState(false);

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>上传图片</div>
    </div>
  );

  const transformValue = (oldValues: any, addFile?: any) => {
    let newValues: any = [];
    if (Array.isArray(oldValues)) {
      newValues = oldValues.map((item) => {
        if (typeof item === 'object') {
          return item;
        }
        return {
          uid: item,
          url: item,
          name: item,
        };
      });
    }
    if (addFile) {
      newValues.push({
        uid: Date.now().toString(),
        url: addFile.response.data,
        thumbUrl: addFile.thumbUrl,
        name: addFile.name,
      });
    }
    return newValues;
  };
  const handleChange = (file: any) => {
    const newValue = value ? [...value, file.response.data] : [file.response.data];
    onChange && onChange(newValue);
  };
  const uploadProps: UploadProps = {
    name: 'file',
    defaultFileList: transformValue(value),
    action: `${baseURL}backend/upload/single`,
    headers: {
      Authorization: getToken() || '',
    },
    accept: 'image/png, image/jpeg',
    listType: 'picture-card',
    itemRender(originNode, file, fileListData, actions) {
      return <div onClick={() => actions.remove()}><img src={file.thumbUrl || file.url} alt={file.name} style={{ width: '100%' }} /></div>;
    },
    onChange(info: any) {
      if (info.file.status === 'uploading') {
        setLoading(true);
        return;
      }
      setLoading(false);
      if (info.file.status === 'done') {
        message.success(`${info.file.name} 上传成功`);
        handleChange(info.file);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} 上传失败`);
      }
    },
    beforeUpload(file: any) {
      const isLt1M = file.size / 1024 / 1024 < 1;
      if (!isLt1M) {
        message.error('上传图片不能大于1MB!');
      }
      return isLt1M;
    },
    ...otherProps,
  };
  console.log('uploadProps');
  console.log(uploadProps);
  return (
    <Upload {...uploadProps}>
      { uploadButton}
    </Upload>
  );
};

export default CustomUpload;
