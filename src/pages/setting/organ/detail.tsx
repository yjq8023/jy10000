import {
  Row,
  Form,
  Col,
  DatePicker,
  Select,
  Input,
  TreeSelect,
  Button,
  Cascader,
} from '@sinohealth/butterfly-ui-components/lib';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import moment, { Moment } from 'moment';
import regionData from '@/assets/json/region.json';
import UploadOne from '@/components/UploadOne';
import styles from './detail.less';
import MapComponent from '@/components/MapContainer';
import { labelList, organizeAdd, organizeDetail, organizeEdit } from '@/services/customer';

const OrganDetail = () => {
  const [form] = Form.useForm();
  const navigator = useNavigate();
  const [urlParams] = useSearchParams();
  const [id] = urlParams.getAll('id');
  const [parentId] = urlParams.getAll('parentId');
  const [tenantId] = urlParams.getAll('tenantId');
  const [back] = urlParams.getAll('back');

  const [mapAddress, setMapAddress] = useState('');
  // const [labelOptions, setLabelOptions] = useState([]);

  // useEffect(() => {
  //   labelList({ id, tenantId }).then((res) => {
  //     setLabelOptions(res);
  //   });
  // }, []);

  useEffect(() => {
    if (id) {
      organizeDetail(id).then((res) => {
        console.log(res);
        form.setFieldsValue({
          ...res,
          expiredTime: res.expiredTime ? moment(res.expiredTime) : null,
        });
        setMapAddress(res.address);
      });
    }
  }, [id]);

  const goback = () => {
    if (back) navigator(`/setting/organ?curr=${back}`);
    else navigator('/setting/organ');
  };

  const onFinish = (values: any) => {
    console.log('Success:', values);
    const params = { ...values };
    if (params.expiredTime) {
      params.expiredTime = (params.expiredTime as Moment).format('YYYY-MM-DD');
    }
    if (id) {
      organizeEdit(id, params).then((res) => {
        goback();
      });
    } else {
      organizeAdd(tenantId, { ...params, parentId: parentId || '0' }).then((res) => {
        goback();
      });
    }
  };

  return (
    <div className={styles['content-page']}>
      <Form labelAlign="right" form={form} labelCol={{ span: 6 }} onFinish={onFinish} colon={false}>
        <Form.Item label="节点" name="parentId" initialValue={0} hidden>
          <Input />
        </Form.Item>
        <Row gutter={16}>
          <Col span={9}>
            <Form.Item
              label="组织名称"
              name="name"
              rules={[{ required: true, message: '请填写组织名称' }]}
            >
              <Input placeholder="请输入组织名称（必填）" />
            </Form.Item>
            <Form.Item
              label="组织负责人"
              name="owner"
              rules={[{ required: true, message: '请填写组织负责人' }]}
            >
              <Input placeholder="请输入组织负责人（必填）" />
            </Form.Item>
            <Form.Item
              label="有效时间"
              name="expiredTime"
              rules={[{ required: true, message: '请选择有效时间' }]}
            >
              <DatePicker
                style={{ width: '100%' }}
                disabledDate={(current) => {
                  return current && current < moment().endOf('day');
                }}
              />
            </Form.Item>

            <Form.Item
              name="location"
              label="组织地址"
              rules={[{ required: true, message: '请填组织地址' }]}
            >
              <Cascader
                fieldNames={{ label: 'name', value: 'id', children: 'children' }}
                options={regionData}
                placeholder="请选择省市区"
              />
            </Form.Item>
          </Col>
          <Col span={9}>
            <Form.Item label="组织电话" name="officePhone">
              <Input placeholder="组织电话" maxLength={11} />
            </Form.Item>
            <Form.Item
              label="负责人手机号"
              name="ownerPhone"
              rules={[{ required: true, message: '请填负责人手机号' }]}
            >
              <Input placeholder="负责人手机号" maxLength={11} />
            </Form.Item>
            <Form.Item
              label="排序"
              name="sort"
              rules={[
                { required: true, message: '填写排序' },
                { pattern: /^[0-9]\d{0,4}$/, message: '最多输入5位数字' },
              ]}
            >
              <Input placeholder="最多输入5位数字，数字越大，排序越靠前" type="number" />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="Logo" name="logo">
              <UploadOne />
            </Form.Item>
          </Col>
          <Col span={18}>
            <Form.Item
              label="详细地址"
              name="address"
              labelCol={{ span: 3 }}
              rules={[{ required: true, message: '请填详细地址' }]}
            >
              <Input
                placeholder="详细地址"
                onBlur={(e) => {
                  setMapAddress(e.target.value);
                }}
              />
            </Form.Item>
          </Col>
          <Col span={18}>
            <Form.Item
              label="组织介绍"
              name="description"
              labelCol={{ span: 3 }}
              rules={[{ required: true, message: '请填组织介绍' }]}
            >
              <Input.TextArea placeholder="组织介绍" />
            </Form.Item>
          </Col>
          <Col span={9}>
            <Form.Item
              label="组织坐标"
              name="coordinate"
              // rules={[{ required: true, message: '请选择组织坐标' }]}
            >
              <MapComponent
                className={styles['panel-content-map']}
                // onChooseAddress={(address) => {
                //   form.setFieldsValue({ address });
                // }}
                scope={100}
                setAddress={mapAddress}
                onLnglat={(lnglat: any) => {
                  form.setFieldsValue({ coordinate: `${lnglat.lng},${lnglat.lat}` });
                }}
              />
            </Form.Item>
          </Col>
        </Row>
        <div className={styles.footer}>
          <Button
            onClick={() => {
              goback();
            }}
          >
            返回
          </Button>
          &nbsp; &nbsp;
          <Button
            type="primary"
            onClick={() => {
              form.submit();
            }}
          >
            保存
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default OrganDetail;
