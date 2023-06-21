import React from 'react';
import FullCalendar from '@fullcalendar/react'; // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import resourceTimelinePlugin from '@fullcalendar/resource-timeline';
import timeGridPlugin from '@fullcalendar/timegrid';

const ClassSchedule = () => {
  const dataSource = [
    {
      index: '06:00',
    },
    {
      index: '07:00',
    },
    {
      index: '08:00',
    },
  ];

  const columns = [
    {
      title: '',
      dataIndex: 'index',
      key: 'index',
      width: 120,
    },
    {
      title: '2-2',
      dataIndex: '2-2',
      key: '2-2',
    },
    {
      title: '2-3',
      dataIndex: '2-3',
      key: '2-3',
    },
    {
      title: '2-4',
      dataIndex: '2-34',
      key: '2-34',
    },
    {
      title: '2-5',
      dataIndex: '2-5',
      key: '2-5',
    },
    {
      title: '2-6',
      dataIndex: '2-6',
      key: '2-6',
    },
    {
      title: '2-7',
      dataIndex: '2-6',
      key: '2-6',
    },
    {
      title: '2-8',
      dataIndex: '2-6',
      key: '2-6',
    },
  ];
  const v: any = ['dayGridMonth', 'dayGridWeek', 'dayGridDay', 'timeGridWeek'];
  const events: any = [
    {
      title: '胡老师',
      start: '2023-06-20 08:30:00',
      end: '2023-06-20 09:40:00',
    },
    {
      title: '胡老师课程2',
      start: '2023-06-20 09:30:00',
      end: '2023-06-20 12:40:00',
    },
  ];
  return (
    <FullCalendar
      plugins={[dayGridPlugin, timeGridPlugin]}
      initialView="timeGridWeek"
      events={events}
      locale="zh-cn"
    />
  );
};

export default ClassSchedule;
