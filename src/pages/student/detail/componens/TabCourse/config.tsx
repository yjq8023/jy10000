import { Badge } from 'antd';

export const getColumns = (params: any) => {
  const { renderActionDom } = params;
  return [
    { title: '课程类别', key: 'serial_num' },
    { title: '收费模式', key: 'cn_name' },
    { title: '开课校区', key: 'sex' },
    { title: '教室', key: 'phone' },
    { title: '日期范围', key: 'status' },
    { title: '星期几', key: 'university' },
    { title: '上课时间段', key: 'class_room' },
    { title: '课程状态', key: 'tech_subject' },
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
