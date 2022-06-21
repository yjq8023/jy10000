import React, { useState, useEffect } from 'react';
import { Select, Pagination } from '@sinohealth/butterfly-ui-components/lib';
import cls from 'classnames';
import BaseList, { paginationType } from '@/components/BaseList';
import style from './index.less';

const { Option } = Select;
type RecordListProps = {
  onChange?: (value: string) => void;
}
function RecordList(props: RecordListProps) {
  const { onChange } = props;
  const [dateListData, setDateListData] = useState<any>([]);
  const [value, setValue] = useState('');
  const [projectId, setProjectId] = useState('all');
  const [pagination, setPagination] = useState<paginationType>({
    current: 1,
    pageSize: 10,
    total: 100,
  });
  const fetchListData = (params?: any) => {
    console.log({
      ...pagination,
      projectId,
      ...params,
    });
    setTimeout(() => {
      setDateListData([
        { id: '1' },
        { id: '2' },
        { id: '3' },
        { id: '31' },
        { id: '32' },
        { id: '33' },
        { id: '34' },
        { id: '35' },
        { id: '36' },
        { id: '37' },
      ]);
    });
  };
  useEffect(() => {
    fetchListData();
  }, []);
  const handleSelect = (id: string) => {
    setValue(id);
    onChange && onChange(id);
  };
  const handlePageChange = (pageNo: any) => {
    const pageConfig = {
      ...pagination,
      current: pageNo,
    };
    setPagination(pageConfig);
    fetchListData(pageConfig);
  };
  const handleChangeProject = (val: string) => {
    setProjectId(val);
    fetchListData({
      projectId: val,
    });
  };
  return (
    <div className={style.consultRecordList}>
      <div className={`but-title ${style.header}`}>
        患者咨询记录
        <Select onChange={handleChangeProject} value={projectId} style={{ width: 120, float: 'right', marginTop: '-6px' }}>
          <Option value="all">全部</Option>
          <Option value="lucy">项目二</Option>
          <Option value="lucy1">项目三三三三三三</Option>
          <Option value="lucy2">项目四</Option>
        </Select>
      </div>
      <div className={style.listBox}>
        {
          dateListData.map((item: any) => {
            const classnames = cls({
              [style.listItem]: true,
              [style.listItemActive]: value === item.id,
            });
            return (
              <div className={classnames} key={item.id} onClick={() => handleSelect(item.id)}>
                <div className={style.dateBox}>
                  <div>05/30</div>
                  <div>2022</div>
                </div>
                <div className={style.body}>
                  <div>#用药不良反应监测项目</div>
                  <div>咨询结束时间：2022-06-01  18:15:55</div>
                </div>
              </div>
            );
          })
        }
      </div>
      <div className={style.pagination}>
        <Pagination
          showLessItems
          showSizeChanger={false}
          onChange={handlePageChange}
          {...pagination}
        />
      </div>
    </div>
  );
}

export default RecordList;
