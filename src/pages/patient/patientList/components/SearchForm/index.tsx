import React, { useState } from 'react';
import { Form, Row, Col, Button, Input, Select, Checkbox, Slider } from '@sinohealth/butterfly-ui-components/lib';
import { DownSquareOutlined, UpSquareOutlined } from '@ant-design/icons';
import style from '../../index.less';

const { Option } = Select;
const weappOptions = [
  { label: '已绑定', value: '1' },
  { label: '未绑定', value: '0' },
];

const SearchForm = (props: any = {}) => {
  const [showMore, setShowMore] = useState(false);
  return (
    <Form
      labelCol={{ xl: 6, xxl: 4 }}
      wrapperCol={{ xl: 18, xxl: 20 }}
      labelAlign="left"
      colon={false}
      {...props}
    >
      <Row gutter={[120, 24]}>
        <Col span={8}>
          <Form.Item name="name" label="档案号">
            <Input placeholder="请输入档案号" />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item name="name" label="患者姓名">
            <Input placeholder="请输入患者姓名" />
          </Form.Item>
        </Col>
        <Col span={8} style={{ textAlign: 'right' }}>
          <Button htmlType="submit">
            重置
          </Button>
          &nbsp;
          &nbsp;
          <Button type="primary" htmlType="submit">
            查询
          </Button>
          &nbsp;
          &nbsp;
          <span onClick={() => setShowMore(!showMore)}>
            { showMore ? <DownSquareOutlined className={style.searchFormIcon} /> : <UpSquareOutlined className={style.searchFormIcon} />}
          </span>
        </Col>
        { showMore && (
          <>
            <Col span={8}>
              <Form.Item name="name" label="电话号">
                <Input placeholder="请输入患者电话号码" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="name" label="患者性别">
                <Select placeholder="请选择患者性别">
                  <Option value="jack">男</Option>
                  <Option value="lucy">女</Option>
                  <Option value="Yiminghe">全部</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="name" label="患者年龄">
                <Slider range />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="name" label="管理项目">
                <Select>
                  <Option value="jack">Jack</Option>
                  <Option value="lucy">Lucy</Option>
                  <Option value="disabled" disabled>
                    Disabled
                  </Option>
                  <Option value="Yiminghe">yiminghe</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="name" label="跟进人员">
                <Select>
                  <Option value="jack">Jack</Option>
                  <Option value="lucy">Lucy</Option>
                  <Option value="disabled" disabled>
                    Disabled
                  </Option>
                  <Option value="Yiminghe">yiminghe</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="name" label="微信">
                <Checkbox.Group options={weappOptions} />
              </Form.Item>
            </Col>
          </>
        )}

      </Row>
    </Form>
  );
};

export default SearchForm;
