import React from 'react';
import { Button, Space, Form, Input, Row, Col } from '@sinohealth/butterfly-ui-components/lib';
import BraftEditor from 'braft-editor';
import 'braft-editor/dist/index.css';
import styles from './index.less';

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
  return (
    <div className={styles['article-insert']}>
      <h4 className={styles['insert-title']}>文章内容</h4>
      <Form>
        <Row gutter={24}>
          <Col span={8}>
            <Form.Item labelCol={{ span: 4 }} label="文章标题">
              <Input placeholder="请输入文章标题(最多50字)" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={8}>
            <Form.Item labelCol={{ span: 4 }} label="作者">
              <Input placeholder="请输入" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={8}>
            <Form.Item labelCol={{ span: 4 }} label="标签">
              <Input placeholder="请选择标签" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={8}>
            <Form.Item labelCol={{ span: 4 }} label="封面">
              <Input placeholder="请选择标签" />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item label="文章内容">
          <BraftEditor className="my-editor" controls={controls} placeholder="请输入正文内容" />
        </Form.Item>
      </Form>
      <div className="actionBar">
        <Space>
          <Button type="info">取 消</Button>
          <Button>预 览</Button>
          <Button type="primary">保 存</Button>
        </Space>
      </div>
    </div>
  );
};

export default ArticleInsert;
