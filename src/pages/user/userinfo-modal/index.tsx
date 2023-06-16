import React, { useEffect } from 'react';
import {
  ModalProps,
  Modal,
  Input,
  Form,
  message,
  Row,
  Col,
  Upload,
  Button,
  Avatar,
  Descriptions,
} from 'antd';
import { CloudUploadOutlined } from '@ant-design/icons';
import useSWR from 'swr';
import { getUserInfo, updateUserInfo } from '@/services/user';
import style from './index.less';
import { baseURL, scope } from '@/config/base';
import { getToken } from '@/utils/cookies';
import { getBase64, previewFile } from '@/utils';
import SimpleModal from '@/components/SimpleModal';

const { Item } = Form;
interface UserInfoModalProps extends ModalProps {}

function Ava(props: any) {
  const { value = '' } = props;
  // const url = value.startsWith('http') ? value : `${baseURL}fat/api/oss/preview/${value}`;
  return (
    <div className={style.avatar}>
      <Avatar size={110} src={value} />
    </div>
  );
}

function UserInfoModal(props: UserInfoModalProps) {
  const { visible, onOk, ...other } = props;
  const { data } = useSWR<any>('getUserInfo', getUserInfo);
  const [form] = Form.useForm();
  useEffect(() => {
    form.setFieldsValue({
      ...data,
      photo: previewFile(data?.avatar),
    });
  }, [data]);
  const handleOk = async (e: any) => {
    form.submit();
  };
  const onFinish = (values: any) => {
    updateUserInfo({
      id: data.id,
      description: values.description,
      pic: values.pic,
    }).then(() => {
      message.success('修改基本信息成功！');
      onOk && onOk(values);
    });
  };
  const uploadProps = {
    name: 'avatar',
    action: `${baseURL}cs/file/public/upload`,
    headers: {
      authorization: getToken() || '',
      scope,
      app: 'sdc-hccm-backend',
    },
    accept: 'image/png, image/jpeg',
    itemRender() {
      return '';
    },
    onChange(info: any) {
      if (info.file.status === 'done') {
        message.success(`${info.file.name} 上传成功`);
        console.log(info);
        console.log(info.file.response.data);
        form.setFieldsValue({
          pic: info.file.response.data,
        });
        getBase64(info.file.originFileObj, (imageUrl: string) => {
          form.setFieldsValue({
            photo: imageUrl,
          });
        });
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} 上传失败`);
      }
    },
    beforeUpload(file: any) {
      const isLt1M = file.size / 1024 / 1024 < 1;
      if (!isLt1M) {
        message.error('上传头像不能大于1MB!');
      }
      return isLt1M;
    },
  };
  return (
    <SimpleModal title="个人中心" width={560} visible={visible} {...other} onOk={handleOk}>
      <Form form={form} onFinish={onFinish} className={style.userinfo}>
        <Row className={style.info}>
          <Col span={16}>
            <h2>{data && data.name}</h2>
            <Descriptions title={data && data.realname} column={1}>
              <Descriptions.Item label="登录账号">{data && data.phoneNumber}</Descriptions.Item>
              {/* <Descriptions.Item label="用户类型">1810000000</Descriptions.Item> */}
              <Descriptions.Item label="所属机构">{data && data.chainName}</Descriptions.Item>
            </Descriptions>
          </Col>
          <Col span={8}>
            <Item name="pic" noStyle>
              <div />
            </Item>
            <Item name="photo" noStyle>
              <Ava />
            </Item>
            <div style={{ textAlign: 'center' }}>
              <Upload {...uploadProps}>
                <Button icon={<CloudUploadOutlined />}>上传头像</Button>
              </Upload>
            </div>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Item label="用户描述" name="description" style={{ padding: '0 24px' }}>
              <Input.TextArea
                placeholder="请输入用户描述"
                showCount
                maxLength={200}
                autoSize={{ minRows: 5, maxRows: 5 }}
              />
            </Item>
          </Col>
        </Row>
      </Form>
    </SimpleModal>
  );
}

export default UserInfoModal;
