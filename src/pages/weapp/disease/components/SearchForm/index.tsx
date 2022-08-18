import React, { useEffect, useState } from 'react';
import {
  Row,
  Col,
  Form,
  Input,
  Button,
  Space,
  Select,
} from '@sinohealth/butterfly-ui-components/lib';
import { httpSlideListByType } from '@/services/weapp';
import styles from './index.less';
import { UCenter } from '@/services/weapp/data';

const { Option } = Select;

/**
 * 轮播图-搜索
 * @returns
 */
const SearchForm: React.FC<any> = (props: any) => {
  const [sources, setSources] = useState<UCenter.ListByType[]>([]);

  const httpSlideListByTypeReq = () => {
    return httpSlideListByType({
      type: 'wxMini',
    }).then((res: any) => {
      setSources(res.data);
      if (res.data.length) {
        const sour = res.data.map((item: any) => ({
          value: item.value,
          id: item.id,
        }));
        setSources(sour);
        // props.form.setFieldsValue({
        //   appCode: res.data[0].id,
        // });
        // props.form.submit();
        // eslint-disable-next-line no-param-reassign
        // props.form.getSource = sour;
      }
    });
  };
  useEffect(() => {
    httpSlideListByTypeReq();
  }, []);

  const onReset = () => {
    props.form.resetFields();
    props.form.setFieldsValue({
      appCode: sources[0].id,
    });
    props.form.submit();
  };

  return (
    <div className={styles['search-form']}>
      <Form labelAlign="left" colon={false} {...props}>
        <Row gutter={[120, 24]}>
          <Col span={9}>
            <Form.Item name="appCode" label="选择轮播图所属应用">
              <Select style={{ width: '100%' }} placeholder="选择轮播图所属应用">
                {sources.map((el: any) => (
                  <Option value={el.id} key={el.id}>
                    {el.value}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={9}>
            <Form.Item labelCol={{ span: 4 }} name="title" label="搜索查询">
              <div className={styles.search}>
                <Input placeholder="轮播图名称" />
                <div
                  className={`${styles['search-icon']} iconfont icon-search`}
                  onClick={() => {}}
                />
              </div>
            </Form.Item>
          </Col>
          <Col span={4} offset={1}>
            <Form.Item labelCol={{ span: 4 }}>
              <Space>
                <Button type="info" onClick={() => onReset()}>
                  重置
                </Button>
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

export default SearchForm;
