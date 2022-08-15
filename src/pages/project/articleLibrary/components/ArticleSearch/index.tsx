import React, { useState } from 'react';
import { Row, Col, Form, Input, Button, Space } from '@sinohealth/butterfly-ui-components/lib';
import LabelSelect from '@/pages/project/scaleLibrary/components/LabelSelect';
import styles from './index.less';

/**
 * 文章库-查询
 * @returns
 */
const ArticleSearch: React.FC = (props: any) => {
  return (
    <div className={styles['article-search']}>
      <Form labelAlign="left" colon={false} {...props}>
        <Row style={{ width: 'calc(100% + 93px)' }} gutter={[120, 24]}>
          <Col span={9}>
            <Form.Item labelCol={{ span: 4 }} name="title" label="文章标题">
              <div className={styles.search}>
                <Input placeholder="请输入文章标题" />
              </div>
            </Form.Item>
          </Col>
          <Col span={9}>
            <Form.Item name="labelIds" label="选择标签">
              <LabelSelect
                search={false}
                add={false}
                onSelect={(v) =>
                  props.form.setFieldsValue({
                    labelIds: v,
                  })
                }
              />
            </Form.Item>
          </Col>
          <Col span={4} offset={1}>
            <Form.Item labelCol={{ span: 4 }}>
              <Space>
                <Button type="info">重置</Button>
                <Button type="primary" htmlType="submit">
                  查询
                </Button>
              </Space>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default ArticleSearch;
