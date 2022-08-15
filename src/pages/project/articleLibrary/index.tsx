/* eslint-disable indent */
/* eslint-disable react/jsx-indent */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Badge, Switch, Space } from '@sinohealth/butterfly-ui-components/lib';
import { PlusCircleOutlined } from '@ant-design/icons';
import BaseList, { useList } from '@/components/BaseList';
import styles from './index.less';
import { UCenter } from '@/services/weapp/data';
import ArticleSearch from './components/ArticleSearch';
import { httpGetContent } from '@/services/project';

/**
 * 资料库管理-文章管理
 * @returns
 */
const ArticleLibrary: React.FC = () => {
  const navigate = useNavigate();
  const list: any = useList();

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
      <Button type="primary" onClick={() => navigate('/project/article/insert')}>
        <PlusCircleOutlined />
        添加文章
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
      width: 220,
    },
    {
      title: '标签',
      dataIndex: 'weight',
      key: 'weight',
      width: 200,
      render(text: string, record: ProjectType.ContentRes, index: number) {
        if (!record.status) {
          return '--';
        }
        return (
          <Space className={styles.sortDom}>
            {record.labelVoList.length
              ? record.labelVoList.map((el) => (
                  <div className={styles.tag} key={el.id}>
                    {el.name}
                  </div>
                ))
              : '--'}
          </Space>
        );
      },
    },
    {
      title: '作者',
      dataIndex: 'author',
      key: 'author',
      width: 180,
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
    <div className={styles['article-library']}>
      <BaseList
        ListTitle="文章列表"
        columns={columns}
        list={list}
        fetchApi={fetchAPi}
        SearchForm={ArticleSearch}
        Toolbar={Toolbar}
        overflow={false}
      />
    </div>
  );
};

export default ArticleLibrary;
