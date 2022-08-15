import React, { useEffect, useState } from 'react';
import { Upload, message, UploadProps } from '@sinohealth/butterfly-ui-components/lib';
import { UploadOutlined, DeleteOutlined } from '@ant-design/icons';
import styles from './index.less';
import { baseURL, scope } from '@/config/base';
import { getToken } from '@/utils/cookies';
import { getBase64 } from '@/utils';

const defaultAccepts = 'image/png, image/jpeg';

/**
 * 限制图片尺寸
 * @param file 文件
 * @param width 宽
 * @param height 高
 * @returns
 */
function checkImageWH(file: any, width: number, height: number) {
  // 参数分别是上传的file，想要限制的宽，想要限制的高
  return new Promise((resolve, reject) => {
    const filereader: any = new FileReader();
    filereader.onload = (e: any) => {
      const src = e.target.result;
      const image = new Image();
      image.onload = function () {
        // eslint-disable-next-line @typescript-eslint/no-this-alias, no-underscore-dangle
        const _this: any = this;
        if (_this.width === width && _this.height === height) {
          // 上传图片的宽高与传递过来的限制宽高作比较，超过限制则调用失败回调
          resolve(true);
        } else {
          resolve(false);
        }
      };
      image.onerror = reject;
      image.src = src;
    };
    filereader.readAsDataURL(file);
  });
}

interface CustomUploadProps extends UploadProps {
  fileId?: string;
  onSuccess: (values: any) => void;
  onDel: () => void;
  maxSize: number;
}

/**
 * 轮播图管理-上传轮播图
 * @returns
 */
const CarouselUpload: React.FC<CustomUploadProps> = (props) => {
  const { maxSize, fileId, onSuccess, onDel } = props;
  const [imgBase64, setImgBase64] = useState('');
  // const [fileList, setFileList] = useState<any>([]);

  const uploadProps: UploadProps = {
    name: 'file',
    action: `${baseURL}cs/file/public/upload`,
    headers: {
      authorization: getToken() || '',
      scope,
      app: 'sdc-hccm-backend',
    },
    listType: 'picture-card',
    itemRender() {
      return '';
    },
    accept: defaultAccepts,
    onRemove: () => {},
    onChange(info: any) {
      // setFileList(info.fileList);
      if (info.file.status === 'done') {
        getBase64(info.file.originFileObj, (imageUrl: string) => {
          setImgBase64(imageUrl);
        });
        onSuccess(info.file.response.data);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} 上传失败`);
        // setFileList([]);
      }
    },
    beforeUpload: async (file: any) => {
      const accepts = defaultAccepts;
      if (accepts.indexOf(file.type) === -1) {
        // console.log(fileList);
        // setFileList([]);
        message.error(`文件类型仅限${accepts}!`);
        return false;
      }
      const isLt1M = file.size / 1024 / 1024 < maxSize;
      if (!isLt1M) {
        message.error(`上传图片不能大于${maxSize}MB!`);
        // setFileList([]);
      }
      // const res = await checkImageWH(file, 750, 336);
      // if (!res) {
      //   message.error({ message: '图片尺寸不能小于 750*336!' });
      //   return false;
      // }
      return isLt1M;
    },
  };

  const handleDelBase64 = () => {
    setImgBase64('');
    // setFileList([]);
    onDel && onDel();
  };

  useEffect(() => {
    setImgBase64(fileId || '');
  }, [fileId]);

  return (
    <div>
      {!imgBase64 ? (
        <Upload {...uploadProps} className={styles['carousel-upload']}>
          <div>
            <UploadOutlined
              style={{ fontSize: 34, color: '#B3BBBF' }}
              className={styles['upload-icon']}
            />
            <div className={styles['upload-title']}>上传图片</div>
          </div>
        </Upload>
      ) : (
        <div className={styles['upload-preview']}>
          <img className={styles['del-img']} src={imgBase64} alt="轮播图" />
          <div className={styles.delete} onClick={() => handleDelBase64()}>
            <DeleteOutlined style={{ fontSize: 24 }} className={styles['del-icon']} />
            <div className={styles['del-title']}>删除图片</div>
          </div>
        </div>
      )}

      <div className={styles['upload-tip']}>
        <div>· 支持 jpg/png 格式，单张图片不超过 1MB</div>
        <div>· 图片规范尺寸 750px * 336px</div>
        <div>· 一次只上传一张图片</div>
      </div>
    </div>
  );
};

export default CarouselUpload;
