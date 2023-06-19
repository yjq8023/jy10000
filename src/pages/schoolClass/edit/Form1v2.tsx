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
      <FormItem label="编号" required name="serial_num">
        <Input />
      </FormItem>
      <FormItem label="学生姓名" required name="name">
        <Input />
      </FormItem>
    </Form>
  );
};

export default InfoForm;
