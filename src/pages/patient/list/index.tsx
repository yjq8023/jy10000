import React, { useState } from 'react';
import { Button, Radio } from '@sinohealth/butterfly-ui-components/lib';
import { PlusCircleOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import ListPage, { paginationType, useList } from '@/components/BaseList';
import SearchForm from './components/SearchForm';
import ListBody from './components/ListBody';
import { getPatientList } from '@/services/patient';
import { columns } from './config';

import style from './index.less';

function PatientList() {
  const [listType, setListType] = useState('card');
  const list = useList();
  const fetchAPi = (params: any) => {
    return getPatientList({
      ...params,
      pageNo: params.current,
    })
      .then((res: any) => {
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
  const onChangeListType = (e: any) => {
    setListType(e.target.value);
  };
  const Toolbar = () => {
    return (
      <div>
        <Radio.Group className={style.radioBtn} value={listType} onChange={onChangeListType}>
          <Radio.Button value="table">
            <span className="iconfont icon-list-table" />
          </Radio.Button>
          <Radio.Button value="card">
            <span className="iconfont icon-list-card" />
          </Radio.Button>
        </Radio.Group>
        <Link to="/patient/add"><Button type="primary"><PlusCircleOutlined />新增患者</Button></Link>
      </div>
    );
  };
  const listPageProps = listType === 'card' ? {
    Body: ListBody,
  } : {
    columns,
  };
  return (
    <div className="content-page">
      <ListPage ListTitle="患者档案" list={list} fetchApi={fetchAPi} SearchForm={SearchForm} Toolbar={Toolbar} {...listPageProps} />
    </div>
  );
}

export default PatientList;
