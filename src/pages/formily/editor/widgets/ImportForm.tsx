import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Select, Row, Col, Button } from '@sinohealth/butterfly-ui-components/lib';
import { useDesigner, TextWidget } from '@sinohealth/designable-react';
import { importSchema } from '@/pages/formily/editor/service';
import { getProjectPlanMap } from '@/services/planMapAntForm';
import { planItemTypes } from '@/pages/planMapEditor/config';

const ImportForm = () => {
  const [followUpData, setFollowUpData] = useState<any>();
  const [selectedFollowUp, setSelectedFollowUp] = useState<string>('');
  const designer = useDesigner();
  const [params] = useSearchParams();
  const projectId = params.get('projectId');
  const formId = params.get('formId');
  useEffect(() => {
    if (projectId) {
      getProjectPlanMap(projectId)
        .then((data: any) => {
          handleGetFollowUp(data);
        });
    }
  }, []);
  const handleGetFollowUp = (data: ProjectPlanMap.data) => {
    const followUps: any = [];
    data?.roadMaps.forEach((roadMap) => {
      roadMap.roadMapSteps.forEach((nodeItem) => {
        nodeItem.followUpItems.forEach((followUpItem) => {
          if (followUpItem.itemCategory === planItemTypes.followUp && followUpItem.bizId !== formId) {
            followUps.push({
              label: followUpItem.itemName,
              value: followUpItem.bizId,
            });
          }
        });
      });
    });
    setFollowUpData(followUps);
  };
  const handleImport = () => {
    if (selectedFollowUp) {
      importSchema(designer, selectedFollowUp);
    }
  };
  return (
    <Row gutter={20}>
      <Col span={17}>
        <Select onChange={setSelectedFollowUp} style={{ width: '100%' }} placeholder="请选择需导入的表单" options={followUpData} />
      </Col>
      <Col span={4}>
        <Button type="primary" onClick={handleImport}>
          导入
        </Button>
      </Col>
    </Row>
  );
};

export default ImportForm;
