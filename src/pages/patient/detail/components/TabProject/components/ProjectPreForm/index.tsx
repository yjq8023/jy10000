import React, { useState } from 'react';
import { Badge } from '@sinohealth/butterfly-ui-components/lib';
import { FormRender, useFormilyForm } from '@sinohealth/butterfly-formily-engine';
import style from '@/pages/patient/detail/components/TabProject/index.less';
import ProjectPreFormEditModal from '../ProjectPreFormEditModal';

const schema = {
  type: 'object',
  properties: {
    radio: {
      type: 'number',
      title: '一般检查',
      enum: [
        {
          label: '正常',
          value: 1,
        },
        {
          label: '异常',
          value: 0,
        },
      ],
      'x-decorator': 'FormItem',
      'x-component': 'Radio.Group',
    },
    multiple: {
      type: 'array',
      title: '用药类型',
      enum: [
        {
          label: '选择性雌激素受体调节剂（SERM）',
          value: 1,
        },
        {
          label: '卵巢功能抑制（OFS）药物',
          value: 2,
        },
        {
          label: '芳香化酶抑制剂（AI）',
          value: 3,
        },
        {
          label: '芳香化酶抑制剂（AI1）',
          value: 31,
        },
        {
          label: '芳香化酶抑制剂（AI2）',
          value: 32,
        },
        {
          label: '芳香化酶抑制剂（AI3）',
          value: 33,
        },
      ],
      'x-decorator': 'FormItem',
      'x-component': 'Checkbox.Group',
    },
    year: {
      title: '年选择',
      'x-decorator': 'FormItem',
      'x-component': 'DatePicker',
      'x-component-props': {
        picker: 'year',
      },
      type: 'string',
    },
    '[startDate,endDate]': {
      title: '日期范围',
      'x-decorator': 'FormItem',
      'x-component': 'DatePicker.RangePicker',
      'x-component-props': {
        showTime: true,
      },
      type: 'string',
    },
  },
};

type ProjectPreFormProps = {
  projectItem: Patient.ProjectInfo,
  showHistoryModal: (config: any) => void
}
function ProjectPreForm(props: ProjectPreFormProps) {
  const { projectItem, showHistoryModal } = props;
  const [showEditModal, setShowEditModal] = useState(false);
  const form = useFormilyForm();
  const isHasPreForm = projectItem.schema;
  const isEditedPreForm = projectItem.status === '1';
  const formProps = {
    editable: false,
    values: {
      radio: 1,
      multiple: [1, 2],
      year: 2021,
    },
  };
  const renderPreForm = () => {
    if (isEditedPreForm) {
      return (
        <div className={style.formBox}>
          <FormRender form={form} formProps={formProps} schema={schema} />
        </div>
      );
    }
    return null;
  };
  return (
    <div className={style.projectListItem}>
      <div className={style.projectListHeader}>
        <Badge status="processing" />
        前列腺随访管理项目
        {
          isHasPreForm && (
            isEditedPreForm ?
              <a className={style.action} onClick={() => showHistoryModal(projectItem)}>查看历史前置信息</a>
              :
              <a className={style.action} onClick={() => setShowEditModal(true)}>填写前置信息</a>
          )
        }
      </div>
      {
        isHasPreForm ? renderPreForm() : <div className={style.formBox}>无</div>
      }
      { showEditModal && <ProjectPreFormEditModal onCancel={() => setShowEditModal(false)} />}
    </div>
  );
}

export default ProjectPreForm;
