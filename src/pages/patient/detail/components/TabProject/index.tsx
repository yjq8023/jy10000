import React from 'react';
import { Card, Button, Badge } from '@sinohealth/butterfly-ui-components/lib';
import { FormRender } from '@sinohealth/butterfly-formily-engine';
import FollowPlanMap from '@/components/FollowPlanMap';
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
const planItem = {
  title: '开始',
  date: '2022/5/30 12:12:12',
  project: [
    {
      type: '0',
      title: '复诊复查项目',
    },
    {
      type: '1',
      title: '推送用药提醒',
    },
    {
      type: '2',
      title: '推送用药提醒',
    },
    {
      type: '0',
      title: '推送用药提醒',
    },
  ],
};
const l = 18;
// @ts-ignore
const followPlanMapData = new Array(l).fill(planItem, 0, l);
function TabProject() {
  return (
    <div>
      <Card className="but-card" title="已加入的管理项目" extra={<Button type="primary">添加管理项目</Button>}>
        <div className={style.projectList}>
          <span>1</span>
          乳腺癌随访管理项目
          <a className={style.action}>结束该管理项目</a>
        </div>
        <div className={style.projectList}>
          <span>2</span>
          前列腺随访管理项目
          <a className={style.action}>结束该管理项目</a>
        </div>
      </Card>
      <Card className="but-card" title="智能推荐管理项目随访路径前置信息">
        <div className={style.projectBeforeInfo}>
          <div className={style.title}><Badge color="#217BA0" />乳腺癌随访管理项目信息</div>
          <FormRender schema={schema} />
        </div>
      </Card>
      <Card className="but-card" title="已加入管理项目计划路径">
        <FollowPlanMap data={followPlanMapData} />
      </Card>
    </div>
  );
}

export default TabProject;
