import React from 'react';
import {
  Row,
  Col,
  Form,
  Input,
  Button,
  Space,
  Select,
} from '@sinohealth/butterfly-ui-components/lib';
import styles from './index.less';
import LabelSelect from '@/pages/project/components/LabelSelect';

/**
 * 项目库-搜索
 * @returns
 */
const TermSearch: React.FC = (props: any) => {
  const onReset = () => {
    props.form.resetFields();
    props.form.submit();
  };

  return (
    <div className={styles['term-search']}>
      <Form labelAlign="left" colon={false} {...props}>
        <Row
          className={styles['flex-row']}
          style={{ width: 'calc(100% + 93px)' }}
          gutter={[120, 20]}
        >
          <>
            <Col span={9}>
              <Form.Item name="projectName" label="项目查询">
                <div className={styles.search}>
                  <Input placeholder="请输入管理项目名称" />
                </div>
              </Form.Item>
            </Col>
            <Col span={9}>
              <Form.Item name="labelIds" label="选择标签">
                <LabelSelect
                  search={true}
                  add={false}
                  onSelect={(v) => {
                    props.form.setFieldsValue({
                      labelIds: v,
                    });
                  }}
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

export default TermSearch;
