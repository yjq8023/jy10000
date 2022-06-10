import React from 'react';
import { Button, Badge, Switch, Tabs, Row, Col, Select, Form, Input } from '@sinohealth/butterfly-ui-components/lib';
import { PlusCircleOutlined } from '@ant-design/icons';
import BaseList, { paginationType } from '@/components/BaseList';

const { TabPane } = Tabs;
const { Option } = Select;
function WeappProject() {
  const fetchAPi = (params: any) => {
    console.log('params');
    console.log(params);
    return new Promise<{listData: any[], pagination: any}>((res) => {
      // @ts-ignore
      const data = [
        { name: '小红', sort: 1, status: 1, id: 1 },
        { name: '小绿', sort: 2, status: 0, id: 2 },
        { name: '小绿2', sort: 32, status: 1, id: 3 },
        { name: '小绿3', sort: 2, status: 1, id: 4 },
        { name: '小绿4', sort: 2, status: 0, id: 5 },
        { name: '小绿5', sort: 32, status: 0, id: 6 },
        { name: '小绿6', sort: 22, status: 0, id: 7 },
        { name: '小绿7', sort: 2, status: 0, id: 8 },
        { name: '小绿8', sort: 12, status: 1, id: 9 },
      ];
      res({
        listData: data,
        pagination: {
          current: params.current,
          pageSize: params.pageSize,
          total: 100,
        },
      });
    });
  };
  const Toolbar = () => {
    return <Button type="primary"><PlusCircleOutlined />新建栏目病种</Button>;
  };
  const renderActionDom = (itemData: any) => {
    return (
      <div>
        <a>编辑</a>
        &nbsp;
        &nbsp;
        <a>删除</a>
      </div>
    );
  };
  const columns = [
    {
      title: '序号',
      dataIndex: 'index',
      key: 'index',
      render(text: string, record: any, index: number): JSX.Element {
        return <span>{index + 1}</span>;
      },
    },
    {
      title: '病种名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '排序',
      dataIndex: 'sort',
      key: 'sort',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render(text: string, record: any) {
        const isUp = Number(text) === 1;
        return (
          <div>
            <Badge color={isUp ? '#217ba0' : 'yellow'} text={isUp ? '上架' : '下架'} />
            &nbsp;
            <Switch />
          </div>
        );
      },
    },
    {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      render(text: string, record: any) {
        return renderActionDom(record);
      },
    },
  ];
  const ListTitleRef = (props: any) => {
    const { onChange } = props;
    const onSelectedTab = (val: any) => {
      onChange({ tab: val });
    };
    return (
      <Tabs onChange={onSelectedTab}>
        <TabPane tab="健康管理服务" key="1" />
        <TabPane tab="健康管理服务2" key="2" />
      </Tabs>
    );
  };
  const SearchForm = (props: any = {}) => {
    const { form } = props;
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
            <Form.Item name="name" label="项目查询">
              <Input placeholder="请输入项目名称" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="name2" label="所属病种">
              <Select style={{ width: '100%' }}>
                <Option value="jack">Jack</Option>
                <Option value="lucy">Lucy</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={8} style={{ textAlign: 'right' }}>
            <Button onClick={() => form.resetFields()}>
              重置
            </Button>
            &nbsp;
            &nbsp;
            <Button type="primary" htmlType="submit">
              查询
            </Button>
          </Col>

        </Row>
      </Form>
    );
  };
  return (
    <div>
      <BaseList ListTitle={ListTitleRef} columns={columns} fetchApi={fetchAPi} Toolbar={Toolbar} SearchForm={SearchForm} />
    </div>
  );
}

export default WeappProject;
