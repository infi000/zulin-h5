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
 * 抢购商品
 * 参数：
	必需参数：
		token登录成功返回token 
		gid商品id 
		showid场次id 

 * @param
 * @returns
 */
export const servicePostOderBuy = (params: any) => fetch('/index.php/WebApi/Order/buy', { params, type: 'POST' });


/**
 * 详情
 * @param
 * @returns
 * 必需参数：
		必需参数：
		token登录成功返回token
		gid商品id 

 */
export const serviceGetGoodsDetail = (params: any) => fetch('/index.php/WebApi/Goods/detail', { params});


/**
.9 获取用户地址列表
Address/addresses
参数：
	必需参数：
		token登录成功返回token
返回
{
    "res": "succ",
    "data": {
        "addresses": [
            {
                "id": "1",
                "uid": "1",
                "uname": "123",
                "phone": "1566220000",
                "province": "北京",
                "city": "北京",
                "county": "东城区",
                "detail": "永和大厦A-9009",
                "isdefault": "1",
                "ctime": "2022-05-24 23:55:07"
            }
        ]
    }
}

 */
export const serviceGetMyAddress = (params: any) => fetch('/index.php/WebApi/Address/addresses', { params});


export default {};
