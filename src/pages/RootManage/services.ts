import fetch from '@/utils/fetch';


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
 * 获取用户信息
 * @returns
 */
 export const serviceGetUserInfo = () => fetch('/index.php/WebApi/User/refresh');




/**
 * 获取列表
 */
export const serviceGetSid = () => fetch('/index.php/WebApi/SaleShowing/showings', { params:{} });

export default {};
