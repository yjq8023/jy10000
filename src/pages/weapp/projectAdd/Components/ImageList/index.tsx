import React, { useState } from 'react';
import { ArrowUpOutlined, DeleteOutlined } from '@ant-design/icons';
import style from './index.less';

function ImageList() {
  const [imageList, setImageList] = useState([
    {
      url: 'https://img2.baidu.com/it/u=2276108493,709526666&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=500',
    },
    {
      url: 'https://img2.baidu.com/it/u=3738718718,1291525476&fm=253&fmt=auto&app=138&f=JPEG?w=750&h=500',
    },
    {
      url: 'https://img1.baidu.com/it/u=3146245307,69937367&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=500',
    },
    {
      url: 'https://img0.baidu.com/it/u=2219661036,671777771&fm=253&fmt=auto&app=120&f=JPEG?w=1280&h=800',
    },
    {
      url: 'https://img1.baidu.com/it/u=1203852704,1902864000&fm=253&fmt=auto&app=120&f=JPEG?w=1280&h=800',
    },
  ]);
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
      <div className={style.item} key={item.url}>
        <img src={item.url} alt="图片" />
        <div className={style.action}>
          <span>{index + 1}</span>
          { index > 0 && <ArrowUpOutlined onClick={() => handleSortUp(item, index)} />}
          <DeleteOutlined onClick={() => handleDelete(item, index)} />
        </div>
      </div>
    );
  };
  return (
    <div className={style.imgList}>
      { imageList.map(renderImageListItem) }
    </div>
  );
}

export default ImageList;
