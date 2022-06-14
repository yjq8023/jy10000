import React from 'react';
import { Button } from '@sinohealth/butterfly-ui-components/lib';
import { PlusCircleOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import ListPage, { paginationType, useList } from '@/components/BaseList';
import SearchForm from './components/SearchForm';
import ListBody from './components/ListBody';
import { getPatientList } from '@/services/patient';

function PatientList() {
  const list = useList();
  const fetchAPi = (params: any) => {
    return getPatientList(params)
      .then((res) => {
        return {
          listData: res.records,
          pagination: {
            current: params.current,
            pageSize: res.pageSize,
            total: res.total,
          },
        };
      });
  };
  const Toolbar = () => {
    return <Link to="/patient/add"><Button type="primary"><PlusCircleOutlined />新增患者</Button></Link>;
  };
  return (
    <div className="content-page">
      <ListPage ListTitle="患者档案" list={list} fetchApi={fetchAPi} SearchForm={SearchForm} Body={ListBody} Toolbar={Toolbar} />
    </div>
  );
}

export default PatientList;
