import React from 'react';
import { Row, Col } from '@sinohealth/butterfly-ui-components/lib';
import cls from 'classnames';
import style from './index.less';

function Task() {
  const data = [
    {
      label: '今日新增患者人数（人）',
      value: '25',
      icon: 'icon-user',
      bgColor: '#7ED321',
    },
    {
      label: '今日加入管理项目人数（人）',
      value: '25',
      icon: 'icon-user',
      bgColor: '#20A066',
    },
    {
      label: '今日退出管理项目人数（人）',
      value: '25',
      icon: 'icon-user',
      bgColor: '#FFAC00',
    },
    {
      label: '患者总数（人）',
      value: '25',
      icon: 'icon-user',
      bgColor: '#C04646',
    },
  ];
  const renderItem = (item: any, index: number) => {
    const iconCls = cls({
      iconfont: true,
      [item.icon]: true,
    });
    return (
      <Col span={6} key={index}>
        <div className={style.item}>
          <div className={style.label}>{item.label}</div>
          <div className={style.value}>{item.value}</div>
          <span className={iconCls} style={{ backgroundColor: item.bgColor }} />
        </div>
      </Col>
    );
  };
  return (
    <div className={style.taskBox}>
      <Row gutter={64}>
        {data.map(renderItem)}
      </Row>
    </div>
  );
}

export default Task;
