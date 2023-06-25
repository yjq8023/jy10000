import React from 'react';
import { Row, Radio, Input, DatePicker, Select } from 'antd';
import { Form, FormItem, FormTitle } from '@/common/components/BaseForm';
import CitySelect from '@/components/CitySelect';
import dayjs from 'dayjs';

const TimeRange = (props: any) => {
  const { value, onChange, ...other } = props;
  const newValue = value ? value.split(',').map((i: any) => dayjs(i)) : value;
  const handleChange = (v: any) => {
    onChange(v.map((d: any) => d.format('YYYY-MM-DD')).join(','));
  };
  return (
    <DatePicker.RangePicker {...other} value={newValue} onChange={handleChange} placeholder={['开始日期', '结束日期']} />
  );
};
const InfoForm = (props: any) => {
  return (
    <Form {...props}>
      <FormTitle>基本信息</FormTitle>
      <FormItem label="编号" name="serial_num" required>
        <Input />
      </FormItem>
      <FormItem label="中文姓名" name="cn_name">
        <Input />
      </FormItem>
      <FormItem label="性别" name="sex" dictKey="sex">
        <Radio.Group />
      </FormItem>
      <FormItem label="英文姓名" name="en_name">
        <Input />
      </FormItem>
      <FormItem label="出生日期" name="birthday" isDate={true}>
        <DatePicker />
      </FormItem>
      <FormItem label="电话" name="phone">
        <Input />
      </FormItem>
      <FormItem label="邮箱" name="email">
        <Input />
      </FormItem>
      <FormItem label="国籍" name="nationality">
        <Input />
      </FormItem>
      <FormItem label="城市" name="city">
        <CitySelect />
      </FormItem>
      <FormItem label="地址" name="address">
        <Input />
      </FormItem>
      <FormTitle>中文和教育程度</FormTitle>
      <FormItem label="中文程度" name="chinese_level" dictKey="chineseLevel">
        <Select />
      </FormItem>
      <FormItem label="能流利说另一种语言" name="other_language">
        <Input />
      </FormItem>
      <FormItem label="高中" name="high_school">
        <Input />
      </FormItem>
      <FormItem label="大学" name="university">
        <Input />
      </FormItem>
      <FormItem label="学历" name="school_record">
        <Input />
      </FormItem>
      <FormItem label="专业" name="major">
        <Input />
      </FormItem>
      <FormItem label="TAR/IB成绩" name="tar_result">
        <Input />
      </FormItem>
      <FormItem label="HSC/VCE/IB/SACE各科成绩" name="various_subjects_result">
        <Input />
      </FormItem>
      <FormItem label="其他学业成就" name="other_result">
        <Input />
      </FormItem>
      <FormTitle>紧急联系人</FormTitle>
      <FormItem label="姓名" name="contact">
        <Input />
      </FormItem>
      <FormItem label="电话" name="contact_phone">
        <Input />
      </FormItem>
      <FormTitle>任教信息</FormTitle>
      <FormItem label="入职时间" name="work_time" isDate={true}>
        <DatePicker />
      </FormItem>
      <FormItem label="水平" name="tech_level">
        <Input />
      </FormItem>
      <FormItem label="收费单价" name="price">
        <Input />
      </FormItem>
      <FormItem label="任教科目" name="tech_subject" dictKey="schoolSubject">
        <Select />
      </FormItem>
      <FormItem label="上课日期范围" name="class_schedule_range">
        <TimeRange placeholder={['开始日期', '结束日期']} />
      </FormItem>
      <FormItem label="上课星期几" name="tech_week_day" dictKey="week">
        <Select />
      </FormItem>
      <FormItem label="上课时间段" name="class_time_range">
        <Input />
      </FormItem>
      <FormItem label="分校" name="branch" dictKey="school">
        <Select />
      </FormItem>
      <FormItem label="教室" name="class_room" dictKey="schoolClass">
        <Select />
      </FormItem>
      <FormItem label="状态" name="status" dictKey="teacherStatus">
        <Select />
      </FormItem>
      <FormItem label="最多可上班时间" name="can_work_time">
        <Input />
      </FormItem>
      <FormItem label="备注" name="remark">
        <Input />
      </FormItem>
    </Form>
  );
};

export default InfoForm;
