import React from 'react';
import { Tag, Button, Row, Col } from '@sinohealth/butterfly-ui-components/lib';
import { MobileTwoTone } from '@ant-design/icons';
import style from './index.less';

function ListBody(props: any) {
  const { listData = [] } = props;
  const renderCardItem = (item: any) => {
    const isWoman = item.gender === 'female';
    const patientName = '马时刻';
    const age = 12;
    const patientPhone = 15521381406;
    return (
      <div className={style.listItem}>
        <MobileTwoTone className={style.tag} />
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
              档案号：<span className={style.text}>{item.deliveryCategory}</span>
            </div>
            <div>
              处方金额：<span className={style.text}>¥{item.prescriptionAmount}</span>
            </div>
            <div>
              订单时间：<span className={style.text}>{item.createTime}</span>
            </div>
          </div>
          <Button block type="primary">
            查看详情
          </Button>
        </div>
      </div>
    );
  };
  return (
    <div className={style.cardList}>
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
