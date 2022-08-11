import React, { useState } from 'react';
import { Button, Badge, Switch, message, Modal } from '@sinohealth/butterfly-ui-components/lib';
import { PlusCircleOutlined, VerticalAlignTopOutlined } from '@ant-design/icons';
import BaseList, { useList } from '@/components/BaseList';
import SearchForm from './components/SearchForm';
import {
  httpSlideDelete,
  httpSlideInsert,
  httpSlideListByType,
  httpSlideShow,
  httpSlideTopWeight,
  httpSlideUpdateStatus,
} from '@/services/weapp';
import { UCenter } from '@/services/weapp/data';
import { previewFile } from '@/utils';
import Carousel from './components/Carousel';
import styles from './index.less';

/**
 * 小程序管理-轮播图管理
 * @returns
 */
const Disease: React.FC = () => {
  const list: any = useList();
  const [carouselVisible, setCarouselVisible] = useState(false);
  const [isUpdateSucc, setIsUpdateSucc] = useState(false);
  const [typeSources, settypeSources] = useState<any>([]);
  const [appName, setAppName] = useState('');
  const [carouselParams, setCarouselParams] = useState<UCenter.InsertReq>({
    storageId: '',
    appCode: '',
    title: '',
  });

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

  const getDefaultParams = () => {
    return new Promise((reslove, reject) => {
      httpSlideListByType({
        type: 'wxMini',
      }).then((res: any) => {
        if (res.data.length) {
          const sour = res.data.map((item: any) => ({
            value: item.value,
            id: item.id,
          }));
          settypeSources(sour);

          list.current.searchForm.setFieldsValue({ appCode: sour[0].id });

          reslove({
            appCode: sour[0].id,
          });
        }
      });
    });
  };

  const renderActionDom = (itemData: any) => {
    return (
      <div>
        <a
          onClick={() => {
            setCarouselParams(itemData);
            setCarouselVisible(true);
          }}
        >
          修改
        </a>
        &nbsp; &nbsp;
        <a
          onClick={async () => {
            const res: any = await httpSlideDelete(itemData.id);
            if (res) {
              list.current.reloadListData(true);
            }
          }}
        >
          删除
        </a>
      </div>
    );
  };

  const Toolbar = () => {
    return (
      <Button
        type="primary"
        onClick={() => {
          setCarouselVisible(true);
          // const source = list.current.searchForm.getSource;
          const id = list.current.searchForm.getFieldValue('appCode');
          setAppName(typeSources.filter((el: any) => el.id === id)[0].value);
        }}
      >
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
      dataIndex: 'weight',
      key: 'weight',
      render(text: string, record: UCenter.carouselItem, index: number) {
        if (!record.status) {
          return '--';
        }
        return (
          <div className={styles.sortDom}>
            {/* {text} */}
            {index !== 0 && record.status === 'enable' ? (
              <VerticalAlignTopOutlined
                className={styles.upTopIcon}
                onClick={async () => {
                  if (isUpdateSucc) return;
                  setIsUpdateSucc(true);
                  message.loading({ content: '数据正在处理中, 请稍候...', key: 'updatable' });
                  const res = await httpSlideTopWeight(record.id);
                  const timer = setTimeout(() => {
                    if (res) list.current.reloadListData(true);
                    message.success({ content: '数据更新成功', key: 'updatable', duration: 1 });
                    clearTimeout(timer);
                    setIsUpdateSucc(false);
                  }, 1500);
                }}
              />
            ) : null}
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
        const isUp = text === 'enable';
        return (
          <div>
            <Badge color={text ? '#7ed321' : '#f53f3f'} text={text ? '启用' : '禁用'} />
            &nbsp;
            <Switch
              defaultChecked={isUp}
              onChange={async (e) => {
                setIsUpdateSucc(true);
                const res = await httpSlideUpdateStatus({
                  ids: [record.id],
                  status: isUp ? 'disable' : 'enable',
                });
                if (res) {
                  list.current.reloadListData(true);
                }
              }}
            />
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
        list={list}
        fetchApi={fetchAPi}
        SearchForm={SearchForm}
        getDefaultParams={getDefaultParams}
        Toolbar={Toolbar}
      />
      <Carousel
        visible={carouselVisible}
        appName={appName}
        params={{
          storageId: carouselParams.storageId,
          title: carouselParams.title,
        }}
        onCancel={() => {
          setCarouselParams({ storageId: '', appCode: '', title: '' });
          setCarouselVisible(false);
        }}
        onOk={async (v) => {
          const appCode = list.current.searchForm.getFieldValue('appCode');
          const res: any = await httpSlideInsert({ ...carouselParams, ...v, appCode });
          if (res.success) {
            list.current.reloadListData(true);
            setCarouselVisible(false);
            setCarouselParams({ storageId: '', appCode: '', title: '' });
          }
        }}
      />
    </div>
  );
};

export default Disease;
