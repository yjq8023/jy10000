import React, { useState, useEffect } from 'react';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { message, Upload, UploadProps } from '@sinohealth/butterfly-ui-components/lib';

import { getBase64, previewFile } from '@/utils';
import { getToken } from '@/utils/cookies';
import { baseURL, scope } from '@/config/base';

interface CustomUploadProps extends UploadProps{
  value?: any;
  onChange?: (values: any) => void;
  onUpload?: (values: any) => void;
  renderList?: any;
  maxSize?: number;
  itemRender?: (params: any) => any
}
const defaultAccepts = 'image/png, image/jpeg';
const CustomUpload: React.FC<CustomUploadProps> = (props) => {
  const { value, onChange, onUpload, renderList, children, itemRender, maxSize = 1, ...otherProps } = props;
  const [loading, setLoading] = useState(false);

  const uploadButton = children || (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>上传图片</div>
    </div>
  );

  const transformValue = (oldValues: any) => {
    let newValues: any = [];
    if (Array.isArray(oldValues)) {
      newValues = oldValues.map((item) => {
        if (typeof item === 'object') {
          return item;
        }
        return {
          uid: item,
          url: previewFile(item),
          thumbUrl: previewFile(item),
          name: item,
          status: 'done',
        };
      });
    }
    return newValues;
  };
  const handleChange = (fileList: any) => {
    onChange && onChange(fileList.map((item: any) => {
      if (item.status === 'done') {
        return item.response ? item.response.data : item.uid;
      }
      return item;
    }));
  };
  const handleRemove = (file: any) => {
    const newValue = value.filter((item: any) => {
      const key = typeof item === 'string' ? item : item.uid;
      return key !== file.uid;
    });
    onChange && onChange(newValue);
    return true;
  };
  const uploadProps: UploadProps = {
    name: 'file',
    action: `${baseURL}cs/file/public/upload`,
    headers: {
      authorization: getToken() || '',
      scope,
    },
    accept: defaultAccepts,
    listType: 'picture-card',
    onRemove: handleRemove,
    onChange(info: any) {
      handleChange(info.fileList);
      if (info.file.status === 'uploading') {
        setLoading(true);
        return;
      }
      setLoading(false);
      if (info.file.status === 'done') {
        if (onUpload) {
          onUpload(info.file);
        } else {
          message.success(`${info.file.name} 上传成功`);
        }
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} 上传失败`);
      }
    },
    beforeUpload(file: any) {
      const accepts = otherProps.accept || defaultAccepts;
      if (accepts.indexOf(file.type) === -1) {
        message.error(`文件类型仅限${accepts}!`);
        return false;
      }
      const isLt1M = file.size / 1024 / 1024 < maxSize;
      if (!isLt1M) {
        message.error(`上传图片不能大于${maxSize}MB!`);
      }
      return isLt1M;
    },
    ...otherProps,
  };
  if (value) {
    uploadProps.fileList = transformValue(value);
  }
  return (
    <Upload {...uploadProps}>
      { (!props.maxCount || !value || props.maxCount > value.length) && uploadButton }
    </Upload>
  );
};

export default CustomUpload;
