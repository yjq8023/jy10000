import React, { useState } from 'react';
import ListPage, { useList } from '@/components/BaseList';
import SearchForm from './components/SearchForm';
import { getLoginPage } from '@/services/user';
import { getTimeFrame, formatToDate } from '@/utils/index';

function UserList() {
  const list = useList();
  const fetchAPi = (params: any) => {
    const date = params.dates
      ? [params.dates[0]?.format('YYYY-MM-DD'), params.dates[1]?.format('YYYY-MM-DD')]
      : getTimeFrame(params.cycle || '最近一周');
    const cond = { startDateTime: date[0], endDateTime: date[1] };
    return getLoginPage({
      // ...params,
      pageNo: params.current,
      limit: params.pageSize,
      cond,
      orders: [
        {
          direction: 'DESC',
          property: 'loginTime',
        },
      ],
    }).then((res: any) => {
      return {
        listData: res.data,
        pagination: {
          current: res.pageIndex,
          pageSize: res.pageSize,
          total: res.totalCount,
        },
      };
    });
  };
  const columns = [
    {
      title: '登录地址',
      dataIndex: 'ip',
      key: 'ip',
      render(text: string, record: any, index: number): JSX.Element {
        return (
          <span>
            {record.address}
            &nbsp;
            {record.ip}
          </span>
        );
      },
    },
    {
      title: '登录时间',
      dataIndex: 'loginTime',
      key: 'loginTime',
      with: 200,
    },
  ];
  return (
    <div className="content-page">
      <ListPage
        ListTitle="记录列表"
        list={list}
        fetchApi={fetchAPi}
        columns={columns}
        SearchForm={SearchForm}
      />
    </div>
  );
}

export default UserList;
