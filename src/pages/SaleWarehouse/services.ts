import { MOCK_HOST } from '@/constants';
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
.20 获取出售的订单列表
Order/activesaleorders
参数：
	必需参数：
		token登录成功返回token 
		status订单流转状态（7已上架（开始），0默认，1待支付，2待确定（已支付），3已支付（结束），4待解决）

 * @param
 * @returns
 */
export const serviceGetSaleOrders = (params: any) => fetch('/index.php/WebApi/Order/activesaleorders', { params});


/**
 * 23.买方上传付款凭证
	oid订单id 
		paypic付款凭证图片相对路径
 * @param
 * @returns
 */
export const servicePostUppayinfo = (params: any) => fetch('/index.php/WebApi/Order/uppayinfo', { params});


/**
 * .22 获取收款人收款信息

User/userbank
参数：
	必需参数：
		token登录成功返回token 
		oid购买订单id（买方仓库）
返回：
{
    "res": "succ",
    "data": {
        "id": "1",
        "bankuname": "张四",
        "card": "6221110000",
        "bankname": "中国农业银行",
        "price": "19800.00"
    }
}
 */
export const serviceGetUserBank = (params: any) => fetch(MOCK_HOST+'/index.php/WebApi/User/userbank', { params});



/**
.24 买方确认支付
Order/setpayed
参数：
	必需参数：
		token登录成功返回token 
		oid买方订单id 
返回：
{
    "res": "succ",
    "data": "确认成功"
}

 */
export const servicePostSetPayed = (params: any) => fetch(MOCK_HOST+'/index.php/WebApi/Order/setpayed', { params});


/**
.25 卖方收款确认
Order/salepayed
参数：
	必需参数：
		token登录成功返回token 
		oid卖方订单id 
返回：
{
    "res": "succ",
    "data": "确认成功"
}


 */
export const servicePostSalepayed = (params: any) => fetch(MOCK_HOST+'/index.php/WebApi/Order/salepayed', { params});


/**
.27 卖方投诉订单
Order/complaintorder
参数：
	必需参数：
		token登录成功返回token 
		oid卖方订单id 
返回：
{
    "res": "succ",
    "data": "投诉成功"
}


 */
export const servicePostComplaintorder = (params: any) => fetch(MOCK_HOST+'/index.php/WebApi/Order/complaintorder', { params});



/**
.26 买方取消订单
Order/cancelbuyorder
参数：
	必需参数：
		token登录成功返回token 
		oid买方订单id 
返回：
{
    "res": "succ",
    "data": "取消成功"
}

 */
export const servicePostCancelbuyorder = (params: any) => fetch(MOCK_HOST+'/index.php/WebApi/Order/cancelbuyorder', { params});


export default {};
