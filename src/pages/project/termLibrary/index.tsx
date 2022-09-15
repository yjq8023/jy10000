import React, { useState } from 'react';
import {
  Button,
  Badge,
  Switch,
  message,
  Modal,
  Space,
  Popover,
} from '@sinohealth/butterfly-ui-components/lib';
import {
  PlusCircleOutlined,
  QuestionCircleFilled,
  VerticalAlignTopOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import BaseList, { useList } from '@/components/BaseList';
import styles from './index.less';
import {
  httpProjectDelete,
  httpProjectInsert,
  httpProjectList,
  httpProjectUpdateStatus,
} from '@/services/project';
import TermSearch from './components/TermSearch';
import ProjectModal from './components/ProjectModal';
import SwitchCustom from '@/components/SwitchCustom';

const { confirm } = Modal;

/**
 * 项目库管理-项目库
 * @returns
 */
const TermLibrary: React.FC = () => {
  const list: any = useList();
  const [isUpdateSucc, setIsUpdateSucc] = useState(false);
  const [projectModalVisible, setProjectModalVisible] = useState(false);
  const [isShowAi, setIsShowAi] = useState(false);
  const [projectParams, setProjectParams] = useState<ProjectType.ProjectRes>({ labelVoList: [] });
  const navigate = useNavigate();

  const fetchAPi = (params: { current: any }) => {
    return httpProjectList({
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

  const renderActionDom = (itemData: ProjectType.ProjectRes) => {
    const isUp = itemData.status === 'ENABLE';
    return (
      <Space size="middle">
        {isUp ? (
          <a onClick={() => navigate(`planDetail?id=${itemData.id}`)}>查看管理计划</a>
        ) : (
          <a onClick={() => navigate(`editor?id=${itemData.id}`)}>编辑管理计划</a>
          // <a>编辑管理计划</a>
        )}
        <a
          onClick={() => {
            setProjectModalVisible(true);
            setIsShowAi(false);
            setProjectParams(itemData);
          }}
        >
          基本信息
        </a>
        <a
          className={styles['del-color']}
          onClick={() => {
            confirm({
              title: `是否确定删除 "${itemData.name}" 的数据项?`,
              icon: <QuestionCircleFilled style={{ color: '#EA6868' }} />,
              okButtonProps: { danger: true },
              cancelButtonProps: { type: 'info' },
              onOk: async () => {
                const res: any = await httpProjectDelete(itemData.id);

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

  const PopoverContent = (labelVoList: ProjectType.LabelVoList[]) => {
    return (
      <>
        <h4 className={styles['tag-title']}>标签</h4>
        <div className={styles.sortDom}>
          {labelVoList.map((el) => (
            <div className={`${styles.tag} ${styles['tag-fff']}`} key={el.id}>
              {el.name}
            </div>
          ))}
        </div>
      </>
    );
  };

  const AiPopoverContent = (tag: string[]) => {
    return (
      <>
        <h4 className={styles['tag-title']}>决策流标签</h4>
        <div className={styles.sortDom}>
          {tag.map((el) => (
            <div className={`${styles.tag} ${styles['tag-fff']}`} key={el}>
              {el}
            </div>
          ))}
        </div>
      </>
    );
  };

  const Toolbar = () => {
    return (
      <Button
        type="primary"
        onClick={() => {
          setIsShowAi(true);
          setProjectModalVisible(true);
        }}
      >
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
      dataIndex: 'name',
      key: 'name',
      width: 200,
    },
    {
      title: '标签',
      dataIndex: 'labelVoList',
      key: 'labelVoList',
      width: 200,
      render(text: string, record: ProjectType.ProjectRes, index: number) {
        return record?.labelVoList.length ? (
          <>
            {/* <Space className={styles.sortDom}>
              {record?.labelVoList?.map((el) => (
                <div className={styles.tag} key={el.id}>
                  {el.name}
                </div>
              ))}
            </Space> */}
            <Popover
              trigger="hover"
              color="rgba(0,0,0,0.70)"
              content={
                record.labelVoList.length > 2 ? () => PopoverContent(record.labelVoList) : ''
              }
            >
              <div
                className={`${styles.sortDom} ${
                  record.labelVoList.length > 2 ? styles.pointer : ''
                }`}
              >
                {record.labelVoList.map((el, inx) =>
                  inx < 2 ? (
                    <div className={styles.tag} key={el.id}>
                      {el.name}
                    </div>
                  ) : null,
                )}
              </div>
            </Popover>
          </>
        ) : (
          '--'
        );
      },
    },
    {
      title: '版本号',
      dataIndex: 'version',
      key: 'version',
      width: 140,
    },
    {
      title: '关联AI开放平台决策流名称',
      dataIndex: 'decisionFlowsVersionName',
      key: 'decisionFlowsVersionName',
      width: 200,
    },
    {
      title: '决策流标签',
      dataIndex: 'decisionFlowsLabels',
      key: 'decisionFlowsLabels',
      width: 200,
      render(text: string, record: ProjectType.ProjectRes, index: number) {
        const D = text?.split(',');
        return text ? (
          <Popover
            overlayClassName="back-popover"
            trigger="hover"
            color="rgba(0,0,0,0.70)"
            content={D.length > 2 ? () => AiPopoverContent(D) : ''}
          >
            <div className={`${styles.sortDom} ${D.length > 2 ? styles.pointer : ''}`}>
              {D?.map((el, inx) =>
                inx < 2 ? (
                  <div className={styles.tag} key={el}>
                    {el}
                  </div>
                ) : null,
              )}
            </div>
          </Popover>
        ) : (
          '--'
        );
      },
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
      width: 160,
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 140,
      render(text: string, record: any) {
        const isUp = text === 'ENABLE';
        return (
          <Space size="small">
            <Badge color={isUp ? '#7ed321' : '#f53f3f'} text={isUp ? '启用' : '禁用'} />
            {/* <Switch defaultChecked={isUp} onChange={async (e) => console.log(e)} /> */}
            <SwitchCustom
              checked={isUp}
              onChange={async () => {
                try {
                  if (isUpdateSucc) return;
                  setIsUpdateSucc(true);
                  const res = await httpProjectUpdateStatus({
                    ids: [record.id],
                    status: isUp ? 'UNABLE' : 'ENABLE',
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
      title: '描述',
      dataIndex: 'description',
      key: 'description',
      width: 180,
      render(text: string, record: any) {
        return (
          <Popover className={styles.popover} content={text}>
            <div className={styles.ellipsis}>{text}</div>
          </Popover>
        );
      },
    },
    {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      width: 200,
      align: 'right',
      fixed: 'right',
      render(text: string, record: ProjectType.ProjectRes) {
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
        fixed
      />
      {projectModalVisible ? (
        <ProjectModal
          visible={projectModalVisible}
          params={projectParams}
          title={isShowAi ? '添加管理项目' : '编辑项目基本信息'}
          ai={isShowAi}
          onCancel={() => {
            setProjectModalVisible(false);
            setIsUpdateSucc(false);
            setProjectParams({ labelVoList: [] });
          }}
          onOk={async (v) => {
            if (isUpdateSucc) return;
            setIsUpdateSucc(true);

            try {
              message.loading({ content: '数据正在处理中, 请稍候...', key: 'updatable' });
              const { labelVoList, ...others } = projectParams;
              const res: any = await httpProjectInsert({ ...others, ...v });

              if (res.success) {
                list.current.reloadListData(true);
                setProjectModalVisible(false);
                setProjectParams({ labelVoList: [] });
                setIsUpdateSucc(false);
                message.success({ content: '数据更新成功', key: 'updatable', duration: 1 });
              }
            } catch (err) {
              setIsUpdateSucc(false);
              message.error({ content: '数据更新失败', key: 'updatable', duration: 1 });
            }
          }}
        />
      ) : null}
    </div>
  );
};

export default TermLibrary;
