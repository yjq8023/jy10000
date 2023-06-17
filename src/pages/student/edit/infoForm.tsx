import React, { createContext, useContext } from 'react';
import { Radio, Input, DatePicker, Select } from 'antd';
import { getUuid } from '@/utils';
import { Form, FormItem, FormTitle } from '@/common/components/BaseForm';
import useDictOption from '@/common/hooks/useDictOption';

const InfoForm = (props: any) => {
  const { readOnly } = props;
  return (
    <Form readOnly={readOnly}>
      <FormTitle>基本信息</FormTitle>
      <FormItem label="编号" required name="birth_day">
        <DatePicker />
      </FormItem>
      <FormItem label="学生姓名" required name="name">
        <Input />
      </FormItem>
      <FormItem label="性别" name="sex" dictKey="sex">
        <Radio.Group />
      </FormItem>
      <FormItem label="出生日期" name="birth_day">
        <DatePicker />
      </FormItem>
      <FormItem label="联系人关系" name="todo">
        <Select />
      </FormItem>
      <FormItem label="联系人姓名" name="todo">
        <Input />
      </FormItem>
      <FormItem label="联系人电话" name="todo">
        <Input />
      </FormItem>
      <FormItem label="联系人邮箱" name="todo">
        <Input />
      </FormItem>
      <FormItem label="住址" name="address">
        <Input />
      </FormItem>
      <FormItem label="国籍" name="nationality">
        <Input />
      </FormItem>
      <FormItem label="城市" name="city">
        <Input />
      </FormItem>
      <FormItem label="登记日期" name="record_date">
        <DatePicker />
      </FormItem>
      <FormItem label="Branch分校" name="branch">
        <Input />
      </FormItem>
      <FormItem label="跟进员工" name="staff_id">
        <Input />
      </FormItem>
      <FormItem label="状态" name="status" dictKey="studentStatus">
        <Select />
      </FormItem>
      <FormTitle>就读资料</FormTitle>
      <FormItem label="就读学校" name="school">
        <Input />
      </FormItem>
      <FormItem label="年级" name="grade">
        <Input />
      </FormItem>
      <FormItem label="就读班级" name="class">
        <Input />
      </FormItem>
      <FormItem label="修读科目" name="majors">
        <Input />
      </FormItem>
      <FormTitle>紧急联系人</FormTitle>
      <FormItem label="姓名" name="todo">
        <Input />
      </FormItem>
      <FormItem label="电话" name="todo">
        <Input />
      </FormItem>
      <FormItem label="邮箱" name="todo">
        <Input />
      </FormItem>
      <FormTitle>获知渠道</FormTitle>
      <FormItem label="从何得知" name="get_information_from">
        <Input />
      </FormItem>
      <FormItem label="推荐人姓名" name="recommend_name">
        <Input />
      </FormItem>
      <FormItem label="佣金" name="return_pay">
        <Input />
      </FormItem>
      <FormItem label="备注" name="remark">
        <Input />
      </FormItem>
      <FormTitle>标签信息</FormTitle>
      <FormItem label="选择标签" name="tech_subject">
        <Input />
      </FormItem>
    </Form>
  );
};

export default InfoForm;
