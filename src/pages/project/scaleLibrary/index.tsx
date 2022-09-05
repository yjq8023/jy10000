/* eslint-disable indent */
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Button,
  Badge,
  Switch,
  message,
  Modal,
  Space,
  Popover,
} from '@sinohealth/butterfly-ui-components/lib';
import { PlusCircleOutlined, QuestionCircleFilled } from '@ant-design/icons';
import BaseList, { useList } from '@/components/BaseList';
import styles from './index.less';
import { previewFile } from '@/utils';
import { UCenter } from '@/services/weapp/data';
import ScaleSearch from './components/ScaleSearch';
import ScaleModal from './components/ScaleModal';
import SwitchCustom from '@/components/SwitchCustom';
import {
  httpDeleteScale,
  httpScalePage,
  httpUpdateScale,
  httpUpdateStatus,
} from '@/services/project';

const { confirm } = Modal;

/**
 * 资料库管理-量表库
 * @returns
 */
const scaleLibrary: React.FC = () => {
  const list: any = useList();
  const [scaleModalVisible, setScaleModalVisible] = useState(false);
  const [isUpdateSucc, setIsUpdateSucc] = useState(false);
  const [editParams, setEditParams] = useState<ProjectType.ScalePageRes>({ labelVoList: [] });

  const fetchAPi = (params: { current: any }) => {
    return httpScalePage({
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
        <Link to={`/project/formily/editor?type=form&formId=${itemData.id}&name=${itemData.title}`}>
          编辑量表
        </Link>
        <a
          onClick={() => {
            setEditParams(itemData);
            setScaleModalVisible(true);
          }}
        >
          基本信息
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
                const res: any = await httpDeleteScale(itemData.id);

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

  const PopoverContent = (record: ProjectType.ScalePageRes) => {
    return (
      <>
        <h4 className={styles['tag-title']}>标签</h4>
        <div className={styles.sortDom}>
          {record.labelVoList.map((el, ids) => (
            <div className={`${styles.tag} ${styles['tag-fff']}`} key={el.id}>
              {el.name}
            </div>
          ))}
        </div>
      </>
    );
  };

  const Toolbar = () => {
    return (
      <Button type="primary" onClick={() => setScaleModalVisible(true)}>
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
      title: '标签',
      dataIndex: 'weight',
      key: 'weight',
      width: 200,
      render(text: string, record: ProjectType.ScalePageRes, index: number) {
        if (!record.status) {
          return '--';
        }
        return (
          <Popover
            trigger="hover"
            color="rgba(0,0,0,0.70)"
            content={record?.labelVoList.length > 2 ? () => PopoverContent(record) : ''}
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
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
      width: 180,
    },
    {
      title: '最后一次更新时间',
      dataIndex: 'updateTime',
      key: 'updateTime',
      width: 200,
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 180,
      render(text: string, record: ProjectType.ScalePageRes) {
        const isUp = text === 'enable';
        return (
          <Space>
            <Badge color={isUp ? '#7ed321' : '#f53f3f'} text={isUp ? '启用' : '禁用'} />
            <SwitchCustom
              checked={isUp}
              onChange={async () => {
                try {
                  if (isUpdateSucc) return;
                  setIsUpdateSucc(true);
                  const res = await httpUpdateStatus({
                    id: record.id,
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
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      width: 200,
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
      {scaleModalVisible ? (
        <ScaleModal
          visible={scaleModalVisible}
          params={editParams}
          title="添加量表"
          onOk={async (v) => {
            try {
              const res: any = await httpUpdateScale({ ...editParams, ...v });
              if (res.success) {
                setScaleModalVisible(false);
                setEditParams({ labelVoList: [] });
                list.current.reloadListData(true);
              }
            } catch (err) {
              console.log(err);
            }
          }}
          onCancel={() => {
            setScaleModalVisible(false);
            setEditParams({ labelVoList: [] });
          }}
        />
      ) : null}
    </div>
  );
};

export default scaleLibrary;
