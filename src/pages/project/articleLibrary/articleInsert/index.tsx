import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  Space,
  Form,
  Input,
  Row,
  Col,
  Spin,
  message,
} from '@sinohealth/butterfly-ui-components/lib';
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

const controls: any = [
  'headings',
  'font-family',
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
  'blockquote',
  'code',
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

  const handleChangeContent = (state: any) => {
    setEditorState(state);
  };

  const handleSaveContent = () => {
    form
      .validateFields()
      .then(() => {
        const { title, labelIds, storageId, author } = form.getFieldsValue();

        if (loading) return;
        httpContentUpdateReq({ content: editorState.toHTML(), title, labelIds, storageId, author });
      })
      .catch(() => {});
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

  const navigateBack = () => {
    removeLocalStorage('ARTICLE_DATA');
    navigate(-1);
  };

  const ExtendControls: ExtendControlType[] = [
    {
      key: 'image-button',
      type: 'button',
      text: (
        <Upload
          listType="text"
          showUploadList={false}
          onChange={(v) => {
            if (v.length && typeof v[0] === 'string') {
              const D = ContentUtils.insertMedias(editorState, [
                { type: 'IMAGE', url: previewFile(v[0]) },
              ]);
              setEditorState(D);
            }
          }}
        >
          <div className={styles['insert-img']}>插入图片</div>
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
          onChange={(v) => {
            if (v.length && typeof v[0] === 'string') {
              const D = ContentUtils.insertMedias(editorState, [
                { type: 'VIDEO', url: previewFile(v[0]) },
              ]);
              setEditorState(D);
            }
          }}
        >
          <div className={styles['insert-img']}>插入视频</div>
        </Upload>
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
      labelIds: labelVoList.map((el: any) => el.id),
    });
    setEditorState(BraftEditor.createEditorState(content));
  }, []);

  return (
    <div className={styles['article-insert']}>
      <h4 className={styles['insert-title']}>文章内容</h4>
      <Spin spinning={loading} tip="数据正在保存, 请稍候...">
        <Form form={form}>
          <Row gutter={24}>
            <Col span={8}>
              <Form.Item
                labelCol={{ span: 5 }}
                name="title"
                label="文章标题"
                rules={[
                  { required: true, message: '请输入文章标题(最多50字)' },
                  {
                    required: true,
                    validator: (_, value, callback) => {
                      console.log(value);
                      if (value.trim().length > 50) {
                        callback('文章标题(最多50字)');
                      } else {
                        callback();
                      }
                    },
                  },
                ]}
              >
                <Input placeholder="请输入文章标题(最多50字)" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={8}>
              <Form.Item labelCol={{ span: 5 }} name="author" label="作者">
                <Input placeholder="请输入" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={8}>
              <Form.Item labelCol={{ span: 5 }} name="labelIds" label="标签">
                <LabelSelect
                  search={false}
                  placeholder="请选择标签"
                  mapSour={form.getFieldValue('labelIds')}
                  onSelect={(v) =>
                    form.setFieldsValue({
                      labelIds: v,
                    })
                  }
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={8}>
              <Form.Item labelCol={{ span: 5 }} name="storageId" label="封面">
                <UploadCover
                  maxSize={0.5}
                  fileId={insertParams?.storageId ? previewFile(insertParams?.storageId) : ''}
                  onSuccess={(v) => form.setFieldsValue({ storageId: v })}
                  onDel={() => form.setFieldsValue({ storageId: '' })}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={20}>
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
            <Button type="info" onClick={() => navigateBack()}>
              取 消
            </Button>
            <Button>预 览</Button>
            <Button type="primary" onClick={() => handleSaveContent()}>
              保 存
            </Button>
          </Space>
        </div>
      </Spin>
    </div>
  );
};

export default ArticleInsert;
