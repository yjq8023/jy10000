import { Badge } from 'antd';

export const getColumns = (params: any) => {
  const { renderActionDom } = params;
  return [
    { title: '学生姓名', key: 'name' },
    { title: '学生编号', key: 'serial_num' },
    { title: '跟进日期', key: 'sex' },
    { title: '地点', key: 'contact_name' },
    { title: '跟进事项分类', key: 'contact_phone' },
    { title: '跟进内容', key: 'contact_email' },
    { title: '跟进人', key: 'nationality' },
    { title: '优先级', key: 'city' },
    { title: '完成日期', key: 'address' },
    { title: '是否完成', key: 'school' },
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
