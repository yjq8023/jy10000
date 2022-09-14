import React, { useEffect, useState } from 'react';
import {
  Button,
  Space,
  Form,
  Input,
  Row,
  Col,
  Spin,
  message,
  Modal,
} from '@sinohealth/butterfly-ui-components/lib';
import 'braft-editor/dist/index.css';
import 'braft-extensions/dist/color-picker.css';
import 'braft-extensions/dist/table.css';
import BraftEditor, { ExtendControlType } from 'braft-editor';
import { ContentUtils } from 'braft-utils';
import styles from './index.less';
import { httpContentUpdate } from '@/services/project';
import { getLocalStorage, removeLocalStorage } from '@/utils/cookies';
import { previewFile } from '@/utils';
import UploadCover from '../components/UploadCover';
import Upload from '@/components/Upload';
import NetworkModal from '../components/NetworkModal';
import PreviewDrawer from '../components/PreviewDrawer';
import useConfig, { MEDIATYPE } from './useConfig';

/**
 * 文章库-新增文章
 * @returns
 */
const ArticleInsert: React.FC = () => {
  const [form] = Form.useForm();
  const { Controls, navigateBack, handleCancelSave } = useConfig();
  const [editorState, setEditorState] = useState(BraftEditor.createEditorState(null));
  const [insertParams, setInsertParams] = useState<ProjectType.ContentReq>({});
  const [loading, setLoading] = useState(false);
  const [isEditInsert, setIsEditInsert] = useState(false);
  const [previewDrawer, setPreviewDrawer] = useState(false);
  const [networkModalVisible, setNetworkModalVisible] = useState(false);
  const [mediaSource, setMediaSource] = useState<MEDIATYPE[]>([]);

  const handleChangeContent = (state: any) => {
    setEditorState(state);
    setIsEditInsert(true);
  };

  const handleSaveContent = () => {
    form
      .validateFields()
      .then(() => {
        const { title, storageId, author } = form.getFieldsValue();

        if (loading) return;
        httpContentUpdateReq({ content: editorState.toHTML(), title, storageId, author });
      })
      .catch(() => {});
  };

  const httpContentUpdateReq = async (params: ProjectType.ContentReq) => {
    setLoading(true);
    try {
      const res: any = await httpContentUpdate({ ...insertParams, ...params });

      if (res.success) {
        message.success('数据保存成功');
        const timer = setTimeout(() => {
          navigateBack();
          setLoading(false);
          clearTimeout(timer);
        }, 1000);
      }
    } catch (err) {
      setLoading(false);
    }
  };

  const insertMedias = (lis: any) => {
    const D = ContentUtils.insertMedias(editorState, lis);
    setEditorState(D);
  };

  const ExtendControls: ExtendControlType[] = [
    'separator',
    {
      key: 'image-button',
      type: 'button',
      text: (
        <Upload
          listType="text"
          showUploadList={false}
          onUpload={(v) => {
            if (Object.keys(v).length) {
              const { response } = v;
              const url = previewFile(response.data);
              setMediaSource([
                ...mediaSource,
                { id: new Date().getTime(), url, name: '', type: 'IMAGE' },
              ]);
              insertMedias([{ type: 'IMAGE', url }]);
            }
          }}
        >
          <div className={styles['insert-img']}>上传图片</div>
        </Upload>
      ),
    },
    {
      key: 'video-button',
      type: 'button',
      text: (
        <Upload
          listType="text"
          showUploadList={false}
          accept="video/mp4"
          maxSize={10}
          uploadType="VIDEO"
          uploadSize="MB"
          onUpload={(v) => {
            if (Object.keys(v).length) {
              const { response } = v;
              const url = previewFile(response.data);
              setMediaSource([
                ...mediaSource,
                {
                  id: new Date().getTime(),
                  url,
                  name: '',
                  type: 'VIDEO',
                  data: { controls: false },
                },
              ]);
              insertMedias([{ type: 'VIDEO', url, data: { controls: false } }]);
            }
          }}
        >
          <div className={styles['insert-img']}>上传视频</div>
        </Upload>
      ),
    },
    {
      key: 'network-resources',
      type: 'button',
      text: (
        <div className={styles['insert-img']} onClick={() => setNetworkModalVisible(true)}>
          媒体库
        </div>
      ),
    },
  ];

  useEffect(() => {
    const D = getLocalStorage('ARTICLE_DATA');
    setInsertParams(D || {});
    if (!D) return;
    const { title, content, author, labelVoList } = D;
    form.setFieldsValue({
      title,
      author,
    });
    setEditorState(BraftEditor.createEditorState(content));
  }, []);

  return (
    <div className={styles['article-insert']}>
      <h4 className={styles['insert-title']}>文章内容</h4>
      <Spin spinning={loading} tip="数据正在保存, 请稍候...">
        <Form form={form} autoComplete="off" onValuesChange={() => setIsEditInsert(true)}>
          <Row gutter={24}>
            <Col span={9}>
              <Form.Item
                labelCol={{ span: 5 }}
                name="title"
                label="文章标题"
                rules={[
                  {
                    required: true,
                    validator: (_, value, callback) => {
                      if (!value) {
                        return Promise.reject(new Error('文章标题不能为空'));
                      }
                      if (value.trim().length > 50) {
                        return Promise.reject(new Error('文章标题(最多50字)'));
                      }
                      return Promise.resolve();
                    },
                  },
                ]}
              >
                <Input placeholder="请输入文章标题(最多50字)" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={9}>
              <Form.Item labelCol={{ span: 5 }} name="author" label="作者">
                <Input placeholder="请输入" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={9}>
              <Form.Item labelCol={{ span: 5 }} name="storageId" label="封面">
                <UploadCover
                  maxSize={0.5}
                  fileId={insertParams?.storageId ? previewFile(insertParams?.storageId) : ''}
                  onSuccess={(v) => {
                    form.setFieldsValue({ storageId: v });
                    setIsEditInsert(true);
                  }}
                  onDel={() => form.setFieldsValue({ storageId: '' })}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={21}>
              <Form.Item labelCol={{ span: 2 }} label="文章内容">
                <BraftEditor
                  id="editor-id"
                  value={editorState}
                  imageResizable={false}
                  imageControls={[
                    'align-left',
                    'align-center',
                    'align-right',
                    'remove',
                    {
                      render: (mediaData) => {
                        // eslint-disable-next-line no-param-reassign
                        mediaData.width = '100%';
                      },
                    },
                  ]}
                  placeholder="请输入正文内容"
                  onChange={(v) => handleChangeContent(v)}
                  controls={Controls}
                  extendControls={ExtendControls}
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
        <div className="actionBar">
          <Space>
            <Button
              type="info"
              onClick={() => {
                const { title } = form.getFieldsValue();
                if (isEditInsert && title) {
                  handleCancelSave(handleSaveContent);
                } else {
                  navigateBack();
                }
              }}
            >
              取 消
            </Button>
            <Button onClick={() => setPreviewDrawer(true)}>预 览</Button>
            <Button type="primary" onClick={() => handleSaveContent()}>
              保 存
            </Button>
          </Space>
        </div>
      </Spin>
      <PreviewDrawer
        visible={previewDrawer}
        onClose={() => setPreviewDrawer(false)}
        htmlCont={editorState.toHTML()}
        author={form.getFieldValue('author')}
        title={form.getFieldValue('title')}
      />
      <NetworkModal
        visible={networkModalVisible}
        source={mediaSource}
        onCancel={() => setNetworkModalVisible(false)}
        onOk={(v) => {
          const D: any = [];
          v.forEach((el) => {
            D.push({ type: el.type, url: el.url, data: el.data });
          });
          insertMedias(D);
          setNetworkModalVisible(false);
        }}
      />
    </div>
  );
};

export default ArticleInsert;
