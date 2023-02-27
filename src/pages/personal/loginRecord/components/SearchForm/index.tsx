import React, { useState } from 'react';
import {
  Form,
  Row,
  Col,
  Button,
  DatePicker,
  Radio,
  InputNumber,
} from '@sinohealth/butterfly-ui-components/lib';
import moment from 'moment';
import type { Moment } from 'moment';

type RangeValue = [Moment | null, Moment | null] | null;
const SearchForm = (props: any = {}) => {
  const { RangePicker } = DatePicker;
  const [form] = Form.useForm();
  const [dates, setDates] = useState<RangeValue>(null);
  const disabledTaskDate: any = (current: Moment) => {
    // 当天以后的时间不可选择 && 只能选择一年之内的时间
    if (!dates) {
      return current && current > moment().endOf('day');
    }

    const tooLate = dates[0] && current.diff(dates[0], 'days') > 365 / 2;
    const tooEarly = dates[1] && dates[1].diff(current, 'days') > 365 / 2;
    return !!tooEarly || !!tooLate || (current && current > moment().endOf('day'));
  };

  const onChangeCycle = (e: any) => {
    props.form.setFieldsValue({ dates: '' });
  };

  const onChangeDate = (e: any) => {
    props.form.setFieldsValue({ cycle: '' });
  };
  return (
    <Form
      // labelCol={{ xl: 0, xxl: 0 }}
      // wrapperCol={{ xl: 0, xxl: 0 }}
      labelAlign="left"
      colon={false}
      form={form}
      {...props}
    >
      <Row gutter={[20, 0]}>
        <Form.Item name="cycle" label="选择时间" initialValue="最近一周">
          <Radio.Group onChange={onChangeCycle}>
            <Radio.Button value="最近一周">最近一周</Radio.Button>
            <Radio.Button value="最近一月">最近一月</Radio.Button>
          </Radio.Group>
        </Form.Item>
        &nbsp;
        <Form.Item name="dates">
          <RangePicker
            disabledDate={disabledTaskDate}
            onCalendarChange={(val: any) => setDates(val)}
            // value={dateVal}
            onChange={onChangeDate}
            format="YYYY-MM-DD"
          />
        </Form.Item>
        <Col span={12} style={{ textAlign: 'left' }}>
          <Button
            onClick={() => {
              props.form.resetFields();
              props.form.submit();
            }}
          >
            重置
          </Button>
          &nbsp; &nbsp;
          <Button type="primary" htmlType="submit">
            查询
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default SearchForm;
