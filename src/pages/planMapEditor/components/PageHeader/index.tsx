import React, { useContext, useState } from 'react';
import { Button, Breadcrumb, message, Modal } from '@sinohealth/butterfly-ui-components/lib';
import { Link, useLocation, useNavigate } from 'react-router-dom';
// @ts-ignore
import lodash from 'lodash';
import { breadcrumbMap } from '@/config/router';
import { planMapContext } from '@/pages/planMapEditor';

import style from '@/components/PageHeader/index.less';
import { saveProjectPlanMap } from '@/services/planMapAntForm';

const PageHeader = () => {
  const { projectPlanData, planMapState, disabled, setIsEdited, isEdited } = useContext(planMapContext);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const pathSnippets = location.pathname.split('/').filter((i) => i);
  const extraBreadcrumbItems = pathSnippets.map((_, index) => {
    const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
    const item = lodash.get(breadcrumbMap, pathSnippets.slice(0, index + 1).join('.'));
    return (
      <Breadcrumb.Item key={url}>
        {
          item?.path ? <a onClick={() => handleCancel(item?.path)}>{item?.label || '--'}</a> : item?.label || '管理计划'
        }
      </Breadcrumb.Item>
    );
  });
  const handleSave = () => {
    setLoading(true);
    saveProjectPlanMap({
      ...projectPlanData,
      roadMaps: planMapState,
    }).then(() => {
      setIsEdited(false);
      setTimeout(() => {
        setLoading(false);
        message.success('保存成功');
      }, 500);
    }).finally(() => {
      setLoading(false);
    });
  };
  const handleCancel = (path: any = -1) => {
    if (isEdited) {
      Modal.confirm({
        title: '是否确定取消编辑？',
        content: '尚未保存的信息将丢失',
        onOk() {
          navigate(-1);
        },
      });
    } else {
      navigate(-1);
    }
  };
  return (
    <div className={[style.pageHeader, 'pageHeader'].join(' ')}>
      <Breadcrumb>{extraBreadcrumbItems}</Breadcrumb>
      <div className={style.title}>
        编辑管理计划
        <div style={{ float: 'right', display: 'inline-block', marginTop: '-10px' }}>
          {
            disabled && (<Button onClick={() => navigate(-1)}>返回</Button>)
          }
          {
            !disabled && (
              <>
                <Button onClick={handleCancel}>取消</Button>
                &nbsp;
                &nbsp;
                <Button type="primary" onClick={handleSave} loading={loading}>保存</Button>
              </>
            )
          }
        </div>
      </div>
    </div>
  );
};

export default PageHeader;
