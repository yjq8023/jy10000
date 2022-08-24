import React, { useEffect, useState } from 'react';
import { Form, Input } from '@sinohealth/butterfly-ui-components/lib';
import SimpleModal from '@/components/SimpleModal';
import styles from './index.less';
import CarouselUpload from '../CarouselUpload';
import { UCenter } from '@/services/weapp/data';
import { previewFile } from '@/utils';

type CarouselProps = {
  visible?: boolean;
  appName?: string;
  params?: UCenter.InsertReq;
  onOk?: (val: UCenter.InsertReq) => void;
  onCancel?: () => void;
};

/**
 * 轮播图管理-添加修改
 * @returns
 */
const Carousel: React.FC<CarouselProps> = (props) => {
  const [form] = Form.useForm();

  const { visible, appName, params, onCancel, onOk } = props;

  useEffect(() => {
    console.log(params);
    form.setFieldsValue(params);
  }, [params]);

  return (
    <div className={styles.carousel}>
      <SimpleModal
        visible={visible}
        title="添加轮播图"
        okText="提交"
        cancelButtonProps={{ type: 'info' }}
        onCancel={() => {
          form.resetFields();
          onCancel && onCancel();
        }}
        onOk={() => {
          form
            .validateFields()
            .then(() => {
              const insertParams = form.getFieldsValue() as any;
              onOk && onOk(insertParams);
            })
            .catch(() => {});
        }}
      >
        <Form
          name="basic"
          form={form}
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={() => {}}
          onFinishFailed={() => {}}
          autoComplete="off"
        >
          {/* <Form.Item label="所属应用">
            <Input placeholder="请输入轮播图名称" value={appName} disabled />
          </Form.Item> */}
          <Form.Item
            label="轮播图名称"
            name="title"
            rules={[{ required: true, message: '请输入轮播图名称' }]}
          >
            <Input placeholder="请输入轮播图名称" />
          </Form.Item>
          <Form.Item
            label="权重排序"
            name="weight"
            rules={[
              {
                required: true,
                pattern: /^[0-9]{1,5}$/g,
                message: '最多输入5位数字，数字越大，排序越靠前',
              },
            ]}
          >
            <Input placeholder="最多输入5位数字，数字越大，排序越靠前" />
          </Form.Item>

          <Form.Item
            label="图片"
            name="storageId"
            rules={[{ required: true, message: '请上传图片' }]}
          >
            <CarouselUpload
              maxSize={1}
              fileId={params?.storageId ? previewFile(params?.storageId) : ''}
              onSuccess={(v) => form.setFieldsValue({ storageId: v })}
              onDel={() => form.setFieldsValue({ storageId: '' })}
            />
          </Form.Item>
        </Form>
      </SimpleModal>
    </div>
  );
};

export default Carousel;
