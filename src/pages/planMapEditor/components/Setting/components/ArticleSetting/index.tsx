import React from 'react';
import { Form, Button } from '@sinohealth/butterfly-ui-components/lib';
import style from './index.less';
import { ArticleSettingContent } from '@/pages/planMapEditor/components/AddArticleModal';

const ArticleSetting = (props: any) => {
  const { data } = props;
  const [form] = Form.useForm();
  console.log('data');
  console.log(data);
  return (
    <div className={style.articleSetting}>
      <div className={style.header}>
        <div className={style.type}>患教文章</div>
        <div className={style.title}>{data.itemName}</div>
      </div>
      <div className={style.body}>
        <ArticleSettingContent isMini form={form} formValue={data} />
      </div>
    </div>
  );
};

export default ArticleSetting;
