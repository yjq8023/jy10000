import React, { useEffect, useRef, useState } from 'react';
import { Badge, Button, Switch, Input, Modal } from '@sinohealth/butterfly-ui-components/lib';
import { PlusCircleOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import ListPage, { paginationType, useList } from '@/components/BaseList';
import SearchForm from './components/SearchForm';
import { getPageNotify, handleNotify } from '@/services/notify';
import ConfirmModel from '@/components/Confirm';
import { useDictKeyValue } from '@/hooks/useDict';

const { confirm } = Modal;
function MessageList() {
  const list = useList();
  const dict = useDictKeyValue();
  const [showUserForm, setShowUserForm] = useState(false);
  const rejectReason = useRef<string>('');
  const fetchAPi = (params: any) => {
    console.log('params');
    console.log(params);
    return getPageNotify({
      ...params,
      searchTime: [
        params.searchTime[0]?.format('YYYY-MM-DD'),
        params.searchTime[1]?.format('YYYY-MM-DD'),
      ],
    }).then((res) => {
      console.log(res);
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
    if (itemData.status === 'UNHANDLE') {
      return (
        <div>
          <a
            onClick={() => {
              ConfirmModel({
                fun: 'info',
                title: '是否同意通过申请',
                // subtitle: '是否同意通过申请',
                centered: true,
                // icon: <QuestionCircleTwoTone twoToneColor="#FFBF00" />,
                onOk: async () => {
                  // 修改状态的类型
                  handleNotify({ notifyId: itemData.notifyId, status: 'APPROVED' }).then((res) => {
                    console.log(res);
                    (list.current as any).reloadListData();
                  });
                },
              });
            }}
          >
            同意
          </a>
          &nbsp; &nbsp;
          <a
            onClick={() => {
              ConfirmModel({
                fun: 'info',
                title: '拒绝申请',
                // subtitle: '是否同意通过申请',
                centered: true,
                node: (
                  <div>
                    <Input.TextArea
                      showCount
                      placeholder="拒绝理由"
                      onChange={(e: any) => {
                        rejectReason.current = e.target.value;
                      }}
                    />
                  </div>
                ),
                onCancel: () => {
                  rejectReason.current = '';
                },
                // icon: <QuestionCircleTwoTone twoToneColor="#FFBF00" />,
                onOk: async () => {
                  // 修改状态的类型
                  handleNotify({
                    notifyId: itemData.notifyId,
                    status: 'REJECTED',
                    rejectReason: rejectReason.current,
                  })
                    .then((res) => {
                      (list.current as any).reloadListData();
                    })
                    .finally(() => {
                      rejectReason.current = '';
                    });
                },
              });
            }}
          >
            拒绝
          </a>
        </div>
      );
    }
    return <div>--</div>;
  };
  const columns = [
    {
      title: '序号',
      dataIndex: 'index',
      key: 'index',
      render(text: string, record: any, index: number): JSX.Element {
        return <span>{index + 1}</span>;
      },
    },
    {
      title: '申请项目',
      dataIndex: 'projectName',
      key: 'projectName',
    },
    {
      title: '患者姓名',
      dataIndex: 'patientName',
      key: 'patientName',
    },
    {
      title: '身份证号',
      dataIndex: 'idCard',
      key: 'idCard',
    },
    {
      title: '性别',
      dataIndex: 'sex',
      key: 'sex',
      render: (text: string, record: any) => <span>{dict?.gender[text]}</span>,
    },
    {
      title: '年龄',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: '手机号',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: '主要诊断',
      dataIndex: 'mainDisease',
      key: 'mainDisease',
    },
    {
      title: '病历报告',
      dataIndex: 'picList',
      key: 'picList',
      render(text: string, record: any) {
        return <a>查看</a>;
      },
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render(text: string, record: any) {
        const isUp = record.status !== 'UNHANDLE';
        return (
          <Badge color={isUp ? 'rgba(0,0,0,0.15)' : 'yellow'} text={isUp ? '已处理' : '未处理'} />
        );
      },
    },
    {
      title: '通知时间',
      dataIndex: 'notifyTime',
      key: 'notifyTime',
    },
    {
      title: '处理',
      dataIndex: 'action',
      key: 'action',
      render(text: string, record: any) {
        return renderActionDom(record);
      },
    },
    {
      title: '处理结果',
      dataIndex: 'handleResult',
      key: 'handleResult',
      render(text: string, record: any) {
        if (record.status !== 'UNHANDLE') {
          return (
            <Badge
              color={record.status === 'APPROVED' ? '#7ED321' : 'red'}
              text={record.status === 'APPROVED' ? '同意' : record.handleResult || '拒绝'}
            />
          );
        }
        return <div>--</div>;
      },
    },
  ];
  return (
    <div className="content-page">
      <ListPage
        ListTitle="申请通知"
        list={list}
        fetchApi={fetchAPi}
        columns={columns}
        SearchForm={SearchForm}
        key="notifyId"
        BodyProps={{ scroll: { x: 1500 } }}
      />
    </div>
  );
}

export default MessageList;
