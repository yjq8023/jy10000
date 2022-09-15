import React, { useState, useEffect } from 'react';
import {
  Button,
  Tabs,
  Row,
  Col,
  Form,
  Input,
  Space,
} from '@sinohealth/butterfly-ui-components/lib';
import ProjectSelect from '@/components/ProjectSelect';
import { getColumnsList } from '@/services/weapp';
import style from './index.less';
import DiseasesSelect from '../DiseasesSelect';

const { TabPane } = Tabs;

type sourceItem = {
  sourceId: string;
  sourceName: string;
};
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
    }).then((res: any) => {
      if (res.data.length) {
        setSources(
          res.data.map((item: any) => ({
            sourceName: item.name,
            sourceId: item.id,
          })),
        );

        form.setFieldsValue({
          categoryId: res.data[0].id,
        });
        setSelectedTab(res.data[0].id);
        props.form.submit();
      }
    });
  };

  const onChange = (fields: any) => {
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

  useEffect(() => {
    getParentColumnsList();
  }, []);

  return (
    <div>
      <Form labelAlign="left" colon={false} onFieldsChange={onChange} {...props}>
        <div className={style.tabHeader}>
          <Form.Item name="categoryId" noStyle>
            <Tabs>
              {sources.map((item) => (
                <TabPane tab={item.sourceName} key={item.sourceId} />
              ))}
            </Tabs>
          </Form.Item>
        </div>
        <Row
          className={style['flex-row']}
          style={{ width: 'calc(100% + 93px)' }}
          gutter={[120, 24]}
        >
          <>
            <Col span={9}>
              <Form.Item name="diseaseIds" label="所属病种">
                {/* <ProjectSelect placeholder="请选择" parentId={selectedTab} /> */}
                <DiseasesSelect
                  placeholder="请选择所属病种"
                  onSelect={(v) =>
                    form.setFieldsValue({
                      diseaseIds: v,
                    })
                  }
                />
              </Form.Item>
            </Col>
            <Col span={9}>
              <Form.Item name="name" label="项目查询">
                <Input placeholder="请输入项目名称" autoComplete="off" />
              </Form.Item>
            </Col>
          </>
          <Form.Item className={style['space-padding']} labelCol={{ span: 4 }}>
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
}

export default WeappProject;
