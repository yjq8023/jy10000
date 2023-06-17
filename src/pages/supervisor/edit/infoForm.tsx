import React, { createContext, useContext } from 'react';
import { Row, Col, Input, DatePicker } from 'antd';
import { getUuid } from '@/utils';
import { Form, FormItem, FormTitle } from '@/common/components/BaseForm';

const InfoForm = (props: any) => {
  const { readOnly } = props;
  return (
    <Form readOnly={readOnly}>
      <FormTitle>基本信息</FormTitle>
      <FormItem label="出生日期">
        <DatePicker />
      </FormItem>
      <FormItem label="电话">
        <Input />
      </FormItem>
      <FormItem label="邮箱">
        <Input />
      </FormItem>
      <FormItem label="国籍">
        <Input />
      </FormItem>
      <FormItem label="城市">
        <Input />
      </FormItem>
      <FormItem label="地址">
        <Input />
      </FormItem>
      <FormTitle>中文和教育程度</FormTitle>
      <FormItem label="中文程度">
        <Input />
      </FormItem>
      <FormItem label="能流利说另一种语言">
        <Input />
      </FormItem>
      <FormItem label="高中">
        <Input />
      </FormItem>
      <FormItem label="大学">
        <Input />
      </FormItem>
      <FormItem label="学历">
        <Input />
      </FormItem>
      <FormItem label="专业">
        <Input />
      </FormItem>
      <FormItem label="TAR/IB成绩">
        <Input />
      </FormItem>
      <FormItem label="HSC/VCE/IB/SACE各科成绩">
        <Input />
      </FormItem>
      <FormItem label="其他学业成就">
        <Input />
      </FormItem>
      <FormTitle>紧急联系人</FormTitle>
      <FormItem label="姓名">
        <Input />
      </FormItem>
      <FormItem label="电话">
        <Input />
      </FormItem>
      <FormTitle>任教信息</FormTitle>
      <FormItem label="入职时间">
        <Input />
      </FormItem>
      <FormItem label="水平">
        <Input />
      </FormItem>
      <FormItem label="收费单价">
        <Input />
      </FormItem>
      <FormItem label="任教科目">
        <Input />
      </FormItem>
      <FormItem label="上课日期范围">
        <Input />
      </FormItem>
      <FormItem label="上课星期几">
        <Input />
      </FormItem>
      <FormItem label="上课时间段">
        <Input />
      </FormItem>
      <FormItem label="分校">
        <Input />
      </FormItem>
      <FormItem label="教室">
        <Input />
      </FormItem>
      <FormItem label="状态">
        <Input />
      </FormItem>
      <FormItem label="最多可上班时间">
        <Input />
      </FormItem>
      <FormItem label="备注">
        <Input />
      </FormItem>
    </Form>
  );
};

export default InfoForm;
