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
  const [projectParams, setProjectParams] = useState({});

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

  const renderActionDom = (itemData: any) => {
    return (
      <Space size="middle">
        <a onClick={() => console.log(itemData)}>查看管理计划</a>
        <a
          onClick={() => {
            setProjectModalVisible(true);
            setIsShowAi(false);
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
          <Space className={styles.sortDom}>
            {record?.labelVoList?.map((el) => (
              <div className={styles.tag} key={el.id}>
                {el.name}
              </div>
            ))}
          </Space>
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
        return text ? (
          <Space className={styles.sortDom}>
            <div className={styles.tag}>{text}</div>
          </Space>
        ) : (
          '--'
        );
      },
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
            <Badge color={isUp ? '#7ed321' : '#f53f3f'} text={text ? '启用' : '禁用'} />
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
        ai={isShowAi}
        onCancel={() => setProjectModalVisible(false)}
        onOk={async (v) => {
          const res: any = await httpProjectInsert({ ...projectParams, ...v });
          if (res.success) {
            list.current.reloadListData(true);
            setProjectModalVisible(false);
            setProjectParams({});
          }
        }}
      />
    </div>
  );
};

export default TermLibrary;
