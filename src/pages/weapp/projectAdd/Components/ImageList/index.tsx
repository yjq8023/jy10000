import React, { useState, useEffect } from 'react';
import { ArrowUpOutlined, DeleteOutlined } from '@ant-design/icons';
import style from './index.less';
import CustomUpload from '@/components/Upload';
import { previewFile } from '@/utils/index';

function ImageList(props: any) {
  const { value } = props;
  const [imageList, setImageList] = useState<any>([]);

  useEffect(() => {
    setImageList(value || []);
  }, [value]);

  const handleDelete = (item: any, index: number) => {
    imageList.splice(index, 1);
    handleChange([...imageList]);
  };
  const handleSortUp = (item: any, index: number) => {
    const data: any = imageList.splice(index, 1);
    imageList.splice(index - 1, 0, data[0]);
    handleChange([...imageList]);
  };
  const renderImageListItem = (item: any, index: number) => {
    return (
      <div className={style.item} key={item + index}>
        <img src={previewFile(item)} alt="图片" />
        <div className={style.action}>
          <span>{index + 1}</span>
          {index > 0 && <ArrowUpOutlined onClick={() => handleSortUp(item, index)} />}
          <DeleteOutlined onClick={() => handleDelete(item, index)} />
        </div>
      </div>
    );
  };
  const handleChange = (val: any) => {
    setImageList(val);
    props.onChange && props.onChange(val);
  };
  const onUpload = (file: any) => {
    const newValue = props.value ? [...props.value, file.response.data] : [file.response.data];
    props.onChange && props.onChange(newValue);
  };
  return (
    <div>
      <CustomUpload
        onUpload={onUpload}
        showUploadList={false}
        disabled={imageList.length >= 10}
        listType="picture"
      >
        <div className={style.uploadBtn}>
          <div className={style.icon}>
            <span className="iconfont icon-image" />
            <div>上传图片</div>
          </div>
        </div>
      </CustomUpload>
      <div className={style.tip}>
        <div>* 最多可上传 10 张图片</div>
        <div>* 支持 jpg/png 格式</div>
        <div>* 单张图片不超过1M</div>
        <div>* 图片规格：宽度 750px，长度不限</div>
      </div>
      <div className={style.imgList}>{imageList.map(renderImageListItem)}</div>
    </div>
  );
}

export default ImageList;
