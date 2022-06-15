import React from 'react';
import { Card, Descriptions, Button } from '@sinohealth/butterfly-ui-components/lib';

function UserInfoDetail(props: any) {
  const { onEdit } = props;
  return (
    <div>
      <Card className="but-card" title="基本信息">
        <Descriptions bordered size="small" labelStyle={{ width: '140px' }} contentStyle={{ minWidth: '160px' }}>
          <Descriptions.Item label="姓名" span={3}>小妹妹</Descriptions.Item>
          <Descriptions.Item label="手机号码">15521381406</Descriptions.Item>
          <Descriptions.Item label="身份证号" span={2}>440921199203306812</Descriptions.Item>
          <Descriptions.Item label="性别">男</Descriptions.Item>
          <Descriptions.Item label="年龄">18</Descriptions.Item>
          <Descriptions.Item label="出生年月">1991-01-02</Descriptions.Item>
          <Descriptions.Item label="身高 (cm)">188</Descriptions.Item>
          <Descriptions.Item label="体重 (kg)">81</Descriptions.Item>
          <Descriptions.Item label="BMI" span={2}>22</Descriptions.Item>
          <Descriptions.Item label="主要诊断" span={3}>食欲不振，精神萎靡，上吐下泻外加面红耳赤</Descriptions.Item>
          <Descriptions.Item label="过敏史" span={3}>花粉过敏</Descriptions.Item>
          <Descriptions.Item label="既往史" span={3}>无</Descriptions.Item>
          <Descriptions.Item label="家属姓名">小林</Descriptions.Item>
          <Descriptions.Item label="与患者关系">父子</Descriptions.Item>
          <Descriptions.Item label="家属联系电话">15521371265</Descriptions.Item>
          <Descriptions.Item label="现住址" span={3}>北京市朝阳区风华街道天安门广场</Descriptions.Item>
        </Descriptions>
      </Card>
      <Card className="but-card" title="家族史">
        <Descriptions bordered size="small" labelStyle={{ width: '140px' }} contentStyle={{ width: '160px' }}>
          <Descriptions.Item label="关系">父亲</Descriptions.Item>
          <Descriptions.Item label="疾病名称" span={2}>高血压,高血压高血压高血压高血压高血压高血压高血压高血压高血压高血压高血压高血压高血压高血压</Descriptions.Item>
          <Descriptions.Item label="关系">母亲</Descriptions.Item>
          <Descriptions.Item label="疾病名称" span={2}>乳腺癌</Descriptions.Item>
        </Descriptions>
      </Card>
      <div className="actionBar">
        <Button type="primary" onClick={() => onEdit()}>编辑</Button>
      </div>
    </div>
  );
}

export default UserInfoDetail;
