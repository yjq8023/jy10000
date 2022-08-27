// eslint-disable-next-line no-shadow
export enum planItemTypes {
  beforeInfo = 'beforeInfo', // 前置信息
  followUp = 'FOLLOWUP', // 跟进记录表
  article = 'NOTIFY', // 患教资料
  form = 'CRF', // 医学量表
  diagnosis = 'CHECK' // 复诊复查
}
// 日期单位字典对应展示的字典
export const timeUnitToMomentUnit: any = {
  DAYS: 'days',
  MONTHS: 'months',
  YEARS: 'years',
};
// 日期单位字典对应展示的字典
export const timeUnitToShowUnit: any = {
  DAYS: 'D',
  MONTHS: 'M',
  YEARS: 'Y',
};
export default {
  planItemTypes,
};
