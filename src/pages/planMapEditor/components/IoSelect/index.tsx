import React, { useState, useEffect, useContext } from 'react';
import { Select } from '@sinohealth/butterfly-ui-components/lib';
import { getUuid } from '@/utils';
import { getAiIoComponents } from '@/services/planMapAntForm';
import { planMapContext } from '@/pages/planMapEditor';

const IoSelect = (props: any) => {
  const { projectPlanData } = useContext(planMapContext);
  const [labelList, setLabelList] = useState<any>([]);
  useEffect(() => {
    if (projectPlanData.projectId) {
      getAiIoComponents(projectPlanData.projectId)
        .then((res: any) => {
          setLabelList(res.map((item: any) => {
            return {
              label: item.label,
              value: item.fieldId,
            };
          }));
        });
    }
  }, [projectPlanData]);
  return (
    <Select {...props} options={labelList} />
  );
};

export default IoSelect;
