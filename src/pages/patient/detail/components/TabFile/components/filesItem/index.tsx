import React from 'react';
import Upload from '@/components/Upload';
import style from './index.less';

function FilesItem() {
  return (
    <div className={style.filesItem}>
      <div className="but-title">病历报告</div>
      <Upload listType="picture">
        <div className={style.uploadBtn}>
          <div className={style.uploadBtnContent}>
            <span className="iconfont icon-image" />
            <div className={style.uploadText}>上传图片</div>
            <div>
              <div>
                单次最多可同时上传10张
              </div>
              <div>
                单张图片不超过5MB，图片上传支持
              </div>
              <div>
                jpg/png 格式
              </div>

            </div>
          </div>
        </div>
      </Upload>
    </div>
  );
}

export default FilesItem;
