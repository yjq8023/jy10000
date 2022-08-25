import React from 'react';
import { Button, Breadcrumb } from '@sinohealth/butterfly-ui-components/lib';
import { Link, useLocation } from 'react-router-dom';
// @ts-ignore
import lodash from 'lodash';
import { breadcrumbMap } from '@/config/router';
import style from '@/components/PageHeader/index.less';

const PageHeader = () => {
  const location = useLocation();
  const pathSnippets = location.pathname.split('/').filter((i) => i);
  const extraBreadcrumbItems = pathSnippets.map((_, index) => {
    const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
    const item = lodash.get(breadcrumbMap, pathSnippets.slice(0, index + 1).join('.'));
    return (
      <Breadcrumb.Item key={url}>
        {
          item?.path ? <Link to={item?.path || ''}>{item?.label || '--'}</Link> : item?.label || '管理计划'
        }
      </Breadcrumb.Item>
    );
  });
  return (
    <div className={[style.pageHeader, 'pageHeader'].join(' ')}>
      <Breadcrumb>{extraBreadcrumbItems}</Breadcrumb>
      <div className={style.title}>
        编辑管理计划
        <div style={{ float: 'right', display: 'inline-block', marginTop: '-10px' }}>
          <Button>取消</Button>
          &nbsp;
          &nbsp;
          <Button type="primary">保存</Button>
        </div>
      </div>
    </div>
  );
};

export default PageHeader;
