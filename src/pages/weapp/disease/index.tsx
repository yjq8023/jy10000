import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Badge, Switch, message, Modal } from '@sinohealth/butterfly-ui-components/lib';
import { PlusCircleOutlined, VerticalAlignTopOutlined } from '@ant-design/icons';
import BaseList, { useList } from '@/components/BaseList';
import SearchForm from './components/SearchForm';
import styles from './index.less';
import { httpSlideShow } from '@/services/weapp';
import { UCenter } from '@/services/weapp/data';
import { previewFile } from '@/utils';
import Carousel from './components/Carousel';

/**
 * 小程序管理-轮播图管理
 * @returns
 */
const Disease: React.FC = () => {
  const navigate = useNavigate();
  const list: any = useList();
  const [carouselVisible, setCarouselVisible] = useState(false);

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
        <Link to={`edit?id=${itemData.id}`}>修改</Link>
        &nbsp; &nbsp;
        <a onClick={() => console.log(itemData.id)}>删除</a>
      </div>
    );
  };

  const Toolbar = () => {
    return (
      <Button type="primary" onClick={() => setCarouselVisible(true)}>
        <PlusCircleOutlined />
        增加轮播图
      </Button>
    );
  };

  const columns = [
    {
      title: '序号',
      dataIndex: 'index',
      key: 'index',
      width: 80,
      render(text: string, record: any, index: number): JSX.Element {
        return <span>{index + 1}</span>;
      },
    },
    {
      title: '轮播图名称',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: '图片',
      dataIndex: 'storageId',
      key: 'storageId',
      render(text: string) {
        return <img className={styles['disease-img']} src={previewFile(text)} alt="" />;
      },
    },
    {
      title: '轮播图排序',
      dataIndex: 'sort',
      key: 'sort',
      render(text: string, record: UCenter.carouselItem, index: number) {
        if (!record.status) {
          return '--';
        }
        return (
          <div className={styles.sortDom}>
            {text}
            {index !== 0 && (
              <VerticalAlignTopOutlined
                className={styles.upTopIcon}
                onClick={() => console.log(record, index)}
              />
            )}
          </div>
        );
      },
    },
    {
      title: '添加时间',
      dataIndex: 'createTime',
      key: 'createTime',
      width: 180,
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 120,
      render(text: string, record: any) {
        const isUp = text === 'ENABLE';
        return (
          <div>
            <Badge color={text ? '#7ed321' : '#f53f3f'} text={text ? '启用' : '禁用'} />
            &nbsp;
            <Switch defaultChecked={isUp} onChange={(e) => console.log(e, record)} />
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
    <div className={styles.disease}>
      <BaseList
        ListTitle="轮播图管理"
        columns={columns}
        fetchApi={fetchAPi}
        SearchForm={SearchForm}
        Toolbar={Toolbar}
      />
      <Carousel visible={carouselVisible} onCancel={() => setCarouselVisible(false)} />
    </div>
  );
};

export default Disease;
