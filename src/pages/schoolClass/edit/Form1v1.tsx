import React, { createContext, useContext } from 'react';
import { Radio, Input, DatePicker, Select } from 'antd';
import { getUuid } from '@/utils';
import { Form, FormItem, FormTitle } from '@/common/components/BaseForm';
import useDictOption from '@/common/hooks/useDictOption';
import LabelSelect from '@/components/LabelSelect';

const InfoForm = (props: any) => {
  return (
    <Form {...props}>
      <FormTitle>基本信息</FormTitle>
      <FormItem label="注册编号" required name="serial_num">
        <Input />
      </FormItem>
      <FormItem label="学生姓名" required name="name">
        <Input />
      </FormItem>
      <FormItem label="学生编号" name="sex" dictKey="sex">
        <Radio.Group />
      </FormItem>
      <FormTitle>课程信息</FormTitle>
      <FormItem label="课程名称" name="school">
        <Input />
      </FormItem>
      <FormItem label="科目" name="grade">
        <Input />
      </FormItem>
      <FormItem label="年级" name="class">
        <Input />
      </FormItem>
      <FormItem label="学期" name="majors">
        <Input />
      </FormItem>
      <FormItem label="课程长度" name="majors">
        <Input />
      </FormItem>
      <FormItem label="城市" name="majors">
        <Input />
      </FormItem>
      <FormItem label="分校" name="majors">
        <Input />
      </FormItem>
      <FormItem label="限额">
        <div>1</div>
      </FormItem>
      <FormItem label="已报课人数">
        <div>0</div>
      </FormItem>
      <FormTitle>上课安排</FormTitle>
      <FormItem label="上课日期范围" name="emergency_contact">
        <Input />
      </FormItem>
      <FormItem label="上课时间段" name="emergency_phone">
        <Input />
      </FormItem>
      <FormItem label="上课星期几" name="emergency_email">
        <Input />
      </FormItem>
      <FormItem label="分校" name="emergency_email">
        <Input />
      </FormItem>
      <FormItem label="教室" name="emergency_email">
        <Input />
      </FormItem>
      <FormItem label="时长" name="emergency_email">
        <Input />
      </FormItem>
      <FormItem label="任课导师姓名" name="emergency_email">
        <Input />
      </FormItem>
      <FormItem label="导师编号" name="emergency_email">
        <Input />
      </FormItem>
      <FormItem label="收费" name="emergency_email">
        <Input />
      </FormItem>
      <FormItem label="课程确认状态" name="emergency_email">
        <Input />
      </FormItem>
      <FormItem label="备注" name="remake">
        <Input />
      </FormItem>
    </Form>
  );
};

export default InfoForm;
