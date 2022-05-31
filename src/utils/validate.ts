const phoneReg =
  /^(0|86|17951)?(13[0-9]|15[012356789]|16[256]|17[0235678]|18[0-9]|19[189]|14[1456789])[0-9]{8}$/;

/**
 * 校验手机号码是否符合
 * @param mobile 手机号码
 * @returns boolean
 */
export const validIsMobile = (mobile: string) => !!phoneReg.test(mobile);

/**
 * 验证密码是否含有字母，数字，符号的两种
 * @param value 密码
 * @returns boolean
 */
export const validIsPasswordReg = /(?!^(\d+|[a-zA-Z]+|[~!@#$%^&*?.]+)$)^[\w~.!@#$%^&*?]{6,20}$/;
export const validIsPassword = (value: string) => {
  if (validIsPasswordReg.test(value)) return true;
  return false;
};
export const isNull = (str: string | undefined | null) => {
  if (typeof str !== 'string') {
    return true;
  }
  if (str.length === 0) {
    return true;
  }
  return false;
};
export default {
  validIsMobile,
  validIsPassword,
};
