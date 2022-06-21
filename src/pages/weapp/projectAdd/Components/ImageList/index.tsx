import React, { useState } from 'react';
import { ArrowUpOutlined, DeleteOutlined } from '@ant-design/icons';
import style from './index.less';
import CustomUpload from '@/components/Upload';

function ImageList(props: any) {
  const [imageList, setImageList] = useState(props.value);
  const handleDelete = (item: any, index: number) => {
    imageList.splice(index, 1);
    console.log(imageList);
    setImageList([...imageList]);
  };
  const handleSortUp = (item: any, index: number) => {
    const data: any = imageList.splice(index, 1);
    imageList.splice(index - 1, 0, data[0]);
    setImageList([...imageList]);
  };
  const renderImageListItem = (item: any, index: number) => {
    return (
      <div className={style.item} key={item}>
        <img src={item} alt="图片" />
        <div className={style.action}>
          <span>{index + 1}</span>
          { index > 0 && <ArrowUpOutlined onClick={() => handleSortUp(item, index)} />}
          <DeleteOutlined onClick={() => handleDelete(item, index)} />
        </div>
      </div>
    );
  };
  const handleChange = (val: any) => {
    setImageList(val);
    props.onChange && props.onChange(val);
  };
  return (
    <div>
      <CustomUpload onChange={handleChange} showUploadList={false} maxCount={10} listType="picture">
        <div className={style.uploadBtn}>
          <div className={style.icon}>
            <span className="iconfont icon-image" />
            <div>
              上传图片
            </div>
          </div>
        </div>
      </CustomUpload>
      <div>
        <div>* 最多可上传 10 张图片</div>
        <div>* 支持 jpg/png 格式，单张图片不超过500KB</div>
        <div>* 图片规格：宽度 750px，长度不限</div>
      </div>
      <div className={style.imgList}>
        { imageList.map(renderImageListItem) }
      </div>
    </div>
  );
}

export default ImageList;
