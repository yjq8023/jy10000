import React, { useContext } from 'react';
import { Button, Breadcrumb, message, Modal } from '@sinohealth/butterfly-ui-components/lib';
import { Link, useLocation, useNavigate } from 'react-router-dom';
// @ts-ignore
import lodash from 'lodash';
import { breadcrumbMap } from '@/config/router';
import { planMapContext } from '@/pages/planMapEditor';

import style from '@/components/PageHeader/index.less';
import { saveProjectPlanMap } from '@/services/planMapAntForm';

const PageHeader = () => {
  const { projectPlanData, planMapState } = useContext(planMapContext);
  const location = useLocation();
  const navigate = useNavigate();
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
  const handleSave = () => {
    console.log('planMapState');
    console.log(planMapState);
    saveProjectPlanMap({
      ...projectPlanData,
      roadMaps: planMapState,
    }).then(() => {
      message.success('保存成功');
    });
  };
  const handleCancel = () => {
    Modal.confirm({
      title: '是否确定取消编辑？',
      content: '尚未保存的信息将丢失',
      onOk() {
        navigate(-1);
      },
    });
  };
  return (
    <div className={[style.pageHeader, 'pageHeader'].join(' ')}>
      <Breadcrumb>{extraBreadcrumbItems}</Breadcrumb>
      <div className={style.title}>
        编辑管理计划
        <div style={{ float: 'right', display: 'inline-block', marginTop: '-10px' }}>
          <Button onClick={handleCancel}>取消</Button>
          &nbsp;
          &nbsp;
          <Button type="primary" onClick={handleSave}>保存</Button>
        </div>
      </div>
    </div>
  );
};

export default PageHeader;
