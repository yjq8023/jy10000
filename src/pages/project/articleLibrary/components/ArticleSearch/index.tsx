import React, { useState } from 'react';
import { Row, Col, Form, Input, Button, Space } from '@sinohealth/butterfly-ui-components/lib';
import LabelSelect from '@/pages/project/components/LabelSelect';
import styles from './index.less';

/**
 * 文章库-查询
 * @returns
 */
const ArticleSearch: React.FC = (props: any) => {
  const onReset = () => {
    props.form.resetFields();
    props.form.submit();
  };

  return (
    <div className={styles['article-search']}>
      <Form labelAlign="left" colon={false} {...props}>
        <Row
          className={styles['flex-row']}
          style={{ width: 'calc(100% + 93px)' }}
          gutter={[120, 24]}
        >
          <>
            <Col span={9}>
              <Form.Item name="title" label="文章标题">
                <div className={styles.search}>
                  <Input placeholder="请输入文章标题" />
                </div>
              </Form.Item>
            </Col>
            <Col span={9}>
              <Form.Item name="labelIds" label="选择标签">
                <LabelSelect
                  search={true}
                  add={false}
                  onSelect={(v) =>
                    props.form.setFieldsValue({
                      labelIds: v,
                    })
                  }
                />
              </Form.Item>
            </Col>
          </>
          <Form.Item className={styles['space-padding']}>
            <Space>
              <Button type="info" onClick={() => onReset()}>
                重置
              </Button>
              <Button type="primary" htmlType="submit">
                查询
              </Button>
            </Space>
          </Form.Item>
        </Row>
      </Form>
    </div>
  );
};

export default ArticleSearch;
