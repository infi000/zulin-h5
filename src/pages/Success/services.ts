import fetch from '@/utils/fetch';
import { TQuery, TTableItem } from './types';

/**
 * 获取列表
 */
export const serviceGetTableList = (params: TQuery) => fetch('/index.php/WebApi/SaleShowing/showings', { params });

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
 * 登录
 * @param
 * @returns
 */
export const servicePostLogin = (params: any) => fetch('/index.php/WebApi/User/login', { params, type: 'POST' });


/**
 * 详情
 * @param
 * @returns
 */
export const serviceGetDetail = (params: any) => fetch('/index.php/WebApi/News/detail', { params});


/**

.3 获取验证码
User/smscode
参数：
	必需参数：
		phone手机号
返回:
{
    "res": "succ",
    "data": "发送成功"
}


 */
export const serviceGetsmscode = (params: any) => fetch('/index.php/WebApi/User/smscode', { params});


/**
 * .2 手机号密码注册
User/smscode
参数：
	必需参数：
		uname手机号
		password密码
		code手机验证码
	非必需参数：
		rbuid推荐人id
返回:
{
    "res": "succ",
    "data": "注册成功"
}


 */
export const servicePostRegister = (params: any) => fetch('/index.php/WebApi/User/register', { params, type: 'POST' });

export default {};
