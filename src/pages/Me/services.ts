import fetch from '@/utils/fetch';
import { TQuery, TTableItem } from './types';

/**
 * 获取列表
 */
export const serviceGetTableList = (params: TQuery) => fetch('/index.php/WebApi/News/news', { params });

/**
 * 添加
 * @param params
 * @returns
 */
export const servicePostCreate = (params: any) => fetch('/index.php/WebApi/News/add', { params, type: 'POST' });

/**
 * 修改
 * @param
 * @returns
 */
export const servicePostModify = (params: any) => fetch('/index.php/WebApi/News/modify', { params, type: 'POST' });


/**
 * 删除
 * @param
 * @returns
 */
export const servicePostDel = (params: any) => fetch('/index.php/WebApi/News/delete', { params, type: 'POST' });


/**
 * 详情
 * @param
 * @returns
 */
export const serviceGetDetail = (params: any) => fetch('/index.php/WebApi/News/detail', { params});


/**
 * .19 获取买入的订单列表
		token登录成功返回token 
		status状态；（6未上架，7已上架（已完成），0默认，1待支付，2待确定（已支付），3已支付，4待解决，5已提货（已完成））
 * @param
 * @returns
 */
export const serviceGetBuyOrders = (params: any) => fetch('/index.php/WebApi/Order/activebuyorders', { params});

export default {};
