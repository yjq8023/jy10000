import React, { useState, useEffect } from 'react';
import { Button, Tabs, Row, Col, Form, Input } from '@sinohealth/butterfly-ui-components/lib';
import ProjectSelect from '@/components/ProjectSelect';
import { getColumnsList } from '@/services/weapp';
import style from './index.less';

const { TabPane } = Tabs;

type sourceItem = {
  sourceId: string,
  sourceName: string,
}
function WeappProject(props: any) {
  const { form } = props;
  const [sources, setSources] = useState<sourceItem[]>([]);
  const [selectedTab, setSelectedTab] = useState<any>();
  const getParentColumnsList = () => {
    return getColumnsList({
      parentId: 0,
      type: 'PLATFORM_CATEGORY',
      pageNo: 1,
      pageSize: 999,
    })
      .then((res: any) => {
        if (res.data.length) {
          setSources(res.data.map((item: any) => ({
            sourceName: item.name,
            sourceId: item.id,
          })));

          form.setFieldsValue({
            categoryId: res.data[0].id,
          });
          setSelectedTab(res.data[0].id);
          props.form.submit();
        }
      });
  };
  useEffect(() => {
    getParentColumnsList();
  }, []);
  const onChange = (fields:any) => {
    const field = fields[0];
    if (field && field.name[0] === 'categoryId') {
      setSelectedTab(field.value);
      form.setFieldsValue({
        diseaseId: null,
      });
    }
  };
  const onReset = () => {
    props.form.resetFields();
    props.form.submit();
  };
  const operations = (
    <div>
      <Button onClick={() => onReset()}>
        重置
      </Button>
      &nbsp;
      &nbsp;
      <Button type="primary" htmlType="submit">
        查询
      </Button>
    </div>
  );
  return (
    <div>
      <Form
        labelCol={{ xl: 6 }}
        wrapperCol={{ xl: 18 }}
        labelAlign="left"
        colon={false}
        onFieldsChange={onChange}
        {...props}
      >
        <div className={style.tabHeader}>
          <Form.Item name="categoryId" noStyle>
            <Tabs tabBarExtraContent={operations}>
              {
                sources.map((item) => (
                  <TabPane tab={item.sourceName} key={item.sourceId} />
                ))
              }
            </Tabs>
          </Form.Item>
        </div>
        <Row gutter={[120, 24]}>
          <Col span={8}>
            <Form.Item name="name" label="项目查询">
              <Input placeholder="请输入项目名称" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="diseaseId" label="所属病种">
              <ProjectSelect placeholder="请选择" parentId={selectedTab} />
            </Form.Item>
          </Col>

        </Row>
      </Form>
    </div>
  );
}

export default WeappProject;
