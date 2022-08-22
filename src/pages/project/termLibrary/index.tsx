import React, { useState } from 'react';
import {
  Button,
  Badge,
  Switch,
  message,
  Modal,
  Space,
} from '@sinohealth/butterfly-ui-components/lib';
import { PlusCircleOutlined, VerticalAlignTopOutlined } from '@ant-design/icons';
import BaseList, { useList } from '@/components/BaseList';
import styles from './index.less';
import { httpGetContent } from '@/services/project';
import TermSearch from './components/TermSearch';
import ProjectModal from './components/ProjectModal';

/**
 * 项目库管理-项目库
 * @returns
 */
const TermLibrary: React.FC = () => {
  const list: any = useList();
  const [projectModalVisible, setProjectModalVisible] = useState(false);

  const fetchAPi = (params: { current: any }) => {
    return httpGetContent({
      pageNo: params.current,
      ...params,
    }).then((res: any) => {
      return {
        listData: res.data,
        pagination: {
          current: res.pageNo,
          pageSize: res.pageSize,
          total: res.totalCount,
        },
      };
    });
  };

  const renderActionDom = (itemData: any) => {
    return (
      <Space size="middle">
        <a onClick={() => console.log(itemData)}>查看管理计划</a>
        <a onClick={() => setProjectModalVisible(true)}>基本信息</a>
        <a className={styles['del-color']} onClick={() => console.log(itemData)}>
          删除
        </a>
      </Space>
    );
  };

  const Toolbar = () => {
    return (
      <Button type="primary" onClick={() => setProjectModalVisible(true)}>
        <PlusCircleOutlined />
        添加管理项目
      </Button>
    );
  };

  const columns = [
    {
      title: '序号',
      dataIndex: 'index',
      key: 'index',
      width: 60,
      render(text: string, record: any, index: number): JSX.Element {
        return <span>{index + 1}</span>;
      },
    },
    {
      title: '管理项目名称',
      dataIndex: 'title',
      key: 'title',
      width: 200,
    },
    {
      title: '标签',
      dataIndex: 'weight',
      key: 'weight',
      width: 200,
      render(text: string, record: any, index: number) {
        if (!record.status) {
          return '--';
        }
        return (
          <Space className={styles.sortDom}>
            <div className={styles.tag}>乳腺癌</div>
            <div className={styles.tag}>肿瘤</div>
          </Space>
        );
      },
    },
    {
      title: '版本号',
      dataIndex: 'createTime',
      key: 'createTime',
      width: 140,
    },
    {
      title: '关联AI开放平台决策流名称',
      dataIndex: 'createTime',
      key: 'createTime',
      width: 200,
    },
    {
      title: '决策流标签',
      dataIndex: 'weight',
      key: 'weight',
      width: 200,
      render(text: string, record: any, index: number) {
        if (!record.status) {
          return '--';
        }
        return (
          <Space className={styles.sortDom}>
            <div className={styles.tag}>乳腺癌</div>
            <div className={styles.tag}>肿瘤</div>
          </Space>
        );
      },
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 140,
      render(text: string, record: any) {
        const isUp = text === 'enable';
        return (
          <div>
            <Badge color={isUp ? '#7ed321' : '#f53f3f'} text={text ? '启用' : '禁用'} />
            &nbsp;
            <Switch defaultChecked={isUp} onChange={async (e) => console.log(e)} />
          </div>
        );
      },
    },
    {
      title: '描述',
      dataIndex: 'createTime',
      key: 'createTime',
      width: 180,
    },
    {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      width: 180,
      align: 'right',
      fixed: 'right',
      render(text: string, record: any) {
        return renderActionDom(record);
      },
    },
  ];

  return (
    <div className={styles['term-library']}>
      <BaseList
        ListTitle="项目列表"
        BodyProps={{ scroll: { x: 2000 } }}
        columns={columns}
        list={list}
        fetchApi={fetchAPi}
        SearchForm={TermSearch}
        Toolbar={Toolbar}
        overflow={false}
      />
      <ProjectModal
        visible={projectModalVisible}
        title="添加管理项目"
        onCancel={() => setProjectModalVisible(false)}
        onOk={() => setProjectModalVisible(false)}
      />
    </div>
  );
};

export default TermLibrary;
