import { Badge } from 'antd';

export const getColumns = (params: any) => {
  const { renderActionDom } = params;
  return [
    { title: '课程编号', key: 'serial_num' },
    { title: '课程名称', key: 'name' },
    { title: '课程类别', key: 'sex' },
    { title: '授课模式', key: 'contact_name' },
    { title: '收费模式', key: 'contact_phone' },
    { title: '城市', key: 'city' },
    { title: '开课校区', key: 'nationality' },
    { title: '教室', key: 'city' },
    { title: '导师', key: 'address' },
    { title: '课程状态', key: 'school' },
    {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      width: '80px',
      render(text: string, record: any) {
        return renderActionDom(record);
      },
    },
  ];
};

export default {
  getColumns,
};
