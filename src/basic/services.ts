import fetch from '@/utils/fetch';

/**
 * 获取用户信息
 * @returns
 */
export const serviceGetUserInfo = () => fetch('/index.php/WebApi/User/refresh');

/**
 * 获取地区
 * @returns
 */
export const serviceGetAreas = (params: {aid?: string}) => fetch('/index.php/WebApi/Area/areas', { params });
