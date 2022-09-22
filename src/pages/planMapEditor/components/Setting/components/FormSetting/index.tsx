import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button, Modal, Input, message } from '@sinohealth/butterfly-ui-components/lib';
import { FormRender, registerComponents } from '@sinohealth/butterfly-formily-engine';
import * as components from '@sinohealth/butterfly-formily-components';
import { planItemTypes } from '@/pages/planMapEditor/config';
import { getBeforeInfoSchema, getFollowUpFormInfo, saveProjectPlanMap } from '@/services/planMapAntForm';
import style from './index.less';
import { planMapContext } from '@/pages/planMapEditor';
import { httpScaleDetail } from '@/services/project';

const allComponents = {
  components,
  FormProvider: components.Form,
};
registerComponents(allComponents);

const FormSetting = (props: any) => {
  const { data, isEdited } = props;
  const [newName, setNewName] = useState('');
  const { disabled, setPlanMapState, projectPlanData, planMapState } = useContext(planMapContext);
  const [schema, setSchema] = useState<any>({
    form: {},
    schema: {},
  });
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const projectId = params.get('id');
  const isBeforeInfo = data.itemCategory === planItemTypes.beforeInfo;
  const isFollowUp = data.itemCategory === planItemTypes.followUp;
  const isForm = data.itemCategory === planItemTypes.form;
  const formProps = {
    ...schema.form,
    labelCol: 24,
    wrapperCol: 24,
    layout: 'vertical',
  };
  useEffect(() => {
    if (projectId && isBeforeInfo) {
      getBeforeInfoSchema(projectId)
        .then((res: any) => {
          if (res.formJson) {
            setSchema(JSON.parse(res.formJson));
          }
        });
    }
    if (data?.bizId && isFollowUp) {
      getFollowUpFormInfo(data.bizId)
        .then((res: any) => {
          if (res.formJson) {
            setSchema(JSON.parse(res.formJson));
          }
        });
    }
    if (data?.bizId && isForm) {
      httpScaleDetail(data.bizId)
        .then((res: any) => {
          if (res.scaleJson) {
            setSchema(JSON.parse(res.scaleJson));
          }
        });
    }
  }, []);

  const titles: any = {
    [planItemTypes.beforeInfo]: '项目前置信息',
    [planItemTypes.followUp]: '跟进记录表',
    [planItemTypes.form]: '医学量表',
  };
  const handleChangeName = (e: any) => {
    setNewName(e.target.value);
    setPlanMapState('update', data.path, { ...data, itemName: e.target.value || '--' });
  };
  const handleEdit = () => {
    if (isEdited) {
      Modal.confirm({
        title: '数据尚未保存，是否保存?',
        content: '页面跳转后尚未保存的数据将丢失',
        okText: '保存并跳转',
        cancelText: '不保存跳转',
        closable: true,
        onOk() {
          saveProjectPlanMap({
            ...projectPlanData,
            roadMaps: planMapState,
          }).then(() => {
            toEditPage(newName);
          });
        },
        onCancel(e) {
          if (!e.triggerCancel) {
            toEditPage();
          }
          return Promise.resolve();
        },
      });
    } else {
      toEditPage();
    }
  };
  const toEditPage = (name = '') => {
    let cType = '';
    if (isForm) cType = 'form';
    if (isBeforeInfo) cType = 'beforeInfo';
    if (isFollowUp) cType = 'followUp';
    navigate(`/project/formily/editor?type=${cType}&formId=${data.bizId}&projectId=${params.get('id')}&name=${name || data.itemName}`);
  };
  return (
    <div className={style.formSetting}>
      <div className={style.header}>
        <div className={style.type}>{titles[data.itemCategory]}</div>
        { isFollowUp ? (
          <Input defaultValue={data.itemName} onChange={handleChangeName} />
        ) : (
          <div className={style.title}>{data.itemName}</div>
        )}
      </div>
      <div className={style.body}>
        {
          Object.keys(schema.schema).length === 0 && (
            <div className={style.empty}>暂无内容</div>
          )
        }
        <FormRender schema={schema.schema} formProps={{ componentProps: formProps }} components={components} />
      </div>
      <div className={style.footer}>
        {
          !disabled && (
            <Button type="primary" onClick={handleEdit}>编辑</Button>
          )
        }
      </div>
    </div>
  );
};

export default FormSetting;
