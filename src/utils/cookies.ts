/*
 * @Description: 存储 token
 * @Author: kaifengLi
 * @Date: 2021-11-04 19:04:28
 * @LastEditTime: 2021-11-15 14:15:34
 * @LastEditors: kaifengLi
 */

// @ts-ignore
import Cookies from 'js-cookie';

const TOKEN_KEY = 'access_token';
const EXPIRES = 3;

/**
 * 设置 token
 * @param token token
 */
export const setToken = (token: string) => {
  Cookies.set(TOKEN_KEY, token, { expires: EXPIRES });
};

/**
 * 获取 token
 * @returns
 */
export const getToken = () => Cookies.get(TOKEN_KEY);

/**
 * 移除token
 * @returns
 */
export const removeToken = () => Cookies.remove(TOKEN_KEY);

/**
 * 在cookie 中存储数据
 * @param key 存储的健
 * @param value 存储的值
 */
export const setCookies = (key: string, value: any) => {
  Cookies.set(key, window.btoa(unescape(encodeURIComponent(JSON.stringify(value)))), {
    expires: EXPIRES,
  });
};

/**
 * 获取 cookie 中的数据
 * @param key 存储的健
 */
export const getCookies = (key: string) =>
  Cookies.get(key) ? JSON.parse(decodeURIComponent(escape(window.atob(Cookies.get(key))))) : null;

/**
 * 移除 cookie 中的数据
 * @param key 存储的健
 */
export const removeCookies = (key: string) => {
  Cookies.remove(key);
};

/**
 * 移除 cookie 中的全部数据
 * @param key 存储的健
 */
export const clearCookies = (key: string) => {
  Cookies.clear(key);
};
