// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Button } from '@sinohealth/butterfly-ui-components/lib';
import { useDesigner, TextWidget } from '@sinohealth/designable-react';
import { GlobalRegistry } from '@sinohealth/designable-core';
import { observer } from '@formily/react';
import { loadInitialSchema, saveSchema } from '../service';
import { getProjectAiDetail } from '@/services/planMapAntForm';

export const ActionsWidget = observer(() => {
  const [projectDetail, setProjectDetail] = useState();
  const [loading, setLoading] = useState(false);
  const designer = useDesigner();
  const [params] = useSearchParams();
  const type = params.get('type');
  const formId = params.get('formId');
  const projectId = params.get('projectId');
  useEffect(() => {
    loadInitialSchema({
      designer,
      type,
      formId,
      projectId,
    });
  }, []);
  const supportLocales = ['zh-cn', 'en-us', 'ko-kr'];
  useEffect(() => {
    if (!supportLocales.includes(GlobalRegistry.getDesignerLanguage())) {
      GlobalRegistry.setDesignerLanguage('zh-cn');
    }
    if (projectId) {
      getProjectAiDetail(projectId)
        .then((res) => {
          setProjectDetail(res);
        });
    }
  }, []);

  const handleSave = () => {
    setLoading(true);
    saveSchema({
      designer,
      type: params.get('type'),
      formId: params.get('formId'),
      projectId: params.get('projectId'),
      name: params.get('name'),
    }).finally(() => {
      setTimeout(() => {
        setLoading(false);
      }, 500);
    });
  };
  return (
    <div style={{ marginRight: 10 }}>
      {
        projectDetail?.shareUrl && (
          <Button
            onClick={() => {
              window.open(projectDetail?.shareUrl);
            }}
          >
            查看决策流
          </Button>
        )
      }
      &nbsp;
      &nbsp;
      <Button
        type="primary"
        onClick={handleSave}
        loading={loading}
      >
        保存
      </Button>
    </div>
  );
});
export default ActionsWidget;
