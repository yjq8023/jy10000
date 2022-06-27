import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Popconfirm, message } from '@sinohealth/butterfly-ui-components/lib';
import moment from 'moment';
import Upload from '@/components/Upload';
import style from './index.less';
import { deletePatientFile, getPatientFileDetail, savePatientFile } from '@/services/patient';
import { downloadFile, previewFile } from '@/utils';

function FilesItem(props: any) {
  const maxShowCount = 4;
  const { projectId, config } = props;
  const [fileList, setFileList] = useState<any>([]);
  const [showAll, setShowAll] = useState(false);
  const [params] = useSearchParams();
  const patientId = params.get('id');
  const getData = () => {
    getPatientFileDetail({
      patientId,
      projectId,
      category: config.code,
      startDate: '',
      endDate: '',
    }).then((res) => {
      setFileList(res);
    });
  };
  useEffect(() => {
    getData();
  }, [config, projectId, patientId]);
  const handleDeleteImg = (imgData: any) => {
    deletePatientFile(imgData.fileId)
      .then(() => {
        message.success('删除成功！');
        getData();
      });
  };
  const renderImgListItem = (imgData: any, index: number) => {
    if (index >= maxShowCount && !showAll) return '';
    if (!imgData.fileId) return '';
    return (
      <div className={style.imgItem} key={imgData.fileId}>
        <img src={previewFile(imgData.url)} alt="图片" />
        <div className={style.action}>
          <span>
            <span className="iconfont icon-enlarge" />
            <div>放大</div>
          </span>
          <a href={previewFile(imgData.url)} download={imgData.fieldId} target="_blank" rel="noreferrer">
            <span className="iconfont icon-download" />
            <div>
              下载
            </div>
          </a>
          <span>
            <Popconfirm
              placement="bottomLeft"
              title="确认删除图片么?"
              onConfirm={() => handleDeleteImg(imgData)}
              okText="删除"
              cancelText="取消"
            >
              <span className="iconfont icon-delete" />
              <div>删除</div>
            </Popconfirm>
          </span>
        </div>
      </div>
    );
  };
  const handleUpload = (file: any) => {
    savePatientFile({
      patientId,
      projectId,
      category: config.code,
      url: file.response.data,
      fileName: file.name,
      uploadDate: moment().format('YYYY-MM-DD HH:mm:ss'),
    }).then(() => {
      message.success('保存图片成功');
      getData();
    });
  };
  return (
    <div className={style.filesItem}>
      <div className="but-title">{config.name}</div>
      <div className={style.imgListBox}>
        <Upload listType="picture" showUploadList={false} multiple maxSize={5} maxCount={10} onUpload={handleUpload}>
          <div className={[style.imgItem, style.uploadBtn].join(' ')}>
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
        { fileList.map(renderImgListItem) }
        {
          fileList.length > maxShowCount && (
            <div className={[style.imgItem, style.showAllBtn].join(' ')}>
              <img src={previewFile(fileList[maxShowCount].url)} alt="图片" />
              <div className={style.action} onClick={() => setShowAll(!showAll)}>
                +{ fileList.length }
                <div>
                  { !showAll ? '查看全部' : '折叠'}
                </div>
              </div>
            </div>
          )
        }
      </div>
    </div>
  );
}

export default FilesItem;
