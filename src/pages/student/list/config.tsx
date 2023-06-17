import { Badge } from 'antd';

export const getColumns = (params: any) => {
  const { renderActionDom } = params;
  return [
    { title: '学生编号', key: 'serial_num' },
    { title: '学生姓名', key: 'name' },
    { title: '性别', key: 'sex' },
    { title: '父母姓名', key: 'contact_name' },
    { title: '联系电话', key: 'contact_phone' },
    { title: '邮箱', key: 'contact_email' },
    { title: '国籍', key: 'nationality' },
    { title: '城市', key: 'city' },
    { title: '地址', key: 'address' },
    { title: '就读学校', key: 'school' },
    { title: '报读课程', key: 'majors' },
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
