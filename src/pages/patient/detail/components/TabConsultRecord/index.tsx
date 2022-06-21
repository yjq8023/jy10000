import React from 'react';
import { Select, Pagination } from '@sinohealth/butterfly-ui-components/lib';
import style from './index.less';
import RecordList from '@/pages/patient/detail/components/TabConsultRecord/components/recordList';

const { Option } = Select;
function TabConsultRecord() {
  const dateListData = new Array(10).fill(1);

  return (
    <div className={style.consultRecord}>
      <RecordList />
      <div className={style.consultRecordDetail}>
        <div className={style.header}>
          <div className={style.title}>#乳腺癌随访管理项目</div>
          <div className={style.desc}>
            咨询结束时间：2022-01-01  09:32:56
            <div>
              <span>医生：王志明</span>
              <span>个案管理师：林溪</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TabConsultRecord;
