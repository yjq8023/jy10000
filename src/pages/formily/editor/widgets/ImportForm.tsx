import React from 'react';
import { Select, Row, Col, Button } from '@sinohealth/butterfly-ui-components/lib';
import { useDesigner, TextWidget } from '@sinohealth/designable-react';
import { importSchema } from '@/pages/formily/editor/service';

const ImportForm = () => {
  const designer = useDesigner();
  const handleImport = () => {
    importSchema(designer, 'test');
  };
  return (
    <Row gutter={20}>
      <Col span={17}>
        <Select style={{ width: '100%' }} placeholder="请选择需导入的表单" />
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
