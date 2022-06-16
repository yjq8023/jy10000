import React, { useState } from 'react';
import { Form, Row, Col, Button, Input, Select, Checkbox, Slider } from '@sinohealth/butterfly-ui-components/lib';
import { DownSquareOutlined, UpSquareOutlined } from '@ant-design/icons';
import style from '../../index.less';

const { Option } = Select;
const weappOptions = [
  { label: '已绑定', value: '1' },
  { label: '未绑定', value: '0' },
];

type getPatientListParams = {
  number: string;
  patientName: string;
  phone: string;
  sex: string;
  startAge: string;
  endAge: string;
  projectId: string;
  caseManagerId: string;
  wxBindStatus: string;
}
const SearchForm = (props: any = {}) => {
  const [showMore, setShowMore] = useState(false);
  return (
    <Form
      labelCol={{ xl: 7 }}
      wrapperCol={{ xl: 17 }}
      labelAlign="left"
      colon={false}
      {...props}
    >
      <Row gutter={[60, 24]}>
        <Col span={6}>
          <Form.Item name="number" label="档案号">
            <Input placeholder="请输入档案号" />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item name="patientName" label="患者姓名">
            <Input placeholder="请输入患者姓名" />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item name="phone" label="患者手机">
            <Input placeholder="请输入患者手机号码" />
          </Form.Item>
        </Col>
        <Col span={6} style={{ textAlign: 'right' }}>
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
            <Col span={6}>
              <Form.Item name="sex" label="患者性别">
                <Select placeholder="请选择患者性别">
                  <Option value="man">男</Option>
                  <Option value="female">女</Option>
                  <Option value="">全部</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Row>
                <Col span={12}>
                  <Form.Item name="startAge" label="年龄范围" labelCol={{ xl: 14 }}>
                    <Input style={{ width: '100px' }} placeholder="开始年龄" />
                    {/* <span style={{ width: '40px', textAlign: 'center', display: 'inline-block' }}>--</span> */}
                  </Form.Item>
                </Col>
                <Col span={4}>
                  <div style={{ textAlign: 'right' }}>--</div>
                </Col>
                <Col span={8}>
                  <Form.Item name="endAge" label="患者年龄" noStyle>
                    <Input style={{ width: '100px', float: 'right' }} placeholder="结束年龄" />
                  </Form.Item>
                </Col>
              </Row>
            </Col>
            <Col span={6}>
              <Form.Item name="wxBindStatus" label="微信">
                <Checkbox.Group options={weappOptions} />
              </Form.Item>
            </Col>
            <Col span={6} />
            <Col span={6}>
              <Form.Item name="projectId" label="管理项目">
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
            <Col span={6}>
              <Form.Item name="caseManagerId" label="个案管理师">
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
          </>
        )}

      </Row>
    </Form>
  );
};

export default SearchForm;
