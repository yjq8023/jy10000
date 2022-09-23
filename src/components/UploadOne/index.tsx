import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { message, Upload } from '@sinohealth/butterfly-ui-antd';
import type { UploadChangeParam } from '@sinohealth/butterfly-ui-antd/es/upload';
import type { RcFile, UploadFile, UploadProps } from '@sinohealth/butterfly-ui-antd/es/upload/interface';
import React, { useEffect, useState } from 'react';
import { baseURL, scope } from '@/config/base';
import { getToken } from '@/utils/cookies';
import { previewFile } from '@/utils';

const getBase64 = (img: RcFile, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

const beforeUpload = (file: RcFile) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
};

const uploadProps = {
  name: 'avatar',
  action: `${baseURL}cs/file/public/upload`,
  headers: {
    authorization: getToken() || '',
    scope,
    app: 'sdc-admin-rbac',
  },
  accept: 'image/png, image/jpeg',
  itemRender() {
    return '';
  },
  onChange(info: any) {
    if (info.file.status === 'done') {
      message.success(`${info.file.name} 上传成功`);
      //   form.setFieldsValue({
      //     pic: info.file.response.data,
      //   });
      //   getBase64(info.file.originFileObj, (imageUrl: string) => {
      //     form.setFieldsValue({
      //       photo: imageUrl,
      //     });
      //   });
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
};

const UploadOne: React.FC<{ value?: string; onChange?: (value: string) => void }> = (props) => {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();

  useEffect(() => {
    if (props.value) {
      setImageUrl(previewFile(props.value));
    }
  }, [props.value]);

  const handleChange: UploadProps['onChange'] = (info: UploadChangeParam<UploadFile>) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      props.onChange && props.onChange(info.file.response.data);
      getBase64(info.file.originFileObj as RcFile, (url) => {
        setLoading(false);
        setImageUrl(url);
      });
    }
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <Upload
      //   name="avatar"
      listType="picture-card"
      className="avatar-uploader"
      showUploadList={false}
      //   beforeUpload={beforeUpload}
      {...uploadProps}
      onChange={handleChange}
    >
      {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
    </Upload>
  );
};

export default UploadOne;
