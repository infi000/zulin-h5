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

.13 获取银行卡信息
User/bank
参数：
	必需参数：
		token登录成功返回token
返回：
{
    "res": "succ",
    "data": {
        "id": "1",
        "bankuname": "张四",
        "card": "6221110000",
        "bankname": "中国农业银行"
    }
}


 */
export const serviceGetBank = (params: any) => fetch('/index.php/WebApi/User/bank', { params});


/**
.14 设置银行卡等信息
User/setbank
参数：
	必需参数：
		token登录成功返回token
       		bankuname用户真实姓名
               card银行卡号
               bankname开户行

返回：
{
    "res": "succ",
    "data": "设置成功"
}


 */
export const servicePostSetbank= (params: any) => fetch('/index.php/WebApi/User/setbank', { params, type: 'POST' });

export default {};
