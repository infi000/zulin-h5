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
.10 用户小店信息User/userstore
User/userstore
参数：
       必需参数：
              token登录成功返回token
       非必需参数：
              uid用户id
返回


 */
export const serviceGetStore = (params: any) => fetch('/index.php/WebApi/User/userstore', { params});


/**
.11 修改用户小店名称User/modifyuser
User/modifyuser
参数：
       必需参数：
              token登录成功返回token
              storename小店名称，长度不超过30
返回
       {
    "res": "succ",
    "data": "设置成功"
}


 */
export const servicePostSet= (params: any) => fetch('/index.php/WebApi/User/modifyuser', { params, type: 'POST' });

export default {};
