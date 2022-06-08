import React from 'react';
import { Card, Button } from '@sinohealth/butterfly-ui-components/lib';
import style from './index.less';

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
      <Card className="but-card" title="智能推荐管理项目随访路径前置信息" extra={<Button type="primary">添加管理项目</Button>}>
        <div>
          乳腺癌随访管理项目信息
        </div>
      </Card>
    </div>
  );
}

export default TabProject;
