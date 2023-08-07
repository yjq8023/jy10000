import { Badge } from 'antd';

const columns = [
  { title: '导师编号', key: 'serial_num' },
  { title: '导师姓名', key: 'cn_name' },
  { title: '性别', key: 'sex', dictKey: 'sex' },
  { title: '电话', key: 'phone' },
  { title: '状态', key: 'status', dictKey: 'teacherStatus' },
  { title: '学校', key: 'branch', dictKey: 'school' },
  { title: '教室', key: 'class_room', dictKey: 'schoolClass' },
  { title: '任教科目', key: 'tech_subject', dictKey: 'schoolSubject' },
];
export const getColumns = (params: any) => {
  const { renderActionDom } = params;
  return [
    ...columns,
    {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      width: '80px',
      canSearch: false,
      render(text: string, record: any) {
        return renderActionDom(record);
      },
    },
  ];
};

export const searchColumns = [
  { title: '导师姓名', key: 'cn_name' },
  { title: '导师编号', key: 'serial_num' },
  { title: '性别', key: 'sex', dictKey: 'sex' },
  { title: '城市', key: 'city', dictKey: 'city' },
  { title: '中文程度', key: 'chinese_level', dictKey: 'chineseLevel' },
  { title: '学历', key: 'school_record', dictKey: 'degree' },
  { title: '入职时间', key: 'work_time', dictKey: 'date' },
  { title: '水平', key: 'tech_level', dictKey: 'teacherLevel' },
  { title: '任教科目', key: 'tech_subject', dictKey: 'schoolSubject' },
  { title: '上课星期几', key: 'class_schedule_range', dictKey: 'week' },
  { title: '上课时间段', key: 'class_time_range', dictKey: 'classTimeRange' },
  { title: '学校', key: 'branch', dictKey: 'school' },
  { title: '教室', key: 'class_room', dictKey: 'schoolClass' },
  { title: '状态', key: 'status', dictKey: 'teacherStatus' },
];

export default {
  getColumns,
  searchColumns,
};
