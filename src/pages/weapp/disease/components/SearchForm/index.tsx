import { Row, Col, Form, Input, Button } from '@sinohealth/butterfly-ui-components/lib';
import React from 'react';
import styles from './index.less';

/**
 * 轮播图-搜索
 * @returns
 */
const SearchForm: React.FC = (props: any) => {
  return (
    <div className={styles['search-form']}>
      <Form labelCol={{ xl: 4 }} wrapperCol={{ xl: 18 }} labelAlign="left" colon={false} {...props}>
        <Row gutter={[120, 24]}>
          <Col span={10}>
            <Form.Item name="name" label="搜索查询">
              <div className={styles.search}>
                <Input placeholder="轮播图名称" />
                <div
                  className={`${styles['search-icon']} iconfont icon-search`}
                  onClick={() => {}}
                />
              </div>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default SearchForm;
