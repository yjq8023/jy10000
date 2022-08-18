/* eslint-disable indent */
/* eslint-disable react/jsx-indent */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  Badge,
  Switch,
  Space,
  Popover,
  Modal,
  message,
} from '@sinohealth/butterfly-ui-components/lib';
import { PlusCircleOutlined, QuestionCircleFilled } from '@ant-design/icons';
import BaseList, { useList } from '@/components/BaseList';
import styles from './index.less';
import ArticleSearch from './components/ArticleSearch';
import { httpContentDelete, httpContentUpdateStatus, httpGetContent } from '@/services/project';
import { setLocalStorage } from '@/utils/cookies';

const { confirm } = Modal;

/**
 * 资料库管理-文章管理
 * @returns
 */
const ArticleLibrary: React.FC = () => {
  const navigate = useNavigate();
  const list: any = useList();
  const [isUpdateSucc, setIsUpdateSucc] = useState(false);

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
        <a
          onClick={() => {
            setLocalStorage('ARTICLE_DATA', itemData);
            navigate('/project/database/insert');
          }}
        >
          编辑
        </a>
        <a
          className={styles['del-color']}
          onClick={() => {
            confirm({
              title: `是否确定删除 "${itemData.title}" 的数据项?`,
              icon: <QuestionCircleFilled style={{ color: '#EA6868' }} />,
              okButtonProps: { danger: true },
              cancelButtonProps: { type: 'info' },
              onOk: async () => {
                const res: any = await httpContentDelete(itemData.id);

                return new Promise((resolve) => {
                  const timer = setTimeout(() => {
                    resolve(true);
                    if (res) {
                      list.current.reloadListData(true);
                      message.success('删除成功');
                    }
                    clearTimeout(timer);
                  }, 1000);
                }).catch(() => console.log('Oops errors!'));
              },
              onCancel() {},
            });
          }}
        >
          删除
        </a>
      </Space>
    );
  };

  const Toolbar = () => {
    return (
      <Button type="primary" onClick={() => navigate('/project/database/insert')}>
        <PlusCircleOutlined />
        添加文章
      </Button>
    );
  };

  const PopoverContent = (record: ProjectType.ContentRes) => {
    return (
      <div className={styles.sortDom}>
        {record.labelVoList.map((el, ids) => (
          <div className={styles.tag} key={el.id}>
            {el.name}
          </div>
        ))}
      </div>
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
          <Popover
            trigger="click"
            content={record.labelVoList.length > 2 ? () => PopoverContent(record) : ''}
          >
            <div
              className={`${styles.sortDom} ${record.labelVoList.length > 2 ? styles.pointer : ''}`}
            >
              {record.labelVoList.length
                ? record.labelVoList.map((el, ids) =>
                    ids < 2 ? (
                      <div className={styles.tag} key={el.id}>
                        {el.name}
                      </div>
                    ) : null,
                  )
                : '--'}
            </div>
          </Popover>
        );
      },
    },
    {
      title: '作者',
      dataIndex: 'author',
      key: 'author',
      width: 120,
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 130,
      render(text: string, record: any) {
        const isUp = text === 'enable';
        return (
          <Space>
            <Badge color={isUp ? '#7ed321' : '#f53f3f'} text={isUp ? '启用' : '禁用'} />
            <Switch
              checked={isUp}
              onChange={async () => {
                try {
                  if (isUpdateSucc) return;
                  setIsUpdateSucc(true);
                  const res = await httpContentUpdateStatus({
                    ids: [record.id],
                    status: isUp ? 'disable' : 'enable',
                  });
                  if (res) {
                    list.current.reloadListData(true);
                    setIsUpdateSucc(false);
                  }
                } catch (err) {
                  setIsUpdateSucc(false);
                }
              }}
            />
          </Space>
        );
      },
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
      width: 140,
    },
    {
      title: '最后一次更新时间',
      dataIndex: 'updateTime',
      key: 'updateTime',
      width: 140,
    },
    {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      width: 100,
      align: 'right',
      fixed: 'right',
      render(text: string, record: any) {
        return renderActionDom(record);
      },
    },
  ];

  return (
    <div className={styles['article-library']}>
      <BaseList
        ListTitle="文章列表"
        BodyProps={{ scroll: { x: 1600 } }}
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