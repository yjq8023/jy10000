import {
  Button,
  Divider,
  Form,
  Input,
  Select,
  Space,
  Spin,
} from '@sinohealth/butterfly-ui-components/lib';
import React, { FC, useEffect, useState } from 'react';
import SimpleModal from '@/components/SimpleModal';
import { labelList, labelSave, organizeSaveLabel } from '@/services/customer';

type LabelFormType = {
  tenantId?: string | number;
  id?: any;
  labelData?: any;
  onCancel?: (success?: boolean) => void;
};
const LabelForm: FC<LabelFormType> = (props) => {
  const { id, tenantId } = props;
  const [form] = Form.useForm();
  const [formAddLabel] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [isDoctor, setIsDoctor] = useState(false);
  const [disableSubmit, setDisableSubmit] = useState(false);

  const [labelOptions, setLabelOptions] = useState([]);
  const [labelValues, setLabelValues] = useState<any>([]);

  const getLabelList = () => {
    labelList({ ...props.labelData }).then((res) => {
      setLabelOptions(res);
    });
  };

  useEffect(() => {
    labelList({ ...props.labelData }).then((res) => {
      setLabelOptions(res);
      form.setFieldsValue({ labels: props.labelData.labels });
    });
  }, [props.labelData]);

  const finish = (values: any) => {
    const params = {
      ...values,
    };
    console.log(params, labelValues);
    organizeSaveLabel(props.labelData.id, params.labels).then((res) => {
      onCancel(true);
    });
  };

  const addLabel = (values: any) => {
    labelSave(values).then((res) => {
      getLabelList();
      formAddLabel.resetFields();
    });
  };

  const onCancel = (success?: boolean) => {
    form.resetFields();
    setIsDoctor(false);
    if (props.onCancel) props.onCancel(success);
  };

  return (
    <SimpleModal
      visible={!!props.labelData}
      //   closable={false}
      h2={props.id ? '编辑标签' : '增加标签'}
      cancelButtonProps={{ type: 'info' }}
      onOk={() => {
        form.submit();
      }}
      width={560}
      loading={loading}
      okButtonProps={{ disabled: disableSubmit }}
      onCancel={() => {
        onCancel();
      }}
    >
      <Spin spinning={loading}>
        <Form labelAlign="right" form={form} labelCol={{ span: 4 }} onFinish={finish} colon={false}>
          <Form.Item label="选择标签" name="labels">
            <Select
              showSearch
              mode="multiple"
              autoFocus={false}
              filterOption={(input, option) => {
                console.log(option);
                if (option!.children) {
                  return (option!.children as unknown as string)
                    .toLowerCase()
                    .includes(input.toLowerCase());
                }
                if (option!.label) {
                  return (option!.label as unknown as string)
                    .toLowerCase()
                    .includes(input.toLowerCase());
                }
                return false;
              }}
              dropdownRender={(menu) => (
                <>
                  {menu}
                  <Divider style={{ margin: '8px 0' }} />
                  <Space style={{ padding: '0 8px 4px' }}>
                    <Form form={formAddLabel} layout="inline" onFinish={addLabel} colon={false}>
                      <Form.Item
                        label=""
                        name="categoryName"
                        style={{ width: 150 }}
                        // noStyle
                        rules={[{ required: true, message: '请填写标签分类' }]}
                      >
                        <Input
                          placeholder="标签分类"
                          onKeyDown={(e) => {
                            if (e.code === 'Backspace') {
                              e.stopPropagation();
                            }
                          }}
                          autoComplete="true"
                          allowClear
                        />
                      </Form.Item>
                      <Form.Item
                        label=""
                        name="name"
                        style={{ width: 150 }}
                        // noStyle
                        rules={[{ required: true, message: '请填写标签名称' }]}
                      >
                        <Input
                          placeholder="标签名称"
                          autoComplete="true"
                          onKeyDown={(e) => {
                            if (e.code === 'Backspace') {
                              e.stopPropagation();
                            }
                          }}
                          allowClear
                        />
                      </Form.Item>
                      <Button type="primary" htmlType="submit">
                        添加
                      </Button>
                    </Form>
                  </Space>
                </>
              )}
            >
              {labelOptions.map((item: any) => (
                <Select.OptGroup label={item?.value} key={item?.value}>
                  {item.children.map((op: any) => (
                    <Select.Option key={op.id} value={op.id}>
                      {op.value}
                    </Select.Option>
                  ))}
                </Select.OptGroup>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Spin>
    </SimpleModal>
  );
};
export default LabelForm;
