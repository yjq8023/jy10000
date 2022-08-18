import React from 'react';
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
import { previewFile } from '@/utils';
import { UCenter } from '@/services/weapp/data';
import { httpSlideShow } from '@/services/weapp';
import ScaleSearch from './components/ScaleSearch';

/**
 * 资料库管理-量表库
 * @returns
 */
const scaleLibrary: React.FC = () => {
  const list: any = useList();

  const fetchAPi = (params: { current: any }) => {
    return httpSlideShow({
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
      <div>
        <a onClick={() => console.log(itemData)}>编辑</a>
        &nbsp; &nbsp;
        <a className={styles['del-color']} onClick={() => console.log(itemData)}>
          删除
        </a>
      </div>
    );
  };

  const Toolbar = () => {
    return (
      <Button type="primary" onClick={() => console.log(132132)}>
        <PlusCircleOutlined />
        添加量表
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
      title: '量表名称',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
      width: 180,
    },
    {
      title: '最后一次更新时间',
      dataIndex: 'createTime',
      key: 'createTime',
      width: 200,
    },
    {
      title: '标签',
      dataIndex: 'weight',
      key: 'weight',
      width: 200,
      render(text: string, record: UCenter.carouselItem, index: number) {
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
      width: 180,
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
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      width: 100,
      align: 'right',
      render(text: string, record: any) {
        return renderActionDom(record);
      },
    },
  ];

  return (
    <div className={styles['scale-library']}>
      <BaseList
        ListTitle="量表列表"
        columns={columns}
        list={list}
        fetchApi={fetchAPi}
        SearchForm={ScaleSearch}
        Toolbar={Toolbar}
        overflow={false}
      />
    </div>
  );
};

export default scaleLibrary;
