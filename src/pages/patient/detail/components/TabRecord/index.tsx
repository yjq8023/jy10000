import React, { useState } from 'react';
import { Card } from '@sinohealth/butterfly-ui-components/lib';
import { FormRender } from '@sinohealth/butterfly-formily-engine';
import cls from 'classnames';
import style from './index.less';

const schema = {
  type: 'object',
  properties: {
    radio: {
      type: 'number',
      title: '一般检查',
      enum: [
        {
          label: '正常',
          value: 1,
        },
        {
          label: '异常',
          value: 0,
        },
      ],
      'x-decorator': 'FormItem',
      'x-component': 'Radio.Group',
    },
    multiple: {
      type: 'array',
      title: '用药类型',
      enum: [
        {
          label: '选择性雌激素受体调节剂（SERM）',
          value: 1,
        },
        {
          label: '卵巢功能抑制（OFS）药物',
          value: 2,
        },
        {
          label: '芳香化酶抑制剂（AI）',
          value: 3,
        },
        {
          label: '芳香化酶抑制剂（AI1）',
          value: 31,
        },
        {
          label: '芳香化酶抑制剂（AI2）',
          value: 32,
        },
        {
          label: '芳香化酶抑制剂（AI3）',
          value: 33,
        },
      ],
      'x-decorator': 'FormItem',
      'x-component': 'Checkbox.Group',
    },
    year: {
      title: '年选择',
      'x-decorator': 'FormItem',
      'x-component': 'DatePicker',
      'x-component-props': {
        picker: 'year',
      },
      type: 'string',
    },
    '[startDate,endDate]': {
      title: '日期范围',
      'x-decorator': 'FormItem',
      'x-component': 'DatePicker.RangePicker',
      'x-component-props': {
        showTime: true,
      },
      type: 'string',
    },
  },
};
function TabRecord() {
  const planRecordList = [
    {
      id: 1,
      title: 'D+90',
      date: '2022.06.01',
      now: true,
    },
    {
      id: 2,
      title: 'D+190',
      date: '2022.06.02',
    },
    {
      id: 3,
      title: 'D+190',
      date: '2022.06.03',
    },
  ];
  const [selectedTab, setSelectedTab] = useState(planRecordList[0].id);
  const renderPlanListItem = (item: any) => {
    const classNames = cls({
      [style.tabItem]: true,
      [style.active]: selectedTab === item.id,
    });
    return (
      <div className={classNames} onClick={() => setSelectedTab(item.id)}>
        <div className={style.title}>[{item.title}]</div>
        <div>{item.now ? '当前周期' : `周期结束日期：${item.date}`}</div>
      </div>
    );
  };
  return (
    <div className={style.tabRecord}>
      <div className={style.tab}>
        {planRecordList.map(renderPlanListItem)}
      </div>
      <div>
        <Card className="but-card" title="随诊随访项目">
          <FormRender schema={schema} />
        </Card>
        <Card className="but-card" title="伴随疾病随访项目">
          <FormRender schema={schema} />
        </Card>
      </div>
    </div>
  );
}

export default TabRecord;
