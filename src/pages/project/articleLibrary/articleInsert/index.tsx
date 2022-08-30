import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
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
  Drawer,
  Radio,
  Select,
} from '@sinohealth/butterfly-ui-components/lib';
import { VideoCameraOutlined, QuestionCircleFilled, PictureOutlined } from '@ant-design/icons';
import BraftEditor, { ExtendControlType } from 'braft-editor';
import { ContentUtils } from 'braft-utils';
import 'braft-editor/dist/index.css';
import styles from './index.less';
import { httpContentUpdate } from '@/services/project';
import { getLocalStorage, removeLocalStorage } from '@/utils/cookies';
import { previewFile } from '@/utils';
import LabelSelect from '../../components/LabelSelect';
import UploadCover from '../components/UploadCover';
import Upload from '@/components/Upload';
import NetworkModal from '../components/NetworkModal';

const { confirm } = Modal;

interface MEDIATYPE {
  id: number;
  url: string;
  type: 'IMAGE' | 'VIDEO';
  name: string;
}

const controls: any = [
  'headings',
  // 'font-family',
  'font-size',
  'line-height',
  'letter-spacing',
  'separator',
  'text-color',
  'bold',
  'text-align',
  'text-indent',
  'separator',
  'list-ol',
  'list-ul',
  'italic',
  'strike-through',
  'superscript',
  'subscript',
  'underline',
  'separator',
  // 'blockquote',
  // 'code',
  // 'emoji',
  'hr',
  'link',
  // 'media',
  'separator',
  'remove-styles',
  'clear',
  'separator',
  'fullscreen',
  'undo',
  'redo',
];

/**
 * 文章库-新增文章
 * @returns
 */
const ArticleInsert: React.FC = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
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

  const handleCancelSave = () => {
    confirm({
      title: '当前编辑还未保存, 是否需要保存?',
      icon: <QuestionCircleFilled style={{ color: '#EA6868' }} />,
      okButtonProps: { danger: true },
      okText: '保存',
      cancelButtonProps: { type: 'info' },
      cancelText: '不保存',
      onOk: async () => {
        return new Promise((resolve) => {
          const timer = setTimeout(() => {
            resolve(true);
            handleSaveContent();
            clearTimeout(timer);
          }, 1000);
        }).catch(() => console.log('Oops errors!'));
      },
      onCancel() {
        navigateBack();
      },
    });
  };

  const httpContentUpdateReq = async (params: ProjectType.ContentReq) => {
    setLoading(true);
    const res: any = await httpContentUpdate({ ...insertParams, ...params });

    if (res.success) {
      message.success('数据保存成功');
      const timer = setTimeout(() => {
        navigateBack();
        setLoading(false);
        clearTimeout(timer);
      }, 1000);
    }
  };

  const insertMedias = (lis: any) => {
    const D = ContentUtils.insertMedias(editorState, lis);
    setEditorState(D);
  };

  const navigateBack = () => {
    removeLocalStorage('ARTICLE_DATA');
    navigate(-1);
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
                { id: new Date().getTime(), url, name: '', type: 'VIDEO' },
              ]);
              insertMedias([{ type: 'VIDEO', url }]);
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
      // labelIds: labelVoList.map((el: any) => el.id),
    });
    setEditorState(BraftEditor.createEditorState(content));
  }, []);

  useEffect(() => {
    const listener = (ev: any) => {
      ev.preventDefault();
      // eslint-disable-next-line no-param-reassign
      ev.returnValue = '文章还未保存，确定离开吗？';
    };
    window.addEventListener('beforeunload', listener);
    return () => {
      removeLocalStorage('ARTICLE_DATA');
      window.removeEventListener('beforeunload', listener);
    };
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
                  { required: true, message: '请输入文章标题(最多50字)' },
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
          {/* <Row gutter={24}>
            <Col span={9}>
              <Form.Item labelCol={{ span: 5 }} name="labelIds" label="标签">
                <LabelSelect
                  search={false}
                  width="357px"
                  placeholder="请选择标签"
                  mapSour={form.getFieldValue('labelIds')}
                  onSelect={(v) => {
                    form.setFieldsValue({
                      labelIds: v,
                    });
                    setIsEditInsert(true);
                  }}
                />
              </Form.Item>
            </Col>
          </Row> */}
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
                  value={editorState}
                  placeholder="请输入正文内容"
                  onChange={(v) => handleChangeContent(v)}
                  controls={controls}
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
                  handleCancelSave();
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
      <Drawer
        className={styles['phone-drawer']}
        closable={false}
        placement="right"
        visible={previewDrawer}
        onClose={() => setPreviewDrawer(false)}
      >
        <div className={styles.header}>
          <span className={styles.title}>浏览内容</span>
          <span
            className={`${styles.icon} iconfont icon-shibai1`}
            onClick={() => setPreviewDrawer(false)}
          />
        </div>
        <div className={styles['phone-header']} />
        <div className={styles['phone-model']}>
          <h4 className={styles['content-title']}>{form.getFieldValue('title')}</h4>
          <div
            className={styles.container}
            dangerouslySetInnerHTML={{ __html: editorState.toHTML() }}
          />
          <div className={styles.author}>{form.getFieldValue('author')}</div>
          <div className={styles.time}>更新时间：{moment().format('YYYY-MM-DD')}</div>
        </div>
      </Drawer>
      <NetworkModal
        visible={networkModalVisible}
        source={mediaSource}
        onCancel={() => setNetworkModalVisible(false)}
        onOk={(v) => {
          const D: any = [];
          v.forEach((el) => {
            D.push({ type: el.type, url: el.url });
          });
          insertMedias(D);
          setNetworkModalVisible(false);
        }}
      />
    </div>
  );
};

export default ArticleInsert;
