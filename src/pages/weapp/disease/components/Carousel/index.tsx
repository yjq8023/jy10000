import React, { useState } from 'react';
import { Form, Input } from '@sinohealth/butterfly-ui-components/lib';
import SimpleModal from '@/components/SimpleModal';
import styles from './index.less';
import CarouselUpload from '../CarouselUpload';

type CarouselProps = {
  visible?: boolean;
  onCancel?: () => void;
};

/**
 * 轮播图管理-添加修改
 * @returns
 */
const Carousel: React.FC<CarouselProps> = (props) => {
  const { visible, onCancel } = props;

  return (
    <div className={styles.carousel}>
      <SimpleModal
        visible={visible}
        title="添加轮播图"
        okText="提交"
        onCancel={() => onCancel && onCancel()}
      >
        <Form
          name="basic"
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={() => {}}
          onFinishFailed={() => {}}
          autoComplete="off"
        >
          <Form.Item label="所属应用">
            <Input placeholder="请输入轮播图名称" disabled value="全病程管理小程序-患者端" />
          </Form.Item>
          <Form.Item
            label="轮播图名称"
            name="username"
            rules={[{ required: true, message: '请输入轮播图名称' }]}
          >
            <Input placeholder="请输入轮播图名称" />
          </Form.Item>

          <Form.Item
            label="图片"
            name="password"
            rules={[{ required: true, message: '请上传图片' }]}
          >
            <CarouselUpload maxSize={1} onSuccess={(v) => console.log(v)} />
          </Form.Item>
        </Form>
      </SimpleModal>
    </div>
  );
};

export default Carousel;
