import React from 'react';
import { Tag, Button, Row, Col } from '@sinohealth/butterfly-ui-components/lib';
import { MobileTwoTone } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import cls from 'classnames';
import style from './index.less';
import Empty from '@/components/Empty';

function ListBody(props: any) {
  const { listData = [] } = props;
  const renderCardItem = (item: Patient.Item) => {
    const isWoman = item.sex === 'female';
    const patientName = item.name;
    const age = item.age;
    const patientPhone = item.phone;
    const tagClass = cls({
      'iconfont icon-phone': true,
      [style.tag]: true,
      [style.tag0]: item.wxBindStatus === '1',
    });
    return (
      <div className={style.listItem}>
        <span className={tagClass} />
        <div>
          <div className={style.userInfo}>
            <div className={style.userName}>
              {patientName}
              &nbsp;
              {isWoman ? (
                <span className="iconfont icon-nv" style={{ fontSize: '16px', color: '#FFCED9' }} />
              ) : (
                <span
                  className="iconfont icon-nan"
                  style={{ fontSize: '16px', color: '#B1C1F7' }}
                />
              )}
            </div>
            <div>
              {age}岁， {patientPhone}
            </div>
          </div>
          <div className={style.preInfo}>
            <div>
              档案号：<span className={style.text}>{item.number}</span>
            </div>
            <div>
              主要诊断：<span className={style.text}>{item.mainDisease}</span>
            </div>
            <div>
              管理项目：<span className={style.text}>{item.diseaseProjectName}</span>
            </div>
            <div>
              个案管理师：<span className={style.text}>{item.caseManager}</span>
            </div>
          </div>
          <Link to={`/patient/detail?id=${item.id}`}>
            <Button block type="primary">
              查看详情
            </Button>
          </Link>
        </div>
      </div>
    );
  };
  return (
    <div className={style.cardList}>
      { listData.length === 0 && <div style={{ display: 'flex' }}><Empty /></div>}
      <Row gutter={[18, 20]}>
        {listData.map((item: any) => (
          <Col lg={6} xxl={4} key={item.id}>
            {renderCardItem(item)}
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default ListBody;
