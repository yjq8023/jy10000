import React from 'react';
import { Dropdown, Menu } from '@sinohealth/butterfly-ui-components/lib';

import style from './index.less';

function TabConsultRecord() {
  const items: any = [
    {
      key: '1',
      label: (
        <a>
          全部
        </a>
      ),
    },
  ];
  const menu = (
    // @ts-ignore
    <Menu items={items} />
  );
  return (
    <div className={style.consultRecord}>
      <div className={style.consultRecordList}>
        <div className="but-title">
          患者咨询记录
          <Dropdown overlay={menu}>
            <a onClick={(e) => e.preventDefault()}>
              选择项目
            </a>
          </Dropdown>
        </div>
      </div>
      <div className={style.consultRecordDetail}>
        123
      </div>
    </div>
  );
}

export default TabConsultRecord;
