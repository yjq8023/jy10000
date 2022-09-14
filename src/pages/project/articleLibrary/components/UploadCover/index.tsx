import React, { useEffect, useState } from 'react';
import { message, Upload, UploadProps } from '@sinohealth/butterfly-ui-components/lib';
import { UploadOutlined, DeleteOutlined } from '@ant-design/icons';
import 'cropperjs/dist/cropper.css';
import Cropper from 'react-cropper';
import { baseURL, scope } from '@/config/base';
import styles from './index.less';
import { getToken } from '@/utils/cookies';
import { getBase64 } from '@/utils';
import SimpleModal from '@/components/SimpleModal';
import { httpUploadFile } from '@/services/project';

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
  const [srcCropper, setSrcCropper] = useState('');
  const [cropperInstall, setCropperInstall] = useState<any>(null);
  const [editImageModalVisible, setEditImageModalVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

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

      if (!(file.size / 1024 / 1024 < maxSize)) {
        message.error('上传图片不能大于500KB!');
        return false;
      }

      const reader = new FileReader();
      const image: any = new Image();
      reader.readAsDataURL(file);

      reader.onload = (e: any) => {
        // onload 事件在图片加载完成后立即执行。
        image.src = reader.result;
        image.onload = () => {
          setSrcCropper(e.target.result);
          setEditImageModalVisible(true);
        };
      };

      return false;
    },
  };

  const handleSaveImg = () => {
    if (srcCropper) {
      setConfirmLoading(true);
      try {
        cropperInstall.getCroppedCanvas().toBlob((blob: any) => {
          const formData = new FormData();
          formData.append('file', blob);
          httpUploadFile(formData)
            .then((res: any) => {
              if (res.success) {
                getBase64(blob, (url: any) => {
                  setImgBase64(url);
                });
                message.success('封面上传成功');
                onSuccess(res.data);
                setEditImageModalVisible(false);
                setSrcCropper('');
                setCropperInstall(null);
                setConfirmLoading(false);
              }
            })
            .catch(() => {
              message.error('上传失败了');
              setConfirmLoading(false);
            });
        });
      } catch (err) {
        console.log(err);
        setConfirmLoading(false);
      }
    }
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
    <>
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
      <SimpleModal
        visible={editImageModalVisible}
        title="请选择剪裁区域"
        okText="确认裁剪"
        className="uploadCropper"
        style={{ top: 20 }}
        confirmLoading={confirmLoading}
        cancelButtonProps={{ type: 'info' }}
        onCancel={() => setEditImageModalVisible(false)}
        onOk={() => handleSaveImg()}
      >
        <Cropper
          src={srcCropper || ''} // 图片路径，即是base64的值，在Upload上传的时候获取到的
          onInitialized={(instance: any) => {
            setCropperInstall(instance);
          }}
          preview=".uploadCrop"
          viewMode={1} // 定义cropper的视图模式
          zoomable={false} // 是否允许放大图像
          // movable
          guides={false} // 显示在裁剪框上方的虚线
          background={false} // 是否显示背景的马赛克
          rotatable={false} // 是否旋转
          autoCropArea={1} // 默认值0.8（图片的80%）。--0-1之间的数值，定义自动剪裁区域的大小
          style={{ width: '100%', maxHeight: '100%' }}
          aspectRatio={622 / 280} // 固定为1:1  可以自己设置比例, 默认情况为自由比例
          cropBoxResizable={false} // 默认true ,是否允许拖动 改变裁剪框大小
          // cropBoxMovable  // 是否可以拖拽裁剪框 默认true
          dragMode="move" // 拖动模式, 默认crop当鼠标 点击一处时根据这个点重新生成一个 裁剪框，move可以拖动图片，none:图片不能拖动
          center
        />
      </SimpleModal>
    </>
  );
};

export default UploadCover;
