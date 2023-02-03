import React, { useEffect, useRef, useState } from 'react';

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
} from '@sinohealth/butterfly-ui-components/lib';
import { CloudUploadOutlined } from '@ant-design/icons';
import useSWR from 'swr';
import {
  getUserInfo,
  updateUserInfo,
  getUpdateUserInfoEmployee,
  UpdUpdateUserInfoEmployee,
} from '@/services/user';
import style from './index.less';
import { baseURL, scope } from '@/config/base';
import { getToken } from '@/utils/cookies';
import { getBase64, previewFile } from '@/utils';
import SimpleModal from '@/components/SimpleModal';
import { sysUserInfo } from '@/core/hooks/sysUserInfo';

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
  // const { data } = useSWR<any>('getUserInfo', getUserInfo);
  const [form] = Form.useForm();
  const [data, setData] = useState<any>({});
  const [isFlag, setIsFlag] = useState(false);
  const [msgCount] = sysUserInfo(isFlag);
  useEffect(() => {
    form.setFieldsValue({
      ...data,
      photo: previewFile(data?.avatar),
    });
  }, [data]);

  useEffect(() => {
    getUserInfoFun();
  }, []);
  const getUserInfoFun = async () => {
    const res: any = await getUpdateUserInfoEmployee();
    console.log(res);
    setData(res);
  };
  const handleOk = async (e: any) => {
    form.submit();
  };
  const onFinish = (values: any) => {
    UpdUpdateUserInfoEmployee({
      id: data.id,
      description: values.description,
      avatar: values.avatar,
    }).then(() => {
      message.success('修改基本信息成功！');
      setIsFlag(!isFlag); // 改变右上角用户信息
      // onOk && onOk(values);
    });
  };
  const uploadProps = {
    name: 'avatar',
    action: `${baseURL}cs/file/public/upload`,
    headers: {
      authorization: getToken() || '',
      scope,
      app: 'sdc-hccm-hosp',
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
          avatar: info.file.response.data,
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
    // <SimpleModal title="个人中心" width={560} visible={visible} {...other} onOk={handleOk}>
    <div className={style.box}>
      <div className={style.boxTitle}>基本信息</div>
      <Form form={form} onFinish={onFinish} style={{ width: '50%' }} className={style.userinfo}>
        <Row className={style.info}>
          <Col span={16}>
            <h2>{data && data.name}</h2>
            <Descriptions title={data && data.realname} column={1}>
              <Descriptions.Item label="登录账号">{data && data.phone}</Descriptions.Item>
              {/* <Descriptions.Item label="用户类型">1810000000</Descriptions.Item> */}
              <Descriptions.Item label="所属组织">{data && data.organizeName}</Descriptions.Item>
              <Descriptions.Item label="所属科室">{data && data.departmentName}</Descriptions.Item>
            </Descriptions>
          </Col>

          <Col span={8}>
            <Item name="avatar" noStyle>
              <div />
            </Item>
            <Item name="photo" noStyle>
              <Ava />
            </Item>
            <div style={{ textAlign: 'right' }}>
              <Upload {...uploadProps}>
                <Button icon={<CloudUploadOutlined />}>上传头像</Button>
              </Upload>
            </div>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Item label="用户描述" name="description" style={{ padding: '24px 14px 24px 24px' }}>
              <Input.TextArea
                placeholder="请输入用户描述"
                showCount
                maxLength={200}
                autoSize={{ minRows: 5, maxRows: 5 }}
              />
            </Item>
          </Col>
        </Row>
        <Form.Item style={{ textAlign: 'right', padding: '14px' }}>
          <Button type="primary" htmlType="submit">
            保存
          </Button>
        </Form.Item>
      </Form>
    </div>
    // </SimpleModal>
  );
}

export default UserInfoModal;
