import React from 'react';
import { Button } from '@sinohealth/butterfly-ui-components/lib';
import { PlusCircleOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import ListPage, { paginationType, useList } from '@/components/BaseList';
import SearchForm from './components/SearchForm';
import ListBody from './components/ListBody';
import { getPatientList } from '@/services/patient';

const getData = (num: number = 12) => {
  const res = [];
  let i = 1;
  while (i <= num) {
    res.push({
      id: Math.random() * 10000, // 患者ID
      number: String(Math.random() * 10000), // 患者档案号
      name: `第${i}客人`, // 患者名称
      age: Math.floor(Math.random() * 100), // 患者年龄
      phone: Math.floor(Math.random() * 10000000000), // 患者手机号码
      mainDisease: '主要诊断主要诊断主要诊断主要诊断主要诊断主要诊断主要诊断', // 主要诊断
      diseaseProjectName: '管理项目', // 管理项目
      caseManager: '个案管理师', // 个案管理师
      wxBindStatus: Math.random() > 0.3 ? '1' : '0', // 微信是否绑定1：绑定0：无
      sex: i % 2 === 0 ? 'female' : 'man', // 性别
      pic: 'string', // 头像
    });
    i += 1;
  }
  return res;
};
function PatientList() {
  const list = useList();
  const fetchAPi = (params: any) => {
    return Promise.resolve({
      listData: getData(),
      pagination: {
        current: 1,
        pageSize: 10,
        total: 100,
      },
    });
    // eslint-disable-next-line no-unreachable
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
