import React, { useState } from 'react';
import { Button, message, Form, Radio } from 'antd';
import ClassSchedule from '@/components/ClassSchedule';

const options = [
  { label: '时间视图', value: 'time' },
  { label: '导师视图', value: 'teacher' },
  { label: '教室视图', value: 'class' },
  { label: '班级视图', value: 'classGrade' },
];
const ClassSchedulePreview = () => {
  const [type, setType] = useState(options[0].value);
  const onChange = ({ target: { value } }: any) => {
    setType(value);
  };
  return (
    <div>
      <div style={{ textAlign: 'center', marginBottom: 12 }}>
        <Radio.Group size="large" options={options} onChange={onChange} value={type} optionType="button" buttonStyle="solid" />
      </div>
      <div>
        <ClassSchedule />
      </div>
    </div>
  );
};

export default ClassSchedulePreview;
