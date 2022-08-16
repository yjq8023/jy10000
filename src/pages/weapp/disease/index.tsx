import React, { useState } from 'react';
import {
  Button,
  Badge,
  Switch,
  message,
  Modal,
  Space,
} from '@sinohealth/butterfly-ui-components/lib';
import { PlusCircleOutlined, QuestionCircleFilled } from '@ant-design/icons';
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

const { confirm } = Modal;

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
      <Space>
        <a
          onClick={() => {
            setCarouselParams(itemData);
            setCarouselVisible(true);
          }}
        >
          修改
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
                const res: any = await httpSlideDelete(itemData.id);

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
            {index < 3 ? index + 1 : '-'}
            {index !== 0 && record.status === 'enable' ? (
              <div
                className={`${styles.upTopIcon} iconfont icon-zhiding`}
                onClick={async () => {
                  if (isUpdateSucc) return;
                  setIsUpdateSucc(true);
                  message.loading({ content: '数据正在处理中, 请稍候...', key: 'updatable' });
                  try {
                    const res = await httpSlideTopWeight(record.id);
                    const timer = setTimeout(() => {
                      if (res) list.current.reloadListData(true);
                      message.success({ content: '数据更新成功', key: 'updatable', duration: 1 });
                      clearTimeout(timer);
                      setIsUpdateSucc(false);
                    }, 1500);
                  } catch (err) {
                    setIsUpdateSucc(false);
                  }
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
                try {
                  const res = await httpSlideUpdateStatus({
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
      {carouselVisible ? (
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
      ) : null}
    </div>
  );
};

export default Disease;
