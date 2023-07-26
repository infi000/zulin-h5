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



/**
.10 增加地址信息
Address/add
参数：
	必需参数：
		token  登录成功返回token
		uname 收件人姓名
		phone 收件人手机号
		province 省
		city  市
		county 区县
		detail 详细地址
	非必需参数：
		isdefault 是否是默认，1默认，0非默认
返回
{
    "res": "succ",
    "data": "添加成功"
}

 */
		export const servicePostAddrAdd = (params: any) => fetch('/index.php/WebApi/Address/add', { params, type: 'POST' });







/**
.12 修改地址信息
Address/modify
参数：
	必需参数：
		token登录成功返回token
		aid地址id
	非必需参数：
		uname收件人姓名
		phone收件人手机号
		province省
		city市
		county区县
		detail详细地址
		isdefault是否是默认，1默认，0非默认
返回
{
    "res": "succ",
    "data": "修改成功"
}

 */
		export const servicePostAddrEdit = (params: any) => fetch('/index.php/WebApi/Address/modify', { params, type: 'POST' });





/**
.11 删除地址信息
Address/delete
参数：
	必需参数：
		token登录成功返回token
		aid地址id
返回：
{
    "res": "succ",
    "data": "删除成功"
}

 */
		export const servicePostAddrDel = (params: any) => fetch('/index.php/WebApi/Address/delete', { params, type: 'POST' });




export default {};
