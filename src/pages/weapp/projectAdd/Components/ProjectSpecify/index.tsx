/* eslint-disable no-param-reassign */
import React, { useEffect, useState } from 'react';
import { Button, Input, message, Select, Space } from '@sinohealth/butterfly-ui-components/lib';
import styles from './index.less';
import { UCenter } from '@/services/weapp/data';

const { Option, OptGroup } = Select;

const TimeUnit: any = {
  MONTHS: '月',
  YEARS: '年',
};

const SPECIFY: UCenter.SpecVoList = {
  name: '',
  timeNumber: '',
  timeUnit: '',
  originalPrice: '',
  disCountPrice: '',
};

type ProjectSpecifyProps = {
  onSpecify?: (v: UCenter.SpecVoList[]) => void;
  source?: UCenter.SpecVoList[];
};

/**
 * 添加项目-规格
 * @returns
 */
const ProjectSpecify: React.FC<ProjectSpecifyProps> = (props) => {
  const { onSpecify, source } = props;
  const [specifySource, setSpecifySource] = useState<UCenter.SpecVoList[]>([]);
  const [currentSpecify, setCurrentSpecify] = useState<UCenter.SpecVoList>({});
  const [isSame, setIsSame] = useState(false);

  const handleSelectTime = (value: string) => {
    const d = value.split('');
    setCurrentSpecify({
      ...currentSpecify,
      timeNumber: d[0],
      timeUnit: d.includes('年') ? 'YEARS' : 'MONTHS',
    });
  };

  useEffect(() => {
    if (!source) return;
    setSpecifySource(source);
  }, [source]);

  useEffect(() => {
    onSpecify && onSpecify(specifySource);
  }, [specifySource]);

  return (
    <div className={styles['project-specify']}>
      <h4 className={styles['specify-title']}>
        <span style={{ color: '#ff706b' }}>*</span>项目规格
      </h4>
      {specifySource?.map((el, idx: number) => (
        <div className={`${styles['specify-list']} ${styles['display-flex']}`} key={el.name}>
          <span className={styles['list-label']}>规格 {idx + 1}：</span>
          <div className={`${styles['list-valuse']} ${styles['display-flex']}`}>
            {el.name}，{el.timeNumber}
            {TimeUnit[el.timeUnit || '']}；原价 ¥{el.originalPrice}，优惠价 ¥{el.disCountPrice}
            <span
              className={`${styles['list-icon']} iconfont icon-minus-circle`}
              onClick={() => {
                const F = specifySource.filter((lis) => lis.name !== el.name);
                setSpecifySource(F);
              }}
            />
          </div>
        </div>
      ))}
      {Object.keys(currentSpecify).length ? (
        <div className={`${styles['specify-list']} ${styles['display-flex']}`}>
          <span className={styles['list-label']}>规格 {specifySource.length + 1}：</span>
          <div>
            <div className={styles['display-flex']}>
              <div className={styles.specify}>
                <div className={styles.title}>规格名称</div>
                <div className={styles.name} style={{ width: 220 }}>
                  <Input
                    value={currentSpecify.name}
                    placeholder="最多10个字"
                    onChange={(e: any) => {
                      const { value } = e.target;
                      const M = specifySource.filter((el: any) => el.name === value);
                      if (M.length) {
                        setIsSame(true);
                        message.error('规格名称不能相同');
                      } else {
                        setIsSame(false);
                      }
                      const reg = /^(.|\n){0,10}$/;
                      if (reg.test(value)) {
                        setCurrentSpecify({ ...currentSpecify, name: value });
                      } else {
                        message.error('规格名称最多10个字');
                      }
                    }}
                  />
                </div>
              </div>
              <div className={`${styles.specify}`}>
                <div className={styles.title}>服务时长</div>
                <div
                  className={`${styles.name} ${styles['display-flex']}`}
                  style={{ width: '100%', paddingRight: 12 }}
                >
                  {/* <Input placeholder="最多10个字" style={{ width: 120, marginRight: 5 }} /> */}
                  <Select
                    style={{ width: 272 }}
                    placeholder="请选择服务时长"
                    disabled={isSame}
                    onChange={(v) => handleSelectTime(v)}
                  >
                    <OptGroup label="规格：年" key="YEARS">
                      <Option value="1年">1年</Option>
                      <Option value="2年">2年</Option>
                      <Option value="3年">3年</Option>
                      <Option value="4年">4年</Option>
                      <Option value="5年">5年</Option>
                    </OptGroup>
                    <OptGroup label="规格：月" key="MONTHS">
                      <Option value="1个月">1个月</Option>
                      <Option value="2个月">2个月</Option>
                      <Option value="3个月">3个月</Option>
                      <Option value="4个月">4个月</Option>
                      <Option value="5个月">5个月</Option>
                      <Option value="6个月">6个月</Option>
                      <Option value="7个月">7个月</Option>
                      <Option value="8个月">8个月</Option>
                      <Option value="9个月">9个月</Option>
                    </OptGroup>
                  </Select>
                  {/* <div>个月</div> */}
                </div>
              </div>
              {/* <div className={styles.specify}>
              <div className={styles.title} />
              <div className={`${styles.name}  ${styles['display-flex']}`}>
                <Input placeholder="最多5年" style={{ width: 120, marginRight: 5 }} />
                <div>年</div>
              </div>
            </div> */}
            </div>
            <div className={styles['display-flex']}>
              <div className={styles.specify}>
                <div className={styles.title}>原价</div>
                <div className={styles.name}>
                  <Input
                    disabled={isSame}
                    value={currentSpecify.originalPrice}
                    placeholder="请输入（¥）"
                    onChange={(e: any) => {
                      const { value: inputValue } = e.target;
                      const reg = /^\d*(\.(\d){0,2})?$/;
                      if (reg.test(inputValue)) {
                        setCurrentSpecify({
                          ...currentSpecify,
                          originalPrice: inputValue,
                        });
                      }
                    }}
                  />
                </div>
              </div>
              <div className={styles.specify}>
                <div className={styles.title}>优惠价</div>
                <div className={styles.name}>
                  <Input
                    disabled={isSame}
                    value={currentSpecify.disCountPrice}
                    placeholder="请输入（¥）"
                    onChange={(e: any) => {
                      const { value: inputValue } = e.target;
                      const reg = /^\d*(\.(\d){0,2})?$/;
                      if (reg.test(inputValue)) {
                        setCurrentSpecify({
                          ...currentSpecify,
                          disCountPrice: inputValue,
                        });
                      }
                    }}
                  />
                </div>
              </div>
              <div className={styles.specify}>
                <div className={styles.title}>操作</div>
                <div className={styles.name}>
                  <Space>
                    <Button type="info" onClick={() => setCurrentSpecify({})}>
                      取消
                    </Button>
                    <Button
                      type="primary"
                      onClick={() => {
                        if (isSame) {
                          message.error('规格名称不能相同');
                          return;
                        }
                        const { disCountPrice, originalPrice, name, timeNumber } = currentSpecify;
                        if (!disCountPrice || !originalPrice || !name || !timeNumber) {
                          message.error('请完善规格信息');
                          return;
                        }
                        setSpecifySource([...specifySource, currentSpecify]);
                        const timer = setTimeout(() => {
                          setCurrentSpecify({});
                          clearTimeout(timer);
                        }, 50);
                      }}
                    >
                      添加
                    </Button>
                  </Space>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className={`${styles['specify-list']} ${styles['display-flex']}`}>
          <span className={styles['list-label']}>规格 {specifySource.length + 1}：</span>
          <div className={styles['specify-add']} onClick={() => setCurrentSpecify(SPECIFY)}>
            + 添加规格
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectSpecify;
