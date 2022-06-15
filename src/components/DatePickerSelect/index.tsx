import React from 'react';
import { Radio, DatePicker } from '@sinohealth/butterfly-ui-components/lib';

function DatePickerSelect() {
  return (
    <div style={{ display: 'inline-block' }}>
      <Radio.Group defaultValue="a" buttonStyle="solid">
        <Radio.Button value="a">今日</Radio.Button>
        <Radio.Button value="b">最近一周</Radio.Button>
        <Radio.Button value="c">最近一月</Radio.Button>
        <Radio.Button value="d">最近半年</Radio.Button>
        <Radio.Button value="e">最近一年</Radio.Button>
      </Radio.Group>
      &nbsp;
      &nbsp;
      <DatePicker.RangePicker />
    </div>
  );
}

export default DatePickerSelect;
