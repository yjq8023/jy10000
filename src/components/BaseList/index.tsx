import React, { useEffect, useState, useRef } from 'react';
import { Card, Form, Pagination, Row, Col } from '@sinohealth/butterfly-ui-components/lib';
import TableBody from './components/TableBody';
import style from './index.less';

export type paginationType = {
  current: number;
  pageSize: number;
  total: number;
};
export type fetchApiRes = {
  listData: any[];
  pagination: paginationType;
};
type ListPageProps = {
  list?: { current: any };
  ListTitle: any;
  SearchForm?: any;
  Body?: any;
  columns?: any[];
  fetchApi: (params: any) => Promise<fetchApiRes>; // 查询接口
  Toolbar?: any;
  fixed?: number | boolean; // 是否让表格占满屏幕，固定高度, 值为表格到页头距离
};
function BaseList(props: ListPageProps, ref: any) {
  const { list, SearchForm, Body, columns = [], fetchApi, Toolbar, ListTitle, fixed } = props;
  const [form] = Form.useForm();
  const [listData, setListData] = useState<any[]>([]);
  const [titleParams, setTitleParams] = useState<any>({});
  const [pagination, setPagination] = useState<paginationType>({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  const paginationConfig = {
    showSizeChanger: true,
    showQuickJumper: true,
    showTotal(totalNum: any) {
      return `共 ${totalNum} 条数据`;
    },
  };
  const fetchListData = (paramsConfig = {}) => {
    const formVal = form.getFieldsValue();
    const params = {
      ...pagination,
      ...formVal,
      ...titleParams,
      ...paramsConfig,
    };
    fetchApi(params).then((res: fetchApiRes) => {
      setListData(res.listData);
      setPagination(res.pagination);
    });
  };
  const reloadListData = () => {
    fetchListData();
  };
  const onSetListData = (data: any[]) => {
    setListData([...data]);
  };
  const onSearch = () => {
    const p = {
      ...pagination,
      current: 1,
    };
    setPagination(p);
    fetchListData(p);
  };
  const onTitleParamsChange = (params: any) => {
    setTitleParams(params);
    const p = {
      ...params,
      ...pagination,
      current: 1,
    };
    fetchListData(p);
  };
  useEffect(() => {
    if (list) {
      list.current = {
        searchForm: form,
        reloadListData,
        listData,
        onSetListData,
      };
    }
  }, [list, form, listData]);
  useEffect(() => {
    fetchListData();
  }, []);
  const onPaginationChange = (current: number, pageSize: number) => {
    const newPagination = {
      ...pagination,
      current,
      pageSize,
    };
    setPagination(newPagination);
    fetchListData(newPagination);
  };
  return (
    <div className={style.listPage}>
      {SearchForm && (
        <Card className={style.searchForm}>
          <SearchForm form={form} onFinish={() => onSearch()} />
        </Card>
      )}
      <Card className={style.body}>
        <Row className={style.listHeader}>
          <Col span={12}>
            {typeof ListTitle === 'string' ? (
              <div className={style.title}>{ListTitle}</div>
            ) : (
              <ListTitle onChange={onTitleParamsChange} />
            )}
          </Col>
          <Col span={12}>
            {Toolbar && (
              <div className={style.toolbar}>
                <Toolbar />
              </div>
            )}
          </Col>
        </Row>
        <Body columns={columns} listData={listData} fixed={fixed} />
        {pagination.total > 0 && (
          <div className={style.pagination}>
            <Pagination {...pagination} {...paginationConfig} onChange={onPaginationChange} />
          </div>
        )}
      </Card>
    </div>
  );
}

BaseList.defaultProps = {
  Body: TableBody,
};

export const useList = () => {
  const list = useRef();
  return list;
};
export default BaseList;
