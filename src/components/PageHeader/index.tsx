import React from 'react';
import { Link, useLocation } from 'react-router-dom';
// @ts-ignore
import lodash from 'lodash';
import { Breadcrumb } from '@sinohealth/butterfly-ui-components/lib';
import style from './index.less';

const breadcrumbMap = {
  patient: {
    label: '患者管理',
    list: {
      label: '患者列表',
      path: '/patient/list',
    },
  },
};
const PageHeader = () => {
  const location = useLocation();
  const pathSnippets = location.pathname.split('/').filter((i) => i);
  const extraBreadcrumbItems = pathSnippets.map((_, index) => {
    const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
    const item = lodash.get(breadcrumbMap, pathSnippets.slice(0, index + 1).join('.'));
    return (
      <Breadcrumb.Item key={url}>
        {
          item?.path ? <Link style={{ color: '#217BA0' }} to={item?.path || ''}>{item?.label || '--'}</Link> : item?.label || '--'
        }
      </Breadcrumb.Item>
    );
  });
  const bNow = lodash.get(breadcrumbMap, pathSnippets.join('.'));
  if (!bNow) return null;
  return (
    <div className={style.pageHeader}>
      <Breadcrumb>{extraBreadcrumbItems}</Breadcrumb>
      <div className={style.title}>
        {bNow.label || '--'}
      </div>
    </div>
  );
};

export default PageHeader;
