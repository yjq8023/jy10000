import { Badge } from 'antd';

export const getColumns = (params: any) => {
  const { renderActionDom } = params;
  return [
    { title: '导师编号', key: 'serial_num' },
    { title: '导师姓名', key: 'cn_name' },
    { title: '性别', key: 'sex' },
    { title: '电话', key: 'phone' },
    { title: '状态', key: 'status' },
    { title: '学校', key: 'university' },
    { title: '教室', key: 'class_room' },
    { title: '任教科目', key: 'tech_subject' },
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