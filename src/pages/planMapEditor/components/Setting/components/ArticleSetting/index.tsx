import React, { useContext } from 'react';
import { Form, Button } from '@sinohealth/butterfly-ui-components/lib';
import lodash from 'lodash';
import style from './index.less';
import { ArticleSettingContent } from '@/pages/planMapEditor/components/AddArticleModal';
import { planMapContext } from '@/pages/planMapEditor';

const debounce = lodash.debounce((c) => {
  c && c();
}, 1000);
const ArticleSetting = (props: any) => {
  const { data } = props;
  const [form] = Form.useForm();
  const { setPlanMapState } = useContext(planMapContext);
  const handleChange = () => {
    debounce(() => {
      form.submit();
    });
  };
  const onFinish = (values: any) => {
    setPlanMapState('update', data.path, { ...data, ...values });
  };
  return (
    <div className={style.articleSetting}>
      <div className={style.header}>
        <div className={style.type}>患教文章</div>
        <div className={style.title}>{data.itemName}</div>
      </div>
      <div className={style.body}>
        <ArticleSettingContent isMini form={form} onFinish={onFinish} formValue={data} onValuesChange={handleChange} />
      </div>
    </div>
  );
};

export default ArticleSetting;
