import { Badge } from 'antd';

export const getColumns = (params: any) => {
  const { renderActionDom } = params;
  return [
    { title: '跟进日期', key: 'serial_num' },
    { title: '跟进事项编号', key: 'cn_name' },
    { title: '跟进事项分类', key: 'sex' },
    { title: '跟进内容', key: 'phone' },
    { title: '跟进结果', key: 'status' },
    { title: '完成日期', key: 'university' },
    { title: '跟进人', key: 'class_room' },
    { title: '是否完成', key: 'tech_subject' },
    { title: '备注', key: 'tech_subject' },
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
