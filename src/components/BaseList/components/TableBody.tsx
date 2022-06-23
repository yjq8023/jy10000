import React, { useEffect, useRef, useState } from 'react';
import { Table } from '@sinohealth/butterfly-ui-components/lib';

interface TableBodyProps {
  columns: any[],
  listData: any[],
  fixed: number | boolean,
  BodyProps: any,
}
function TableBody(props: TableBodyProps) {
  const { columns, listData, fixed, BodyProps } = props;
  const offsetNum = typeof fixed === 'number' ? fixed : 128; // 表格计算满屏时的偏差值。表格高度 = 屏幕高度 - 表格距离顶部高度 - offsetNum
  const tableRef = useRef<any>();
  const [scroll, setScroll] = useState({});
  useEffect(() => {
    if (fixed) {
      const offset = tableRef.current.getBoundingClientRect();
      const h = window.document.body.scrollHeight - offset.top - offsetNum;
      setScroll({
        scrollToFirstRowOnChange: true,
        y: h,
      });
    }
  }, [fixed]);
  useEffect(() => {
    if (fixed) {
      const offset = tableRef.current.getBoundingClientRect();
      const h = window.document.body.scrollHeight - offset.top - offsetNum + 42;
      const antTab = tableRef.current.getElementsByClassName('ant-table')[0];
      setTimeout(() => {
        antTab.style = `min-height: ${h}px;`;
      });
    }
  });
  const tableProps = {
    ref: tableRef,
    columns,
    dataSource: listData,
    rowKey: (row: any) => row.id,
    pagination: false,
    ...BodyProps,
    scroll: BodyProps.scroll ? { ...scroll, ...BodyProps.scroll } : scroll,
  };
  return (
    <Table
      {...tableProps}
    />
  );
}

export default TableBody;
