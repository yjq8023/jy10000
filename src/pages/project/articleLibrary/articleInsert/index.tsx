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
  Upload,
} from '@sinohealth/butterfly-ui-components/lib';
import BraftEditor from 'braft-editor';
import 'braft-editor/dist/index.css';
import styles from './index.less';
import LabelSelect from '../../components/LabelSelect';
import { httpContentUpdate } from '@/services/project';
import { getLocalStorage, removeLocalStorage } from '@/utils/cookies';
import UploadCover from '../components/UploadCover';
import { previewFile } from '@/utils';

const controls: any = [
  'bold',
  'italic',
  'underline',
  'text-color',
  'separator',
  'link',
  'separator',
  'media',
];

/**
 * 文章库-新增文章
 * @returns
 */
const ArticleInsert: React.FC = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [editorState, setEditorState] = useState(BraftEditor.createEditorState(''));
  const [insertParams, setInsertParams] = useState<ProjectType.ContentReq>({});
  const [loading, setLoading] = useState(false);

  const handleChangeContent = (state: any) => {
    setEditorState(state);
    form.setFieldsValue({ content: state.toHTML() });
  };

  const handleSaveContent = () => {
    form
      .validateFields()
      .then(() => {
        console.log(form.getFieldsValue());
        const { content, title, labelIds, storageId, author } = form.getFieldsValue();

        if (loading) return;
        httpContentUpdateReq({ content, title, labelIds, storageId, author });
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

  const extendControls: any = [
    {
      key: 'antd-uploader',
      type: 'component',
      component: (
        <Upload accept="image/*" showUploadList={false}>
          {/* 这里的按钮最好加上type="button"，以避免在表单容器中触发表单提交，用Antd的Button组件则无需如此 */}
          <Button className="control-item button upload-button" data-title="插入图片" />
        </Upload>
      ),
    },
  ];

  useEffect(() => {
    const D = getLocalStorage('ARTICLE_DATA');
    setInsertParams(D || {});
    console.log(D);
    if (!D) return;

    const { title, content, author, labelVoList } = D;
    form.setFieldsValue({
      title,
      content: BraftEditor.createEditorState(content),
      author,
      labelIds: labelVoList.map((el: any) => el.id),
    });
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
                      callback();
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
              <Form.Item labelCol={{ span: 2 }} name="content" label="文章内容">
                <BraftEditor
                  className="my-editor"
                  // controls={controls}
                  value={editorState}
                  placeholder="请输入正文内容"
                  extendControls={extendControls}
                  onChange={(v) => handleChangeContent(v)}
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
